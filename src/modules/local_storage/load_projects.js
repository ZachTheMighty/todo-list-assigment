import ProjectModel from "../models/project.js";
import { addProjectToDropDown } from "../views/to_do/create_widgets.js";

export default function loadProjects(projects) {
  let selectedProject;
  projects.forEach((project) => {
    if (project.selected) selectedProject = project;

    if (project.id !== ProjectModel.projects[0].id)
      ProjectModel.addProject(project);
    addProjectToDropDown(project);
  });
  return selectedProject;
}
