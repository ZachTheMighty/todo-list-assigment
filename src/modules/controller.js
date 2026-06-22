import ProjectModel from "./models/project.js";
import ProjectView from "./views/project/project_view.js";
import ToDoModel from "./models/to_do.js";
import ToDoView from "./views/to_do/to_do_view.js";

import { addProjectToDropDown } from "./views/to_do/create_widgets.js";
import { renameProjectInDropdown } from "./views/to_do/create_widgets.js";
import { deleteProjectInDropdown } from "./views/to_do/create_widgets.js";
import { selectProjectInDropdown } from "./views/to_do/create_widgets.js";

import { store, remove } from "./local_storage.js";

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
    this.todoView.bindEditToDo(
      (todo) => this.handleEditTodo(todo),
      (todo) => this.handleSaveTodoInfo(todo),
    );
    this.todoView.bindToggleCheckTodo((todoLabel) =>
      this.handleToggleCheckTodo(todoLabel),
    );
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

    addProjectToDropDown(lastestProject);
    store(lastestProject);
  }

  handleRenameProject(project) {
    const projectName = this.projectView.form.name.value;

    let projectObject = this.getCorrespondingProjectObject(
      project.parentElement,
    );

    ProjectModel.updateProjectName(projectObject, projectName);
    this.projectView.renderProjectNameUpdate(project, projectName);

    renameProjectInDropdown(projectObject);
    store(projectObject);
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
        remove(id);
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
    let projectHeaderObject = this.getCorrespondingProjectObject(projectHeader);

    this.todoView.emptyApp();

    ProjectModel.selectProject(projectHeaderObject);
    selectProjectInDropdown(projectHeaderObject);
    this.displayProjects();

    if (projectHeaderObject.todos.length === 0) this.todoView.render(null);

    for (let i = 0; i < projectHeaderObject.todos.length; i++)
      this.todoView.render(projectHeaderObject.todos[i]);
  }

  getCorrespondingProjectObject(object) {
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

  getCorrespondingTodoObject(object) {
    if (object instanceof Node)
      for (let i = 0; i < this.todoModel.todos.length; i++)
        if (
          object.parentElement.nextElementSibling.nextElementSibling.getAttribute(
            "data-id",
          ) === this.todoModel.todos[i].id
        )
          return this.todoModel.todos[i];
  }

  handleAddToDo() {
    const form = this.todoView.form;

    this.todoModel.addToDo({
      title: form.title.value,
      description: form.description.value,
      dueDate: form["due-date"].value,
      priority: form.priority.value,
      notes: form.notes.value,
      belongsTo: form.project.value,
      isChecked: false,
      id: crypto.randomUUID(),
    });

    const lastToDo = this.todoModel.todos.at(-1);
    const projects = ProjectModel.projects;

    store(lastToDo);

    projects.forEach((project) => {
      if (project.id === lastToDo.belongsTo) {
        project.todos.push(lastToDo);
        if (project.selected) this.todoView.render(lastToDo);
      }
    });
  }

  handleDeleteToDo(deleteToDoButton) {
    const todoIndex = this.findTodo(
      deleteToDoButton.getAttribute("data-id"),
    ).todoIndex;
    const projectIndex = this.findTodo(
      deleteToDoButton.getAttribute("data-id"),
    ).projectIndex;

    this.todoModel.deleteToDo(todoIndex);
    remove(ProjectModel.projects[projectIndex].todos[todoIndex].id);
    ProjectModel.projects[projectIndex].todos.splice(todoIndex, 1);

    this.handleDisplayTodos(
      this.getCorrespondingProjectObject(ProjectModel.projects[projectIndex]),
    );
  }

  handleEditTodo(todoLabel) {
    const todoObject = this.getCorrespondingTodoObject(todoLabel);
    const form = this.todoView.form;

    this.todoModel.editTodo(
      todoObject,
      form.title.value,
      form.description.value,
      form["due-date"].value,
      form.priority.value,
      form.notes.value,
      form.project.value,
    );

    store(todoObject);

    const projectBeforeEdit =
      ProjectModel.projects[this.findTodo(todoObject.id).projectIndex];

    const projectAfterEdit = this.getCorrespondingProjectObject(
      this.getProjectObjectFromId(todoObject.belongsTo),
    );

    this.todoView.emptyApp();

    if (projectAfterEdit === projectBeforeEdit)
      for (let i = 0; i < projectBeforeEdit.todos.length; i++)
        this.todoView.render(projectBeforeEdit.todos[i]);
    else {
      const todoPos = this.findTodo(todoObject.id).todoIndex;
      projectBeforeEdit.todos.splice(todoPos, 1);

      projectAfterEdit.todos.push(todoObject);

      if (projectBeforeEdit.todos.length === 0) this.todoView.render(null);
      else
        projectBeforeEdit.todos.forEach((todo) => this.todoView.render(todo));
    }
  }

  handleSaveTodoInfo(todoLabel) {
    const todoObject = this.getCorrespondingTodoObject(todoLabel);
    const form = this.todoView.form;

    form.title.value = todoObject.title;
    form.description.value = todoObject.description;
    form["due-date"].value = todoObject.dueDate;
    form.priority.value = todoObject.priority;
    form.notes.value = todoObject.notes;
    form.project.value = todoObject.belongsTo;
  }

  handleToggleCheckTodo(todoLabel) {
    const todoObject = this.getCorrespondingTodoObject(todoLabel);
    const project = this.getCorrespondingProjectObject(
      this.getProjectObjectFromId(todoObject.belongsTo),
    );
    this.todoModel.toggleCheck(todoObject);
    this.todoView.emptyApp();
    project.todos.forEach((todo) => this.todoView.render(todo));
  }

  findTodo(todoId) {
    for (let i = 0; i < ProjectModel.projects.length; i++) {
      for (let j = 0; j < ProjectModel.projects[i].todos.length; j++) {
        if (ProjectModel.projects[i].todos[j].id === todoId)
          return { todoIndex: j, projectIndex: i };
      }
    }
  }

  getProjectObjectFromId(projectId) {
    let result;
    this.projectView.app.childNodes.forEach((node) => {
      if (node.classList.contains("project"))
        if (node.lastChild.getAttribute("data-id") === projectId)
          result = node.firstChild;
    });
    return result;
  }

  loadItems() {
    const objects = Object.values(localStorage);
    if (objects.length === 0) return;

    this.projectView.emptyApp();

    let selectedProject;

    objects.forEach((object) => {
      if (!JSON.parse(object).belongsTo) {
        const jsonProject = JSON.parse(object);

        if (jsonProject.selected) selectedProject = jsonProject;

        if (jsonProject.id !== this.defaultProject.id)
          ProjectModel.addProject(jsonProject);
        addProjectToDropDown(jsonProject);
      }
    });

    objects.forEach((object) => {
      if (JSON.parse(object).belongsTo) {
        const jsonTodo = JSON.parse(object);
        const projects = ProjectModel.projects;

        for (let i = 0; i < projects.length; i++)
          if (projects[i].id === jsonTodo.belongsTo) {
            if (projects[i].todos.length === 0) {
              this.todoModel.todos.push(jsonTodo);
              projects[i].todos.push(jsonTodo);
              return;
            }
            let todoAlreadyExists = false;
            for (let j = 0; j < projects[i].todos.length; j++)
              if (projects[i].todos[j].id === jsonTodo.id)
                todoAlreadyExists = true;

            if (!todoAlreadyExists) {
              this.todoModel.todos.push(jsonTodo);
              projects[i].todos.push(jsonTodo);
            }
          }
      }
    });

    this.displayProjects();

    if (!selectedProject) selectedProject = this.defaultProject;
    this.todoView.emptyApp();

    if (selectedProject.todos.length === 0) this.todoView.render(null);
    for (let i = 0; i < selectedProject.todos.length; i++)
      this.todoView.render(selectedProject.todos[i]);
  }
}

export default new Controller(
  new ProjectModel(),
  new ProjectView(),
  new ToDoModel(),
  new ToDoView(),
);
