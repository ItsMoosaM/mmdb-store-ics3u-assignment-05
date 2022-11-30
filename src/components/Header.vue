<script setup>
import router from '../router';
import { useRouter } from "vue-router";

const GoToLogin = () => {
    router.push("/login");
}
</script>

<template>
    <div>
        <div id="headerContainer">
            <h1 class="title 1">MMDB</h1>
            <h2 class="title2">Store</h2>
            <button id="loginButton" @click="GoToLogin">Login</button>
        </div>
    </div>
</template>

<style scoped>
#headerContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    background-color: black;
}

.title {
    background-color: black;
    padding-left: 5%;
}

.title2 {
    background-color: black;
    margin-left: 1%;
    margin-top: 0.5%;
}

#loginButton {
    background-color: rgb(3, 3, 3);
    border: rgb(161, 115, 17) 5px solid;
    font-size: 1.5rem;
    margin: auto;
    float: right;
    height: 3rem;
    width: 24%;
    margin-right: 4%;
    border-radius: 1rem;
}

#loginButton:hover {
    background-color: #191919;
    border: rgb(161, 115, 17) 5px solid;
    display: block;
    cursor: pointer;
}
</style>