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

    this.emptyMessage = document.createElement("div");
    this.emptyMessage.classList.add("empty-message");
    this.emptyMessage.textContent =
      "You don't have any projects. useless bitch";

    this.app.append(
      this.addProjectButton,
      this.addProjectDialog,
      this.renameProjectDialog,
    );
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

    projectHeader.append(projectName, editIconButton);

    projectDiv.append(projectHeader, deleteProjectButton);

    const breakLine = document.createElement("hr");

    this.app.append(projectDiv, breakLine);

    if (project.selected) this.selectProject(projectDiv);
  }

  emptyApp() {
    this.app.textContent = "";
    this.app.append(
      this.addProjectButton,
      this.addProjectDialog,
      this.renameProjectDialog,
    );
  }

  selectProject(dom) {
    for (const node of this.app.childNodes) {
      if (node.classList.contains("project"))
        node === dom
          ? node.firstChild.classList.add("selected")
          : node.firstChild.classList.remove("selected");
    }
  }

  bindAddProject(handler) {
    this.createProjectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
      this.createProjectForm.reset();
    });
  }

  bindDeleteProject(handler) {
    this.app.addEventListener("click", (event) => {
      const deleteProjectButton = event.target.closest(".delete-project");
      if (deleteProjectButton) {
        event.stopImmediatePropagation();
        handler(deleteProjectButton);
      }
    });
  }

  bindDisplayToDos(handler) {
    this.app.addEventListener("click", (event) => {
      const projectDiv = event.target.closest(".project");
      if (
        event.target.closest("[command='show-modal']") ||
        event.target.closest(".delete-project")
      )
        return;
      if (projectDiv) handler(projectDiv);
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
}
