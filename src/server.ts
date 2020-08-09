import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors()) // cors enables external connections
app.use(express.json()); //Make express understand JSON

// Antes de criar rotas, estudar os casos de uso para o seu APP. ler README.md

app.use(routes);

// '3333' is the port chosen for the API
app.listen(3333); 
// we will listen on localhost:3333/"resource". The address is known as route.
