<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  show: Boolean
});

// const modal = ref(null)
onClickOutside(props.show = false)
</script>

<template>
  <Transition>
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <button @click="$emit('close')" class="x-button">X</button>
        <div>
          <slot>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .6);
  display: grid;
  place-items: center;
}

.modal-container {
  /* display: grid;
  grid-template-columns: repeat(6, 1fr); */
  background: #0f0d06;
  padding-top: 0%;
  padding: 0.5rem;
  width: 90vw;
  /* max-width: 500px; */
  height: 75vh;
  border: darkgoldenrod 0.5rem solid;
  border-radius: 0.05rem;
}

.modal-footer {
  /* border-top: 1px solid #ddd; */
  /* margin-top: 1rem; */
  padding-top: 0.5rem;
  font-size: 0.8rem;
}

.close-button {
  margin: auto;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background: rgb(173, 127, 0);
  color: black;
  padding: 1% 5%;
  /* margin-top: 10%; */
  font-size: x-large;
  border-radius: 20px;
}

.x-button {
  /* display: flex; */
  position: absolute;
  text-align: right;
  /* top: 0px;
  right: 0px; */
  /* left: 93%; */
  background: none;
  border: none;
  cursor: pointer;
}

.x-button:hover {
  color: #ffca45;
}

.close-button:hover {
  background: #ffca45;
}

.v-enter-active {
  transition: opacity 0.4s ease;
}

.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>