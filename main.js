const canv = document.getElementById("canvas");

class ColorRGB {

    #r;
    #g;
    #b;

    constructor(r, g, b) {

        this.#r = Math.min(Math.max(0, r), 1)
        this.#g = Math.min(Math.max(0, g), 1)
        this.#b = Math.min(Math.max(0, b), 1)

    }

    static from(c) {

        return new ColorRGB(
            c.getR(),
            c.getG(),
            c.getB()
        )

    }

    addRGB(colorRGB) {

        return new ColorRGB(
            this.#r + colorRGB.getR(),
            this.#g + colorRGB.getG(),
            this.#b + colorRGB.getB()
        )

    }

    add(scalar) {

        return new ColorRGB(
            Math.min(1, this.#r + scalar),
            Math.min(1, this.#g + scalar),
            Math.min(1, this.#b + scalar)
        )

    }

    averageRGB(colorRGB) {

        return new ColorRGB(
            (this.#r + colorRGB.getR()) / 2,
            (this.#g + colorRGB.getG()) / 2,
            (this.#b + colorRGB.getB()) / 2
        )

    }

    multiplyRGB(colorRGB) {

        return new ColorRGB(
            this.#r * colorRGB.getR(),
            this.#g * colorRGB.getG(),
            this.#b * colorRGB.getB()
        )

    }

    multiply(scalar) {

        return new ColorRGB(
            this.#r * scalar,
            this.#g * scalar,
            this.#b * scalar
        )

    }

    get() {
        return `rgb(${this.#r * 255},${this.#g * 255},${this.#b * 255})`
    }

    getR() {
        return this.#r;
    }

    getG() {
        return this.#g;
    }

    getB() {
        return this.#b;
    }
}

class ColorMixer {

    static #colors = [];

    static addColor(colorRGB) {
        this.#colors.push(colorRGB);
    }

    static averageColors() {

        let r = 0;
        let g = 0;
        let b = 0;

        this.#colors.forEach(color => {
            r += color.getR();
            g += color.getG();
            b += color.getB();
        });

        return new ColorRGB(
            r / this.#colors.length,
            g / this.#colors.length,
            b / this.#colors.length
        )

    }

    static flush() {

        this.#colors = [];

    }
}

class Point3D {

    #x;
    #y;
    #z;

    constructor(x, y, z) {

        this.#x = x;
        this.#y = y;
        this.#z = z;

    }

    multiply(v) {

        return new Point3D(

            this.#x * v,
            this.#y * v,
            this.#z * v

        )

    }

    vectorMove(vector, scalar) {

        return new Point3D(
            this.#x + vector.getX() * scalar,
            this.#y + vector.getY() * scalar,
            this.#z + vector.getZ() * scalar
        );

    }

    distanceFrom(point) {

        return Math.sqrt(Math.pow(this.#x - point.getX(), 2) + Math.pow(this.#y - point.getY(), 2) + Math.pow(this.#z - point.getZ(), 2))

    }

    toString() {
        return `X: ${this.#x} | Y: ${this.#y} | Z: ${this.#z}`;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    getZ() {
        return this.#z;
    }
}

class Vector3D {

    #x;
    #y;
    #z;

    constructor(x, y, z) {

        this.#x = x;
        this.#y = y;
        this.#z = z;

    }

    static fromPoints3D(p1, p2) {

        return new Vector3D(
            p2.getX() - p1.getX(),
            p2.getY() - p1.getY(),
            p2.getZ() - p1.getZ()
        );

    }

    len() {

        return Math.sqrt(Math.pow(this.#x, 2) + Math.pow(this.#y, 2) + Math.pow(this.#z, 2));

    }

    norm() {

        return new Vector3D(
            this.#x / this.len(),
            this.#y / this.len(),
            this.#z / this.len()
        )

    }

    dot(v) {

        return (
            this.#x * v.getX() +
            this.#y * v.getY() +
            this.#z * v.getZ()
        );

    }

    multiply(scalar) {

        return new Vector3D(
            this.#x * scalar,
            this.#y * scalar,
            this.#z * scalar
        )

    }

    subtract(vector3D) {

        return new Vector3D(
            this.#x - vector3D.getX(),
            this.#y - vector3D.getY(),
            this.#z - vector3D.getZ()
        )

    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    getZ() {
        return this.#z;
    }

    toString() {
        return `X: ${this.#x} | Y: ${this.#y} | Z: ${this.#z}`;
    }

}

class Ray {

    #o;
    #v;

    constructor(o, v) {

        this.#o = o;
        this.#v = v;

    }

    getPoint3D(t) {

        return new Point3D(

            this.#o.getX() + this.#v.getX() * t,
            this.#o.getY() + this.#v.getY() * t,
            this.#o.getZ() + this.#v.getZ() * t

        )

    }

    getOrigin() {
        return this.#o
    }

    getDirectionVector() {
        return this.#v
    }

}

class Material {

    #albedo;
    #reflectivity;

    setAlbedo(a) {

        this.#albedo = a;

    }

    setReflectivity(r) {

        this.#reflectivity = Math.min(Math.max(0, r), 1);

    }

    getAlbedo() {

        return this.#albedo;

    }

    getReflectivity() {

        return this.#reflectivity;

    }
}

class SceneObject {

    center;

    material

    constructor(center, material) {

        this.center = center

        this.material = material;
    }

    intersect(ray) {
        return null;
    }

    getSurfaceNormal(point) {
        return null;
    }

    setX(newX) {
        this.x = newX;
    }

    setY(newY) {
        this.y = newY;
    }

    setZ(newZ) {
        this.z = newZ;
    }

    moveX(offset) {
        this.x += offset;
    }

    moveY(offset) {
        this.y += offset;
    }

    moveZ(offset) {
        this.z += offset;
    }
}

class Sphere extends SceneObject {

    #r;

    constructor(center, radius, material) {

        super(center, material)

        this.#r = radius;

    }

    intersect(ray) {

        let d = Vector3D.fromPoints3D(this.center, ray.getOrigin());
        let v = ray.getDirectionVector();

        let a = v.dot(v);
        let b = 2 * d.dot(v);
        let c = d.dot(d) - Math.pow(this.#r, 2);

        let delta = Math.pow(b, 2) - 4 * a * c;

        if (delta < 0) return null

        let t1 = (-b + Math.sqrt(delta)) / (2 * a);
        let t2 = (-b - Math.sqrt(delta)) / (2 * a);

        let solution = [];
        if (t1 > 0) solution.push(t1);
        if (t2 > 0) solution.push(t2);

        if (solution.length === 0) return null;
        return { hitPoints: solution, material: this.material };

    }

    getSurfaceNormal(point) {

        return Vector3D.fromPoints3D(this.center, point).norm();

    }

}

class LightSource extends SceneObject {

    #intensity;
    #color;

    constructor(center, intensity, color) {
        super(center, null)

        this.#intensity = intensity;
        this.#color = color;

    }

    getIntensity() {

        return this.#intensity;

    }

    getColor() {

        return this.#color;

    }

}


class SceneCamera {

    #origin;

    #vpDist;
    #vpHeight;
    #vpWidth;

    constructor(origin, vpHeight, vpWidth, vpDist) {

        this.#origin = origin;

        this.#vpHeight = vpHeight;
        this.#vpWidth = vpWidth;
        this.#vpDist = vpDist;

    }

    getRay(viewPortPoint) {

        return new Ray(
            this.#origin,
            Vector3D.fromPoints3D(this.#origin, viewPortPoint).norm()
        );

    }

    getRayJitter(viewPortPoint) {

        let randomPoint = new Point3D(
            viewPortPoint.getX() + Math.random() - 0.5,
            viewPortPoint.getY(),
            viewPortPoint.getZ() + Math.random() - 0.5
        )

        return new Ray(
            this.#origin,
            Vector3D.fromPoints3D(this.#origin, randomPoint).norm()
        );

    }

    getVpHeight() {

        return this.#vpHeight;

    }

    getVpWidth() {

        return this.#vpWidth;

    }

    screenToVp(x, z) {

        return new Point3D(
            x - this.#vpWidth / 2,
            this.#vpDist,
            z - this.#vpHeight / 2
        )

    }

}

class Scene {

    #objectList = [];
    #lighSources = [];

    #skyboxColor;

    constructor(skyboxColor) {

        this.#skyboxColor = skyboxColor;

    }

    addObject(sceneObject) {

        this.#objectList.push(sceneObject)

    }

    addLightSource(point3D) {
        this.#lighSources.push(point3D)
    }

    getScene() {

        return this.#objectList;

    }

    getSceneLight() {

        return this.#lighSources;

    }

    getSkyboxColor() {
        return this.#skyboxColor;
    }

}

class Renderer {

    #sceneCamera;
    #scene;
    #canvas;
    #ctx;

    #max_bounces = 3;
    #samples_per_pixel = 32;

    constructor(canvas, sceneCamera, scene) {

        this.#canvas = canvas;
        this.#sceneCamera = sceneCamera;
        this.#scene = scene;

        this.#ctx = canvas.getContext("2d");

        this.canvasInit();
    }

    #castRay(ray, object) {

        let hitData = object.intersect(ray);

        if (hitData == null) return null;

        let closestHitPoint = ray.getPoint3D(Math.min(...hitData.hitPoints));

        return {

            hitPoint: closestHitPoint,
            hitMaterial: hitData.material,
            surfaceNormal: object.getSurfaceNormal(closestHitPoint),
            dist: closestHitPoint.distanceFrom(ray.getOrigin())

        }

    }

    #intersectScene(ray) {

        let closestObject = null;
        let smallestDist = Infinity;

        this.#scene.getScene().forEach(sceneObject => {

            let data = this.#castRay(ray, sceneObject);
            if (data != null && data.dist < smallestDist) {

                smallestDist = data.dist;
                closestObject = data;

            }

        });

        return closestObject;

    }

    #castShadowRay(hitData) {

        let totalLight = new ColorRGB(0, 0, 0);

        this.#scene.getSceneLight().forEach(lightSource => {

            let vectorToLight = Vector3D.fromPoints3D(hitData.hitPoint, lightSource.center);
            let distanceToLight = vectorToLight.len();
            vectorToLight = vectorToLight.norm()


            let shadowRay = new Ray(hitData.hitPoint.vectorMove(hitData.surfaceNormal, 0.00001), vectorToLight);
            let obstacle = this.#intersectScene(shadowRay);

            if (obstacle == null || obstacle.dist > distanceToLight) {

                let lambertCosine = vectorToLight.dot(hitData.surfaceNormal);

                totalLight = totalLight.addRGB(
                    lightSource.getColor().multiply(
                        Math.max(0, lambertCosine) * lightSource.getIntensity()
                    )
                );
            }

        });

        return totalLight;
    }

    renderScene() {

        let vpW = this.#sceneCamera.getVpWidth();
        let vpH = this.#sceneCamera.getVpHeight();

        for (let z = 0; z < vpH; z++) {
            for (let x = 0; x < vpW; x++) {


                let vpPoint = this.#sceneCamera.screenToVp(x, z);
                

                for (let s = 0; s < this.#samples_per_pixel; s++) {

                    let ray = this.#sceneCamera.getRayJitter(vpPoint);
                    let sampleColor = new ColorRGB(1, 1, 1); 
                    let finalColor = new ColorRGB(0, 0, 0); 

                    for (let b = 0; b < this.#max_bounces; b++) {
                        let sceneData = this.#intersectScene(ray);

                        if (sceneData == null) {
                            sampleColor = this.#scene.getSkyboxColor().multiplyRGB(sampleColor);
                            break;
                        }

                        let material = sceneData.hitMaterial;
                        let reflectivity = material.getReflectivity();
                        let albedo = ColorRGB.from(material.getAlbedo());

                        let directLight = this.#castShadowRay(sceneData);

                        let localColor = albedo.multiplyRGB(directLight)
                            .multiplyRGB(sampleColor)
                            .multiply(1 - reflectivity);

                        finalColor = finalColor.addRGB(localColor);

                        if (reflectivity > 0) {

                            sampleColor = sampleColor.multiplyRGB(albedo).multiply(reflectivity);

                            let directionVector = ray.getDirectionVector();
                            let reflectionVector = directionVector.subtract(
                                sceneData.surfaceNormal.multiply(2 * directionVector.dot(sceneData.surfaceNormal))
                            ).norm();

                            ray = new Ray(sceneData.hitPoint.vectorMove(sceneData.surfaceNormal, 0.0001), reflectionVector);
                        } 
                        else break;
                    }
                    ColorMixer.addColor(finalColor);
                }

                this.#ctx.fillStyle = ColorMixer.averageColors().get();
                ColorMixer.flush();
                this.#ctx.fillRect(x, z, 1, 1);
            }
        }

    }

    canvasInit() {

        this.#canvas.width = this.#sceneCamera.getVpWidth();
        this.#canvas.height = this.#sceneCamera.getVpHeight();

    }
}

// DEMO SCENE

let demoCamera = new SceneCamera(
    new Point3D(0, -25, 0),
    300,
    300,
    300 / (2 * Math.tan((70 * Math.PI) / 180 / 2))
)

let demoScene = new Scene(new ColorRGB(0, 0, 0));

let wallMaterial = new Material();
wallMaterial.setAlbedo(
    new ColorRGB(0.85, 0.85, 0.85)
)
wallMaterial.setReflectivity(0.1)

let material1 = new Material();
material1.setAlbedo(
    new ColorRGB(0.85, 0.15, 0.15)
)
material1.setReflectivity(1)

let material2 = new Material();
material2.setAlbedo(
    new ColorRGB(0.40, 0.80, 0.05)
)
material2.setReflectivity(0)

let material3 = new Material();
material3.setAlbedo(
    new ColorRGB(0.1, 0.2, 0.8)
)
material3.setReflectivity(0.5)

let ceil = new Sphere(new Point3D(0, 0, -1010), 1000, wallMaterial)
let wallL = new Sphere(new Point3D(-1010, 0, 0), 1000, wallMaterial)
let wallR = new Sphere(new Point3D(1010, 0, 0), 1000, wallMaterial)
let floor = new Sphere(new Point3D(0, 0, 1010), 1000, wallMaterial)
let wallB = new Sphere(new Point3D(0, 1010, 0), 1000, wallMaterial)

let sphere1 = new Sphere(new Point3D(-6, 6, 7), 2.5, material1)
let sphere2 = new Sphere(new Point3D(3, 2, 4), 5, material2)
let sphere3 = new Sphere(new Point3D(-2, -3, 8), 3, material3)

demoScene.addObject(sphere1);
demoScene.addObject(sphere2);
demoScene.addObject(sphere3);

demoScene.addObject(floor);
demoScene.addObject(wallL);
demoScene.addObject(wallR);
demoScene.addObject(wallB);
demoScene.addObject(ceil);

let lightSource1 = new LightSource(
    new Point3D(0, 6, -7),
    0.6,
    new ColorRGB(1, 1, 1)
)

let lightSource2 = new LightSource(
    new Point3D(0, -6, -7),
    0.6,
    new ColorRGB(1, 1, 1)
)

demoScene.addLightSource(lightSource1)
demoScene.addLightSource(lightSource2)


let renderer = new Renderer(canv, demoCamera, demoScene);
renderer.renderScene();