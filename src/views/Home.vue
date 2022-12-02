<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import Header from "../components/Header.vue"
import Hero from "../components/Hero.vue"
import Footer from "../components/Footer.vue"
</script>

<template>
    <div>
        <Header page="Home" buttonPush="/login" buttonName="Login"></Header>
        <Hero></Hero>
        <Footer></Footer>
    </div>
</template>

<style scoped>
div{
text-align: center;
}
</style>