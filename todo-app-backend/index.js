const express = require('express');
const cors = require('cors');
const app = express();

let todos = [
  {
    title: "Go to the grocery store",
    description: "",
    id: 1,
  },
  {
    title: "Work out",
    description: "",
    id: 2,
  },
]

app.use(cors());
app.use(express.json());

app.get('/api/todos', (request, response) => {
  response.json(todos)
});

app.get('/api/todos/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    response.json(todo);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/todos/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  todos = todos.filter(t => t.id !== id);

  response.status(204).end();
});

const generateId = () => todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
app.post('/api/todos', (request, response) => {
  const body = request.body;
  if (!body.title) {
    return response.status(400).json({
      "error": "Title missing"
    });
  }

  const todo = {
    title: body.title,
    description: body.description,
    id: generateId(),
  };

  todos = [...todos, todo];
  response.json(todo);
});

app.put('/api/todos/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const body = request.body;

  const updatedTodo = {
      title: body.title,
      description: body.description,
      id: id,
  };

  if (!body.title) {
    return response.status(400).json({
      "error": "Title missing"
    });
  }

  todos = todos.map(t => t.id === id ? updatedTodo : t);
  response.json(updatedTodo);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});