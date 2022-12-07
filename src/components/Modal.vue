<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  show: Boolean
});

</script>

<template>
  <Transition>
    <div v-if="show" class="modal-mask" @click="$emit('close')">
      <div class="modal-container" @click.stop="">
        <button @click="$emit('close')" class="x-button">X</button>
        <div class="modal-content-container">
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
  background: rgba(0, 0, 0, .7);
  display: grid;
  place-items: center;
}

.modal-container {
  background: #0f0d06;
  padding-top: 0%;
  padding: 0.5rem;
  width: 90vw;
  /* max-width: 500px; */
  height: 70vh;
  border: darkgoldenrod 0.5rem solid;
  border-radius: 0.05rem;
  margin: auto;
}
/* .modal-content-container{
  display: grid;
  place-items: center;
  align-content: center;
  margin: auto;
} */
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
  /* display: flex;
  justify-content: right; */
  position: absolute;
  text-align: right;
  
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
  transition: opacity 0.5s ease;
}

.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>