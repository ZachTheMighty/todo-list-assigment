const dialog = document.createElement("dialog");
dialog.setAttribute("id", "add-task");

const header = document.createElement("h1");
header.textContent = "Add Task";

const closeDialog = document.createElement("button");
closeDialog.textContent = "✕";

closeDialog.setAttribute("command", "close");
closeDialog.setAttribute("commandfor", "add-task");

const dialogHead = document.createElement("div");

dialogHead.append(header);
dialogHead.append(closeDialog);

dialog.append(dialogHead);

function createForm() {
  const form = document.createElement("form");

  const divs = [];
  for (let i = 0; i < 6; i++) divs.push(document.createElement("div"));

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";
  titleLabel.setAttribute("for", "title");

  const titleInput = document.createElement("input");
  titleInput.setAttribute("id", "title");
  titleInput.setAttribute("required", "true");
  titleInput.setAttribute("autofocus", "true");

  divs[0].append(titleLabel);
  divs[0].append(titleInput);

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description";
  descriptionLabel.setAttribute("for", "description");

  const descriptionTextArea = document.createElement("textarea");
  descriptionTextArea.setAttribute("id", "description");
  descriptionTextArea.setAttribute("cols", 20);
  descriptionTextArea.setAttribute("rows", 5);

  divs[1].append(descriptionLabel);
  divs[1].append(descriptionTextArea);

  const dueDateLabel = document.createElement("label");
  dueDateLabel.textContent = "Due Date";
  dueDateLabel.setAttribute("for", "due-date");

  const dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("id", "due-date");
  dueDateInput.setAttribute("type", "date");

  divs[2].append(dueDateLabel);
  divs[2].append(dueDateInput);

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority";
  priorityLabel.setAttribute("for", "priority");

  const prioritySelect = document.createElement("select");
  prioritySelect.setAttribute("id", "priority");

  const opt1 = document.createElement("option");
  opt1.setAttribute("value", "lowPriority");
  opt1.textContent = "Low Priority";

  const opt2 = document.createElement("option");
  opt2.setAttribute("value", "mediumPriority");
  opt2.textContent = "Medium Priority";

  const opt3 = document.createElement("option");
  opt3.setAttribute("value", "highPriority");
  opt3.textContent = "High Priority";

  prioritySelect.append(opt1);
  prioritySelect.append(opt2);
  prioritySelect.append(opt3);

  divs[3].append(priorityLabel);
  divs[3].append(prioritySelect);

  const notesLabel = document.createElement("label");
  notesLabel.textContent = "Notes";
  notesLabel.setAttribute("for", "notes");

  const notesInput = document.createElement("input");
  notesInput.setAttribute("id", "notes");

  divs[4].append(notesLabel);
  divs[4].append(notesInput);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Add Task";

  divs[5].append(submitButton);

  for (let i = 0; i < 6; i++) form.append(divs[i]);

  form.addEventListener("submit", (e) => e.preventDefault());

  return form;
}
dialog.append(createForm());

export { dialog };
