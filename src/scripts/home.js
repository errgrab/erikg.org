import * as THREE from "three";

const container = document.querySelector("#home-canvas");
if (!container) throw new Error("Home canvas container not found");

const pixelScale = 4;
let width = Math.max(1, Math.floor(window.innerWidth / pixelScale));
let height = Math.max(1, Math.floor(window.innerHeight / pixelScale));

const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
renderer.setSize(width, height, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
camera.position.set(0, 3, 12);

const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 150, flatShading: true });
const knotGeometry = new THREE.TorusKnotGeometry(2.5, 0.7, 128, 16);
const knot = new THREE.Mesh(knotGeometry, material);
knot.castShadow = true;
knot.receiveShadow = true;
scene.add(knot);

const floaterGeometries = [
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
    new THREE.IcosahedronGeometry(1.2, 0),
    new THREE.TetrahedronGeometry(1.5, 0)
];
const floaters = [];
for (let index = 0; index < 8; index += 1) {
    const mesh = new THREE.Mesh(floaterGeometries[index % floaterGeometries.length], material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 2
    );
    scene.add(mesh);
    floaters.push({
        mesh,
        speedX: (Math.random() - 0.5) * 0.04,
        speedY: (Math.random() - 0.5) * 0.04
    });
}

scene.add(new THREE.AmbientLight(0xffffff, 0.15));
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(10, 15, 10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(512, 512);
scene.add(directionalLight);
const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
fillLight.position.set(-10, -5, -10);
scene.add(fillLight);

const bayerData = new Uint8Array([
    0, 32, 8, 40, 2, 34, 10, 42,
    48, 16, 56, 24, 50, 18, 58, 26,
    12, 44, 4, 36, 14, 46, 6, 38,
    60, 28, 52, 20, 62, 30, 54, 22,
    3, 35, 11, 43, 1, 33, 9, 41,
    51, 19, 59, 27, 49, 17, 57, 25,
    15, 47, 7, 39, 13, 45, 5, 37,
    63, 31, 55, 23, 61, 29, 53, 21
].map((value) => value * 4));
const bayerTexture = new THREE.DataTexture(bayerData, 8, 8, THREE.RedFormat);
bayerTexture.minFilter = THREE.NearestFilter;
bayerTexture.magFilter = THREE.NearestFilter;
bayerTexture.wrapS = THREE.RepeatWrapping;
bayerTexture.wrapT = THREE.RepeatWrapping;
bayerTexture.needsUpdate = true;

const renderTarget = new THREE.WebGLRenderTarget(width, height, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat
});
const postScene = new THREE.Scene();
const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const postMaterial = new THREE.ShaderMaterial({
    uniforms: {
        tDiffuse: { value: renderTarget.texture },
        tBayer: { value: bayerTexture },
        bayerSize: { value: 8 }
    },
    vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }",
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform sampler2D tBayer;
        uniform float bayerSize;
        varying vec2 vUv;
        void main() {
            vec4 texColor = texture2D(tDiffuse, vUv);
            float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            vec2 bayerCoord = gl_FragCoord.xy / bayerSize;
            float bayerValue = texture2D(tBayer, bayerCoord).r;
            gl_FragColor = vec4(vec3(step(bayerValue, luminance)), 1.0);
        }
    `
});
const postQuadGeometry = new THREE.PlaneGeometry(2, 2);
postScene.add(new THREE.Mesh(postQuadGeometry, postMaterial));

let mouseX = 0;
let mouseY = 0;
function updatePointer(clientX, clientY) {
    mouseX = (clientX / window.innerWidth - 0.5) * 2;
    mouseY = (clientY / window.innerHeight - 0.5) * 2;
}
function onMouseMove(event) {
    updatePointer(event.clientX, event.clientY);
}
function onTouchMove(event) {
    const touch = event.touches[0];
    if (touch) updatePointer(touch.clientX, touch.clientY);
}
function onResize() {
    width = Math.max(1, Math.floor(window.innerWidth / pixelScale));
    height = Math.max(1, Math.floor(window.innerHeight / pixelScale));
    renderer.setSize(width, height, false);
    renderTarget.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove, { passive: true });
window.addEventListener("resize", onResize);

let animationFrame;
let time = 0;
function animate() {
    animationFrame = requestAnimationFrame(animate);
    time += 0.01;
    knot.rotation.x = time * 0.5;
    knot.rotation.y = time * 0.8;
    floaters.forEach(({ mesh, speedX, speedY }, index) => {
        mesh.rotation.x += speedX;
        mesh.rotation.y += speedY;
        mesh.position.y += Math.sin(time * 2 + index) * 0.02;
    });
    camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 4 + 3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    renderer.render(postScene, postCamera);
}
animate();
