import capitalizeFirst from "./capitalize_first.js";
import ProjectModel from "../../models/project.js";

export default function createForm(submitButtonName) {
  const form = document.createElement("form");

  const divs = [];
  for (let i = 0; i < 6; i++) divs.push(document.createElement("div"));

  const labels = [];
  const inputs = [];

  labels.push(createLabel("title"));
  inputs.push(createInput("title", "text"));

  labels.push(createLabel("description"));
  inputs.push(createTextArea("description"));

  labels.push(createLabel("due-date"));
  inputs.push(createInput("due-date", "date"));

  labels.push(createLabel("priority"));
  inputs.push(createPriorityDropdown("priority"));

  labels.push(createLabel("notes"));
  inputs.push(createInput("notes"));

  labels.push(createLabel("project"));
  inputs.push(createProjectDropdown("project"));

  for (let i = 0; i < labels.length; i++) {
    divs[i].append(labels[i]);
    divs[i].append(inputs[i]);

    form.append(divs[i]);
  }
  return form;
}

function createLabel(name) {
  const label = document.createElement("label");
  label.textContent = capitalizeFirst(name);
  label.setAttribute("for", name);

  return label;
}

function createInput(name, type) {
  const input = document.createElement("input");
  input.type = type;
  input.required = name === "title" ? true : false;
  input.autofocus = name === "title" ? true : false;
  setCommonAttributes(input, name);

  return input;
}

function createTextArea(name, cols, rows) {
  const textArea = document.createElement("textarea");
  textArea.cols = cols;
  textArea.rows = rows;
  setCommonAttributes(textArea, name);

  return textArea;
}

function createPriorityDropdown(name) {
  const dropdown = document.createElement("select");
  setCommonAttributes(dropdown, name);

  dropdown.append(createOption("low"));
  dropdown.append(createOption("medium"));
  dropdown.append(createOption("high"));

  return dropdown;
}

function createProjectDropdown(name) {
  const dropdown = document.createElement("select");
  setCommonAttributes(dropdown, name);

  const projects = ProjectModel.getProjects();
  projects.forEach((project) => {
    dropdown.append(createOption(project.name));
  });

  return dropdown;
}

function createOption(value) {
  const option = document.createElement("option");
  option.textContent = capitalizeFirst(value);
  option.value = value;
  return option;
}

function setCommonAttributes(widget, name) {
  widget.id = name;
  widget.name = name;
  widget.autocomplete = "off";
}
