import {
  createLabel,
  createInput,
  createTextArea,
  createPriorityDropdown,
  createProjectDropdown,
} from "./create_widgets.js";

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
  inputs.push(createInput("notes", "text"));

  labels.push(createLabel("project"));
  inputs.push(createProjectDropdown("project"));

  for (let i = 0; i < labels.length; i++) {
    divs[i].append(labels[i], inputs[i]);

    form.append(divs[i]);
  }

  const submitButton = document.createElement("button");
  submitButton.textContent = submitButtonName;

  form.append(submitButton);

  return form;
}
