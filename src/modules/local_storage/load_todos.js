import ProjectModel from "../models/project.js";

export default function loadTodos(todos, modelTodos) {
  todos.forEach((todo) => {
    const projects = ProjectModel.projects;

    for (let i = 0; i < projects.length; i++)
      if (projects[i].id === todo.belongsTo) {
        if (projects[i].todos.length === 0) {
          modelTodos.push(todo);
          projects[i].todos.push(todo);
          return;
        }
        let todoAlreadyExists = false;
        for (let j = 0; j < projects[i].todos.length; j++)
          if (projects[i].todos[j].id === todo.id) todoAlreadyExists = true;

        if (!todoAlreadyExists) {
          modelTodos.push(todo);
          projects[i].todos.push(todo);
        }
      }
  });
}
