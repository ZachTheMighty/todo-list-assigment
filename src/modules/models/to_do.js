export default class ToDoModel {
  constructor() {
    this.todos = [
      {
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        notes: "",
        belongsTo: null,
        isChecked: false,
        id: crypto.randomUUID(),
      },
    ];
  }
}
