import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { addResizeListener, easeOutCubic } from './util.js'; 

let timeStart;
let timeDelta;
let time;

let camera;
let renderer;
let scene;
let mesh;

let animationTime = 1.0;

function init(domNodeId) {
    timeStart = new Date().getTime();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x1d1d1d);
    renderer.setSize(window.innerWidth, window.innerHeight, true);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    const aspect = renderer.getContext().drawingBufferWidth / renderer.getContext().drawingBufferHeight;
    
    camera = new THREE.PerspectiveCamera(60, aspect);
    camera.position.set(2, 2, 2)
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();

    document.getElementById(domNodeId).appendChild(renderer.domElement);

    const orbitControls = new OrbitControls(camera, renderer.domElement);

    scene = new THREE.Scene();

    makeContents();

    addInputListeners();

    addResizeListener(camera, renderer);

    animate();
}

function makeContents() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshStandardMaterial({ color: 0xd11d1d });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light = new THREE.DirectionalLight(0xffffff, 3.0);
    light.position.set(3, 5, 2)
    scene.add(light);
}

function animate() {
    requestAnimationFrame(animate);

    updateTime();
    moveStuffAround();

    renderer.render(scene, camera);
}

function updateTime() {
    const newTime = (new Date().getTime() - timeStart) / 1000;
    timeDelta = newTime - time;
    time = newTime;

    if (animationTime < 1.0) {
        const animationSpeed = 0.8;
        animationTime += timeDelta * animationSpeed;
    }
}

function moveStuffAround() {
    const maxFrequency = 60.0;
    const maxAmplitude = 0.3;
    const shakeFrequency = (1 - animationTime) * maxFrequency;
    const shakeAmplitude = (1 - animationTime) * maxAmplitude;

    const rotation = Math.sin(animationTime * shakeFrequency) * shakeAmplitude;
    
    mesh.rotation.set(0, rotation, rotation);
}

function addInputListeners() {
    function click() {
        animationTime = 0;
    }

    document.addEventListener("click", click);
    document.addEventListener("touchstart", click);
    document.addEventListener("keydown", click);
}

init("container");