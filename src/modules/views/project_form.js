export default function createForm(submitButtonName) {
  const form = document.createElement("form");
  const div = document.createElement("div");

  const label = document.createElement("label");
  label.textContent = "Project name";
  label.for = "name";

  const input = document.createElement("input");
  input.id = "name";
  input.name = "name";
  input.required = true;
  input.autofocus = true;
  input.autocomplete = "off";

  const submitButton = document.createElement("button");
  submitButton.textContent = submitButtonName;

  div.append(label);
  div.append(input);

  form.append(div);
  form.append(submitButton);

  return form;
}
