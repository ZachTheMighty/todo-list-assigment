import createDialog from "../dialog.js";
import createForm from "./project_form.js";

import deleteIcon from "../../../assets/icons/trash-can-outline.svg";
import editIcon from "../../../assets/icons/pencil-outline.svg";

export default class ProjectView {
  constructor() {
    this.app = document.querySelector(".projects");

    this.dialog = createDialog();
    this.form = createForm();
    this.dialog.append(this.form);

    this.addProjectButton = document.createElement("button");
    this.addProjectButton.textContent = "Add project";

    this.emptyMessage = document.createElement("div");
    this.emptyMessage.classList.add("empty-message");
    this.emptyMessage.textContent =
      "You don't have any projects. useless bitch";

    this.app.append(this.addProjectButton, this.dialog);
  }

  render(project) {
    if (!project) {
      this.emptyApp();
      this.app.append(this.emptyMessage);
      return;
    } else this.emptyMessage.remove();

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");

    const projectHeader = document.createElement("div");

    const projectName = document.createElement("h1");
    projectName.textContent = project.name;

    const editImage = document.createElement("img");
    editImage.src = editIcon;
    editImage.alt = "edit icon";
    editImage.classList.add("edit-project");

    const deleteProjectButton = document.createElement("img");
    deleteProjectButton.src = deleteIcon;
    deleteProjectButton.alt = "delete icon";
    deleteProjectButton.classList.add("delete-project");
    deleteProjectButton.setAttribute("data-id", project.id);

    projectHeader.append(projectName, editImage);

    projectDiv.append(projectHeader, deleteProjectButton);

    const breakLine = document.createElement("hr");

    this.app.append(projectDiv, breakLine);

    if (project.selected) this.selectProject(projectDiv);
  }

  emptyApp() {
    this.app.textContent = "";
    this.app.append(this.addProjectButton, this.dialog);
  }

  selectProject(dom) {
    for (const node of this.app.childNodes) {
      if (node.classList.contains("project"))
        node === dom
          ? node.firstChild.classList.add("selected")
          : node.firstChild.classList.remove("selected");
    }
  }

  renderProjectNameUpdate(project, newName) {
    project.textContent = newName;
  }

  bindAddProject(handler) {
    this.addProjectButton.addEventListener("click", () => {
      this.form.id = "add";
      this.form.querySelector("button").textContent = "Add project";
      this.dialog.querySelector("h1").textContent = "Add project";
      this.dialog.showModal();
    });

    this.form.addEventListener("submit", (event) => {
      if (this.form.id !== "add") return;
      event.preventDefault();
      handler();
      this.form.reset();
    });
  }

  bindDeleteProject(handler) {
    this.app.addEventListener("click", (event) => {
      const deleteProjectButton = event.target.closest(".delete-project");
      if (deleteProjectButton) handler(deleteProjectButton);
    });
  }

  bindDisplayToDos(handler) {
    this.app.addEventListener("click", (event) => {
      const projectDiv = event.target.closest(".project");
      if (
        event.target.closest("img") ||
        event.target.closest(".delete-project")
      )
        return;
      if (projectDiv) handler(projectDiv);
    });
  }

  bindRenameProject(handler) {
    let projectToBeRenamed = null;

    this.app.addEventListener("click", (event) => {
      if (event.target.closest(".delete-project")) return;

      const editProjectButton = event.target.closest("img");
      if (!editProjectButton) return;

      projectToBeRenamed = editProjectButton.previousElementSibling;

      this.form.id = "edit";
      this.form.querySelector("button").textContent = "Edit project";
      this.dialog.querySelector("h1").textContent = "Edit project";
      this.dialog.showModal();
    });

    this.form.addEventListener("submit", (event) => {
      if (this.form.id !== "edit") return;
      event.preventDefault();
      handler(projectToBeRenamed);
      this.form.reset();
    });
  }
}
