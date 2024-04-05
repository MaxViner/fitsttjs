const scene = new THREE.Scene();
const backgroundTexture = new THREE.TextureLoader().load('./bg.jpg');
scene.background = backgroundTexture;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const rainTexture = new THREE.TextureLoader().load('./pup.svg');
const rainGeometry = new THREE.Geometry();
const rainMaterial = new THREE.PointsMaterial({
  size: 10,
  map: rainTexture,
  blending: THREE.AdditiveBlending,
  depthTest: false,
  transparent: true,
  color: 0xffffff,
});
const speed = 0.5;
for (let i = 0; i < 5000; i++) {
  const rainDrop = new THREE.Vector3(
    Math.random() * 2000 - 1000,
    Math.random() * 2000 - 1000,
    Math.random() * 2000 - 1000
  );
  rainGeometry.vertices.push(rainDrop);
}
const rain = new THREE.Points(rainGeometry, rainMaterial);
scene.add(rain);
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  // Добавляем эффект параллакса
  const scrollY = window.scrollY || window.pageYOffset;
  camera.position.y = -scrollY * 0.1; // Изменяем позицию камеры в зависимости от скролла

  rain.geometry.vertices.forEach(v => {
    v.y -= speed;
    v.z += Math.random() * 0.2 - 0.1;
    v.x -= speed / 4;
    if (v.y < -1000) {
      v.y = 1000;
    }
  });

  rain.geometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});