import createDialog from "../dialog.js";

export default class ToDoView {
  constructor() {
    this.app = document.querySelector(".todos");

    this.addToDoDialog = createDialog("add-todo", "Add todo");

    this.addToDoButton = document.createElement("button");
    this.addToDoButton.textContent = "Add todo";
    this.addToDoButton.setAttribute("command", "show-modal");
    this.addToDoButton.setAttribute("commandfor", "add-todo");

    this.app.append(this.addToDoButton, this.addToDoDialog);
  }
}
