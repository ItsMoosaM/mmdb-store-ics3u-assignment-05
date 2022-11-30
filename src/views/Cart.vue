<script setup>
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
        <Header></Header>
        <h1>Cart</h1>
    </div>
</template>

<style scoped>
div{
    text-align: center;
}
</style>