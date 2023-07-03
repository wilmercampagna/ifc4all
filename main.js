import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import navBar from './src/Components/NavBar.js'

import {
  Scene,
  Raycaster,
  Matrix4,
  WebGLRenderer,
  Vector2,
  Vector3,
  Line,
  BufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Clock,
  Quaternion,
  sRGBEncoding
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { VRButton } from './src/helpers/VRButton.js';
import { HTMLMesh } from 'three/examples/jsm/interactive/HTMLMesh.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { IFCLoader } from "web-ifc-three/IFCLoader.js";
// import { IFCLoader } from "./public/wasm/IFCLoader.js";
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree
} from 'three-mesh-bvh';
import { size, camera, cameraDolly, dummyCam } from './src/helpers/Camera.js';
import ambientLight from './src/helpers/Lights.js';
import { grid, axes } from './src/helpers/Grids.js';	
import { list } from 'postcss';

document.querySelector('#nav').append(navBar);

document.querySelector('#app').innerHTML = `
  <div>    
    <h1>IfcVR made for wilmercampagna in collaboration with GRUA</h1>
    <div class="card">
    <div class="">
    <div class="flex items-center justify-center w-full">
      <label for="file-input" class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg aria-hidden="true" class="w-5 h-5 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 font-bold">ifc files</p>
          </div>
          <input id="file-input" type="file" class="hidden" />
      </label>
    </div>
    <div class="mode">
      <a href="?allowvr=true" id="vr">Mode VR</a>
      <a href="?" id="nonvr">Mode Non-VR</a>
    </div>
    <div class="message-container" id="message-container" style="display: block;">
      <p class="message" id="id-output" style="display: block;">_</p>
      <p class="message" id="desc-output" style="display: block;">_</p>
    </div>
  </div>
  <div class="canvas">
    <canvas id="three-canvas">
      
    </canvas>
  </div>
    </div>
  </div>
`
//Creates the Three.js scene
const scene = new Scene();

//Sets up the renderer, fetching the canvas of the HTML
const threeCanvas = document.getElementById("three-canvas");
const renderer = new WebGLRenderer({
    canvas: threeCanvas,
    alpha: true,
    antialias: true
});

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.outputColorSpace = sRGBEncoding;

// Add camera, grid, axes and lights to the scene
scene.add(cameraDolly);
scene.add(dummyCam)
scene.add(ambientLight);
scene.add(grid);
scene.add(axes);

//Check if VR is allowed
const params = (new URL(document.location)).searchParams;
const allowvr = params.get('allowvr') === 'true';
if (allowvr) {
  renderer.xr.enabled = true;
  const button = new VRButton( renderer );
  document.body.append(button);
  // document.body.appendChild(VRButton.createButton(renderer));
  document.querySelector('#vr').style.display = 'none';
} else {
  // no VR, add some controls
  const controls = new OrbitControls(camera, threeCanvas);
  controls.target.set(0, 1.6, -2);
  controls.update();
  document.querySelector('#nonvr').style.display = 'none';
}

//Variables for VR hand controllers
let controller1, controller2;
let controllerGrip1, controllerGrip2;

//VR Controllers 
controller1 = renderer.xr.getController( 0 );
controller1.addEventListener( 'selectstart', pick );
controller1.addEventListener( 'selectend', hideDetails );
controller1.addEventListener( 'squeezestart', allowMovement );
controller1.addEventListener( 'squeezeend', stopMovement );

//One can set controller 2 to perform another function on 'select' - currently both set to object picking
controller2 = renderer.xr.getController( 1 );
controller2.addEventListener( 'selectstart', highlight );
// controller2.addEventListener( 'squeezestart', clearHighlight );
controller2.addEventListener( 'selectend', clearHighlight );

const controllerModelFactory = new XRControllerModelFactory();

// Setup the controller grip
controllerGrip1 = renderer.xr.getControllerGrip( 0 );
controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
controllerGrip2 = renderer.xr.getControllerGrip( 1 );
controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );

//Lines to shoot out from VR controllers to help aim
const geometry = new BufferGeometry().setFromPoints( [ new Vector3( 0, 0, 0 ), new Vector3( 0, 0, - 1 ) ] );
const line = new Line( geometry );
line.name = 'line';
line.scale.z = 5;

scene.add( controller1 );
scene.add( controller2 );
scene.add( controllerGrip1 );
scene.add( controllerGrip2 );

controller1.name = "Right Controller" 
controller2.name = "Left Controller"

controller1.add( line.clone() );
controller2.add( line.clone() );

// Needed to add controllers to dolly??
cameraDolly.add(controller1);
cameraDolly.add(controller2);
cameraDolly.add(controllerGrip1);
cameraDolly.add(controllerGrip2);

const animate = () => {
  //WebXR needs 'setAnimationLoop' as opposed to 'requestAnimationFrame'
  // requestAnimationFrame( animate );
  renderer.setAnimationLoop( render );
};

//Animation loop
const clock = new Clock();

function render() {
  const dt = clock.getDelta();
  if (controller1) { handleUserMovement(dt) }
  renderer.render( scene, camera );
}
  
animate();

//Adjust the viewport to the size of the browser
window.addEventListener("resize", () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
});

// Sets up the IFC loading
const ifcModels = [];

const ifcLoader = new IFCLoader();

const setupIfcLoader = async () => {
  // const ifcLoader = new IFCLoader();
  await ifcLoader.ifcManager.setWasmPath("wasm/");
  ifcLoader.ifcManager.applyWebIfcConfig({
    COORDINATE_TO_ORIGIN: true,
    USE_FAST_BOOLS: false,
  });
  await ifcLoader.ifcManager.useWebWorkers(false, "wasm/IFCWorker.js");
  // ifcLoader.ifcManager.useJSONData(true);
  ifcLoader.ifcManager.setupThreeMeshBVH(
    computeBoundsTree,
    disposeBoundsTree,
    acceleratedRaycast
  );
};

setupIfcLoader();

const lambMaterial = new MeshLambertMaterial({ transparent: true, opacity: 0.1, color: 0x77aaff });

const input = document.getElementById("file-input");
input.addEventListener(
  "change",
  async (changed) => {
    const ifcURL = URL.createObjectURL(changed.target.files[0]);
    // await ifcLoader.ifcManager.useWebWorkers(true, "wasm/IFCWorker.js");
    // const ifcModel = await ifcLoader.loadAsync(ifcURL);
    // const modelCopy = new Mesh(ifcModel.geometry, lambMaterial);
    // ifcModels.push(ifcModel);
    // scene.add(modelCopy)
    // scene.add(ifcModel)
    await ifcLoader.load(ifcURL, (ifcModel) => {
      //Make a translucent copy geometry - so when IFC model is hidden on item highlight, the remaining items take 'ghost' view  
      const modelCopy = new Mesh(ifcModel.geometry, lambMaterial);
      ifcModels.push(ifcModel);
      scene.add(modelCopy)
      scene.add(ifcModel)
    });
  },
  false
);

//Variable for raycaster to 'pick' objects
let raycaster = new Raycaster();
raycaster.firstHitOnly = true;
const tempMatrix = new Matrix4();

const mouse = new Vector2();
function mouseCast(event) {
  // Computes the position of the mouse on the screen
  const bounds = threeCanvas.getBoundingClientRect();
  
  const x1 = event.clientX - bounds.left;
  const x2 = bounds.right - bounds.left;
  mouse.x = (x1 / x2) * 2 - 1;
  
  const y1 = event.clientY - bounds.top;
  const y2 = bounds.bottom - bounds.top;
  mouse.y = -(y1 / y2) * 2 + 1;
  
  // Places it on the camera pointing to the mouse
  raycaster.setFromCamera(mouse, camera);
  // console.log("The raycaster: ", raycaster)
  const listOut = raycaster.intersectObjects(ifcModels);

  // Casts a ray
  return listOut[0];
}

async function mousePick(event) {
  const found = mouseCast(event);
  if (found) {
    const index = found.faceIndex;
    const geometry = found.object.geometry;
    const ifc = ifcLoader.ifcManager;
    const id = ifc.getExpressId(geometry, index);
    const modelID = found.object.modelID;
    const props = await ifc.getItemProperties(modelID, id);
    // console.log(id);
    // console.log(found.object);
    const expId = props.expressID;
    outputId.innerHTML = `ExpressID : ${expId}`;
    const desc = props.Name.value;
    outputDesc.innerHTML = `Name: ${desc}`;
    // console.log("The props: ", props)
  }
}

threeCanvas.ondblclick = mousePick;

// console.log('the ifc loader ifc manager:', ifcLoader.ifcManager)

function cast(controller) {
  const myTempMatrix = tempMatrix.identity().extractRotation( controller.matrixWorld );
  raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
  raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( myTempMatrix );
  return raycaster.intersectObjects(ifcModels);
}

const outputId = document.getElementById("id-output");
const outputDesc = document.getElementById("desc-output");
const messageBlock = document.getElementById("message-container");
let propMesh = new HTMLMesh( messageBlock );

async function pick(event) {
    const controller = event.target;
    const found = cast(controller)[0];
    console.log(cast(controller))
    console.log('the found:', found)
    if (found) {
        const index = found.faceIndex;
        const geometry = found.object.geometry;
        const ifc = ifcLoader.ifcManager;
        const id = ifc.getExpressId(geometry, index);
        const modelID = found.object.modelID;
        const props = await ifc.getItemProperties(modelID, id);
        console.log(id);
        console.log(found.object);
        const expId = props.expressID;
        outputId.innerHTML = `ExpressID : ${expId}`;
        const desc = props.Name.value;
        outputDesc.innerHTML = `Name: ${desc}`;
        propMesh.removeFromParent();
        propMesh = new HTMLMesh( messageBlock );
        const setX = found.point.x + 0.1*(cameraDolly.position.x - found.point.x);
        const setY = found.point.y + 0.1*(cameraDolly.position.y - found.point.y);
        const setZ = found.point.z + 0.1*(cameraDolly.position.z - found.point.z);
        propMesh.position.set( setX, setY, setZ );
        // propMesh.quaternion = found.object.mesh.quaternion
        propMesh.lookAt(cameraDolly.position);
        propMesh.scale.setScalar( 7 );
        scene.add(propMesh);
    }
}

function hideDetails() {
    propMesh.removeFromParent();
}

//Will apply material completely transparent on select
const highlightStrongMaterial = new MeshLambertMaterial({
    transparent: true,
    opacity: 0.9,
    color: 0xff88ff,
    depthTest: false
})

//For seeing through items
async function highlight(event) {
    const controller = await event.target;
    console.log('the controller:', controller)
    const found = cast(controller)[0];
    console.log('the found:', found)
    if (found) {
        const index = found.faceIndex;
        const geometry = found.object.geometry;
        const id = ifcLoader.ifcManager.getExpressId(geometry, index);
        const modelID = found.object.modelID;
        //Creates 'highlight' subset
        await ifcLoader.ifcManager.createSubset({
            modelID: modelID,
            ids: [id],
            material: highlightStrongMaterial,
            scene: scene,
            removePrevious: true,
            customID: 'highlight-sub'
        });
        for (var i = 0; i < ifcModels.length; i++) {
            //Hide all IFC models (only the transparent copies will remain seen with the highlight subset)
            ifcModels[i].visible = false;
        }
    } else {
        clearHighlight(event)
    }
}

//Removes previous highlight
async function clearHighlight(event) {
    //Loop through all loaded IFC models
    for (var i = 0; i < ifcModels.length; i++) {
        //Remove the 'highlight' subset
        await ifcLoader.ifcManager.removeSubset(ifcModels[i].modelID, highlightStrongMaterial, 'highlight-sub');
        //Make the IFC Model visible again
        ifcModels[i].visible = true;
    }
}

//Functions to handle user movement around scene (3 of the 6 DoF)
var letUserMove = false
function allowMovement() { letUserMove = true }
function stopMovement() { letUserMove = false }
function handleUserMovement(dt) {
    if (letUserMove) {
        let speed = 2;
        let moveZ = -dt * speed
        let saveQuat = cameraDolly.quaternion.clone();
        var holder = new Quaternion()
        dummyCam.getWorldQuaternion(holder)
        cameraDolly.quaternion.copy(holder);
        cameraDolly.translateZ(moveZ);
        cameraDolly.quaternion.copy(saveQuat)
    }
}
