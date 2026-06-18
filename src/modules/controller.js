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

    this.defaultProject = ProjectModel.projects[0];
    ProjectModel.selectProject(this.defaultProject);
    this.projectView.render(this.defaultProject);

    this.projectView.bindAddProject(() => this.handleAddProject());
    this.projectView.bindRenameProject((project) =>
      this.handleRenameProject(project),
    );
    this.projectView.bindDeleteProject((id) => this.handleDeleteProject(id));
    this.projectView.bindDisplayToDos((projectDiv) =>
      this.handleDisplayTodos(projectDiv.firstChild),
    );

    this.todoView.render(null);

    this.todoView.bindAddToDo(() => this.handleAddToDo());
    this.todoView.bindDeleteToDo((button) => this.handleDeleteToDo(button));
  }

  displayProjects() {
    this.projectView.emptyApp();
    ProjectModel.projects.forEach((project) =>
      this.projectView.render(project),
    );
  }

  handleAddProject() {
    ProjectModel.addProject({
      name: this.projectView.form.name.value,
      selected: false,
      todos: [],
      id: crypto.randomUUID(),
    });

    const lastestProject = ProjectModel.projects.at(-1);
    ProjectModel.selectProject(lastestProject);

    this.projectView.render(lastestProject);

    this.todoView.emptyApp();
    this.todoView.render(null);

    AddProjectToDropDown(lastestProject);
  }

  handleRenameProject(project) {
    const projectName = this.projectView.form.name.value;

    let projectObject = this.getCorrespondingObject(project.parentElement);

    ProjectModel.updateProjectName(projectObject, projectName);
    this.projectView.renderProjectNameUpdate(project, projectName);

    renameProjectInDropdown(projectObject);
  }

  handleDeleteProject(deleteProjectButton) {
    const id = deleteProjectButton.getAttribute("data-id");
    for (let i = 0; i < ProjectModel.projects.length; i++) {
      if (ProjectModel.projects[i].id === id) {
        if (ProjectModel.projects[i].selected)
          this.determineFocus(deleteProjectButton);

        ProjectModel.removeProject(i);
        this.displayProjects();

        if (ProjectModel.isEmpty()) this.projectView.render(null);

        deleteProjectInDropdown(id);
      }
    }
  }

  determineFocus(deleteProjectButton) {
    let nextProject, previousProject;

    try {
      nextProject =
        deleteProjectButton.parentElement.nextElementSibling.nextElementSibling;
      previousProject =
        deleteProjectButton.parentElement.previousElementSibling
          .previousElementSibling;
    } catch (error) {
      if (error.message.includes(next)) nextProject = null;
      if (error.message.includes(previous)) previousProject = null;
    }

    if (ProjectModel.projects.length > 1) {
      if (this.isMiddleProject(nextProject, previousProject))
        this.handleDisplayTodos(nextProject.firstChild);
      else if (this.isLastProject(nextProject, previousProject))
        this.handleDisplayTodos(previousProject.firstChild);
      else
        this.handleDisplayTodos(
          document.querySelector(".project").nextElementSibling
            .nextElementSibling.firstChild,
        );
    } else {
      this.todoView.emptyApp();
      this.todoView.render(null);
    }
  }

  isMiddleProject(next, previous) {
    try {
      if (
        next.classList.contains("project") &&
        previous.classList.contains("project")
      )
        return true;
    } catch (error) {
      return false;
    }

    return false;
  }

  isLastProject(next, previous) {
    try {
      if (next === null && previous.classList.contains("project")) return true;
    } catch (error) {
      return false;
    }

    return false;
  }

  handleDisplayTodos(projectHeader) {
    let projectHeaderObject = this.getCorrespondingObject(projectHeader);

    this.todoView.emptyApp();

    ProjectModel.selectProject(projectHeaderObject);
    this.displayProjects();

    if (projectHeaderObject.todos.length === 0) this.todoView.render(null);

    for (let i = 0; i < projectHeaderObject.todos.length; i++)
      this.todoView.render(projectHeaderObject.todos[i]);
  }

  getCorrespondingObject(object) {
    if (object instanceof Node)
      for (let i = 0; i < ProjectModel.projects.length; i++)
        if (
          object.nextElementSibling.getAttribute("data-id") ===
          ProjectModel.projects[i].id
        )
          return ProjectModel.projects[i];

    for (const project of this.projectView.app.childNodes)
      if (project.classList.contains("project"))
        if (
          object.id ===
          project.firstChild.nextElementSibling.getAttribute("data-id")
        )
          return project.firstChild;
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
    const projects = ProjectModel.projects;

    projects.forEach((project) => {
      if (project.id === lastToDo.belongsTo) {
        project.todos.push(lastToDo);
        if (project.selected) this.todoView.render(lastToDo);
      }
    });
  }

  handleDeleteToDo(deleteToDoButton) {
    for (let i = 0; i < ProjectModel.projects.length; i++) {
      for (let j = 0; j < ProjectModel.projects[i].todos.length; j++) {
        if (
          ProjectModel.projects[i].todos[j].id ===
          deleteToDoButton.getAttribute("data-id")
        ) {
          this.todoModel.deleteToDo(j);
          ProjectModel.projects[i].todos.splice(j, 1);

          this.handleDisplayTodos(
            this.getCorrespondingObject(ProjectModel.projects[i]),
          );
        }
      }
    }
  }
}

export default new Controller(
  new ProjectModel(),
  new ProjectView(),
  new ToDoModel(),
  new ToDoView(),
);
