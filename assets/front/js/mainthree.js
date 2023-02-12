THREE.Cache.enabled = true;

let container, clock;
let camera, cameraTarget, scene, renderer;
let group, textMesh1, textMesh2, textGeo, materials;
let firstLetter = true;
let text = "WELCOME",
  bevelEnabled = true,
  font = undefined,
  fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
  fontWeight = "bold"; // normal bold

const height = 50,
  size = 100,
  hover = 30,
  curveSegments = 2,
  bevelThickness = 5,
  bevelSize = 1.5;

const weightMap = {
  regular: 0,
  bold: 1,
};

let targetRotation = 0;
let targetRotationOnPointerDown = 0;

let pointerX = 0;
let pointerXOnPointerDown = 0;

let windowHalfX = window.innerWidth / 2;

init();
animate();

function init() {
  container = document.getElementById("text3d");
  clock = new THREE.Clock();

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1500
  );
  camera.position.set(0, 400, 700);
  cameraTarget = new THREE.Vector3(0, 150, 0);

  // SCENE
  scene = new THREE.Scene();

  // LIGHTS
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  let random = Math.random();
  pointLight.color.setHSL(0.06095909470251892, 1, 0.5);

  pointLight.position.set(0, 100, 90);
  scene.add(pointLight);

  materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
  ];

  group = new THREE.Group();
  group.position.y = 100;

  scene.add(group);

  const loader = new FontLoader();
  loader.load(
    "assets/front/font/JosefinSans-Regular.json",
    function (response) {
      font = response;
      createText();
    }
  );

  let monkey;
  let gltfL = new GLTFLoader().load(
    "assets/front/model/monkeyWithTexture.gltf",
    function (result) {
      console.log("result === ", result);
      monkey = result.scene.children[0];
      monkey.castShadow = true;
      scene.add(monkey);
    }
  );

  // RENDERER
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(500, 250);
  //   renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
  container.appendChild(renderer.domElement);

  // EVENTS
  container.style.touchAction = "none";
  container.addEventListener("pointerdown", onPointerDown);
  //   container.addEventListener("pointerdown", onPointerDown);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function createText() {
  textGeo = new TextGeometry(text, {
    font: font,
    size: size,
    height: height,
    curveSegments: curveSegments,
    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelEnabled: bevelEnabled,
  });

  textGeo.computeBoundingBox();

  const centerOffset =
    -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

  textMesh1 = new THREE.Mesh(textGeo, materials);

  textMesh1.position.x = centerOffset;
  textMesh1.position.y = hover;
  textMesh1.position.z = 0;

  textMesh1.rotation.x = 0;
  textMesh1.rotation.y = Math.PI * 2;

  group.add(textMesh1);
}

function onPointerDown(event) {
  if (event.isPrimary === false) return;

  pointerXOnPointerDown = event.clientX - windowHalfX;
  targetRotationOnPointerDown = targetRotation;

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  pointerX = event.clientX - windowHalfX;

  targetRotation =
    targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;
}

function onPointerUp() {
  if (event.isPrimary === false) return;

  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
}

function animate() {
  //  requestAnimationFrame(animate);
  //   group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
  //   camera.lookAt(cameraTarget);
  //   renderer.clear();
  //   renderer.render(scene, camera);

  requestAnimationFrame(animate);
  camera.lookAt(cameraTarget);
  const time = clock.getElapsedTime();
  group.rotation.y = Math.cos(time) * 0.2;
  renderer.clear();
  renderer.render(scene, camera);
}
