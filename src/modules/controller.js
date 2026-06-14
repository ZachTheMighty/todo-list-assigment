import ProjectModel from "./models/project.js";
import ProjectView from "./views/project/project_view.js";
import ToDoModel from "./models/to_do.js";
import ToDoView from "./views/to_do/to_do_view.js";

import { AddProjectToDropDown } from "./views/to_do/create_widgets.js";
import { renameProjectInDropdown } from "./views/to_do/create_widgets.js";
import { deleteProjectInDropdown } from "./views/to_do/create_widgets.js";

class Controller {
  constructor(projectModel, projectView, todoModel, todoView) {
    this.projectModel = projectModel;
    this.projectView = projectView;
    this.todoModel = todoModel;
    this.todoView = todoView;

    this.projectView.render(ProjectModel.getProjects()[0]);

    this.projectView.bindAddProject(() => this.handleAddProject());
    this.projectView.bindRenameProject((project) =>
      this.handleRenameProject(project),
    );
    this.projectView.bindDeleteProject((id) => this.handleDeleteProject(id));

    this.todoView.render(null);

    this.todoView.bindAddToDo(() => this.handleAddToDo());
  }

  handleAddProject() {
    ProjectModel.addProject({
      name: this.projectView.createProjectForm.name.value,
      selected: false,
      todos: [],
      id: crypto.randomUUID(),
    });

    const lastestProject = ProjectModel.projects.at(-1);

    this.projectView.render(lastestProject);

    AddProjectToDropDown(lastestProject);

    this.projectView.deleteProjectButtons.forEach((button) => {
      button.addEventListener("click", () =>
        this.handleDeleteProject(button.getAttribute("data-id")),
      );
    });

    this.projectView.projectHeaders.forEach((projectHeader) => {
      projectHeader.addEventListener("click", () =>
        this.handleDisplayTodos(projectHeader),
      );
    });
  }

  handleRenameProject(project) {
    project.textContent = this.projectView.renameProjectForm.name.value;
    let projectObject;

    for (let i = 0; i < ProjectModel.projects.length; i++) {
      if (
        project.parentElement.nextElementSibling.getAttribute("data-id") ===
        ProjectModel.projects[i].id
      ) {
        ProjectModel.projects[i].name =
          this.projectView.renameProjectForm.name.value;
        projectObject = ProjectModel.projects[i];
      }
    }

    renameProjectInDropdown(projectObject);
  }

  handleDeleteProject(id) {
    for (let i = 0; i < ProjectModel.projects.length; i++) {
      if (ProjectModel.projects[i].id === id) {
        ProjectModel.removeProject(i);
        this.projectView.deleteProject(id);
        deleteProjectInDropdown(id);
      }
    }
  }

  removeDeleteButton(id) {
    for (let i = 0; i < this.projectView.deleteProjectButtons.length; i++) {
      if (this.projectView.deleteProjectButtons.getAttribute("data-id") === id)
        this.projectView.deleteProjectButtons.splice(i, 1);
    }
  }

  handleDisplayTodos(projectHeader) {
    let projectHeaderObject;

    this.todoView.emptyApp();

    for (let i = 0; i < ProjectModel.projects.length; i++) {
      if (
        projectHeader.nextElementSibling.getAttribute("data-id") ===
        ProjectModel.projects[i].id
      )
        projectHeaderObject = ProjectModel.projects[i];
    }

    this.selectProject(projectHeaderObject, projectHeader);

    if (projectHeaderObject.todos.length === 0) this.todoView.render(null);

    for (let i = 0; i < projectHeaderObject.todos.length; i++)
      this.todoView.render(projectHeaderObject.todos[i]);
  }

  selectProject(object, dom) {
    ProjectModel.selectProject(object);

    for (const project of this.projectView.app.childNodes) {
      if (project.classList.contains("project"))
        project.firstChild === dom
          ? project.firstChild.classList.add("selected")
          : project.firstChild.classList.remove("selected");
    }
  }

  handleAddToDo() {
    const form = this.todoView.addToDoForm;

    this.todoModel.addToDo({
      title: form.title.value,
      description: form.description.value,
      dueDate: form["due-date"].value,
      priority: form.priority.value,
      notes: form.notes.value,
      belongsTo: form.project.value,
      id: crypto.randomUUID(),
    });

    const lastToDo = this.todoModel.todos.at(-1);
    const projects = ProjectModel.getProjects();

    projects.forEach((project) => {
      if (project.id === lastToDo.belongsTo) {
        project.todos.push(lastToDo);
        if (project.selected) this.todoView.render(lastToDo);
      }
    });
  }
}

export default new Controller(
  new ProjectModel(),
  new ProjectView(),
  new ToDoModel(),
  new ToDoView(),
);
