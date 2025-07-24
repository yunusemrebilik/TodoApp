import { useState } from "react";
import { alertInvalidTodo } from "./utils/alertInvalidTodo";

export const NewTodoForm = ({ addNewTodo }) => {
  const [newTodo, setNewTodo] = useState(null);

  const handleChange = (e) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (alertInvalidTodo(newTodo)) return;

    addNewTodo(newTodo);
    clearFields();
  };

  const clearFields = () => {
    setNewTodo(null);
  };

  return (
    <div>
      <div className="formWrapper">
        <h2>Add a new todo</h2>
        <form onSubmit={handleSubmit} className="newTodoForm">
          <div>
            <label htmlFor="newTitle">Title: </label>
            <input name="title" id="newTitle" value={newTodo ? newTodo.title : ''} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="newDescription">Description: </label>
            <textarea name="description" id="newDescription" value={newTodo ? newTodo.description : ''} onChange={handleChange} />
          </div>
          <button className="editBtn" type="submit">Add todo</button>
        </form>
      </div>
    </div>
  );
};