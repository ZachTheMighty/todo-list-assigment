import ProjectModel from "./models/project.js";
import ProjectView from "./views/project.js";

class ProjectController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.render(this.model.projects[0]);

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
    this.view.render(this.model.projects.at(-1));

    this.model.projects.forEach((project) => console.log(project));

    this.view.deleteProjectButtons.forEach((button) => {
      button.addEventListener("click", () =>
        this.handleDeleteProject(button.getAttribute("data-id")),
      );
    });
  }

  handleRenameProject(project) {
    project.textContent = this.view.renameProjectForm.name.value;
    for (let i = 0; i < this.model.projects.length; i++) {
      if (
        project.nextElementSibling.getAttribute("data-id") ===
        this.model.projects[i].id
      )
        this.model.projects[i].name = this.view.renameProjectForm.name.value;
    }
    console.log(this.model.projects);
  }

  handleDeleteProject(id) {
    for (let i = 0; i < this.model.projects.length; i++) {
      if (this.model.projects[i].id === id) {
        this.model.removeProject(i);
        this.view.deleteProject(id);
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

export default new ProjectController(new ProjectModel(), new ProjectView());
