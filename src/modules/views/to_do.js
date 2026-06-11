export default function createToDo(
  title,
  description,
  dueDate,
  priority,
  notes,
  isChecked,
) {
  const toDoDiv = document.createElement("div");

  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");

  const titleHeader = document.createElement("h2");
  titleHeader.textContent = title;

  const dueDateDiv = document.createElement("div");
  dueDateDiv.textContent = dueDate;

  const container = document.createElement("div");
  container.append(titleHeader);
  container.append(dueDateDiv);

  toDoDiv.append(checkBox);
  toDoDiv.append(container);

  return toDoDiv;
}
