<script setup>
import router from '../router';

const GoToAbout = () => {
    router.push("/about")
}
</script>

<template>
    <div>
        <div id="footerContainer">
            <h1 class="title 1" @click="router.push('/about')">MMDB Store</h1>
            <!-- <h2 class="title2">Store</h2> -->

            <h2 id="aboutUs" @click="GoToAbout">About Us</h2>
        </div>
    </div>
</template>

<style scoped>
#footerContainer {
    position: fixed;
    display: flex;
    justify-content: left;
    align-items: center;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4rem;
    margin: auto auto;
    background-color: black;
}

.title {
    float: left;
    display: inline;
    background-color: transparent;
    margin-left: 3%;
}

.title2 {
    float: left;
    display: inline;
    background-color: transparent;
    margin-left: 1%;
    margin-top: 0.5%;
}

#aboutUs {
    background-color: transparent;
    margin-left: auto;
    margin-right: 3%;
    text-align: right;
    float: right;
}

#aboutUs:hover {
    cursor: pointer;
}
</style>