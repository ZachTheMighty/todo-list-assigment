export default class ProjectModel {
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
