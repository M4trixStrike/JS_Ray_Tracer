import { SceneObject } from "../SceneObject.js";
import { Vector3D } from "../../core/Vector3D.js";

export class Cube extends SceneObject {

    #a;
    #u = new Vector3D(1,0,0);
    #v = new Vector3D(0,1,0);
    #w = new Vector3D(0,0,1);


    constructor(center, a, material) {

        super(center, material)
        this.#a = a;

    }

    rotate(x,y,z){

        this.#u = this.#u.rotateX(x);
        this.#u = this.#u.rotateY(y);
        this.#u = this.#u.rotateZ(z);

        this.#v = this.#v.rotateX(x);
        this.#v = this.#v.rotateY(y);
        this.#v = this.#v.rotateZ(z);

        this.#w = this.#w.rotateX(x);
        this.#w = this.#w.rotateY(y);
        this.#w = this.#w.rotateZ(z);

    }


    intersect(ray) {

        let Po = ray.getOrigin();
        let Dv = ray.getDirectionVector();

        let tu1 = Vector3D.fromPoints3D(Po,this.center).subtract(this.#u.multiply( this.#a / 2)).dot(this.#u) / Dv.dot( this.#u );
        let tu2 = Vector3D.fromPoints3D(Po,this.center).add(this.#u.multiply( this.#a / 2)).dot(this.#u) / Dv.dot( this.#u );;

        let tuMin = Math.min(tu1,tu2);
        let tuMax = Math.max(tu1,tu2);

        let tv1 = Vector3D.fromPoints3D(Po,this.center).subtract(this.#v.multiply( this.#a / 2)).dot(this.#v) / Dv.dot( this.#v );
        let tv2 = Vector3D.fromPoints3D(Po,this.center).add(this.#v.multiply( this.#a / 2)).dot(this.#v) / Dv.dot( this.#v );

        let tvMin = Math.min(tv1,tv2);
        let tvMax = Math.max(tv1,tv2);

        let tw1 = Vector3D.fromPoints3D(Po,this.center).subtract(this.#w.multiply( this.#a / 2)).dot(this.#w) / Dv.dot( this.#w );
        let tw2 = Vector3D.fromPoints3D(Po,this.center).add(this.#w.multiply( this.#a / 2)).dot(this.#w) / Dv.dot( this.#w );

        let twMin = Math.min(tw1,tw2);
        let twMax = Math.max(tw1,tw2);

        let tEnter = Math.max(tuMin,tvMin,twMin);
        let tExit = Math.min(tuMax,tvMax,twMax);

        if( tEnter <= tExit && tExit >= 0) return { closestHitPoint: ray.getPoint3D(tEnter), material: this.material };
        else return null;

    }

    getSurfaceNormal(point,ray) {

        let hitVec = Vector3D.fromPoints3D(this.center,point)

        let dU = hitVec.dot(this.#u);
        let dV = hitVec.dot(this.#v);
        let dW = hitVec.dot(this.#w);

        let s = this.#a / 2;

        let normal;

        if (Math.abs(Math.abs(dU) - s) < 0.00001) {
            normal = this.#u.multiply(Math.sign(dU));
        } 
        else if (Math.abs(Math.abs(dV) - s) < 0.00001) {
            normal = this.#v.multiply(Math.sign(dV));
        } 
        else normal = this.#w.multiply(Math.sign(dW));

        let cameraVector = ray.getDirectionVector().reverse();

        if(normal.dot(cameraVector) < 0) return normal.reverse();
        else return normal;
    }

}