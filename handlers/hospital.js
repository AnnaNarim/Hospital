const db = require('../db.js');
const todo = {};
module.exports = todo;

const arrayOfTodo = [];

todo.renderPage = (request, h) => h.file('./form.html');

todo.add = (request) => {
  const { text } = request.payload;
  arrayOfTodo.push(text);
  return arrayOfTodo;
};

todo.getTodos = () => arrayOfTodo;

todo.update = (request) => {
  const { id, value } = request.payload;
  arrayOfTodo[id] = value;
  return 'updated';
};

todo.delete = (request) => {
  const { id } = request.payload;
  delete arrayOfTodo[id];
  arrayOfTodo.splice(id, 1);
  return 'deleted';
};