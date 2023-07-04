import { PerspectiveCamera, Object3D } from 'three';	

const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//Creates the camera (point of view of the user)
const aspect = size.width / size.height;
const camera = new PerspectiveCamera(75, aspect);
camera.position.z = 15;
camera.position.y = 13;
camera.position.x = 8;

//Create a 3D object to carry the camera around XR session
const cameraDolly = new Object3D();
cameraDolly.position.x = 0
cameraDolly.position.y = 1.6
cameraDolly.position.z = -5;
cameraDolly.add(camera);

cameraDolly.rotation.y = 3;
//Add dummy camera to accurately get camera orientation in handleMovement function
const dummyCam = new Object3D();

export { size, camera, cameraDolly, dummyCam };