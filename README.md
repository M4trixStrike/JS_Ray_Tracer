# JS Ray Tracer

This project is a simple ray tracer written in pure JavaScript. The rendering engine runs entirely on the CPU (duh). 

## Demos

<p align="center">
<img width="300" height="300" alt="render3" src="https://github.com/user-attachments/assets/aa8c975b-3a7d-440e-97af-018f0f3be3db" />
<br/>
(512 samples per pixel, 300x300, 4 max bounces, render time: 153 seconds)
<br/>
<br/>
<img width="300" height="300" alt="render4" src="https://github.com/user-attachments/assets/e1ce193f-4dc0-4a63-9971-b92edf4a4ab0" />
<br/>
(512 samples per pixel, 300x300, 4 max bounces, render time: 222 seconds)
<br/>
<br/>
<img width="300" height="300" alt="Animation" src="https://github.com/user-attachments/assets/61b1a946-aac5-4e5f-a0f9-e6844cd85ba1" />
<br/>
(The engine can also be used to render animations)
</p>



## Features

<ul>

  <li>Geometry</li>
  <ul>
    <li>Cylinders</li>
    <li>Spheres</li>
    <li>Cubes</li>
    <li>Planes</li>
    <li>Circles</li>
  </ul>

  <li>Camera</li>
  <ul>
    <li>Rotation in the X, Y and Z axis</li>
    <li>Adjustable FOV</li>
  </ul>

   <li>Rendering</li>
  <ul>
    <li>Reflective materials</li>
    <li>Specular reflections</li>
    <li>Diffuse materials</li>
    <li>Anti-aliasing</li>
    <li>Colored lights</li>
    <li>Soft shadows</li>
    <li>Gamma correction</li>
    <li>Dithering</li>
    <li>Mutlisampling</li>
  </ul>

</ul>

## How to run
This application relies on JavaScript modules to link files. Because of this, it must be served over HTTP or HTTPS.
<br/>
### Before you start:
**1.** Run the `npm install` command to download dependencies. <br/>
**2.** Start a local development server (for example, using `Live Server`, `http-server`, or any similar tool). <br/>
**3.** Open the project in your browser via the local server URL. <br/>

There are already demo scenes included in the `DemoScenes` folder. 

## Rendering your own scene
If you want to use your own scene:
- Replace the contents of currently used demo scene **or**
- Create a new scene file, import `RayTracer.js` and update the `<script>` tag in the HTML file to point to it.
- `renderScene()` method returns an instance of `ImageData`
