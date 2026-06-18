export default class ToDoModel {
  constructor() {
    this.todos = [];
  }

  addToDo(todo) {
    this.todos.push(todo);
  }

  deleteToDo(todoIndex) {
    this.todos.splice(todoIndex, 1);
  }

  editTodo(todo, title, description, dueDate, priority, notes, belongsTo) {
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
    todo.notes = notes;
    todo.belongsTo = belongsTo;
  }
}
