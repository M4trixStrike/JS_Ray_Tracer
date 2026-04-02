const canv = document.getElementById("canvas");

class ColorRGB{

    #r;
    #g;
    #b;

    constructor(r,g,b){

        this.#r = Math.min(Math.max(0, r), 1)
        this.#g = Math.min(Math.max(0, g), 1)
        this.#b = Math.min(Math.max(0, b), 1)

    }

    static from(c){

        return new ColorRGB(
            c.getR(),
            c.getG(),
            c.getB()
        )

    }

    multiplyRGB(colorRGB){

        this.#r *= colorRGB.getR();
        this.#g *= colorRGB.getG();
        this.#b *= colorRGB.getB();

    }

    multiply(scalar){

        this.#r *= scalar;
        this.#g *= scalar;
        this.#b *= scalar;

    }

    get(){
        return `rgb(${this.#r*255},${this.#g*255},${this.#b*255})`
    }

    getR(){
        return this.#r;
    }

    getG(){
        return this.#g;
    }

    getB(){
        return this.#b;
    }
}

class Point3D{

    #x;
    #y;
    #z;

    constructor(x,y,z){

        this.#x = x;
        this.#y = y;
        this.#z = z;

    }

    multiply(v){

        return new Point3D(

            this.#x * v,
            this.#y * v,
            this.#z * v

        )

    }

    distanceFrom(point){

        return Math.sqrt( Math.pow(this.#x - point.getX(), 2) + Math.pow(this.#y - point.getY(), 2) + Math.pow(this.#z - point.getZ(), 2) )

    }

    toString(){
        return `X: ${this.#x} | Y: ${this.#y} | Z: ${this.#z}`;
    }

    getX(){
        return this.#x;
    }

    getY(){
        return this.#y;
    }

    getZ(){
        return this.#z;
    }
}

class Vector3D{

    #x;
    #y;
    #z;

    constructor(x,y,z){

        this.#x = x;
        this.#y = y;
        this.#z = z;

    }

    static fromPoints3D(p1,p2){

        return new Vector3D(
            p2.getX() - p1.getX(),
            p2.getY() - p1.getY(),
            p2.getZ() - p1.getZ()
        );

    }

    len(){

        return Math.sqrt( Math.pow(this.#x,2) + Math.pow(this.#y,2) + Math.pow(this.#z,2) );

    }

    norm(){

        return new Vector3D(
            this.#x / this.len(),
            this.#y / this.len(),
            this.#z / this.len()
        )

    }

    dot(v){

        return (
            this.#x * v.getX() +
            this.#y * v.getY() +
            this.#z * v.getZ()
        );

    }

    multiply(scalar){

        return new Vector3D(
            this.#x * scalar,
            this.#y * scalar,
            this.#z * scalar
        )

    }

    getX(){
        return this.#x;
    }

    getY(){
        return this.#y;
    }

    getZ(){
        return this.#z;
    }

    toString(){
        return `X: ${this.#x} | Y: ${this.#y} | Z: ${this.#z}`;
    }

}

class Ray{

    #o;
    #v;

    constructor(o,v){

        this.#o = o;
        this.#v = v;

    }

    getPoint3D(t){

        return new Point3D(

            this.#o.getX() + this.#v.getX() * t,
            this.#o.getY() + this.#v.getY() * t,
            this.#o.getZ() + this.#v.getZ() * t

        )

    }

    getOrigin(){
        return this.#o
    }

    getDirectionVector(){
        return this.#v
    }

}

class Material{

    #albedo;
    #reflectivity;

    setAlbedo(a){

        this.#albedo = a;

    }

    setReflectivity(r){

        this.#reflectivity = Math.min(Math.max(0, r), 1);

    }

    getAlbedo(){

        return this.#albedo;

    }

    getReflectivity(){

        return this.#reflectivity;

    }
}

class SceneObject{

    center;

    material

    constructor(center,material){

        this.center = center

        this.material = material;
    }

    intersect(ray){
        return 0;
    }

    setX(newX){
        this.x = newX;
    }

    setY(newY){
        this.y = newY;
    }

    setZ(newZ){
        this.z = newZ;
    }

    moveX(offset){
        this.x += offset;
    }

    moveY(offset){
        this.y += offset;
    }

    moveZ(offset){
        this.z += offset;
    }
}

class Sphere extends SceneObject{

    #r;

    constructor(center,radius,material){

        super(center,material)

        this.#r = radius;

    }

    intersect(ray){

        let d = Vector3D.fromPoints3D(this.center,ray.getOrigin());
        let v = ray.getDirectionVector();

        let a = v.dot(v);
        let b = 2 * d.dot(v);
        let c = d.dot(d) - Math.pow(this.#r, 2);

        let delta = Math.pow(b, 2) - 4 * a * c;

        if(delta < 0) return null

        let t1 = ( -b + Math.sqrt(delta) ) / ( 2 * a );
        let t2 = ( -b - Math.sqrt(delta) ) / ( 2 * a );

        let hits = [];
        if (t1 > 0) hits.push(t1);
        if (t2 > 0) hits.push(t2);

        if (hits.length === 0) return null;
        return { hitPoints: hits, material: this.material };

    }

}

class LightSource extends SceneObject{

    constructor(center){
        super(center, null)
    }

}


class SceneCamera{

    #origin;

    #vpDist;
    #vpHeight;
    #vpWidth;

    constructor(origin,vpHeight,vpWidth,vpDist){

        this.#origin = origin;

        this.#vpHeight = vpHeight;
        this.#vpWidth = vpWidth;
        this.#vpDist = vpDist;

    }

    getRay(viewPortPoint){

        return new Ray(
            this.#origin,
            Vector3D.fromPoints3D(this.#origin,viewPortPoint).norm()
        );

    }

    getVpHeight(){

        return this.#vpHeight;

    }

    getVpWidth(){

        return this.#vpWidth;

    }

    screenToVp(x,z){

        return new Point3D(
            x - this.#vpWidth/2,
            this.#vpDist,
            z - this.#vpHeight/2
        )

    }

}

class Scene{

    #objectList = [];
    #lighSources = [];

    #skyboxColor;

    constructor(skyboxColor){

        this.#skyboxColor = skyboxColor;

    }

    addObject(sceneObject){

        this.#objectList.push(sceneObject)

    }

    addLightSource(point3D){
        this.#lighSources.push(point3D)
    }

    getScene(){

        return this.#objectList;

    }

    getSceneLight(){

        return this.#lighSources;

    }

    getSkyboxColor(){
        return this.#skyboxColor;
    }

}

class Renderer{

    #sceneCamera;
    #scene;
    #canvas;
    #ctx;

    #max_bounces = 1;

    constructor(canvas, sceneCamera, scene){

        this.#canvas = canvas;
        this.#sceneCamera = sceneCamera;
        this.#scene = scene;

        this.#ctx = canvas.getContext("2d");

        this.canvasInit();
    }

    #castRay(ray, object){

        let hitData = object.intersect(ray);

        if(hitData == null) return null;

        let closestHitPoint =  ray.getPoint3D( Math.min( ...hitData.hitPoints ) );

        return {

            hitPoint: closestHitPoint,
            hitMaterial: hitData.material,
            surfaceNormal: Vector3D.fromPoints3D(object.center,closestHitPoint).norm(),
            dist: closestHitPoint.distanceFrom(ray.getOrigin())

        }

    }

    #intersectScene(ray){

        let closestObject = null;
        let smallestDist = Infinity;

        this.#scene.getScene().forEach( sceneObject => {

            let data = this.#castRay(ray,sceneObject);
            if(data != null && data.dist < smallestDist){

                smallestDist = data.dist;
                closestObject = data;

            }

        });

        return closestObject;

    }

    #castShadowRay(hitData) {

        let totalLight = 0;

        this.#scene.getSceneLight().forEach(lightSource => {

            let vectorToLight = Vector3D.fromPoints3D(hitData.hitPoint, lightSource.center);
            let distanceToLight = vectorToLight.len();
            vectorToLight = vectorToLight.norm()

            let offsetPoint = new Point3D(
                hitData.hitPoint.getX() + hitData.surfaceNormal.getX() * 0.00001,
                hitData.hitPoint.getY() + hitData.surfaceNormal.getY() * 0.00001,
                hitData.hitPoint.getZ() + hitData.surfaceNormal.getZ() * 0.00001
            );

            let shadowRay = new Ray(offsetPoint, vectorToLight);
            let obstacle = this.#intersectScene(shadowRay);

            if (obstacle == null || obstacle.dist > distanceToLight) {
                let lambertCosine = vectorToLight.dot(hitData.surfaceNormal);
                totalLight += Math.max(0, lambertCosine);
            }

        });

        return totalLight;
    }

    renderScene(){

        let vpW = this.#sceneCamera.getVpWidth();
        let vpH = this.#sceneCamera.getVpHeight();

        for(let z = 0; z < vpH; z++){
            for(let x = 0; x < vpW; x++){
                
                let vpPoint = this.#sceneCamera.screenToVp(x,z);
                let ray = this.#sceneCamera.getRay(vpPoint);

                let brightness = 0;
                let color = new ColorRGB(1,1,1);
                
                let sceneData = this.#intersectScene(ray);

                if(sceneData == null) color = this.#scene.getSkyboxColor();
                else{

                    let materialColor = ColorRGB.from(sceneData.hitMaterial.getAlbedo());
                    materialColor.multiply(1 - sceneData.hitMaterial.getReflectivity());

                    color.multiplyRGB(materialColor);
                    brightness = this.#castShadowRay(sceneData);

                    color.multiply(brightness)

                }
                
                this.#ctx.fillStyle = color.get();
                this.#ctx.fillRect(x,z,1,1);
            }
        }

    }

    canvasInit(){

        this.#canvas.width = this.#sceneCamera.getVpWidth();
        this.#canvas.height = this.#sceneCamera.getVpHeight();

    }
}

let mat1 = new Material();
mat1.setAlbedo(
    new ColorRGB(0.5,0.2,0)
)
mat1.setReflectivity(0)

let mat2 = new Material();
mat2.setAlbedo(
    new ColorRGB(1,0,0)
)
mat2.setReflectivity(0)

let mat3 = new Material();
mat3.setAlbedo(
    new ColorRGB(0,1,0)
)
mat3.setReflectivity(0)


let testSphere1 = new Sphere(new Point3D(0,0,0),10,mat1)

let testSphere2 = new Sphere(new Point3D(10,-14,0),2,mat2)

let testSphere3 = new Sphere(new Point3D(-10,0,0),2,mat3)

let testCamera = new SceneCamera(
    new Point3D(0,-40,0),
    500,
    500,
    300 / (2 * Math.tan(70/2))
)

let testScene = new Scene(new ColorRGB(0,0,0));

testScene.addObject(testSphere1);
testScene.addObject(testSphere2);
//testScene.addObject(testSphere3);

let testLightSource1 = new LightSource(new Point3D(
    16,
    -24,
    0
))


testScene.addLightSource(testLightSource1)
//testScene.addLightSource(testLightSource2)

let testRenderer = new Renderer(canv,testCamera,testScene);
testRenderer.renderScene();