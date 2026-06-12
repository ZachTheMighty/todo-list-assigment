export default class ToDoModel {
  constructor() {
    this.todos = [
      {
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        notes: "",
        isChecked: false,
        belongsTo: null,
        id: crypto.randomUUID(),
      },
    ];
  }
}
