import createDialog from "../dialog.js";
import createForm from "./project_form.js";

import deleteIcon from "../../../assets/icons/trash-can-outline.svg";
import editIcon from "../../../assets/icons/pencil-outline.svg";

export default class ProjectView {
  constructor() {
    this.app = document.querySelector(".projects");

    this.addProjectDialog = createDialog("add-project", "Add project");
    this.createProjectForm = createForm("Add project");
    this.addProjectDialog.append(this.createProjectForm);

    this.renameProjectDialog = createDialog("rename-project", "Rename project");
    this.renameProjectForm = createForm("Rename project");
    this.renameProjectDialog.append(this.renameProjectForm);

    this.addProjectButton = document.createElement("button");
    this.addProjectButton.textContent = "Add project";
    this.addProjectButton.setAttribute("command", "show-modal");
    this.addProjectButton.setAttribute("commandfor", "add-project");

    this.deleteProjectButtons = [];
    this.projectHeaders = [];

    this.app.append(
      this.addProjectButton,
      this.addProjectDialog,
      this.renameProjectDialog,
    );
  }

  render(project) {
    if (this.app.querySelector(":scope > .empty-message"))
      document.querySelector(".empty-message").remove();

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");

    const projectHeader = document.createElement("div");

    this.projectHeaders.push(projectHeader);

    const projectName = document.createElement("h1");
    projectName.textContent = project.name;

    const editIconImage = document.createElement("img");
    editIconImage.src = editIcon;
    editIconImage.classList.add("edit-project");

    const editIconButton = document.createElement("button");
    editIconButton.setAttribute("command", "show-modal");
    editIconButton.setAttribute("commandfor", "rename-project");

    editIconButton.append(editIconImage);

    const deleteProjectButton = document.createElement("img");
    deleteProjectButton.src = deleteIcon;
    deleteProjectButton.classList.add("delete-project");
    deleteProjectButton.setAttribute("data-id", project.id);

    this.deleteProjectButtons.push(deleteProjectButton);

    projectHeader.append(projectName, editIconButton);

    projectDiv.append(projectHeader, deleteProjectButton);

    const breakLine = document.createElement("hr");

    this.app.append(projectDiv, breakLine);
  }

  deleteProject(id) {
    const deleteButton = document.querySelector(`[data-id="${id}"]`);
    deleteButton.parentElement.nextElementSibling.remove();
    deleteButton.parentElement.remove();

    const emptyMessage = document.createElement("div");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "You don't have any projects. Add some";

    if (!this.app.querySelector(":scope > .project"))
      this.app.append(emptyMessage);
  }

  bindAddProject(handler) {
    this.createProjectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
      this.createProjectForm.reset();
    });
  }

  bindRenameProject(handler) {
    let projectToBeRenamed = null;

    this.renameProjectDialog.addEventListener("command", (event) => {
      if (event.command === "show-modal")
        projectToBeRenamed = event.source.previousElementSibling;
    });

    this.renameProjectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(projectToBeRenamed);
      this.renameProjectForm.reset();
    });
  }

  bindDeleteProject(handler) {
    const defaultDeleteButton = document.querySelector(".delete-project");
    defaultDeleteButton.addEventListener("click", () =>
      handler(defaultDeleteButton),
    );
  }
}
