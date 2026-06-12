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

  getProjects() {
    return this.projects;
  }

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(projectId) {
    this.projects.splice(projectId, 1);
  }
}
