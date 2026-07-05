import * as THREE from 'three';
import './style.css';

const host = document.querySelector('#scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, host.clientWidth / host.clientHeight, 0.1, 100);
camera.position.set(8.6, 6.4, 10.8);
camera.lookAt(0, 1.8, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(host.clientWidth, host.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
host.appendChild(renderer.domElement);

const group = new THREE.Group();
group.rotation.y = -0.18;
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

// Rug and workspace
box([6.6, .18, 4.9], 0xd59b3c, [0, .05, .2]);
box([5.7, .05, 4.05], 0xf3dd78, [0, .16, .2]);
box([4.8, .04, 3.15], 0xe7b64d, [0, .2, .2]);
box([5.6, .28, 2.25], 0xf4f0e6, [.15, 1.8, -.2]);
[-2.35, 2.35].forEach(x => [-.95, .65].forEach(z => cylinder(.13, 1.75, 0xa7794f, [x, .87, z])));

// Monitors
const monitor = (x, y, z, rotate, accent) => {
  const g = new THREE.Group();
  g.rotation.y = rotate;
  g.position.set(x, y, z);
  group.add(g);
  box([2.15, 1.48, .18], 0x30353b, [0, .75, 0], [0, 0, 0], g);
  box([1.9, 1.22, .05], 0x18222b, [0, .76, .105], [0, 0, 0], g);
  [0,1,2,3,4].forEach((i) => box([1.1 - i*.08, .035, .02], i % 2 ? accent : 0xe3b453, [.18, 1.1 - i*.18, .14], [0,0,0], g));
  cylinder(.09, .65, 0x777b7d, [0, -.22, 0], [0,0,0], g);
  box([.9,.08,.55], 0x696d6e, [0,-.54,.05], [0,0,0], g);
};
monitor(-1.08, 2.1, -.53, .12, 0x54a7c7);
monitor(1.2, 2.05, -.48, -.1, 0xe47c62);

// Chair and seated character
box([1.65, .22, 1.25], 0xe8e4da, [.15, 1.05, .75]);
box([1.65, 1.85, .25], 0xeeeae0, [.15, 1.75, 1.28], [-.1,0,0]);
cylinder(.13, 1.35, 0x747576, [.15,.55,1.25]);
const character = new THREE.Group();
group.add(character);
cylinder(.12, 1.45, 0x313236, [.05, 2.05, .55], [Math.PI/2,0,0], character); // body
const hair = add(new THREE.SphereGeometry(.62, 32, 24), mat(0x7a4a2d), [.05, 3.05, .18], [0,0,0], character);
const face = add(new THREE.SphereGeometry(.49, 32, 24, 0, Math.PI*2, 0, Math.PI/1.65), mat(0xd19570), [.08, 2.96, .04], [0,0,0], character);
// bun
const bun = add(new THREE.SphereGeometry(.34, 24, 18), mat(0x68402a), [-.38,3.48,.18], [0,0,0], character);
// arms to keyboard
const leftArm = cylinder(.13, 1.25, 0xd19570, [-.58,1.95,-.15], [1.18,0,.45], character);
const rightArm = cylinder(.13, 1.25, 0xd19570, [.72,1.95,-.15], [1.18,0,-.45], character);
box([1.25,.05,.45], 0xc5c5be, [.05,1.98,-.72]);
// legs and shoes
cylinder(.18, 1.35, 0x252525, [-.45,.55,.42], [1.12,0,.12], character);
cylinder(.18, 1.35, 0x252525, [.55,.55,.42], [1.12,0,-.12], character);
box([.42,.28,.72], 0xf4f0e8, [-.8,.18,-.05], [0,.08,0], character);
box([.42,.28,.72], 0xf4f0e8, [.9,.18,-.05], [0,-.08,0], character);

// Shelf, books, plant, board, analytics nodes
box([2.15,.18,.7], 0xcfb47d, [-3.0,4.35,-1.25]);
box([.33,1.0,.52], 0x4f6d8c, [-3.62,4.95,-1.25], [0,0,.03]);
box([.38,1.18,.52], 0xe5a13f, [-3.25,5.03,-1.25], [0,0,-.04]);
cylinder(.32,.52,0xe9e3d7,[-2.56,4.73,-1.25]);
for(let i=0;i<6;i++){ const leaf=add(new THREE.SphereGeometry(.17,16,12),mat(0x77b84e),[-2.56+(i%3-1)*.16,5.08+Math.floor(i/3)*.16,-1.25]); leaf.scale.y=1.6; }
box([3.0,2.05,.2],0xb29d7f,[1.35,5.08,-1.45],[-.08,0,.02]);
box([2.62,1.67,.04],0xc9b59c,[1.35,5.08,-1.33],[-.08,0,.02]);
[[.45,5.35],[1.9,4.85],[1.35,5.65]].forEach(([x,y],i)=>cylinder(.18,.18,[0xd96355,0xe5a443,0x4e7f77][i],[x,y,-1.2],[Math.PI/2,0,0]));
// floating neural nodes
const nodes = [[3.55,4.6,.1],[4.2,3.75,-.2],[3.45,3.15,-.1],[4.5,2.65,.2]];
nodes.forEach((p,i)=>add(new THREE.SphereGeometry(.18,20,16),mat(i%2?0xf19a3d:0x557fa1),p));
nodes.slice(0,-1).forEach((p,i)=>{const q=nodes[i+1],d=new THREE.Vector3(...q).sub(new THREE.Vector3(...p));const line=cylinder(.035,d.length(),0x77736b,[p[0]+d.x/2,p[1]+d.y/2,p[2]+d.z/2]);line.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize())});

// Large floor plant, matching the reference workstation composition
const floorPlant = new THREE.Group();
floorPlant.position.set(4.05, .05, .9);
group.add(floorPlant);
cylinder(.68, .2, 0xe8e1d5, [0, .22, 0], [0,0,0], floorPlant);
cylinder(.55, .85, 0xc9b9a5, [0, .62, 0], [0,0,0], floorPlant);
cylinder(.62, .18, 0xf0ebe2, [0, 1.04, 0], [0,0,0], floorPlant);
[
  [-.22,1.75,.02,-.42,0x7fbd43],
  [.22,1.78,.04,.42,0x8fd34b],
  [-.48,1.48,.08,-.72,0x70ad3e],
  [.48,1.5,.06,.72,0x83c743],
  [0,1.9,-.08,.02,0x99d94f]
].forEach(([x,y,z,rz,color]) => {
  const leaf = add(new THREE.SphereGeometry(.3, 24, 18), mat(color), [x,y,z], [0,0,rz], floorPlant);
  leaf.scale.set(.72, 2.15, .42);
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
  group.position.y = scrollEase * .24;
  const breathe = Math.sin(t * 2.2);
  const look = Math.sin(t * .9);
  character.position.y = Math.sin(scrollEase * Math.PI) * .25 + breathe * .045;
  character.rotation.y = -scrollEase * .72 + look * .075;
  character.rotation.z = Math.sin(scrollEase * Math.PI) * -.06 + breathe * .012;
  hair.position.set(.05 + look * .045, 3.05 + breathe * .025, .18);
  face.position.set(.08 + look * .045, 2.96 + breathe * .025, .04);
  bun.position.set(-.38 + look * .045, 3.48 + breathe * .025, .18);
  hair.rotation.y = face.rotation.y = bun.rotation.y = scrollEase * .82 + look * .16;
  hair.rotation.z = face.rotation.z = bun.rotation.z = Math.sin(scrollEase * Math.PI) * -.12 + look * .035;
  leftArm.rotation.x = 1.18 + Math.sin(t * 7.5 + scrollEase * 5) * (.105 + scrollEase * .11);
  rightArm.rotation.x = 1.18 + Math.sin(t * 7.5 + 2.1 + scrollEase * 5) * (.105 + scrollEase * .11);
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
