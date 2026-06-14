export default class ProjectModel {
  constructor() {
    this.defaultProject = {
      name: "Default project",
      todos: [],
      id: crypto.randomUUID(),
    };

    ProjectModel.addProject(this.defaultProject);
  }

  static projects = [];

  static getProjects() {
    return ProjectModel.projects;
  }

  static addProject(project) {
    ProjectModel.projects.push(project);
  }

  static removeProject(projectId) {
    ProjectModel.projects.splice(projectId, 1);
  }
}
