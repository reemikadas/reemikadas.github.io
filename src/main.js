import * as THREE from 'three';
import './style.css';

const host = document.querySelector('#scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(31, host.clientWidth / host.clientHeight, 0.1, 100);
camera.position.set(9.8, 6.35, 12.4);
camera.lookAt(.25, 2.3, .15);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(host.clientWidth, host.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
host.appendChild(renderer.domElement);

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
const face = add(new THREE.SphereGeometry(.49, 32, 24, 0, Math.PI*2, 0, Math.PI/1.65), mat(0xd19570), [.08, 2.7, .58], [0,0,0], character);
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
const leftArmBaseY = leftArm.position.y;
const rightArmBaseY = rightArm.position.y;
box([1.5,.08,.54], 0x555b61, [.6,1.94,.18]);
for(let kx=0;kx<8;kx++) for(let ky=0;ky<3;ky++) box([.11,.018,.06],0xe9e5dc,[.05+kx*.16,1.99,.05+ky*.12]);
// legs and shoes
cylinder(.18, 1.35, 0x252525, [-.45,.62,.82], [1.12,0,.12], character);
cylinder(.18, 1.35, 0x252525, [.55,.62,.82], [1.12,0,-.12], character);
box([.48,.32,.78], 0x303034, [-.72,.2,1.18], [0,.08,0], character);
box([.48,.32,.78], 0x303034, [.86,.2,1.18], [0,-.08,0], character);
cylinder(.22,.28,0xf4f0e8,[-.72,.42,.98],[0,0,.08],character);
cylinder(.22,.28,0xf4f0e8,[.86,.42,.98],[0,0,-.08],character);

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
scene.add(ambient);
const key = new THREE.DirectionalLight(0xffeed5, 4.2);
key.position.set(5, 10, 7);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
scene.add(key);
const fill = new THREE.PointLight(0xf28d2f, 12, 8);
fill.position.set(-4, 5, 3);
scene.add(fill);

let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
let scrollProgress = 0;
let targetScrollProgress = 0;
window.addEventListener('pointermove', (event) => {
  targetX = (event.clientX / innerWidth - .5) * .22;
  targetY = (event.clientY / innerHeight - .5) * .12;
});
const syncScroll = () => {
  targetScrollProgress = Math.min(Math.max(scrollY / Math.max(innerHeight * .9, 1), 0), 1);
};
window.addEventListener('scroll', syncScroll, { passive: true });
syncScroll();
const clock = new THREE.Clock();
function animate(){
  const t = clock.getElapsedTime();
  pointerX += (targetX-pointerX)*.035;
  pointerY += (targetY-pointerY)*.035;
  scrollProgress += (targetScrollProgress-scrollProgress)*.065;
  const scrollEase = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
  group.rotation.y = -.18 + pointerX - scrollEase * .16;
  group.rotation.x = pointerY + scrollEase * .055;
  group.position.x = scrollEase * .32;
  group.position.y = -.7 + scrollEase * .24;
  const breathe = Math.sin(t * 2.2);
  const look = Math.sin(t * .9);
  character.position.y = Math.sin(scrollEase * Math.PI) * .25 + breathe * .045;
  character.rotation.y = -scrollEase * .72 + look * .075;
  character.rotation.z = Math.sin(scrollEase * Math.PI) * -.06 + breathe * .012;
  hair.position.set(.05 + look * .045, 2.78 + breathe * .025, .72);
  face.position.set(.08 + look * .045, 2.7 + breathe * .025, .58);
  bun.position.set(-.18 + look * .025, 3.28 + breathe * .018, .72);
  hair.rotation.y = face.rotation.y = bun.rotation.y = scrollEase * .82 + look * .16;
  hair.rotation.z = face.rotation.z = bun.rotation.z = Math.sin(scrollEase * Math.PI) * -.12 + look * .035;
  const leftType = Math.sin(t * 8.2 + scrollEase * 5) * .022;
  const rightType = Math.sin(t * 8.2 + 2.1 + scrollEase * 5) * .022;
  leftArm.position.y = leftArmBaseY + leftType * .5;
  rightArm.position.y = rightArmBaseY + rightType * .5;
  leftHand.position.y = leftHandBase[1] + leftType;
  rightHand.position.y = rightHandBase[1] + rightType;
  floorPlant.rotation.z = Math.sin(t * .75) * .018;
  nodes.forEach((_,i)=>{ const object=group.children[group.children.length-nodes.length*2+1+i]; if(object) object.position.y += Math.sin(t*1.2+i)*.0007; });
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate();

const resize = () => {
  const width=host.clientWidth, height=host.clientHeight;
  camera.aspect=width/height;
  camera.updateProjectionMatrix();
  renderer.setSize(width,height);
};
window.addEventListener('resize',resize);

const reveal = new IntersectionObserver((entries)=>entries.forEach((entry)=>{
  if(entry.isIntersecting){ entry.target.animate([{opacity:0,transform:'translateY(35px)'},{opacity:1,transform:'none'}],{duration:700,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'}); reveal.unobserve(entry.target); }
}),{threshold:.12});
document.querySelectorAll('.about-grid,.project-card,.experience-grid,.contact h2').forEach(el=>reveal.observe(el));

const navLinks = [...document.querySelectorAll('.nav-pill a')];
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
