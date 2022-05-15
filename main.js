import './style.css'
import * as THREE from 'three';
import * as THREEANIMATOR from 'three-plain-animator';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene,camera);

//Torus
const geometry = new THREE.TorusGeometry(10,1.5,64,10);
const material = new THREE.MeshStandardMaterial( {color: 0x00FF00});
const torus = new THREE.Mesh(geometry, material);
torus.position.setX(8);
torus.position.setZ(-15);
scene.add(torus);

//PointLight
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);





function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 20, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}
let stars = new Array(300);
stars.fill().forEach(addStar);

const spaceBG = new THREE.TextureLoader().load('landscape.jpg');
scene.background = spaceBG;



//Profile Picture
const facePic = new THREE.TextureLoader().load('IMG_0889.jpg');
const jax = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: facePic})
);
jax.position.set(1,0,35);
scene.add(jax);
jax.position.z = -10;
jax.position.x = 5;


//Uranus
const uranusTexture = new THREE.TextureLoader().load('uranus.jpg');
const bumpy = new THREE.TextureLoader().load('bumpy.jpg');
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
    normalMap: bumpy,
  })
);
scene.add (uranus);
uranus.position.z = 30;
uranus.position.setX(-5);



// //Mars
const marsTexture = new THREE.TextureLoader().load('mars.jpg');
const bumpy_mars = new THREE.TextureLoader().load('mars_texture.jpg');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(6,320,320),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: bumpy_mars,
  })
);
scene.add (mars);
mars.position.z = 45;
mars.position.setX(-30);


//Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  uranus.rotation.x += 0.05;
  uranus.rotation.y += 0.075;
  uranus.rotation.z += 0.05;

  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;

  jax.rotation.y += 0.01;
  jax.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


// Animation Torus Function
function animateTorus(){
  requestAnimationFrame(animateTorus);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.0021;
  renderer.render(scene, camera);
}

//Animate Profile Picture Cube
function animateJax(){
  requestAnimationFrame(animateJax);

  // jax.rotation.x += 0.000001;
  jax.rotation.y += 0.001;
  // jax.rotation.z += 0.000001;
  renderer.render(scene, camera);
}

//Animate Uranus
function animateUranus(){
  requestAnimationFrame(animateUranus);

  uranus.rotation.x += 0.0001;
  uranus.rotation.y += 0.005;
  uranus.rotation.z += 0.001;
  renderer.render(scene, camera);
}

//Animate Mars
function animateMars(){
  requestAnimationFrame(animateMars);

  mars.rotation.x += 0.0011;
  mars.rotation.y += 0.00065;
  mars.rotation.z += 0.011;
  renderer.render(scene, camera);
}


animateTorus();
animateUranus();
animateJax();
animateMars();
