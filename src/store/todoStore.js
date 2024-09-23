import { defineStore } from "pinia";

export const useToDoStore = defineStore("todo", {
  state: () => ({
    // изначальный список задач
    tasks: [
      {
        id: 1,
        name: "убраться в комнате",
        done: false,
      },
      {
        id: 2,
        name: "погулять с собакой",
        done: false,
      },
      {
        id: 3,
        name: "купить продуктов",
        done: false,
      },
      {
        id: 4,
        name: "позвонить маме",
        done: false,
      },
    ],
  }),
  getters: {},
  actions: {
    add(newTask) {
      // добавляем задачу
      this.tasks.push(newTask);
    },
    delete(taskId) {
      // удаляем задачу
      const taskindex = this.tasks.findIndex((task) => task.id === taskId);
      if (taskindex !== -1) this.tasks.splice(taskindex, 1);
    },
    editName(id, newName) {
      // меняем имя задачи
      const taskindex = this.tasks.findIndex((task) => task.id === id);
      const task = this.tasks.find((task) => task.id === id);
      this.tasks.splice(taskindex, 1, { ...task, name: newName });
    },
    editStatus(id) {
      // меняем статус задачи
      const taskindex = this.tasks.findIndex((task) => task.id === id);
      const task = this.tasks.find((task) => task.id === id);
      this.tasks.splice(taskindex, 1, { ...task, done: !task.done });
    },
  },
});
