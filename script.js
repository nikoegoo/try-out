// Scene + Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 5;

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// Load Robot Model (GLB)
const loader = new THREE.GLTFLoader();
let robot;
loader.load('https://cdn.jsdelivr.net/gh/niko-lukac/tiny-robot-3d/robot.glb', function(gltf) {
  robot = gltf.scene;
  robot.scale.set(1,1,1);
  scene.add(robot);
}, undefined, function(error) {
  console.error(error);
});

// Mouse tracking
const mouse = { x: 0, y: 0 };
document.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  
  if(robot){
    // Robot head follows mouse
    robot.rotation.y = mouse.x * 0.5; // horizontal rotation
    robot.rotation.x = mouse.y * 0.2; // vertical rotation
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
