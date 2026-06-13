import ToDoModel from "../models/to_do.js";
import ToDoView from "../views/to_do/to_do_view.js";
import ProjectModel from "../models/project.js";

class ToDoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.render(null);

    this.view.bindAddToDo(() => this.handleAddToDo());
  }

  handleAddToDo() {
    const form = this.view.addToDoForm;

    this.model.addToDo({
      title: form.title.value,
      description: form.description.value,
      dueDate: form["due-date"].value,
      priority: form.priority.value,
      notes: form.notes.value,
      belongsTo: form.project.value,
      id: crypto.randomUUID(),
    });

    const lastToDo = this.model.todos.at(-1);
    const projects = ProjectModel.getProjects();

    projects.forEach((project) => {
      if (project.id === lastToDo.id) project.todos.push(lastToDo);
    });

    this.view.render(lastToDo);
  }
}

export default new ToDoController(new ToDoModel(), new ToDoView());
