<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import gsap from "gsap";
import router from '../router';

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Modal from "../components/Modal.vue";

let isModalOpen = ref(false);
let allMovieData = ref(null);
let pageOn = ref(1);

let searchInput = ref()

let movieTrending = ref(null);

const props = defineProps({
  movieId: String,
});

const GoToPage = () => {
  router.push('/trending');
}

const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};
const getSearch = async () => {
  const movieData = (
    await getData("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "ba4adcc4706ed37650e0a813de11a08f",
        query: searchInput.value,
        adult: false
      },
    })
  ).data.results;
  pageOn.value++
  console.log(movieData);
  movieTrending.value = movieData;
  // if (movieTrending.value == null) {
  //   movieTrending.value = movieData;
  // } else {
  //   movieTrending.value = movieTrending.value.concat(movieData);
  // }
  console.log(movieTrending);
};
// get20Movies();

const getMoreMovieData = async (movieId) => {
  const extraData = await getData(`https://api.themoviedb.org/3/movie/${movieId}`, {
    params: {
      api_key: "ba4adcc4706ed37650e0a813de11a08f",
      append_to_response: "videos",
    },
  });
  allMovieData.value = extraData.data;
  console.log(movieId);
  console.log(allMovieData.value);
  isModalOpen.value = true;
};
const print = (id) => {
  console.log(id);
};
</script>

<template>
  <div class="store-container">
    <Header page="Search" buttonPush="/" buttonName="Home"></Header>
    <div class="trending-container">
      <button id="trendingOrTop" @click="GoToPage">Get Trending</button>
    </div>
    <div class="searchBox">
      <form @submit.prevent="login()">
        <input type="text" placeholder="Search Something..." v-model="searchInput" id="searchBar">
        <input type="submit" id="moreMoviesButton" @click="getSearch" value="Search">
      </form>
    </div>
    <!-- <input type="text" v-model="username" placeholder="Username" id="username" />
    <input type="password" v-model="password" placeholder="Password" id="password" />
    <input type="submit" value="Login" id="login" /> -->
    <!-- <h3  class="thatsIt">{{searchInput}}</h3> -->
    <div class="images">
      <TransitionGroup name="moviePostersList">
        <li class="image-container" v-for="movies in movieTrending" :key="movies">
          <img class="moviePosters" :src="`https://image.tmdb.org/t/p/w500${movies.poster_path}`" :alt="movies.title"
            :props.movieId="`${movies.id}`" @click="getMoreMovieData(movies.id)" />
        </li>
      </TransitionGroup>
    </div>
    <Footer></Footer>
    <Suspense>
      <Modal :show="isModalOpen" @close="isModalOpen = false">
        <template #default>
          <div class="modal-info-container">
            <h4 class="title">{{ allMovieData.title }}</h4>
            <h5 class="tagline" v-if="(allMovieData.tagline != '')">{{ allMovieData.tagline }}</h5>
            <p class="overview">{{ allMovieData.overview }}</p>
            <div class="poster">
              <a :href="`${allMovieData.homepage}`" target="_blank">
                <img :src="`https://image.tmdb.org/t/p/w500${allMovieData.poster_path}`" alt="" />
              </a>
            </div>
            <div v-if="(allMovieData.videos.results.length!=0)" class="trailer">
              <iframe v-if="(allMovieData.videos.results.filter((video) => video.type === 'Trailer').length==0)" :src="`https://www.youtube.com/embed/${allMovieData.videos.results
              .filter((video) => video.type === 'Trailer')
              .at(0).key
              }`" frameborder="0" class="trailer"></iframe>
              <a target="_blank" :href="`https://www.youtube.com/watch?v=${allMovieData.videos.results
              .filter((video) => video.type === 'Trailer')
              .at(0).key
              }`">
                <p>View On Youtube</p>
              </a>
            </div>
            <div class="release-date">
              <h3>Release Date</h3>
              <h4>{{ allMovieData.release_date }}</h4>
              <h3 v-if="(allMovieData.production_countries.length != 0)">Country</h3>
              <h4 v-if="(allMovieData.production_countries.length != 0)">{{ allMovieData.production_countries.at(0).name
              }}</h4>
            </div>
            <div v-if="(allMovieData.production_countries.length!=0)" class="productionCompanies">
              <h3>Production Companies</h3>
              <ul>
                <li>
                  {{ allMovieData.production_companies.at(0).name }}
                </li>
                <li v-if="allMovieData.production_companies.length > 1">
                  {{ allMovieData.production_companies.at(1).name }}
                </li>
                <li v-if="allMovieData.production_companies.length > 2">
                  {{ allMovieData.production_companies.at(2).name }}
                </li>
              </ul>
            </div>
            <div class="productionCompanies">
              <h3>Genres</h3>
              <ul>
                <li>
                  {{ allMovieData.genres.at(0).name }}
                </li>
                <li v-if="allMovieData.genres.length > 1">
                  {{ allMovieData.genres.at(1).name }}
                </li>
                <li v-if="allMovieData.genres.length > 2">
                  {{ allMovieData.genres.at(2).name }}
                </li>
              </ul>
            </div>
          </div>
        </template>
      </Modal>
    </Suspense>
  </div>
</template>

<style scoped>
.trending-container {
  position: absolute;
  margin: auto;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-self: center;
  justify-content: center;
  align-items: center;
  height: 4rem;
}

#trendingOrTop {
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 1rem;
  border: rgb(255, 180, 18) solid 3px;
  background-color: darkgoldenrod;
  color: black;
  width: 30%;
  height: 2.5rem;
  font-size: 130%;
  cursor: pointer;
}

#trendingOrTop:hover {
  background-color: rgb(255, 180, 18);
  color: black;
}

#trendingOrTop:active {
  background-color: rgb(255, 180, 18);
  border: rgb(255, 180, 18) solid 3px;
}

.thatsIt {
  text-align: center;
  margin-top: 1rem;
}

.searchBox {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  margin-bottom: 2rem;
}

.searchBox form {
  display: flex;
  justify-content: center;
}

#searchBar {
  /* height: 80%; */
  width: 80vw;
  margin-left: 2%;
  /* display: block; */
  /* margin: 1% auto; */
  box-shadow: 0px 0px 15px #c2870c;
  text-align: left;
  min-height: 35px;
  /* background-color: #222e2c; */
  font-size: 180%;
  border: 2px solid #c2870c;
  border-radius: 0.9rem;
  border-top-right-radius: 0%;
  border-bottom-right-radius: 0%;
  grid-column: span 5;
  padding: 2%;
  /* padding-left: 2%; */
  /* Animation */
  animation-name: glowEffect;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

::placeholder {
  color: #c2880ce6;
}

#searchBar:focus {
  outline: none;
  /* border-width: 3px; */
  border-color: #ffbd2f;
  animation-name: glowEffectSelected;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

}

#searchBar:hover {
  border-color: #ffbd2f;
  animation: glowEffect 0.5s infinite alternate-reverse;
}

#moreMoviesButton {
  display: inline;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 1rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: rgb(255, 180, 18) solid 3px;
  background-color: darkgoldenrod;
  margin-right: 2%;
  color: black;
  width: 20%;
  /* height: 3.3rem; */
  font-size: 150%;
  cursor: pointer;
}

#moreMoviesButton:hover {
  background-color: rgb(255, 180, 18);
  color: black;
}

#moreMoviesButton:active {
  background-color: rgb(255, 180, 18);
  border: rgb(255, 180, 18) solid 3px;
}

.close-mask {
  position: absolute;
  top: 0%;
  left: 0%;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
}

.list-move,
.moviePostersList-enter-active {
  transition: opacity 5s ease, transform 2s ease;
}

.moviePostersList-leave-active {
  transition: opacity 0.3s ease;
}

.moviePostersList-enter-from,
.moviePostersList-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.store-container {
  width: 100%;
  margin-bottom: 5rem;
}

.images {
  margin: 0 2% 0 2%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* grid-template-rows: repeat(5, auto); */
  gap: 1rem;
  row-gap: 1rem;
}

.image-container {
  text-align: center;
  display: grid;
  grid-column: span 1;
  margin: auto;
}

/* .image-container:nth-child(-n + 4) {
  padding-top: 1rem;
} */

.image-container img {
  aspect-ratio: 2/3;
  width: 100%;
  height: 100%;
}

.moviePosters {
  max-width: 100%;
  max-height: 100%;
  border-radius: 0.2rem;
}

.moviePosters:hover {
  cursor: pointer;
  transform: scale(1.04);
  transition: all 0.2s;
}

.modal-info-container {
  display: grid;
  width: 100%;
  height: 90%;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 0.4rem;
}

.title {
  grid-column: span 6;
  margin-right: 10px;
  margin-left: 10px;
  position: relative;
  background: transparent;
  text-align: center;
  font-size: 140%;
}

.poster {
  grid-column: span 2;
  padding-left: 5%;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.poster img,
.poster a {
  border-radius: 0.3rem;
  margin: auto;
  padding-right: 0%;
  width: 90%;
  height: auto;
  max-width: 200px;
  max-height: 300px;
}

.poster img:hover {
  cursor: pointer;
  transform: scale(1.01);
  transition: all 0.2s;
}

.tagline {
  grid-column: span 6;
  text-align: center;
  padding-bottom: 1%;
  padding-top: 1%;
  border: 4px double darkgoldenrod;
  border-radius: 0.1;
}

.overview {
  grid-column: span 6;
  text-align: center;
  padding-bottom: 0.5rem;
}

.trailer {
  grid-column: span 4;
  text-align: center;
  /* height: fit-content; */
  margin: auto;
  width: 90%;
  height: 90%;
}

.trailer iframe {
  margin: auto;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 1%;
}

.release-date {
  grid-column: span 2;
  text-align: center;
}

.productionCompanies {
  grid-column: span 2;
  text-align: center;
  object-fit: cover;
}

.rating {
  grid-column: span 2;
  text-align: center;
}

.close-button {
  /* margin: auto;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center; */
  grid-column: span 6;
  background: rgb(173, 127, 0);
  color: black;
  padding: 1% 5%;
  /* margin-top: 10%; */
  font-size: x-large;
  border-radius: 20px;
}

.close-button:hover {
  background: #ffca45;
}

@keyframes glowEffect {
  from {
    box-shadow: 0px 0px 24px #c2870c;
  }

  to {
    box-shadow: 0px 0px 10px #c2870c;
  }
}

@keyframes glowEffectSelected {
  from {
    box-shadow: 0px 0px 32px #c2870c;
  }

  to {
    box-shadow: 0px 0px 10px #c2870c;
  }
}
</style>
