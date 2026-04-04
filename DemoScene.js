// DEMO SCENE
import * as RT from "./src/RayTracer.js";

const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");

canv.width = 300;
canv.height = 300; 

let demoCamera = new RT.SceneCamera(
    new RT.Point3D(0, 20, 0),
    300,
    90
)

let demoScene = new RT.Scene(new RT.ColorRGB(0, 0, 0));

let material0 = new RT.Material();
material0.setAlbedo(
    new RT.ColorRGB(0.85, 0.85, 0.85)
)
material0.setReflectivity(0.07)

let material1 = new RT.Material();
material1.setAlbedo(
    new RT.ColorRGB(0.06, 0.48, 0.69)
)
material1.setReflectivity(0.3)

let material2 = new RT.Material();
material2.setAlbedo(
    new RT.ColorRGB(1, 1, 1)
)
material2.setReflectivity(1)

let material3 = new RT.Material();
material3.setAlbedo(
    new RT.ColorRGB(0.72, 0.55, 0.13)
)
material3.setReflectivity(0)

let material4 = new RT.Material();
material4.setAlbedo(
    new RT.ColorRGB(0.7, 0.05, 0.05)
)
material4.setReflectivity(0)

let material5 = new RT.Material();
material5.setAlbedo(
    new RT.ColorRGB(0.05, 0.7, 0.05)
)
material5.setReflectivity(0)

let ceil = new RT.Sphere(new RT.Point3D(0, 0, -1020), 1000, material0)
let wallL = new RT.Sphere(new RT.Point3D(-1020, 0, 0), 1000, material4)
let wallR = new RT.Sphere(new RT.Point3D(1020, 0, 0), 1000, material5)
let floor = new RT.Sphere(new RT.Point3D(0, 0, 1020), 1000, material0)
let wallB = new RT.Sphere(new RT.Point3D(0, 1020, 0), 1000, material0)
let wallF = new RT.Sphere(new RT.Point3D(0, -1020, 0), 1000, material0)

let sphere1 = new RT.Sphere(new RT.Point3D(10, -3, 14), 6, material1)
let sphere2 = new RT.Sphere(new RT.Point3D(-6, -8, 10), 10, material2)
let sphere3 = new RT.Sphere(new RT.Point3D(0, 2, 17), 3, material3)

demoScene.addObject(sphere1);
demoScene.addObject(sphere2);
demoScene.addObject(sphere3);

demoScene.addObject(floor);
demoScene.addObject(wallL);
demoScene.addObject(wallR);
demoScene.addObject(wallB);
demoScene.addObject(wallF);

demoScene.addObject(ceil);
    
let lightSource1 = new RT.LightSource(
    new RT.Point3D(0, 8, -9.3),
    0.6,
    new RT.ColorRGB(1, 1, 1),
    0.7
)

let lightSource2 = new RT.LightSource(
    new RT.Point3D(0, -8, -9.3),
    0.6,
    new RT.ColorRGB(1, 1, 1),
    0.7
)

demoScene.addLightSource(lightSource1)
demoScene.addLightSource(lightSource2)

let renderer = new RT.Renderer(demoCamera, demoScene);

// renderer.setSamplesPerPixel(1)
// renderer.setMaxRayBounceAmmount(2)

renderer.setSamplesPerPixel(128)
renderer.setMaxRayBounceAmmount(4)

window.requestAnimationFrame(() => {

    let t1 = Date.now();

    console.log("Starting the render...")

    let frame = renderer.renderScene();
    ctx.putImageData(frame, 0, 0);
    
    console.log(`Frame rendered in: ${(Date.now()-t1)/1000} seconds!`)

});