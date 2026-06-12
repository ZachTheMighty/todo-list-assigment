export default class ToDo {
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
