export const alertInvalidTodo = (todo) => {
  if (todo && todo.title) {
    return false;
  }
  window.alert('The todo must have a title');
  return true;
};