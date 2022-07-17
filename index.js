import express from 'express';
import {StatusCodes} from 'http-status-codes';

const app = express();
const port = process.env.PORT || 3000;
let users = [
    { id: 1, name: 'Elias Hora', age: 24},
    { id: 2, name: 'Amanda Oliveira', age: 32},
    {id: 3, name: 'jhony cash', age: 33}
];

app.use(express.json());

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', (request,response) => {
    return response.send('<h1>Amanda, eu te amo muito!</h1>');
});


app.get('/users', (request, response) => {
    return response.send(users);
});

app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => {
      return  (user.id === Number(userId))
    })
    return response.send(user);
});

app.post('/users', (request,response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});


app.put('/users/:userId', (request,response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {
        if(userId === user.id) {return updatedUser;}
        return user;
    })
} );


app.delete('/users/:userId', ( request , response) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId))

    return response.status(StatusCodes.NO_CONTENT).send();
});