export default class ToDo {
  #title;
  #description;
  #dueDate;
  #priority;
  #notes;
  #isChecked;

  constructor(title, description, dueDate, priority, notes, isChecked) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#notes = notes;
    this.#isChecked = isChecked;
  }

  getTitle() {
    return this.#title;
  }

  getDescription() {
    return this.#description;
  }

  getDueDate() {
    return this.#dueDate;
  }

  getPriority() {
    return this.#priority;
  }

  getNotes() {
    return this.#notes;
  }

  getIsChecked() {
    return this.#isChecked;
  }

  setTitle(title) {
    this.#title = title;
  }

  setDescription(description) {
    this.#description = description;
  }

  setDueDate(dueDate) {
    this.#dueDate = dueDate;
  }

  setPriority(priority) {
    this.#priority = priority;
  }

  setNotes(notes) {
    this.#notes = notes;
  }

  check() {
    this.#isChecked = true;
  }

  unCheck() {
    this.#isChecked = false;
  }
}
