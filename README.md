# JS Ray Tracer
<p align="center">
<img width="300" height="300" alt="render1" src="https://github.com/user-attachments/assets/bef8ddca-9b88-4545-9917-160a8b7da36b"/> <br/>
(512 samples, 300x300, 4 max bounces, render time: 326 seconds)
</p>

This project is a simple ray tracer written in pure JavaScript. The rendering engine runs entirely on the CPU (duh). 

## Features

<ul>

  <li>Geometry</li>
  <ul>
    <li>Spheres</li>
  </ul>

  <li>Camera</li>
  <ul>
    <li>Rotation in the X, Y and Z axis</li>
    <li>Adjustable FOV</li>
  </ul>

   <li>Rendering</li>
  <ul>
    <li>Reflective materials</li>
    <li>Diffuse materials</li>
    <li>anti-aliasing</li>
    <li>Colored lights</li>
    <li>Area lights</li>
    <li>Soft shadows</li>
  </ul>

  </ul>

</ul>

## How to run
This application relies on JavaScript modules to link files. Because of this, it must be served over HTTP or HTTPS.
<br/>
### Steps:
**1.** Start a local development server (for example, using `Live Server`, `http-server`, or any similar tool). <br/>
**2.** Open the project in your browser via the local server URL. <br/>
There is already a demo scene included in the `DemoScene.js` file. 

## Rendering your own scene
If you want to use your own scene:
- Replace the contents of DemoScene.js **or**
- Create a new scene file and update the `<script>` tag in the HTML file to point to it.
