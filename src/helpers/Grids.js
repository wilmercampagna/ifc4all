import { GridHelper, AxesHelper } from 'three';

//Creates grids and axes in the scene
const grid = new GridHelper(50, 30);

const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 1;

export { grid, axes };