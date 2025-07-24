import { Todo } from "./Todo";

export const TodoList = ({ todos, removeTodo, updateTodo }) => {
  return (
    <div className="listWrapper">
      <h2>Todo List</h2>
      <ul>
        {todos.map(t => <Todo key={t.id} initialTodo={t} removeTodo={removeTodo} updateTodo={updateTodo} />)}
      </ul>
    </div>
  );
};
