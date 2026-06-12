export default function createForm(submitButtonName) {
  const form = document.createElement("form");

  const divs = [];
  for (let i = 0; i < 6; i++) divs.push(document.createElement("div"));

  const labels = [];
  const inputs = [];

  labels.push(createLabel("title"));
  inputs.push(createTextInput("title"));

  for (let i = 0; i < labels.length; i++) {
    divs[i].append(labels[i]);
    divs[i].append(inputs[i]);

    form.append(divs[i]);
  }
  return form;
}

function createLabel(name) {
  const label = document.createElement("label");
  label.textContent = name[0].toUpperCase() + name.slice(1);
  label.for = name;

  return label;
}

function createTextInput(name) {
  const input = document.createElement("input");
  input.id = name;
  input.name = name;
  input.autocomplete = "off";
  input.required = name === "title" ? true : false;
  input.autofocus = name === "title" ? true : false;

  return input;
}
