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

function createTextArea(name) {
  const textArea = document.createElement("textarea");
  textArea.cols = "10";
  textArea.rows = "3";
  setCommonAttributes(textArea, name);

  return textArea;
}

function setCommonAttributes(widget, name) {
  widget.id = name;
  widget.name = name;
  widget.autocomplete = "off";
}
