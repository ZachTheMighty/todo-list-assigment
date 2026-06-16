export default class ProjectModel {
  constructor() {
    this.defaultProject = {
      name: "Default project",
      selected: true,
      todos: [],
      id: crypto.randomUUID(),
    };

    ProjectModel.addProject(this.defaultProject);
  }

  static projects = [];

  static getProjects() {
    return ProjectModel.projects;
  }

  static selectProject(projectSelected) {
    ProjectModel.projects.forEach((project) =>
      projectSelected === project
        ? (project.selected = true)
        : (project.selected = false),
    );
  }

  static addProject(project) {
    ProjectModel.projects.push(project);
  }

  static removeProject(projectId) {
    ProjectModel.projects.splice(projectId, 1);
  }

  static isEmpty() {
    return projects.length === 0 ? true : false;
  }
}
