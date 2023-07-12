import { AmbientLight, PointLight, SpotLight, DirectionalLight } from 'three';

//Creates the lights of the scene
const lightColor = 0xffffff;

const pointLight = new PointLight( lightColor, 1, 100 );
pointLight.position.set( 10, 10, 0 );

const spotLight = new SpotLight( lightColor );
spotLight.position.set( 0, 10, 10 );
const ambientLight = new AmbientLight(lightColor, 0.5);

const directionalLight = new DirectionalLight(lightColor, 1);
directionalLight.position.set(0, 10, 0);
directionalLight.target.position.set(-5, 0, 0);

directionalLight.add(pointLight);
directionalLight.add(spotLight);
directionalLight.add(ambientLight);

export default directionalLight;