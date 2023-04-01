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

class leaves {
  constructor(posx, posy) {
    const leavesGeometry = new THREE.SphereGeometry(1, 10, 10);
    const leavesTexture = textureLoader.load('./texture/leaves.jpg');
    const leavesMaterial = new THREE.MeshBasicMaterial({map: leavesTexture});
    this.leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    this.leaves.translateZ(2);
    this.leaves.translateY(posy);
    this.leaves.translateX(posx);
  }
}

class Tree {
  constructor(posx, posy) {
    this.object = new THREE.Group();
    this.addElements();
    this.object.translateX(posx);
    this.object.translateY(posy);
  }

  addElements() {
    const barkGeometry = new THREE.CylinderGeometry(0.2, 0.2 , 2, 10, 10);
    barkGeometry.rotateX(90);
    const barkTexture = textureLoader.load('./texture/bark.jpg');
    const barkMaterial = new THREE.MeshBasicMaterial({map: barkTexture});
    const bark = new THREE.Mesh(barkGeometry, barkMaterial);
    bark.translateZ(1);
    this.object.add(bark);
    const leaf1 = new leaves(0.5, 0.5);
    const leaf2 = new leaves(0.5, -0.5);
    const leaf3 = new leaves(-0.5, 0.5);
    const leaf4 = new leaves(-0.5, -0.5);
    this.object.add(leaf1.leaves)
    this.object.add(leaf2.leaves)
    this.object.add(leaf3.leaves)
    this.object.add(leaf4.leaves)
  }
}


const trees = [];
for(let i=0; i<200; i++) {
  trees.push(new Tree(Math.random()*200 - 100, Math.random()*200 - 100));
  scene.add(trees[i].object);
}

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

function animate() {
  renderer.render(scene, camera);
  cameraController.update();
}