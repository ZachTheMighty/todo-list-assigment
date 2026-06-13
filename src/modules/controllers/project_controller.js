import ProjectModel from "../models/project.js";
import ProjectView from "../views/project/project_view.js";
import { AddProjectToDropDown } from "../views/to_do/create_widgets.js";
import { renameProjectInDropdown } from "../views/to_do/create_widgets.js";
import { deleteProjectInDropdown } from "../views/to_do/create_widgets.js";

class ProjectController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.defaultProject = {
      name: "Default project",
      todos: [],
      id: crypto.randomUUID(),
    };

    this.model.addProject(this.defaultProject);
    console.log(this.model.getProjects());
    this.view.render(this.defaultProject);

    this.view.bindAddProject(() => this.handleAddProject());
    this.view.bindRenameProject((project) => this.handleRenameProject(project));
    this.view.bindDeleteProject((id) => this.handleDeleteProject(id));
  }

  handleAddProject() {
    this.model.addProject({
      name: this.view.createProjectForm.name.value,
      todos: [],
      id: crypto.randomUUID(),
    });

    const lastestProject = this.model.projects.at(-1);

    this.view.render(lastestProject);

    AddProjectToDropDown(lastestProject);

    this.model.projects.forEach((project) => console.log(project));

    this.view.deleteProjectButtons.forEach((button) => {
      button.addEventListener("click", () =>
        this.handleDeleteProject(button.getAttribute("data-id")),
      );
    });
  }

  handleRenameProject(project) {
    project.textContent = this.view.renameProjectForm.name.value;
    let projectObject;

    for (let i = 0; i < this.model.projects.length; i++) {
      if (
        project.parentElement.nextElementSibling.getAttribute("data-id") ===
        this.model.projects[i].id
      ) {
        this.model.projects[i].name = this.view.renameProjectForm.name.value;
        projectObject = this.model.projects[i];
      }
    }

    renameProjectInDropdown(projectObject);

    console.log(this.model.projects);
  }

  handleDeleteProject(id) {
    for (let i = 0; i < this.model.projects.length; i++) {
      if (this.model.projects[i].id === id) {
        this.model.removeProject(i);
        this.view.deleteProject(id);
        deleteProjectInDropdown(id);
      }
    }
    console.log(this.model.projects);
  }

  removeDeleteButton(id) {
    for (let i = 0; i < this.view.deleteProjectButtons.length; i++) {
      if (this.view.deleteProjectButtons.getAttribute("data-id") === id)
        this.view.deleteProjectButtons.splice(i, 1);
    }
  }
}

export default new ProjectController(ProjectModel, new ProjectView());
