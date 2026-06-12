export default class ProjectModel {
  constructor() {
    this.projects = [
      {
        name: "Default project",
        todos: [],
        id: crypto.randomUUID(),
      },
    ];
  }

  static getProjects() {
    return new ProjectModel().projects;
  }

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(projectId) {
    this.projects.splice(projectId, 1);
  }
}
