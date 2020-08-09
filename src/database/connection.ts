import knex from 'knex';
import path from 'path'; //Make it easier to use the path in the application

// migrations - controlam a versão do BD. +- como um GIT.

const db = knex({
    client: 'sqlite3',
    connection: {
        // '__dirname' returns the dir of this file
        filename: path.resolve(__dirname, 'database.sqlite') // Will create the 'database.sqlite'
    },
    useNullAsDefault: true, //normally needed when using sqlite
});

export default db;
