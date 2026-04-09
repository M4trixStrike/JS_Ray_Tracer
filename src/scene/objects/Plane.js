import { SceneObject } from "../SceneObject.js";
import { Vector3D } from "../../core/Vector3D.js";

export class Plane extends SceneObject {

    #normal;

    constructor(center, normal, material) {

        super(center, material)

        this.#normal = normal.norm();

    }

    rotate(x,y,z){

        this.#normal = this.#normal.rotateX(x);
        this.#normal = this.#normal.rotateY(y);
        this.#normal = this.#normal.rotateZ(z);

    }

    intersect(ray) {

        let n = Vector3D.fromPoints3D(ray.getOrigin(),this.center).dot(this.#normal);
        let d = ray.getDirectionVector().dot(this.#normal);

        if(n * d == 0) return null;

        let t = n / d;

        if(t < 0) return null;

        return { closestHitPoint: ray.getPoint3D(t), material: this.material };

    }

    getSurfaceNormal(point, ray) {

        let cameraVector = ray.getDirectionVector().reverse();

        if(this.#normal.dot(cameraVector) < 0) return this.#normal.reverse();
        else return this.#normal;

    }

}