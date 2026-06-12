export default class ToDoModel {
  constructor() {
    this.todos = [];
  }

  addToDo(todo) {
    this.todos.push(todo);
  }
}
