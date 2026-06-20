export default class ProjectModel {
  constructor() {
    this.defaultProject = {
      name: "Default project",
      selected: true,
      todos: [],
      id: "f52ae929-ede1-49a7-bee6-9b16e99e33fa",
    };

    ProjectModel.addProject(this.defaultProject);
  }

  static projects = [];

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
    return ProjectModel.projects.length === 0 ? true : false;
  }

  static updateProjectName(project, newName) {
    project.name = newName;
  }
}
