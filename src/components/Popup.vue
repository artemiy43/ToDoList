<template>
  <div class="popup">
    <div class="popup_container">
      <button class="close" @click="emits('close')" />
      <label>Новая задача</label>
      <input
        :value="props.text"
        type="text"
        class="popup__input"
        @input="emits('setText', $event.target.value)"
      />
      <button class="save" @click="emits('save')">Сохранить</button>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["close", "setText", "save"]);
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style lang="css" scoped>
.popup {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.685);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  display: block;
  overflow-y: hidden;
  overflow-x: hidden;
}

.popup_container {
  position: absolute;
  width: 320px;
  background-color: white;
  color: black;
  top: 40%;
  left: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px;
  border-radius: 10px;
  font-size: large;
  font-weight: 500;
}
.popup__input {
  height: 30px;
  width: 250px;
  font-size: 22px;
}

.close {
  width: 32px;
  height: 32px;
  background: url(../assets/cross.svg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
