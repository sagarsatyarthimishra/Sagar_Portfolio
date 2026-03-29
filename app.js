const canvas = document.getElementById('bg');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(0, 0, 30);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 10);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambient);

// Cloud group
const cloud = new THREE.Group();
for (let i = 0; i < 25; i++) {
  const geometry = new THREE.SphereGeometry(THREE.MathUtils.randFloat(1.2, 2.8), 16, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0xd7f1ff, transparent: true, opacity: 0.85 });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(THREE.MathUtils.randFloatSpread(18), THREE.MathUtils.randFloatSpread(6), THREE.MathUtils.randFloatSpread(12));
  const scale = THREE.MathUtils.randFloat(0.8, 1.8);
  sphere.scale.setScalar(scale);
  cloud.add(sphere);
}
cloud.position.set(-8, 4, -8);
scene.add(cloud);

// Coding matrix (glowing particles)
const pointsGeom = new THREE.BufferGeometry();
const count = 420;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  positions[i * 3 + 0] = THREE.MathUtils.randFloatSpread(60);
  positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(40);
  positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(80);

  colors[i * 3 + 0] = 0.35 + Math.random() * 0.65;
  colors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
  colors[i * 3 + 2] = 1.0;
}
pointsGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
pointsGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const pointsMat = new THREE.PointsMaterial({ size: 0.25, vertexColors: true, transparent: true, opacity: 0.85 });
const points = new THREE.Points(pointsGeom, pointsMat);
scene.add(points);

// Simple car model
const car = new THREE.Group();
const bodyGeo = new THREE.BoxGeometry(6, 2.2, 2.2);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x63b8ff, metalness: 0.6, roughness: 0.2 });
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.position.set(0, 0, 0);
car.add(body);

const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.8, 16);
const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1f2c3c, metalness: 0.8, roughness: 0.2 });
for (let x of [-2.2, 2.2]) {
  for (let z of [-1, 1]) {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, -1.1, z);
    car.add(wheel);
  }
}
car.position.set(-12, -3, 0);
scene.add(car);

// React to resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', onResize);

const animate = (time) => {
  const t = time * 0.0006;
  cloud.rotation.y = 0.15 * t;
  cloud.position.x = -8 + Math.sin(t * 0.8) * 3.2;
  cloud.position.y = 4 + Math.sin(t * 0.6) * 1.2;

  points.rotation.y = t * 0.07;
  points.position.y = Math.sin(t * 0.6) * 1.8;

  car.position.x = -12 + (Math.sin(t * 1.2) + 1) * 16;
  car.rotation.y = Math.sin(t * 1.2) * 0.15;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
requestAnimationFrame(animate);

// GSAP scroll animations
gsap.registerPlugin(ScrollTrigger);
const panels = document.querySelectorAll('.panel, .hero-content');
panels.forEach((panel) => {
  gsap.from(panel, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: panel,
      start: 'top 80%',
      end: 'bottom 50%',
      toggleActions: 'play none none reverse',
    },
  });
});

const navLinks = document.querySelectorAll('nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scroll({ top: target.offsetTop - 64, behavior: 'smooth' });
    }
  });
});
