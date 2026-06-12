import ToDoModel from "../models/to_do.js";
import ToDoView from "../views/to_do/to_do_view.js";

class ToDoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.render(null);
  }
}

export default new ToDoController(new ToDoModel(), new ToDoView());
