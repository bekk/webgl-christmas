import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { addResizeListener } from './util.js'; 
import fragmentShaderCode from './fragmentshader.glsl';
import vertexShaderCode from './vertexshader.glsl';

let timeStart;
let timeDelta;
let time;

let camera;
let renderer;
let scene;
let mesh;

let animationTime = 1.0;

const uniforms = {
    time: { value: 0.0 },
    animationTime: { value: 1.0 },
};

function init(domNodeId) {
    timeStart = new Date().getTime();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x1d1d1d);
    renderer.setSize(window.innerWidth, window.innerHeight, true);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    const aspect = renderer.getContext().drawingBufferWidth / renderer.getContext().drawingBufferHeight;
    
    camera = new THREE.PerspectiveCamera(60, aspect);
    camera.position.set(4, 1, 2)
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
    const geometry = new THREE.SphereGeometry(1, 128, 256);

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: vertexShaderCode,
        fragmentShader: fragmentShaderCode
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

function animate() {
    requestAnimationFrame(animate);

    const newTime = (new Date().getTime() - timeStart) / 1000;
    timeDelta = newTime - time;
    time = newTime;

    if (animationTime < 1.0) {
        const animationSpeed = 0.8;
        animationTime += timeDelta * animationSpeed;
    }
    
    uniforms.time.value = time;
    uniforms.animationTime.value = animationTime;

    renderer.render(scene, camera);
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