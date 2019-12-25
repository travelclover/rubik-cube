/*
 * @Description: js
 * @Author: dengdong(dengd@esrichina.com.cn)
 * @Date: 2019-12-25 16:25:03
 */

let container;
let camera;
let renderer;
let scene;
let controls;
let colors = [0x4bff4b, 0xff0000, 0xffffff, 0xff6a00, 0x2196f3, 0xffeb3b];

init();

function init() {
  container = document.querySelector("#container");

  createScene();
  createCamera();
  createLight();
  createCube();
  createRenderer();
  createControls();
  animate();
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

// 创建立方体
function createCube() {
  const materials = [];
  const geometries = [];

  for (let i = 0; i < colors.length; i++) {
    materials.push(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors[i]),
      })
    );
  }

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let m = -1; m < 2; m++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        geometries.push(geometry);
        const mesh = new THREE.Mesh(geometry, materials);
        mesh.position.set(m, i, j);
        border = new THREE.BoxHelper(mesh, 0xf3f3f3); // 设置边框
        scene.add(border);
        scene.add(mesh);
      }
    }
  }
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
  controls = new THREE.OrbitControls(camera, container);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
