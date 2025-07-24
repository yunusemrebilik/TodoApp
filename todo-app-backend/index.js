require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Todo = require('./models/todo');
const app = express();

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
}

morgan.token('data', (req, res) => JSON.stringify(req.body));

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :data - :response-time ms'));

app.get('/api/todos', (request, response, next) => {
  Todo.find({})
    .then(todos => {
      response.json(todos);
    })
    .catch(error => next(error));
});

app.get('/api/todos/:id', (request, response, next) => {
  Todo.find(request.params.id)
    .then(todo => {
      response.json(todo);
    })
    .catch(error => next(error));
});

app.delete('/api/todos/:id', (request, response, next) => {
  Todo.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/todos', (request, response, next) => {
  const body = request.body;

  const todo = new Todo({
    title: body.title,
    description: body.description || null,
  });

  todo.save()
    .then(savedTodo => {
      response.json(savedTodo);
    })
    .catch(error => next(error));
});

app.put('/api/todos/:id', (request, response, next) => {
  Todo.findById(request.params.id)
    .then(todo => {
      if (!todo) {
        response.status(404).end();
      }

      todo.title = request.body.title;
      todo.description = request.body.description;

      return todo.save().then(updatedTodo => {
        response.json(updatedTodo);
      });
    })
    .catch(error => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});