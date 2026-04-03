// DEMO SCENE
import * as RT from "./src/RayTracer.js";

const canv = document.getElementById("canvas");

let demoCamera = new RT.SceneCamera(
    new RT.Point3D(0, -25, 0),
    300,
    300,
    300 / (2 * Math.tan((70 * Math.PI) / 180 / 2))
)

let demoScene = new RT.Scene(new RT.ColorRGB(0, 0, 0));

let wallMaterial = new RT.Material();
wallMaterial.setAlbedo(
    new RT.ColorRGB(0.85, 0.85, 0.85)
)
wallMaterial.setReflectivity(0.1)

let material1 = new RT.Material();
material1.setAlbedo(
    new RT.ColorRGB(0.85, 0.15, 0.15)
)
material1.setReflectivity(1)

let material2 = new RT.Material();
material2.setAlbedo(
    new RT.ColorRGB(0.40, 0.80, 0.05)
)
material2.setReflectivity(0)

let material3 = new RT.Material();
material3.setAlbedo(
    new RT.ColorRGB(0.1, 0.2, 0.8)
)
material3.setReflectivity(0.5)

let ceil = new RT.Sphere(new RT.Point3D(0, 0, -1010), 1000, wallMaterial)
let wallL = new RT.Sphere(new RT.Point3D(-1010, 0, 0), 1000, wallMaterial)
let wallR = new RT.Sphere(new RT.Point3D(1010, 0, 0), 1000, wallMaterial)
let floor = new RT.Sphere(new RT.Point3D(0, 0, 1010), 1000, wallMaterial)
let wallB = new RT.Sphere(new RT.Point3D(0, 1010, 0), 1000, wallMaterial)

let sphere1 = new RT.Sphere(new RT.Point3D(-6, 6, 7), 2.5, material1)
let sphere2 = new RT.Sphere(new RT.Point3D(3, 2, 4), 5, material2)
let sphere3 = new RT.Sphere(new RT.Point3D(-2, -3, 8), 3, material3)

demoScene.addObject(sphere1);
demoScene.addObject(sphere2);
demoScene.addObject(sphere3);

demoScene.addObject(floor);
demoScene.addObject(wallL);
demoScene.addObject(wallR);
demoScene.addObject(wallB);
demoScene.addObject(ceil);
    
let lightSource1 = new RT.LightSource(
    new RT.Point3D(0, 6, -7),
    0.6,
    new RT.ColorRGB(1, 1, 1)
)

let lightSource2 = new RT.LightSource(
    new RT.Point3D(0, -6, -7),
    0.6,
    new RT.ColorRGB(1, 1, 1)
)

demoScene.addLightSource(lightSource1)
demoScene.addLightSource(lightSource2)


let renderer = new RT.Renderer(canv, demoCamera, demoScene);
renderer.renderScene();