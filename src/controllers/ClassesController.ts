import { Request, Response  } from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

// No ts "Interface" é usado para definir o formato padrão de um objeto!
interface scheduleItem {
    week_day: number;
    from: string;
    to: string;
};

export default class ClassesController {

    // The method for returning a list is usually called 'index'
    async index(request: Request, response: Response){
        const filters = request.query;

        // Ja vamos resolver problemas de tipagem do ts ao usar filters
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        // Check if user passed all required fields
        if (!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            // Cannot use arrow function beloew because we are using 'this.'
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);

    };

    async create(request: Request, response: Response) {

        // desestruturando o objeto em variáveis.
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body; // os dados vem do body
    
        // trx = transaction. it will be used to cancel all db operations if something goes wrong along the way
        const trx = await db.transaction();
    
        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            })
        
            // { o Objeto acima é igual ao abaixo. Como prop = valor, JS permite simplificar a declaração.
            //     name: name,
            //     avatar: avatar,
            //     whatsapp: whatsapp,
            //     bio: bio
            // }
        
            const user_id = insertedUsersIds[0] // Query acima retorna ID de todos os usuários criados no request atual. Só queremos 1.
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
        
            const class_id = insertedClassesIds[0];
        
            // A estratégia será converter os horarios para minutos e coloca-los no banco como int.
        
            const classSchedule = schedule.map((scheduleItem: scheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                    class_id
                };
            })
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit(); //This is when all is done altogether in the DB
        
            // Status 201 no http sifnifica criado com sucesso
            return response.status(201).send();
    
        } catch (err){
            // console.log(err);
    
            // Desfazer qualquer alteração que pode ter ocorrido no db.
            await trx.rollback();
    
            // vamos retornar um erro para o request
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
    
        }
    
    };

}