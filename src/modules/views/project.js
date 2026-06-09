import { dialog } from "./dialog.js";

export default function createProject(name, toDo) {
  const main = document.querySelector("main");

  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project");

  projectDiv.append(dialog);

  const projectName = document.createElement("h1");
  projectName.textContent = name;

  const breakLine = document.createElement("hr");

  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("to-do");
  toDoDiv.textContent = "no tasks";

  const addToDoButton = document.createElement("button");
  addToDoButton.textContent = "New task";
  addToDoButton.setAttribute("command", "show-modal");
  addToDoButton.setAttribute("commandfor", "add-task");

  projectDiv.append(projectName);
  projectDiv.append(breakLine);
  projectDiv.append(toDoDiv);
  projectDiv.append(addToDoButton);

  main.append(projectDiv);
}
