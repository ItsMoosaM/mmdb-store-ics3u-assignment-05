<script setup>
import { ref, watchEffect } from 'vue'
import axios from "axios";

const props = defineProps({
  show: Boolean,
  id: String
});

let allMovieData = ref(null);

const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};
const getMovieData = async (movieId) => {
  const extraData = await getData(`https://api.themoviedb.org/3/movie/${movieId}`, {
    params: {
      api_key: "ba4adcc4706ed37650e0a813de11a08f",
      append_to_response: "videos",
    },
  });
  console.log(movieId);
  allMovieData.value = extraData.data;
  console.log(allMovieData.value);
};

watchEffect(() => {
  getMovieData(props.id)
});
</script>

<template>
  <Transition>
    <div v-if="show" class="modal-mask" @click="$emit('close')">
      <!-- <Transition name="pop"> -->
      <div class="modal-container" @click.stop="">
        <button @click="$emit('close')" class="x-button">X</button>
        <div class="modal-content-container">
          <div class="modal-info-container">
            <h3 class="title">{{ allMovieData.title }}</h3>
            <h5 class="tagline" v-if="(allMovieData.tagline != '')">{{ allMovieData.tagline }}</h5>
            <p class="overview">{{ allMovieData.overview }}</p>
            <div class="poster">
              <a :href="`${allMovieData.homepage}`" target="_blank">
                <img :src="`https://image.tmdb.org/t/p/w500${allMovieData.poster_path}`" alt="" />
              </a>
            </div>
            <div class="trailer"
              v-if="(allMovieData.videos.results.filter((video) => video.type === 'Trailer').length != 0)">
              <iframe allow="fullscreen;" :src="`https://www.youtube.com/embed/${allMovieData.videos.results
              .filter((video) => video.type === 'Trailer')
              .at(0).key
              }`" frameborder="0" class="trailer"></iframe>
              <a target="_blank" :href="`https://www.youtube.com/watch?v=${allMovieData.videos.results
              .filter((video) => video.type === 'Trailer')
              .at(0).key
              }`">
                <p>View On YouTube</p>
              </a>
            </div>
            <div class="release-date-and-country">
              <h3>Release Date</h3>
              <h4>{{ allMovieData.release_date }}</h4>
              <h3 v-if="(allMovieData.production_countries.length != 0)">Country</h3>
              <h4 v-if="(allMovieData.production_countries.length != 0)">{{
                  allMovieData.production_countries.at(0).name
              }}</h4>
            </div>
            <div class="productionCompanies">
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
        </div>
      </div>
      <!-- </Transition> -->
    </div>
  </Transition>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
  height: auto;
}

::-webkit-scrollbar-thumb {
  background: rgba(184, 135, 11, 0.2);
  border-radius: 1rem;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(205, 151, 13, 0.8);
}

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
  width: 85vw;
  height: 70vh;
  border: darkgoldenrod 0.5rem solid;
  border-radius: 0.1rem;
  margin: auto;
}

.modal-content-container {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  align-content: center;
  margin: auto;
}

.modal-info-container {
  display: grid;
  width: 100%;
  height: 100%;
  overflow: overlay;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 0.4rem;
}

.title {
  grid-column: span 6;
  margin-top: 1%;
  text-decoration: overline underline;
  background: transparent;
  text-align: center;
  font-size: 180%;
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
}.trailer a{
  text-decoration: none;
}.trailer a:hover{
  text-decoration: underline;
}


.release-date-and-country {
  grid-column: span 2;
  text-align: center;
}

.release-date-and-country h3 {
  padding-bottom: 6px;
  text-decoration: underline;
}

.productionCompanies {
  grid-column: span 2;
  text-align: center;

}

.productionCompanies li {
  line-height: 150%;
  list-style: square;
  list-style-position: inside;
}

.rating {
  grid-column: span 2;
  text-align: center;
}

.x-button {
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
  transition: opacity 0.3s ease;
}

.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.pop-enter-active {
  transition: transform 0.2s linear;
}

.pop-leave-active {
  transition: transform 0.2s linear;
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
}
</style>