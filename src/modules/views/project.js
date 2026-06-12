import createDialog from "./dialog.js";
import createForm from "./project_form.js";

export default class ProjectView {
  constructor() {
    this.app = document.querySelector(".projects");

    this.createProjectDialog = createDialog("add-project", "Add project");
    this.createProjectForm = createForm("Add project");
    this.createProjectDialog.append(this.createProjectForm);

    this.renameProjectDialog = createDialog("rename-project", "Rename project");
    this.renameProjectForm = createForm("Rename project");
    this.renameProjectDialog.append(this.renameProjectForm);

    this.addProjectButton = document.createElement("button");
    this.addProjectButton.textContent = "Add project";
    this.addProjectButton.setAttribute("command", "show-modal");
    this.addProjectButton.setAttribute("commandfor", "add-project");

    this.deleteProjectButtons = [];

    this.app.append(
      this.addProjectButton,
      this.createProjectDialog,
      this.renameProjectDialog,
    );
  }

  render(project) {
    if (this.app.querySelector(":scope > .empty-message"))
      document.querySelector(".empty-message").remove();

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");

    const projectName = document.createElement("button");
    projectName.textContent = project.name;
    projectName.setAttribute("command", "show-modal");
    projectName.setAttribute("commandfor", "rename-project");

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.classList.add("delete-project");
    deleteProjectButton.textContent = "Delete project";
    deleteProjectButton.setAttribute("data-id", project.id);

    this.deleteProjectButtons.push(deleteProjectButton);

    projectDiv.append(projectName, deleteProjectButton);

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
      if (event.command === "show-modal") projectToBeRenamed = event.source;
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
      handler(defaultDeleteButton.getAttribute("data-id")),
    );
  }
}
