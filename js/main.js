import * as THREE from '../build/three.module.js';
import { GLTFLoader } from "../build/GLTFLoader.js";
import { OrbitControls } from "../build/OrbitControls.js";

var tw = window.innerWidth ;
var th = window.innerHeight ;
let loader = new GLTFLoader();
let model;
let mov=0;

const canvas = document.getElementById('canvas0');

canvas.width = tw * window.devicePixelRatio;
canvas.height = th * window.devicePixelRatio;

const context = canvas.getContext( '2d' );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

scene.fog = new THREE.Fog( 0x141414, 25, 50);
 scene.background = new THREE.Color( 0x141414 );

 renderer.outputEncoding = THREE.sRGBEncoding;
 renderer.setPixelRatio( window.devicePicelRatio );
 renderer.setSize( canvas.width , canvas.height );
 canvas.appendChild( renderer.domElement );

camera.position.set(5,2.5,2.5);
camera.lookAt(0,-1,0);

const punto0 = new THREE.PointLight( 0x2099FE, 3,  10 );
punto0.position.set( 2, 3, -2 );
punto0.lookAt( 0, 1, 0 );
scene.add( punto0 );

const punto1 = new THREE.PointLight( 0xE620FE, 3,  10 );
punto1.position.set( 2, 3, -2 );
punto1.lookAt( 0, 1, 0 );
scene.add( punto1 );

const punto2 = new THREE.PointLight( 0xFED220, 3,  10 );
punto2.position.set( 0, 9, 0 );
punto2.lookAt( 0, 1, 0 );
scene.add( punto2 );
/*
const pointLightHelper = new THREE.PointLightHelper( punto0, 1 ); scene.add( pointLightHelper );
const pointLightHelper1 = new THREE.PointLightHelper( punto1, 1 ); scene.add( pointLightHelper1 );
const pointLightHelper2 = new THREE.PointLightHelper( punto2, 1 ); scene.add( pointLightHelper2 );
*/
const plane = new THREE.Mesh(  new THREE.PlaneGeometry( 1000, 1000 ),  new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} ) );
plane.rotation.x = Math.PI * 90/180;
plane.position.y = -.01;
scene.add( plane );

let texturaImg = new THREE.TextureLoader().load('media/sombra.png');
const planeS = new THREE.Mesh(  new THREE.PlaneGeometry( 5, 5 ),  new THREE.MeshBasicMaterial( {transparent: true, map: texturaImg, side:THREE.DoubleSide }) );
planeS.rotation.x = Math.PI * 90/180;
scene.add( planeS );

loader.load("../models/model_2.glb", function(gltf){

 	model = gltf.scene;
 	model.scale.set(1,1,1);
 	model.position.set(0,0,0);

 	scene.add( model );

 	});


window.addEventListener("resize",redimencionar);
function redimencionar(){
  tw = window.innerWidth ;
  th = window.innerHeight ;

  canvas.width = tw * window.devicePixelRatio;
  canvas.height = th * window.devicePixelRatio;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( canvas.width , canvas.height );
  renderer.render(scene,camera);
}

function animate() {
  requestAnimationFrame( animate );

  set_pCamera();
  context.drawImage( renderer.domElement, 0, 0 );

  renderer.render( scene, camera );
};

animate();

function set_pCamera() {
  var ys = window.scrollY;
  var eV = 0,pV = 0;
  if ( window.innerWidth < 830 ){ pV=1.7; }else{ pV=1; }

  var newY = ys/100;

  mov+=0.02;
  console.log(newY)

  var calc = (newY/24)*(4*pV)

  camera.position.set(Math.cos(mov/6)*(1+calc*1.5),5+Math.cos(mov/3),Math.sin(mov/6)*(1+calc*1.5));

  punto0.position.set( Math.cos(mov)*5, 3.5, -Math.sin(mov)*5 );
  punto1.position.set( -Math.cos(mov)*5, 3.5, Math.sin(mov)*5 );
  //camera.position.set(5,5,5);
  camera.lookAt(0,1,0);
}
