<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js'

// container = document.getElementById('model-container');
// document.body.appendChild(container)
const get3dScene = () => {
    const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
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
                <source src="../assets/marvel-opening-theme-ytmp4converter.com-en_Trim.mp4" type="video/mp4" />
            </video>
        </div>
        <h1>For All Your Movie Needs!</h1>
    </div>
    <!-- <canvas></canvas> -->
    <div id="model-container">

    </div>
</template>

<style scoped>
.hero-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 85vh;
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
    opacity: 90%;
    object-fit: cover;
    position: absolute;
}

.video-container video {
    width: 100vw;
    height: 100%;
    /* max-height: 80vw; */
    object-fit: cover;
}

/* #model-container {
    width: 100%;
    height: 200px;
    margin: 100px;
    padding: 0px;
    position: static;
} */

h1 {
    /* display: flex; */
    position: absolute;
    font-size: 350%;
    /* text-align: center; */
    /* line-height: 25rem; */
    /* margin-left: auto; */
    /* margin-right: auto; */
    background-color: transparent;
    opacity: 0%;
    animation: 3s linear 4s textFade;
    animation-fill-mode: forwards;
}

@keyframes textFade {
    from {
        opacity: 0%;
    }

    to {
        opacity: 100%;
    }
}

img {
    width: 100%;
    height: 100%;
}
</style>