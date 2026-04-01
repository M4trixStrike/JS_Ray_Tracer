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

    from(c){

        this.#r = v.getR;
        this.#g = v.getG;
        this.#b = v.getB;

    }

    multiply(colorRGB){

        this.#r *= colorRGB.getR();
        this.#r *= colorRGB.getG();
        this.#r *= colorRGB.getB();

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
        this.#x *= scalar;
        this.#y *= scalar;
        this.#z *= scalar;
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

        this.albedo = a;

    }

    setReflectivity(r){

        this.reflectivity = Math.min(Math.max(0, r), 1);

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

        let t0 = ( -b ) / ( 2 * a );
        let t1 = ( -b + Math.sqrt(delta) ) / ( 2 * a );
        let t2 = ( -b - Math.sqrt(delta) ) / ( 2 * a );

        if(delta < 0) return null
        else if (delta = 0) return {hitPoints: [ t0 ], material: this.material}
        else return { hitPoints: [ t1, t2 ], material: this.material }

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

    #skyboxColor;

    constructor(skyboxColor){

        this.#skyboxColor = skyboxColor;

    }

    addObject(sceneObject){

        this.#objectList.push(sceneObject)

    }

    getScene(){

        return this.#objectList;

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

    constructor(canvas, sceneCamera, scene){

        this.#canvas = canvas;
        this.#sceneCamera = sceneCamera;
        this.#scene = scene;

        this.#ctx = canvas.getContext("2d");

        this.canvasInit();
    }

    castRay(ray, object){

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

    renderScene(){

        let vpW = this.#sceneCamera.getVpWidth();
        let vpH = this.#sceneCamera.getVpHeight();

        for(let z = 0; z < vpH; z++){
            for(let x = 0; x < vpW; x++){
                
                let viewPortCoords = this.#sceneCamera.screenToVp(x,z);
                let ray = this.#sceneCamera.getRay(viewPortCoords);

                let objectHit = false;

                this.#scene.getScene().forEach( object => {

                    let hitData = this.castRay(ray, object);


                    if(hitData != null) objectHit = true;
                    

                })

                if(objectHit) this.#ctx.fillStyle = "red"
                else this.#ctx.fillStyle = "black";

                this.#ctx.fillRect(x,z,1,1)
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
mat1.setReflectivity(0.1)

let testSphere = new Sphere(new Point3D(0,0,0),4,mat1)

let testCamera = new SceneCamera(
    new Point3D(0,-5,0),
    300,
    300,
    45
)

let testScene = new Scene();
testScene.addObject(testSphere);

let testRenderer = new Renderer(canv,testCamera,testScene);
testRenderer.renderScene();