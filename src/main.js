import * as THREE from './vendor/three.module.js';

const host = document.querySelector('#scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(31, host.clientWidth / host.clientHeight, 0.1, 100);
camera.position.set(9.8, 6.35, 12.4);
camera.lookAt(.25, 2.3, .15);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xf3eee4, 1);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(host.clientWidth, host.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
host.appendChild(renderer.domElement);

const characterHost = document.createElement('div');
characterHost.id = 'character-scene';
characterHost.setAttribute('aria-hidden', 'true');
document.body.appendChild(characterHost);
const characterRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
characterRenderer.setClearColor(0x000000, 0);
characterRenderer.setPixelRatio(Math.min(devicePixelRatio, 2));
characterRenderer.setSize(host.clientWidth, host.clientHeight);
characterRenderer.outputColorSpace = THREE.SRGBColorSpace;
characterHost.appendChild(characterRenderer.domElement);

const group = new THREE.Group();
group.rotation.y = -0.18;
group.scale.set(1.18, 1, 1.18);
scene.add(group);

const mat = (color, roughness = .72) => new THREE.MeshStandardMaterial({ color, roughness });
const add = (geometry, material, position, rotation = [0, 0, 0], parent = group) => {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
};
const box = (size, color, pos, rot, parent) => add(new THREE.BoxGeometry(...size), mat(color), pos, rot, parent);
const cylinder = (r, h, color, pos, rot, parent) => add(new THREE.CylinderGeometry(r, r, h, 28), mat(color), pos, rot, parent);
const limbBetween = (start, end, radius, color, parent) => {
  const from = new THREE.Vector3(...start);
  const direction = new THREE.Vector3(...end).sub(from);
  const limb = add(
    new THREE.CylinderGeometry(radius, radius, direction.length(), 24),
    mat(color),
    from.clone().add(new THREE.Vector3(...end)).multiplyScalar(.5).toArray(),
    [0,0,0],
    parent
  );
  limb.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), direction.normalize());
  return limb;
};
const updateLimb = (limb, start, end, baseLength) => {
  const from = new THREE.Vector3(...start);
  const direction = new THREE.Vector3(...end).sub(from);
  limb.position.copy(from.clone().add(new THREE.Vector3(...end)).multiplyScalar(.5));
  limb.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), direction.clone().normalize());
  limb.scale.y = direction.length() / baseLength;
};

// Rug and workspace
box([6.6, .18, 4.9], 0xd59b3c, [0, .05, .2]);
box([5.7, .05, 4.05], 0xf3dd78, [0, .16, .2]);
box([4.8, .04, 3.15], 0xe7b64d, [0, .2, .2]);
box([5.6, .28, 2.25], 0xf4f0e6, [.15, 1.8, -.2]);
[-2.35, 2.35].forEach(x => [-.95, .65].forEach(z => cylinder(.13, 1.75, 0xa7794f, [x, .87, z])));

// Monitors
const monitor = (x, y, z, rotate, accent, screenType) => {
  const g = new THREE.Group();
  g.rotation.y = rotate;
  g.position.set(x, y, z);
  group.add(g);
  box([2.55, 1.72, .2], 0x30353b, [0, .82, 0], [0, 0, 0], g);
  box([2.28, 1.44, .05], 0x111a20, [0, .83, .115], [0, 0, 0], g);
  if (screenType === 'dashboard') {
    // KPI tiles, trend line, and bar chart
    [-.62,-.18,.26,.7].forEach((tileX,i) => box([.32,.22,.025],[0x4c7995,0xe3a846,0x6ca36d,0xd66c5d][i],[tileX,1.17,.145],[0,0,0],g));
    box([.045,.34,.025],0x6ca36d,[-.62,.63,.15],[0,0,0],g);
    box([.045,.55,.025],0x5e91ad,[-.4,.735,.15],[0,0,0],g);
    box([.045,.76,.025],0xe3a846,[-.18,.84,.15],[0,0,0],g);
    box([.78,.035,.025],accent,[.48,.78,.15],[0,0,.28],g);
    box([.62,.035,.025],0xe3b453,[.53,.57,.15],[0,0,-.18],g);
    box([.9,.025,.025],0x8999a2,[.35,.38,.15],[0,0,0],g);
  } else {
    // CLI terminal: prompt blocks, commands, output, and a blinking cursor
    [-.92,-.76,-.6,-.44,-.28,-.12,.04,.2,.36].forEach((lineY,i) => {
      box([.1,.035,.025], i%3===0 ? 0x77d89c : 0x72a8c4, [-.94,1.16+lineY,.155], [0,0,0], g);
      box([1.3-(i%4)*.16,.035,.025], i%3===0 ? 0xe3b453 : 0xc7d0d4, [-.12,1.16+lineY,.155], [0,0,0], g);
    });
    box([.08,.16,.026],accent,[.7,.25,.16],[0,0,0],g);
  }
  cylinder(.09, .65, 0x777b7d, [0, -.22, 0], [0,0,0], g);
  box([.9,.08,.55], 0x696d6e, [0,-.54,.05], [0,0,0], g);
};
monitor(-1.28, 2.02, -.53, .1, 0x54a7c7, 'dashboard');
monitor(1.45, 1.98, -.48, -.08, 0xe47c62, 'cli');

// Chair and seated character
box([1.65, .22, 1.25], 0xe8e4da, [.15, 1.05, .75]);
box([1.45, 1.28, .24], 0xeeeae0, [.15, 1.46, 1.28], [-.1,0,0]);
cylinder(.13, 1.35, 0x747576, [.15,.55,1.25]);
const character = new THREE.Group();
group.add(character);
const torso = add(new THREE.SphereGeometry(.52, 28, 20), mat(0x313236), [.05,1.88,1.02], [0,0,0], character);
torso.scale.set(.72,1.22,.58);
const hair = add(new THREE.SphereGeometry(.62, 32, 24), mat(0x7a4a2d), [.05, 2.78, .72], [0,0,0], character);
const face = add(new THREE.SphereGeometry(.49, 32, 24, 0, Math.PI*2, 0, Math.PI/1.65), mat(0xd19570), [.08, 2.7, .48], [0,0,0], character);
add(new THREE.SphereGeometry(.045, 16, 12), mat(0x24231f), [-.1, 2.78, -.04], [0,0,0], character);
add(new THREE.SphereGeometry(.045, 16, 12), mat(0x24231f), [.23, 2.78, -.04], [0,0,0], character);
add(new THREE.SphereGeometry(.055, 16, 12), mat(0xb86f5c), [.065, 2.58, -.06], [0,0,0], character);
// bun
const bun = add(new THREE.SphereGeometry(.2, 24, 18), mat(0x68402a), [-.18,3.28,.72], [0,0,0], character);
// arms to keyboard
const leftShoulder = [-.28,2.12,.9];
const rightShoulder = [.38,2.12,.9];
const leftHandBase = [.25,2.02,.08];
const rightHandBase = [.95,2.02,.08];
const leftArm = limbBetween(leftShoulder,leftHandBase,.13,0xd19570,character);
const rightArm = limbBetween(rightShoulder,rightHandBase,.13,0xd19570,character);
const leftHand = add(new THREE.SphereGeometry(.16,20,16),mat(0xd19570),leftHandBase,[0,0,0],character);
const rightHand = add(new THREE.SphereGeometry(.16,20,16),mat(0xd19570),rightHandBase,[0,0,0],character);
const leftArmLength = new THREE.Vector3(...leftHandBase).distanceTo(new THREE.Vector3(...leftShoulder));
const rightArmLength = new THREE.Vector3(...rightHandBase).distanceTo(new THREE.Vector3(...rightShoulder));
box([1.5,.08,.54], 0x555b61, [.6,1.94,.18]);
for(let kx=0;kx<8;kx++) for(let ky=0;ky<3;ky++) box([.11,.018,.06],0xe9e5dc,[.05+kx*.16,1.99,.05+ky*.12]);
// legs and shoes
const leftLeg = cylinder(.18, 1.35, 0x252525, [-.45,.62,.82], [1.12,0,.12], character);
const rightLeg = cylinder(.18, 1.35, 0x252525, [.55,.62,.82], [1.12,0,-.12], character);
const leftShoe = box([.48,.32,.78], 0x303034, [-.72,.2,1.18], [0,.08,0], character);
const rightShoe = box([.48,.32,.78], 0x303034, [.86,.2,1.18], [0,-.08,0], character);
const leftSock = cylinder(.22,.28,0xf4f0e8,[-.72,.42,.98],[0,0,.08],character);
const rightSock = cylinder(.22,.28,0xf4f0e8,[.86,.42,.98],[0,0,-.08],character);
character.traverse((object) => object.layers.set(1));

// Desk props from the reference: pencil cup, penguin, keyboard cube, speaker
cylinder(.22,.62,0xd9c4aa,[-2.05,2.18,-.55],[0,0,0]);
cylinder(.04,.82,0x65b6cb,[-2.14,2.65,-.55],[0,0,.18]);
cylinder(.04,.82,0xe45d63,[-1.98,2.65,-.55],[0,0,-.18]);
const penguin = new THREE.Group();
penguin.position.set(-2.72,2.05,-.52);
group.add(penguin);
const penguinBody=add(new THREE.SphereGeometry(.25,20,16),mat(0x20242a),[0,.25,0],[0,0,0],penguin);
penguinBody.scale.y=1.3;
add(new THREE.SphereGeometry(.18,20,16),mat(0xf4eee2),[0,.23,.16],[0,0,0],penguin);
add(new THREE.ConeGeometry(.06,.15,12),mat(0xe5a23b),[0,.22,.34],[Math.PI/2,0,0],penguin);
box([.42,.42,.42],0x75a8d5,[1.95,2.22,-.55],[0,.25,0]);
for(let gx=0;gx<3;gx++) for(let gy=0;gy<3;gy++) box([.025,.3,.015],0xf4f0e6,[1.79+gx*.12,2.22,-.765+gy*.015],[0,0,0]);
box([.52,.62,.3],0xe3a528,[2.72,2.18,-.45],[0,-.2,0]);
add(new THREE.CylinderGeometry(.17,.17,.04,24),mat(0x333844),[2.72,2.18,-.27],[Math.PI/2,0,0]);

// Floor bookshelf to the left of the workstation
const bookshelf = new THREE.Group();
bookshelf.position.set(-3.35,.15,.7);
group.add(bookshelf);
box([.16,3.25,.72],0xb78652,[-.78,1.62,0],[0,0,0],bookshelf);
box([.16,3.25,.72],0xb78652,[.78,1.62,0],[0,0,0],bookshelf);
[.08,1.08,2.08,3.08].forEach(y=>box([1.72,.14,.78],0xd1a36c,[0,y,0],[0,0,0],bookshelf));
[
  [-.48,.58,.52,0x4f6d8c],[-.2,.53,.62,0xe5a13f],[.1,.56,.56,0x6e936a],
  [-.42,1.56,.72,0xd76955],[-.08,1.55,.68,0xe5bd55],[.28,1.52,.6,0x557a94],
  [-.38,2.56,.7,0x789f64],[-.04,2.52,.62,0xe39345],[.3,2.55,.66,0x6a75a4]
].forEach(([x,y,h,color])=>box([.24,h,.55],color,[x,y,0],[0,0,(x+.2)*.08],bookshelf));

// Golden Gate Bridge portrait above the monitors
box([3.0,2.05,.2],0xb29d7f,[1.35,5.08,-1.45],[-.08,0,.02]);
box([2.62,1.67,.04],0x9bc7d7,[1.35,5.08,-1.33],[-.08,0,.02]);
box([2.62,.38,.025],0x5e8f78,[1.35,4.56,-1.28],[-.08,0,.02]);
box([.18,1.12,.04],0xe45f48,[.78,5.0,-1.25],[-.08,0,.02]);
box([.18,1.12,.04],0xe45f48,[1.92,5.0,-1.25],[-.08,0,.02]);
box([1.5,.08,.04],0xe45f48,[1.35,4.66,-1.23],[-.08,0,.02]);
box([1.48,.035,.04],0xf4d6b8,[1.35,5.35,-1.22],[-.08,0,.02]);
// floating neural nodes
const nodes = [];
nodes.forEach((p,i)=>add(new THREE.SphereGeometry(.18,20,16),mat(i%2?0xf19a3d:0x557fa1),p));
nodes.slice(0,-1).forEach((p,i)=>{const q=nodes[i+1],d=new THREE.Vector3(...q).sub(new THREE.Vector3(...p));const line=cylinder(.035,d.length(),0x77736b,[p[0]+d.x/2,p[1]+d.y/2,p[2]+d.z/2]);line.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize())});

// Large floor plant, matching the reference workstation composition
const floorPlant = new THREE.Group();
floorPlant.position.set(3.72, .05, .72);
floorPlant.scale.setScalar(.82);
group.add(floorPlant);
add(new THREE.CylinderGeometry(.58,.42,.82,32),mat(0xc9a77f),[0,.5,0],[0,0,0],floorPlant);
add(new THREE.TorusGeometry(.56,.09,12,32),mat(0xf0ebe2),[0,.92,0],[Math.PI/2,0,0],floorPlant);
add(new THREE.CylinderGeometry(.48,.48,.08,32),mat(0x5b4938),[0,.92,0],[0,0,0],floorPlant);
[
  [-.18,1.55,.02,-.28,0x7fbd43],
  [.18,1.58,.04,.28,0x8fd34b],
  [-.35,1.38,.08,-.48,0x70ad3e],
  [.35,1.4,.06,.48,0x83c743],
  [0,1.72,-.08,.02,0x99d94f]
].forEach(([x,y,z,rz,color]) => {
  cylinder(.035,.82,0x5f8e3f,[x*.45,1.2,z],[0,0,rz*.45],floorPlant);
  const leaf = add(new THREE.SphereGeometry(.27, 24, 18), mat(color), [x,y,z], [0,0,rz], floorPlant);
  leaf.scale.set(.62, 1.55, .34);
});

const ambient = new THREE.HemisphereLight(0xfff7e7, 0x8b8171, 2.6);
ambient.layers.enable(1);
scene.add(ambient);
const key = new THREE.DirectionalLight(0xffeed5, 4.2);
key.layers.enable(1);
key.position.set(5, 10, 7);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
scene.add(key);
const fill = new THREE.PointLight(0xf28d2f, 12, 8);
fill.layers.enable(1);
fill.position.set(-4, 5, 3);
scene.add(fill);
const workspaceObjects = group.children.filter((object) => object !== character);

let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
let scrollProgress = 0;
let targetScrollProgress = 0;
let journeyStage = 0;
let targetJourneyStage = 0;
window.addEventListener('pointermove', (event) => {
  targetX = (event.clientX / innerWidth - .5) * .22;
  targetY = (event.clientY / innerHeight - .5) * .12;
});
const syncScroll = () => {
  targetScrollProgress = Math.min(Math.max(scrollY / Math.max(innerHeight * .9, 1), 0), 1);
  const anchors = [
    0,
    document.querySelector('#about').offsetTop,
    document.querySelector('#experience').offsetTop,
    document.querySelector('#projects').offsetTop,
    document.querySelector('#contact').offsetTop
  ];
  const position = scrollY;
  let index = 0;
  while (index < anchors.length - 1 && position >= anchors[index + 1]) index++;
  if (index === anchors.length - 1) {
    targetJourneyStage = index;
  } else {
    const span = Math.max(anchors[index + 1] - anchors[index], 1);
    targetJourneyStage = index + THREE.MathUtils.clamp((position - anchors[index]) / span, 0, 1);
  }
};
window.addEventListener('scroll', syncScroll, { passive: true });
window.addEventListener('load', syncScroll);
window.addEventListener('hashchange', () => requestAnimationFrame(syncScroll));
syncScroll();
const clock = new THREE.Clock();
function animate(){
  const t = clock.getElapsedTime();
  pointerX += (targetX-pointerX)*.035;
  pointerY += (targetY-pointerY)*.035;
  scrollProgress += (targetScrollProgress-scrollProgress)*.065;
  journeyStage += (targetJourneyStage-journeyStage)*.055;
  const scrollEase = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
  const homeExit = THREE.MathUtils.smoothstep(journeyStage, .12, .94);
  const stageIndex = Math.min(Math.floor(journeyStage), 3);
  const stageBlendRaw = journeyStage - stageIndex;
  const stageBlend = stageBlendRaw * stageBlendRaw * (3 - 2 * stageBlendRaw);
  const stageBackgrounds = [0xf3eee4, 0xf3eee4, 0xf3eee4, 0xf3eee4, 0xf0a048];
  const backgroundStage = targetJourneyStage >= 3.95 ? 4 : targetJourneyStage >= 2.95 ? 3 : 0;
  renderer.setClearColor(stageBackgrounds[backgroundStage], 1);
  const stageX = [0, -6.4, -6.2, -1.2, -6.0];
  const stageY = [0, -.38, -3.0, 3.55, -4.2];
  const stageScale = [1, .5, .5, .36, .5];
  const characterX = THREE.MathUtils.lerp(stageX[stageIndex], stageX[stageIndex + 1], stageBlend);
  const characterY = THREE.MathUtils.lerp(stageY[stageIndex], stageY[stageIndex + 1], stageBlend);
  const characterScale = THREE.MathUtils.lerp(stageScale[stageIndex], stageScale[stageIndex + 1], stageBlend);
  const walking = Math.sin(stageBlendRaw * Math.PI) * homeExit;
  const gaitPresence = Math.pow(Math.max(walking, 0), .35);
  group.rotation.y = -.18 + pointerX - homeExit * .08;
  group.rotation.x = pointerY + homeExit * .025;
  workspaceObjects.forEach((object) => { object.visible = homeExit < .72; });
  group.position.x = 0;
  group.position.y = -.7 + homeExit * .18;
  const breathe = Math.sin(t * 2.2);
  const look = Math.sin(t * .9);
  character.scale.setScalar(characterScale);
  character.position.x = characterX;
  character.position.y = characterY + Math.abs(Math.sin(t * 7.2)) * walking * .07 + breathe * .035;
  character.position.z = homeExit * .2;
  character.rotation.y = THREE.MathUtils.lerp(-2.3 * homeExit, -Math.PI/2, walking) + look * .025;
  character.rotation.z = Math.sin(t * 7.2) * walking * .035 + breathe * .008;
  hair.position.set(.05 + look * .045, 2.78 + breathe * .025, .72);
  face.position.set(.08 + look * .045, 2.7 + breathe * .025, .48);
  bun.position.set(-.18 + look * .025, 3.28 + breathe * .018, .72);
  hair.rotation.y = face.rotation.y = bun.rotation.y = (1-homeExit) * scrollEase * .82 + look * .08;
  hair.rotation.z = face.rotation.z = bun.rotation.z = Math.sin(scrollEase * Math.PI) * -.12 + look * .035;
  const leftType = Math.sin(t * 8.2 + scrollEase * 5) * .022 * (1-homeExit);
  const rightType = Math.sin(t * 8.2 + 2.1 + scrollEase * 5) * .022 * (1-homeExit);
  const nearestStage = Math.min(Math.max(Math.round(journeyStage), 1), 4);
  const settled = (1 - gaitPresence) * homeExit;
  const actionTargets = [
    rightHandBase,
    [1.5, 2.9, .78],
    [1.65, 2.45, .28],
    [1.38, 2.25, .34],
    [1.55, 3.0, .78]
  ];
  const leftStanding = [-.5 + Math.sin(t*7.2)*walking*.18, 1.55, .9];
  const rightStanding = [.58 - Math.sin(t*7.2)*walking*.18, 1.55, .9];
  const leftHandTarget = [
    THREE.MathUtils.lerp(leftHandBase[0], leftStanding[0], homeExit),
    THREE.MathUtils.lerp(leftHandBase[1] + leftType, leftStanding[1], homeExit),
    THREE.MathUtils.lerp(leftHandBase[2], leftStanding[2], homeExit)
  ];
  const rightHandTarget = [
    THREE.MathUtils.lerp(rightHandBase[0], THREE.MathUtils.lerp(rightStanding[0], actionTargets[nearestStage][0], settled), homeExit),
    THREE.MathUtils.lerp(rightHandBase[1] + rightType, THREE.MathUtils.lerp(rightStanding[1], actionTargets[nearestStage][1] + (nearestStage===1||nearestStage===4 ? Math.sin(t*7)*.08 : 0), settled), homeExit),
    THREE.MathUtils.lerp(rightHandBase[2], THREE.MathUtils.lerp(rightStanding[2], actionTargets[nearestStage][2], settled), homeExit)
  ];
  leftHand.position.set(...leftHandTarget);
  rightHand.position.set(...rightHandTarget);
  updateLimb(leftArm, leftShoulder, leftHandTarget, leftArmLength);
  updateLimb(rightArm, rightShoulder, rightHandTarget, rightArmLength);
  const legSwing = Math.sin(t * 7.2) * walking;
  leftLeg.position.lerpVectors(new THREE.Vector3(-.45,.62,.82), new THREE.Vector3(-.28,.82,.78), homeExit);
  rightLeg.position.lerpVectors(new THREE.Vector3(.55,.62,.82), new THREE.Vector3(.34,.82,.78), homeExit);
  leftLeg.rotation.set(THREE.MathUtils.lerp(1.12, legSwing * .5, homeExit), 0, THREE.MathUtils.lerp(.12, 0, homeExit));
  rightLeg.rotation.set(THREE.MathUtils.lerp(1.12, -legSwing * .5, homeExit), 0, THREE.MathUtils.lerp(-.12, 0, homeExit));
  leftSock.position.lerpVectors(new THREE.Vector3(-.72,.42,.98), new THREE.Vector3(-.28,.22,.78-legSwing*.18), homeExit);
  rightSock.position.lerpVectors(new THREE.Vector3(.86,.42,.98), new THREE.Vector3(.34,.22,.78+legSwing*.18), homeExit);
  leftShoe.position.lerpVectors(new THREE.Vector3(-.72,.2,1.18), new THREE.Vector3(-.28,.08,.58-legSwing*.24), homeExit);
  rightShoe.position.lerpVectors(new THREE.Vector3(.86,.2,1.18), new THREE.Vector3(.34,.08,.58+legSwing*.24), homeExit);
  floorPlant.rotation.z = Math.sin(t * .75) * .018;
  nodes.forEach((_,i)=>{ const object=group.children[group.children.length-nodes.length*2+1+i]; if(object) object.position.y += Math.sin(t*1.2+i)*.0007; });
  if (homeExit < .72) {
    characterHost.style.opacity = '0';
    camera.layers.enable(1);
    renderer.render(scene,camera);
  } else {
    characterHost.style.opacity = '1';
    camera.layers.set(0);
    renderer.render(scene,camera);
    camera.layers.set(1);
    characterRenderer.render(scene,camera);
  }
  camera.layers.set(0);
  requestAnimationFrame(animate);
}
animate();

const resize = () => {
  const width=host.clientWidth, height=host.clientHeight;
  camera.aspect=width/height;
  camera.updateProjectionMatrix();
  renderer.setSize(width,height);
  characterRenderer.setSize(width,height);
};
window.addEventListener('resize',resize);

const reveal = new IntersectionObserver((entries)=>entries.forEach((entry)=>{
  if(entry.isIntersecting){ entry.target.animate([{opacity:0,transform:'translateY(35px)'},{opacity:1,transform:'none'}],{duration:700,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'}); reveal.unobserve(entry.target); }
}),{threshold:.12});
document.querySelectorAll('.about-grid,.project-card,.experience-grid,.contact h2').forEach(el=>reveal.observe(el));

const navLinks = [...document.querySelectorAll('.home-link, .nav-pill a')];
const navSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });
navSections.forEach((section) => navObserver.observe(section));

const soundToggle = document.querySelector('.sound-toggle');
soundToggle.addEventListener('click', () => {
  const enabled = soundToggle.getAttribute('aria-pressed') !== 'true';
  soundToggle.setAttribute('aria-pressed', String(enabled));
  soundToggle.querySelector('span').textContent = enabled ? '◕' : '◖';
});

const caseStudies = {
  ideacourt: {
    domain: 'Multi-Agent AI',
    title: 'IdeaCourt',
    skills: ['Next.js 16', 'React 19', 'TypeScript', 'Zod', 'Vercel AI SDK', 'Tavily', 'GMI Cloud', 'jsPDF'],
    summary: 'An evidence-first startup validation system that puts an idea on trial before a founder invests months building it.',
    problem: 'Most AI startup tools confidently generate plans without proving that the customer pain, market pull, or competitive opening is real. Founders need a disciplined way to decide whether to build, pivot, or stop.',
    method: 'Live Tavily research feeds specialized Market Research and Customer Interview agents. A six-dimension evidence gate scores pain urgency, willingness to pay, market pull, competitive opening, reachable customers, and MVP feasibility before a CEO agent issues its verdict.',
    metrics: [
      { value: '3', label: 'Verdict Paths' },
      { value: '6', label: 'Evidence Dimensions' },
      { value: 'Live', label: 'Market Research' }
    ],
    solution: 'IdeaCourt produces an auditable Build, Pivot, or Do Not Build Yet verdict. Strong ideas receive a PRD, financial scenarios, go-to-market plan, UX flow, and validation sequence; weak ideas receive practical experiments instead of fabricated confidence.',
    github: 'https://github.com/reemikadas/IdeaCourt'
  },
  healthmate: {
    domain: 'Retrieval-Augmented Generation',
    title: 'HealthMate',
    skills: ['React', 'Vite', 'Python', 'FastAPI', 'LangChain', 'FAISS', 'Groq', 'Hugging Face'],
    summary: 'A conversational fitness and nutrition coach whose answers remain grounded in a curated knowledge base.',
    problem: 'General-purpose chatbots can provide fluent wellness guidance without trustworthy grounding or visible sources. Users need accessible answers that remain traceable to a controlled knowledge base.',
    method: 'A React interface calls a FastAPI service running a LangChain conversational RAG pipeline. Documents are embedded with all-MiniLM-L6-v2, retrieved from FAISS, and supplied to Groq’s openai/gpt-oss-20b model with recent conversational context.',
    metrics: [
      { value: '94%', label: 'Retrieval Accuracy' },
      { value: '77%', label: 'LLM Relevancy' },
      { value: '79%', label: 'Faithfulness' }
    ],
    solution: 'HealthMate delivers responsive, citation-aware conversations across desktop and mobile, with saved browser conversations and clear loading, empty, failure, and configuration states. It is positioned as educational guidance rather than medical advice.',
    github: 'https://github.com/reemikadas/HealthMate_AI_Fitness_Nutrition_Guide'
  },
  churn: {
    domain: 'Machine Learning',
    title: 'Churn Prediction',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'SMOTE', 'GridSearchCV', 'Gradient Boosting', 'MLP'],
    summary: 'A large-scale classification pipeline that identifies customers at risk of leaving and translates predictions into retention actions.',
    problem: 'Subscription businesses often recognize churn only after revenue is lost. The objective was to flag likely churners early while minimizing costly false negatives and revealing the behaviors that should trigger intervention.',
    method: 'Nearly 500,000 training records were cleaned, encoded, scaled, and balanced with SMOTE. Logistic Regression, Decision Tree, Gradient Boosting, and MLP models were tuned with cross-validation and compared using confusion matrices, classification metrics, and ROC-AUC.',
    metrics: [
      { value: '0.74', label: 'Best ROC-AUC (MLP)' },
      { value: '67%', label: 'Test Accuracy' },
      { value: '500K', label: 'Training Records' }
    ],
    solution: 'The final workflow supports proactive retention targeting. Payment delays, frequent support calls, shorter tenure, and lower spending emerged as useful risk signals, giving teams concrete segments for service recovery and personalized offers.',
    github: 'https://github.com/reemikadas/Telecom_Customer_Churn_Prediction'
  },
  blindness: {
    domain: 'Deep Learning',
    title: 'Blindness Detection',
    skills: ['Python', 'TensorFlow', 'Keras', 'ResNet50', 'OpenCV', 'Pillow', 'Scikit-learn', 'Transfer Learning'],
    summary: 'A retinal-image classification pipeline for detecting and grading diabetic retinopathy across five clinical severity levels.',
    problem: 'Diabetic retinopathy can progress without early symptoms, while specialist screening is expensive and difficult to access in underserved regions. A scalable pre-screening tool could help prioritize patients before irreversible vision loss.',
    method: 'The APTOS 2019 dataset was resized to 224×224, normalized, augmented, and balanced with class weights. An MLP, custom CNN, and ResNet50 transfer-learning model were trained with early stopping and compared through accuracy, loss, confusion matrices, and severe-stage recall.',
    metrics: [
      { value: '75.5%', label: 'Test Accuracy' },
      { value: '83.5%', label: 'Validation Accuracy' },
      { value: '55.6%', label: 'Severe DR Recall' }
    ],
    solution: 'Transfer learning provided the strongest generalization and established a practical foundation for automated pre-screening. The model is intended to flag risk and prioritize clinical review, not replace diagnosis by an ophthalmologist.',
    github: 'https://github.com/reemikadas/Blindness_Detection_in_Diabetic_Retinopathy'
  }
};

const caseStudy = document.querySelector('#case-study');
const caseStudyFields = {
  title: document.querySelector('#case-study-title'),
  summary: document.querySelector('#case-study-summary'),
  problem: document.querySelector('#case-study-problem'),
  method: document.querySelector('#case-study-method'),
  metrics: document.querySelector('#case-study-metrics'),
  solution: document.querySelector('#case-study-solution'),
  github: document.querySelector('#case-study-github')
};
const caseStudySkills = document.querySelector('#case-study-skills');
let activeCaseStudy = null;

const showCaseStudy = (slug, updateHistory = true) => {
  const study = caseStudies[slug];
  if (!study) return;
  activeCaseStudy = slug;
  Object.entries(caseStudyFields).forEach(([key, element]) => {
    if (key === 'github') element.href = study.github;
    else if (key === 'metrics') return;
    else element.textContent = study[key];
  });
  caseStudySkills.replaceChildren(...study.skills.map((skill) => {
    const chip = document.createElement('span');
    chip.textContent = skill;
    return chip;
  }));
  caseStudyFields.metrics.replaceChildren(...study.metrics.map(({ value, label }) => {
    const tile = document.createElement('div');
    tile.className = 'result-tile';
    const valueElement = document.createElement('span');
    valueElement.className = 'result-value';
    valueElement.textContent = value;
    const labelElement = document.createElement('span');
    labelElement.className = 'result-label';
    labelElement.textContent = label;
    tile.append(valueElement, labelElement);
    return tile;
  }));
  caseStudy.hidden = false;
  caseStudy.scrollTop = 0;
  document.body.classList.add('case-study-open');
  if (updateHistory) history.pushState({ caseStudy: slug }, '', `#case-study-${slug}`);
  requestAnimationFrame(() => document.querySelector('.case-study-back').focus());
};

const hideCaseStudy = () => {
  activeCaseStudy = null;
  caseStudy.hidden = true;
  document.body.classList.remove('case-study-open');
};

document.querySelectorAll('[data-case-study]').forEach((button) => {
  button.addEventListener('click', () => showCaseStudy(button.dataset.caseStudy));
});
document.querySelector('.case-study-back').addEventListener('click', () => {
  if (history.state?.caseStudy) history.back();
  else {
    hideCaseStudy();
    location.hash = 'projects';
  }
});
window.addEventListener('popstate', () => {
  const slug = location.hash.replace('#case-study-', '');
  if (caseStudies[slug]) showCaseStudy(slug, false);
  else if (activeCaseStudy) hideCaseStudy();
});
const initialCaseStudy = location.hash.replace('#case-study-', '');
if (caseStudies[initialCaseStudy]) showCaseStudy(initialCaseStudy, false);

const projectList = document.querySelector('.project-list');
const projectCards = [...document.querySelectorAll('.project-card')];
const projectPrev = document.querySelector('.project-prev');
const projectNext = document.querySelector('.project-next');
let projectIndex = 0;

const updateProjectCarousel = () => {
  const visibleCards = innerWidth <= 800 ? 1 : 2;
  const maxIndex = Math.max(projectCards.length - visibleCards, 0);
  projectIndex = Math.min(projectIndex, maxIndex);
  const step = projectCards[0].getBoundingClientRect().width + 18;
  projectList.style.transform = `translateX(${-projectIndex * step}px)`;
  projectPrev.disabled = projectIndex === 0;
  projectNext.disabled = projectIndex === maxIndex;
};
projectPrev.addEventListener('click', () => {
  projectIndex = Math.max(projectIndex - 1, 0);
  updateProjectCarousel();
});
projectNext.addEventListener('click', () => {
  const visibleCards = innerWidth <= 800 ? 1 : 2;
  projectIndex = Math.min(projectIndex + 1, projectCards.length - visibleCards);
  updateProjectCarousel();
});
window.addEventListener('resize', updateProjectCarousel);
updateProjectCarousel();
