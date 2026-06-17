import capitalizeFirst from "./capitalize_first.js";
import ProjectModel from "../../models/project.js";

export function createLabel(name) {
  const label = document.createElement("label");
  label.textContent = capitalizeFirst(name);
  label.setAttribute("for", name);

  return label;
}

export function createInput(name, type) {
  const input = document.createElement("input");
  input.type = type;
  input.required = name === "title" ? true : false;
  input.autofocus = name === "title" ? true : false;
  setCommonAttributes(input, name);

  return input;
}

export function createTextArea(name, cols, rows) {
  const textArea = document.createElement("textarea");
  textArea.cols = cols;
  textArea.rows = rows;
  setCommonAttributes(textArea, name);

  return textArea;
}

export function createPriorityDropdown(name) {
  const dropdown = document.createElement("select");
  setCommonAttributes(dropdown, name);

  dropdown.append(createOption("low", "low"));
  dropdown.append(createOption("medium", "medium"));
  dropdown.append(createOption("high", "high"));

  return dropdown;
}

class Dropdown {
  static dropdown = document.createElement("select");
}

export function createProjectDropdown(name) {
  setCommonAttributes(Dropdown.dropdown, name);

  const defaultProject = ProjectModel.projects[0];
  Dropdown.dropdown.append(
    createOption(defaultProject.name, defaultProject.id),
  );

  return Dropdown.dropdown;
}

export function createOption(textContent, value) {
  const option = document.createElement("option");
  option.textContent = capitalizeFirst(textContent);
  option.value = value;
  return option;
}

export function AddProjectToDropDown(project) {
  Dropdown.dropdown.append(createOption(project.name, project.id));
  Dropdown.dropdown.childNodes.forEach((option) => {
    if (option.value === project.id) option.selected = true;
  });
}

export function renameProjectInDropdown(project) {
  for (const option of Dropdown.dropdown.childNodes)
    if (option.value === project.id) {
      option.textContent = project.name;
    }
}

export function deleteProjectInDropdown(projectId) {
  for (const option of Dropdown.dropdown.childNodes)
    if (option.value === projectId) option.remove();
}

export function setCommonAttributes(widget, name) {
  widget.id = name;
  widget.name = name;
  widget.autocomplete = "off";
}
