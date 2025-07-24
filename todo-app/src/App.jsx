import { useEffect, useState } from "react"
import todoService from "./services/todoService";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addNewTodo = (newTodo) => {
    todoService.create(newTodo).then(response => {
      setTodos([
        ...todos,
        response.data,
      ]);
    });
  }

  useEffect(() => {
    todoService.getAll().then(response => {
      setTodos(response.data);
    });
  }, []);

  const removeTodo = (id) => {
    todoService.deleteById(id).then(() => {
      setTodos(todos.filter(t => t.id !== id));
    });
  }

  const updateTodo = (todo, id) => {
    todoService.update(todo, id).then(response => {
      setTodos(todos.map(t => t.id === id ? response.data : t));
    });
  }
  
  return (
    <>
      <h1>Todo List App</h1>
      <div className="container">
        <NewTodoForm addNewTodo={addNewTodo} />
        <TodoList todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} />
      </div>
    </>
  );
}

export default App