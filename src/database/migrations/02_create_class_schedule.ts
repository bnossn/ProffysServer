import Knex from 'knex';

// Syntax não se decora. Olhar documentação do Knex: knexjs.org

// up = Quais alterações queremos realizar no DB
export async function up(knex: Knex) {

    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();
    
        // create a field 'class_id' that references a class (foreign key)
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });

}

// down = Se deu ruim, o que fazer para voltar?
export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
}