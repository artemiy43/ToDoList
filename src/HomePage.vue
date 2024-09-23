<template>
  <Popup
    v-show="popupOpened"
    @close="close"
    @setText="setText"
    @save="save"
    :text="newText"
  />
  <main class="main">
    <button class="add" @click="add">Добавить задачу</button>
    <ul class="list">
      <li v-for="task in todoStore.tasks" class="list__todo">
        <div class="buttons_container">
          <button class="button_task edit" @click="edit(task.id)" />
          <button
            class="button_task delete"
            @click="todoStore.delete(task.id)"
          />
        </div>
        <p :class="task.done && 'task_text_done'">{{ task.name }}</p>
        <input
          type="checkbox"
          @input="todoStore.editStatus(task.id)"
          :value="task.done"
        />
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useToDoStore } from "./store/todoStore";
import Popup from "./components/Popup.vue";
const todoStore = useToDoStore();

const newText = ref("");
const selectedId = ref(-1);
const popupOpened = ref(false);
const close = () => {
  popupOpened.value = false;
  selectedId.value = -1;
  newText.value = "";
};
const edit = (id) => {
  const task = todoStore.tasks.find((task) => task.id === id);
  selectedId.value = id;
  popupOpened.value = true;
  newText.value = task.name;
};
const add = (id) => {
  popupOpened.value = true;
};
const setText = (text) => {
  newText.value = text;
};
const save = () => {
  if (selectedId.value === -1) {
    todoStore.add({
      id: todoStore.tasks[todoStore.tasks.length - 1].id + 1,
      name: newText.value,
      done: false,
    });
  } else {
    todoStore.editName(selectedId.value, newText.value);
  }
  close();
};
</script>

<style scoped>
.main {
  color: rgb(46, 46, 46);
  display: flex;
  flex-direction: row;
  gap: 30px;
  position: relative;
  z-index: 5;
}

.list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 15px;
}

.list__todo {
  width: 320px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid rgb(93, 93, 165);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: large;
  font-weight: 700;
  text-transform: uppercase;
  padding: 15px;
  gap: 20px;
}

.buttons_container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.button_task {
  width: 32px;
  height: 32px;
}

.button_task:hover {
  border: 1px solid black;
}

.edit {
  background: url(./assets/edit.svg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.delete {
  background: url(./assets/cross.svg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.add {
  width: 150px;
  height: 70px;
  border: 1px solid black;
  border-radius: 10px;
  text-align: center;
  transition: all 0.8s ease;
}

.add:hover {
  background-color: black;
  color: white;
}

.task_text_done {
  text-decoration: line-through;
}
</style>
