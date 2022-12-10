<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js'
import { useRouter } from "vue-router";
const router = useRouter();

// container = document.getElementById('model-container');
// document.body.appendChild(container)
const get3dScene = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0xffffff, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // this.container = document.getElementById("model-container");
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0xdddddd)

  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.rotation.y = 45 / 180 * Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;
  camera.aspect = 0.5;

  const hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 100)
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight)
  const light = new THREE.PointLight(0xc4c4c4, 10);
  light.position.set(0, 300, 500);
  scene.add(light);
  const light2 = new THREE.PointLight(0xc4c4c4, 10);
  light2.position.set(500, 100, 0);
  scene.add(light2);
  const light3 = new THREE.PointLight(0xc4c4c4, 10);
  light3.position.set(0, 100, -500);
  scene.add(light3);
  const light4 = new THREE.PointLight(0xc4c4c4, 10);
  light4.position.set(-500, 300, 500);
  scene.add(light4);

  // const renderer = new THREE.WebGLRenderer({ antialias: true });
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  loader.load('/src/assets/scene.gltf', function (gltf) {
    let car = gltf.scene.children[0];
    car.scale.set(0.1, 0.1, 0.1);
    scene.add(gltf.scene);
    animate();
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
  }
}

// get3dScene()
</script>

<template>
  <div class="hero-container">
    <div class="video-container">
      <div id="overlay">
      </div>
      <video autoplay muted loop>
        <source src="../assets/marvel-opening-theme.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="text-overlay">
      <h2>MMDB&#8482 Presents</h2>
      <h1>MMDB Store</h1>
      <h6>For All Your Movie Needs</h6>
      <button id="loginButton" @click="router.push('/login')">Login</button>
    </div>
  </div>
</template>

<style scoped>
.hero-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 86vh;
}

.video-container {
  height: 100%;
  width: 100%;
  position: relative;
}

#overlay {
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 95%;
  object-fit: cover;
  position: absolute;
}

.video-container video {
  width: 100vw;
  height: 100%;
  object-fit: cover;
}

.text-overlay {
  position: absolute;
  font-size: 4vw;
  background-color: transparent;
}

.text-overlay h1{
  font-size: 360%;
  text-decoration: overline underline;
  background-color: transparent;
  line-height: 150%;
  opacity: 0%;
  animation: 2.5s linear 3.5s textFade forwards;
}.text-overlay h2{
  background-color: transparent;
  line-height: 150%;
  opacity: 0%;
  animation: 2s linear 1.5s textFade forwards;
}.text-overlay h6{
  font-size: 150%;
  text-decoration: none;
  background-color: transparent;
  line-height: 150%;
  opacity: 0%;
  animation: 2s linear 6s textFade forwards;
}.text-overlay button{
  font-size: 170%;
  background-color: transparent;
  border: solid 3px darkgoldenrod;
  line-height: 150%;
  opacity: 0%;
  animation: 2s linear 6s textFade forwards;
  margin-top: 2%;
  padding: 0px 5% 0px 5%;
  border-radius: 0.05rem;
}.text-overlay button:hover{
  font-size: 170%;
  background-color: rgba(184, 135, 11, 0.2);
  cursor: pointer;
}


@keyframes textFade {
  from {
    opacity: 0%;
    transform: scale(0.90);
  }

  to {
    opacity: 100%;
    transform: scale(1);
  }
}

img {
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 500px){
  .text-overlay{
    font-size: 20px;
  }
}
</style>