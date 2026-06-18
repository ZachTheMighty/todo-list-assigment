import createDialog from "../dialog.js";
import createForm from "./to_do_form.js";
import { createLabel, createInput } from "./create_widgets.js";

import deleteIcon from "../../../assets/icons/trash-can-outline.svg";
import editIcon from "../../../assets/icons/pencil-outline.svg";

export default class ToDoView {
  constructor() {
    this.app = document.querySelector(".todos");

    this.dialog = createDialog();
    this.form = createForm();
    this.dialog.append(this.form);

    this.addToDoButton = document.createElement("button");
    this.addToDoButton.textContent = "Add todo";

    this.emptyMessage = document.createElement("div");
    this.emptyMessage.classList.add("empty-message");
    this.emptyMessage.textContent = "You don't have any tasks, what a bum";

    this.app.append(this.addToDoButton, this.dialog);
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

    todo.priority === "low"
      ? (priority.style.color = "lime")
      : todo.priority === "medium"
        ? (priority.style.color = "yellow")
        : (priority.style.color = "red");

    const date = document.createElement("div");
    date.classList.add("date");
    date.textContent = todo.dueDate;

    const toDoInfo = document.createElement("div");
    toDoInfo.classList.add("todo-info");
    toDoInfo.append(checkBox, title, date);

    const deleteButton = document.createElement("img");
    deleteButton.src = deleteIcon;
    deleteButton.classList.add("delete-todo");
    deleteButton.setAttribute("data-id", todo.id);

    const editImage = document.createElement("img");
    editImage.src = editIcon;
    editImage.classList.add("edit-todo");

    toDoInfo.append(editImage);

    const wrapper = document.createElement("div");
    wrapper.append(toDoInfo, priority, deleteButton);

    const horizontalLine = document.createElement("hr");

    toDoDiv.append(wrapper, horizontalLine);

    this.app.append(toDoDiv);
  }

  emptyApp() {
    this.app.textContent = "";
    this.app.append(this.addToDoButton);
    this.app.append(this.dialog);
  }

  bindAddToDo(handler) {
    this.addToDoButton.addEventListener("click", () => {
      this.form.querySelector("button").textContent = "Add todo";
      this.dialog.querySelector("h1").textContent = "Add todo";
      this.dialog.showModal();
    });

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
      this.form.childNodes.forEach((div) => {
        if (div.lastChild.tagName !== "SELECT") div.lastChild.value = "";
      });
    });
  }

  bindDeleteToDo(handler) {
    this.app.addEventListener("click", (event) => {
      const deleteToDoButton = event.target.closest(".delete-todo");
      if (deleteToDoButton) handler(deleteToDoButton);
    });
  }

  bindEditToDo(handler) {
    let todoToBeRenamed = null;

    this.app.addEventListener("click", (event) => {
      const editImage = event.target.closest(".edit-todo");
      if (!editImage) return;

      todoToBeRenamed = editImage.previousElementSibling.previousElementSibling;

      this.form.querySelector("button").textContent = "Edit todo";
      this.dialog.querySelector("h1").textContent = "Edit todo";
      this.dialog.showModal();
    });
  }
}
