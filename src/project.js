export default class Project {
  #name;
  #toDos;

  constructor(name) {
    this.#name = name;
    this.#toDos = [];
  }

  getName() {
    return this.#name;
  }

  setName(name) {
    this.#name = name;
  }

  getToDos() {
    return this.#toDos;
  }

  addToDo(toDo) {
    this.#toDos.push(toDo);
  }
}
