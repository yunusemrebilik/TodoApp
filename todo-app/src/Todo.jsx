import { useState } from "react";
import { alertInvalidTodo } from "./utils/alertInvalidTodo";

export const Todo = ({ initialTodo, removeTodo, updateTodo }) => {
  const [todo, setTodo] = useState(initialTodo);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleRemove = () => {
    if (window.confirm(`Do you really want to delete ${todo.title}`)) {
      removeTodo(todo.id);
    }
  };

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (alertInvalidTodo(todo)) return;

    updateTodo(todo, todo.id);
    setIsEditMode(false);
  };

  const handleDiscard = () => {
    setTodo(initialTodo);
    setIsEditMode(false);
  };

  if (!isEditMode) {
    return (
      <li>
        <div>
          {todo.title}
          <div className="buttonWrapper">
            <button onClick={handleEdit} className="editBtn">Edit</button>
            <button onClick={handleRemove} className="removeBtn">Remove</button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <div className="formWrapper">
      <form onSubmit={handleSave} className="editForm">
        <div>
          <label htmlFor={`editTitle-${todo.id}`}>Title: </label>
          <input name="title" id={`editTitle-${todo.id}`} value={todo.title || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="editDescription">Description: </label>
          <textarea name="description" id="editDescription" value={todo.description || ''} onChange={handleChange} />
        </div>
        <div className="buttonWrapper">
          <button type="submit" className="editBtn">Save</button>
          <button onClick={handleDiscard} className="removeBtn">Discard</button>
        </div>
      </form>
    </div>
  );
};
