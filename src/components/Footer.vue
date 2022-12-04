<script setup>
import router from '../router';

const GoToAbout = () => {
  router.push("/about")
}
</script>

<template>
  <div>
    <div id="footerContainer">
      <h3 class="title 1" @click="router.push('/search')">By Moosa Mughal</h3>
      <a id="aboutUs" href="https://developers.themoviedb.org/3" target="_blank" rel="noopener noreferrer">
        <h3 @click="('https://developers.themoviedb.org/3')">Using The TMDB API</h3>
      </a>
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
  border-top: solid 3px darkgoldenrod;
  background-color: black;
}

.title {
  float: left;
  display: inline;
  background-color: transparent;
  margin-left: 3%;
  /* cursor: pointer; */
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