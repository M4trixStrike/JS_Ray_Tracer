import { SceneObject } from "../SceneObject.js";
import { Vector3D } from "../../core/Vector3D.js";

export class Circle extends SceneObject {

    #normal;
    #radius

    constructor(center, radius, normal, material) {

        super(center, material)

        this.#normal = normal.norm();
        this.#radius = radius

    }

    intersect(ray) {

        let d = ray.getDirectionVector().dot(this.#normal);
        let n = Vector3D.fromPoints3D(ray.getOrigin(),this.center).dot(this.#normal);
    

        if(d == 0) return null;

        let t = n / d;

        if(t < 0) return null;

        let hitPoint = ray.getPoint3D(t);

        if(this.center.distanceFrom(hitPoint) <= this.#radius) return { closestHitPoint: hitPoint, material: this.material };
        else return null;
        

    }

    getSurfaceNormal(point,ray) {

        let cameraVector = ray.getDirectionVector().reverse();

        if(this.#normal.dot(cameraVector) < 0) return this.#normal.reverse();
        else return this.#normal;

    }

}