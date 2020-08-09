import Knex from 'knex';

// Syntax não se decora. Olhar documentação do Knex: knexjs.org

// up = Quais alterações queremos realizar no DB
export async function up(knex: Knex) {

    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });

}

// down = Se deu ruim, o que fazer para voltar?
export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}