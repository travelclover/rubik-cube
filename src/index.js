/*
 * @Description: js
 * @Author: travelclover(travelclover@163.com)
 * @Date: 2019-12-25 16:25:03
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import NubikCube from './NubikCube.js';
import './index.css';

let container;
let camera;
let renderer;
let scene;
let controls;

init();

function init() {
  container = document.querySelector("#container");

  createScene();
  createCamera();
  createLight();
  createRenderer();
  createControls();
  animate();

  new NubikCube(scene, camera, renderer);
}

// 创建场景
function createScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("skyblue");
}

// 创建灯光
function createLight() {
  const light = new THREE.AmbientLight(0xffffff, 8);
  scene.add(light);
}

// 创建渲染器
function createRenderer() {
  renderer = new THREE.WebGLRenderer({
    antialias: true, // 抗锯齿
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.physicallyCorrectLights = true; // 是否使用物理上正确的照明模式
  container.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

// 创建相机
function createCamera() {
  const fov = 35; // AKA Field of View
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1; // the near clipping plane
  const far = 100; // the far clipping plane
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(10, 10, 10);
}

// 创建控制器
function createControls() {
  controls = new OrbitControls(camera, container);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
