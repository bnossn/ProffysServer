import express from 'express';

const app = express();

app.use(express.json()); //Make express understand JSON

// methods you might use:
// GET: Buscar ou listar uma informação
// POST: Criar alguma nova info no backend
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente

// Corpo (Resquest Body): Dados para criação ou atualização de um registro
// Route Params: Identificar qual rescurso eu quero atualizar ou deletar
// Query Params: Paginação, filtros, ordenação. ex: 'route?page=2&sort=name'

//We've chosen to execute code on /users address ('/users' = resource)
app.post('/users', (request, response) => {
    // You can send back to requester whatever you like.
    // It's common sense to send back an json

    console.log(request.body);

    const users = [
        { name: 'Diego', age: 25 },
        { name: 'Vini', age: 21 },
    ];

    return response.json(users);
});

// Using Route Params. We've chosen an parameter 'id' on resource /users/delete
// call example: "http://localhost:3333/users/delete/1"
app.delete('/users/delete/:id', (request, response) => {
    // You can send back to requester whatever you like.
    // It's common sense to send back an json

    console.log("Request to delete:");
    console.log(request.params);

    const returnResponse = [
        {"Server Response": "user deleted"}
    ];

    return response.json(returnResponse);
});

// '3333' is the port chosen for the API
app.listen(3333); 
// we will listen on localhost:3333/"resource". The address is known as route.