import Knex from 'knex';

// Syntax não se decora. Olhar documentação do Knex: knexjs.org

// up = Quais alterações queremos realizar no DB
export async function up(knex: Knex) {

    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();
    
        // create a field 'user_id' that references a class (foreign key)
        // Tabela que define com qual prof foi a conexão.
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });

}

// down = Se deu ruim, o que fazer para voltar?
export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}