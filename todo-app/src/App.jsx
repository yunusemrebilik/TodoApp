import { useEffect, useState } from "react"
import todoService from "./services/todoService";

const isTodoValid = (todo) => todo && todo.title ? true : false

const alertIfTodoIsNotValid = (todo) => {
  if (!isTodoValid(todo)) {
    window.alert('The todo must have a title');
    return true;
  }
  return false;
}

const AddNewTodo = ({ addNewTodo }) => {
  const [newTodo, setNewTodo] = useState(null);

  const handleChange = (e) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (alertIfTodoIsNotValid(newTodo)) return;
    
    addNewTodo(newTodo);
    clearFields();
  }

  const clearFields = () => {
    setNewTodo(null);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="newTitle">Title: </label>
        <input name="title" id="newTitle" value={newTodo ? newTodo.title : ''} onChange={handleChange} />
      </p>
      <p>
        <label htmlFor="newDescription">Description: </label>
        <textarea name="description" id="newDescription" value={newTodo ? newTodo.description : ''} onChange={handleChange} />
      </p>
      <button type="submit">Add todo</button>
    </form>
  );
}

const Todo = ({ initialTodo, removeTodo, updateTodo }) => {
  const [todo, setTodo] = useState(initialTodo)
  const [isEditMode, setIsEditMode] = useState(false);

  const handleRemove = () => {
    if (window.confirm(`Do you really want to delete ${todo.title}`)) {
      removeTodo(todo.id);
    }
  }

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    });
  }

  const handleEdit = () => {
    setIsEditMode(true);
  }

  const handleSave = (e) => {
    e.preventDefault();

    if (alertIfTodoIsNotValid(todo)) return;
    
    updateTodo(todo, todo.id);
    setIsEditMode(false);
  }

  const handleDiscard = () => {
    setTodo(initialTodo);
    setIsEditMode(false);
  }
  
  if (!isEditMode) {
    return (
      <li>
        <p>
          {todo.title}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleRemove}>Remove</button>
        </p>
      </li>
    );
  }

  return (
    <form onSubmit={handleSave}>
      <p>
        <label htmlFor={`editTitle-${todo.id}`}>Title: </label>
        <input name="title" id={`editTitle-${todo.id}`} value={todo.title || ''} onChange={handleChange} />
      </p>
      <p>
        <label htmlFor="editDescription">Description: </label>
        <textarea name="description" id="editDescription" value={todo.description || ''} onChange={handleChange} />
      </p>
      <button type="submit">Save</button>
      <button onClick={handleDiscard}>Discard</button>
    </form>
  );
}

const TodoList = ({ todos, removeTodo, updateTodo }) => {
  return (
    <ul>
      {todos.map(t => <Todo key={t.id} initialTodo={t} removeTodo={removeTodo} updateTodo={updateTodo} />)}
    </ul>
  );
}

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
    todoService.deleteById(id).then(response => {
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
      <AddNewTodo addNewTodo={addNewTodo} />
      <hr />
      <TodoList todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} />
    </>
  );
}

export default App