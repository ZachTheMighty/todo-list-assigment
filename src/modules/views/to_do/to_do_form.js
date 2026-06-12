export default function createForm(submitButtonName) {
  const form = document.createElement("form");

  const divs = [];
  for (let i = 0; i < 6; i++) divs.push(document.createElement("div"));

  const labels = [];

  labels.push(createLabel("title"));

  for (let i = 0; i < divs.length; i++) {
    divs[i].push(labels[i]);
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
