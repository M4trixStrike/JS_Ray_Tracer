// DEMO SCENE
import * as RT from "./src/RayTracer.js";

const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");

canv.width = 300;
canv.height = 300; 

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
material1.setReflectivity(0.6)

let material2 = new RT.Material();
material2.setAlbedo(
    new RT.ColorRGB(1, 1, 1)
)
material2.setReflectivity(1)

let material3 = new RT.Material();
material3.setAlbedo(
    new RT.ColorRGB(0.15, 0.85, 0.2)
)
material3.setReflectivity(0)

let ceil = new RT.Sphere(new RT.Point3D(0, 0, -1010), 1000, wallMaterial)
let wallL = new RT.Sphere(new RT.Point3D(-1010, 0, 0), 1000, wallMaterial)
let wallR = new RT.Sphere(new RT.Point3D(1010, 0, 0), 1000, wallMaterial)
let floor = new RT.Sphere(new RT.Point3D(0, 0, 1010), 1000, wallMaterial)
let wallB = new RT.Sphere(new RT.Point3D(0, 1010, 0), 1000, wallMaterial)

let sphere1 = new RT.Sphere(new RT.Point3D(-6, -7, 7), 2.5, material1)
let sphere2 = new RT.Sphere(new RT.Point3D(3, 2, 4), 5, material2)
//let sphere3 = new RT.Sphere(new RT.Point3D(-5, -5, 1), 3, material3)

let sphere3 = new RT.Sphere(new RT.Point3D(3, -7, 6), 3, material3)

// x ( - l | + p)
// y ( - t | + p)
// z ( - g | + d)

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
    new RT.ColorRGB(1, 1, 1),
    0.3
)

let lightSource2 = new RT.LightSource(
    new RT.Point3D(0, -6, -7),
    0.6,
    new RT.ColorRGB(1, 1, 1),
    0.3
)

demoScene.addLightSource(lightSource1)
demoScene.addLightSource(lightSource2)


let renderer = new RT.Renderer(demoCamera, demoScene);

//renderer.setMaxRayBounceAmmount(4)
//renderer.setSamplesPerPixel(32);

window.requestAnimationFrame(() => {

    let frame = renderer.renderScene();
    ctx.putImageData(frame, 0, 0);

});

//renderer.setSamplesPerPixel(1)

// let renderedFrames = [];

// let maxFrames = 200

// for(let currentFrame=0; currentFrame < maxFrames; currentFrame++){
    
//     let t1 = Date.now();
    
//     let frame = renderer.renderScene();

//     let delta = (Date.now() - t1) / 1000;

//     console.log(`Rendered frame ${currentFrame + 1} of ${maxFrames} in ${delta.toFixed(2)} seconds. Approximate time to finish: ${(((maxFrames - currentFrame - 1) * delta)/60).toFixed(2)} minutes.`)

//     let x =  0.15 * Math.sin( 2 * Math.PI * ( currentFrame / (maxFrames - 1) ) )

//     sphere3.moveX( x );

//     renderedFrames.push(frame)
// }

// let currentFrame = 0;

// function animate(){

//     ctx.putImageData(renderedFrames[currentFrame], 0, 0);

//     currentFrame++;

//     if(currentFrame >= renderedFrames.length) currentFrame = 0;

//     window.requestAnimationFrame(animate);
// }

// animate();