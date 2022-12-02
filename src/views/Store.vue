<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios'


import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Modal from "../components/Modal.vue"

let isModalOpen = ref(false)
let allMovieData = ref(null)

const props = defineProps({
    movieId: String
})

let movieTrending = ref();

const getData = async (url, params) => {
    try {
        return await axios.get(url, params);
    } catch (error) {
        console.log(error);
    }
};
const get20Movies = async () => {
    const movieData = (await getData("https://api.themoviedb.org/3/trending/movie/week?", {
        params: {
            api_key: "ba4adcc4706ed37650e0a813de11a08f",
            // query: selectedMovie,
        }
    })).data.results;
    console.log(movieData)
    movieTrending.value = movieData;
};
get20Movies()
console.log(movieTrending)

const getMoreMovieData = async (movieId) => {
    const extraData = await getData(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
            api_key: "ba4adcc4706ed37650e0a813de11a08f",
            append_to_response: "videos",
        }
    })
    allMovieData.value = extraData.data;
    console.log(movieId)
    console.log(allMovieData.value)
    isModalOpen.value = true;
};
const print = (id) => {
    console.log(id)
}


</script>

<template>
    <div class="store-container">
        <Header page="Store" buttonPush="/cart" buttonName="Cart"></Header>
            <div class="images">
        <TransitionGroup name="fade" tag="ul">
                <div class="image-container" v-for="movies in movieTrending" :key="movies" >
                    <img class="moviePosters" :src="`https://image.tmdb.org/t/p/w500${movies.poster_path}`"
                        :alt="movies.title" :props.movieId="`${movies.id}`" @click="getMoreMovieData(movies.id)"  />
                </div>
        </TransitionGroup>
            </div>
        <Suspense>
            <Modal :show="isModalOpen" @close="isModalOpen = false">
                <template #default>
                    <div class="modal-info-container">
                        <h4 class="title">{{ allMovieData.title }}</h4>
                        <h5 class="tagline">{{ allMovieData.tagline }}</h5>
                        <p class="overview">{{ allMovieData.overview }}</p>
                        <img :src="`https://image.tmdb.org/t/p/w500${allMovieData.poster_path}`" alt="" class="poster">
                        <div class="trailer">
                            <iframe
                                :src="`https://www.youtube.com/embed/${allMovieData.videos.results.filter((video) => video.type === 'Trailer').at(0).key}`"
                                frameborder="0" class="trailer"></iframe>
                            <a target="_blank"
                                :href="`https://www.youtube.com/watch?v=${allMovieData.videos.results.filter((video) => video.type === 'Trailer').at(0).key}`">
                                <p>View On Youtube</p>
                            </a>
                        </div>
                        <div class="release-date">
                            <h3>Release Date</h3>
                            <h4>{{ allMovieData.release_date }}</h4>
                            <h3>Country</h3>
                            <h4>{{ allMovieData.production_countries.at(0).name }}</h4>
                        </div>
                        <div class="productionCompanies">
                            <h3>Production Companies</h3>
                            <ul>
                                <li>
                                    {{ allMovieData.production_companies.at(0).name }}
                                </li>
                                <li v-if="(allMovieData.production_companies.length > 1)">
                                    {{ allMovieData.production_companies.at(1).name }}
                                </li>
                                <li v-if="(allMovieData.production_companies.length > 2)">
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
                                <li v-if="(allMovieData.genres.length > 1)">
                                    {{ allMovieData.genres.at(1).name }}
                                </li>
                                <li v-if="(allMovieData.genres.length > 2)">
                                    {{ allMovieData.genres.at(2).name }}
                                </li>
                            </ul>
                        </div>
                        <!-- <button class="close-button" @click="$emit('close')">Close</button> -->
                    </div>
                </template>
            </Modal>
        </Suspense>
        <Footer></Footer>
    </div>
</template>

<style scoped>
.store-container {
    width: 100%;
    margin-bottom: 5rem;
}

.images {
    margin: 0 2% 0 2%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, auto);
    gap: 1rem;
    row-gap: 1rem;
}

.image-container {
    text-align: center;
    display: grid;
    grid-column: span 1;
    margin: auto;
}

.image-container:nth-child(-n+4) {
    padding-top: 1rem;
}

.image-container:nth-child(6) img {
    aspect-ratio: 2/3;
    width: 100%;
    height: 100%;
}

.moviePosters {
    max-width: 100%;
    max-height: 100%;
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
    margin: auto;
    width: 80%;
    height: auto;
    max-width: 200px;
    max-height: 300px;
}

.poster:hover {
    /* cursor: pointer;
    transform: scale(1.04);
    transition: all 0.2s; */
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
    padding-bottom: .5rem;

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

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>