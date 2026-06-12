import createDialog from "../dialog.js";
import createForm from "./to_do_form.js";
import { createLabel, createInput } from "./create_widgets.js";

export default class ToDoView {
  constructor() {
    this.app = document.querySelector(".todos");

    this.addToDoDialog = createDialog("add-todo", "Add todo");
    this.addToDoForm = createForm("Add todo");

    this.addToDoDialog.append(this.addToDoForm);

    this.addToDoButton = document.createElement("button");
    this.addToDoButton.textContent = "Add todo";
    this.addToDoButton.setAttribute("command", "show-modal");
    this.addToDoButton.setAttribute("commandfor", "add-todo");

    this.emptyMessage = document.createElement("div");
    this.emptyMessage.classList.add("empty-message");
    this.emptyMessage.textContent = "You don't have any tasks, what a bum";

    this.app.append(this.addToDoButton, this.addToDoDialog);
  }

  render(todo) {
    if (todo === null) {
      this.app.append(this.emptyMessage);
      return;
    } else this.emptyMessage.remove();

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");

    const title = createLabel(todo.title);
    title.classList.add("title");

    const checkBox = createInput(todo.title, "checkbox");

    const priority = document.createElement("div");
    priority.classList.add("priority");
    priority.textContent = todo.priority;

    const date = document.createElement("div");
    date.classList.add("date");
    date.textContent = todo.dueDate;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete todo";

    const horizontalLine = document.createElement("hr");

    toDoDiv.append(
      checkBox,
      title,
      priority,
      date,
      deleteButton,
      horizontalLine,
    );

    this.app.append(toDoDiv);
  }

  bindAddToDo(handler) {
    this.addToDoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
      this.addToDoForm.reset();
    });
  }
}
