import express, { Router } from 'express'
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';


const routes = express.Router(); // Neste arquivo não criamos o "const app = express();", apenas uma rota para ele.

/* Let's create the response in a new file to organize things using a class.
The classes with responses to requests is in the './controllers' folder.
*/
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();


//We've chosen to execute code on /users address ('/users' = resource)
routes.get('/users', (request, response) => {
    // You can send back to requester whatever you like.
    // It's common sense to send back an json

    return response.json({message: 'Hello World'});
});


// Create new route
routes.post('/classes', classesControllers.create);

// Create new route
routes.get('/classes', classesControllers.index);

// Create new route
routes.post('/connections', connectionsController.create);

// Create new route
routes.get('/connections', connectionsController.index);

export default routes;