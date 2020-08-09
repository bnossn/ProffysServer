import Knex from 'knex';

// Syntax não se decora. Olhar documentação do Knex: knexjs.org

// up = Quais alterações queremos realizar no DB
export async function up(knex: Knex) {

    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();
    
        // create a field 'user_id' that references a user (foreign key)
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });

}

// down = Se deu ruim, o que fazer para voltar?
export async function down(knex: Knex) {
    return knex.schema.dropTable('classes');
}