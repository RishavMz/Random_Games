import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 1000);
camera.position.z =2;
camera.position.y = -8;

const cameraController = new OrbitControls(camera, renderer.domElement);

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

const groundGeometry = new THREE.PlaneGeometry(700, 700, 100, 100);
const groundTexture = textureLoader.load('./texture/ground.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 200, 200 );
const groundMaterial = new THREE.MeshBasicMaterial({map: groundTexture});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(ground);

const skyGeometry = new THREE.SphereGeometry(300, 100, 100);
const skyTexture = textureLoader.load('./texture/sky.jpg');
const skyMaterial = new THREE.MeshBasicMaterial({map: skyTexture});
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
sky.material.side = THREE.BackSide;
scene.add(sky);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

function animate() {
  renderer.render(scene, camera);
  cameraController.update();
}