<script setup>
// api_key= ba4adcc4706ed37650e0a813de11a08f;

import { ref } from "vue";
import { useRouter } from "vue-router";

import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref(false);


</script>

<template>
  <div>
    <Header page="Cart" buttonPush="/" buttonName="Home"></Header>
    <Footer></Footer>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
</style>