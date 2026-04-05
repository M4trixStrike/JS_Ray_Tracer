import { SceneObject } from "../SceneObject.js";
import { Vector3D } from "../../core/Vector3D.js";

export class Plane extends SceneObject {

    #normal;

    constructor(center, normal, material) {

        super(center, material)

        this.#normal = normal;

    }

    intersect(ray) {

        let n = Vector3D.fromPoints3D(ray.getOrigin(),this.center).dot(this.#normal);
        let d = ray.getDirectionVector().dot(this.#normal);

        if(n * d == 0) return null;

        let t = n / d;

        if(t < 0) return null;

        return { closestHitPoint: ray.getPoint3D(t), material: this.material };

    }

    getSurfaceNormal(point) {

        return this.#normal;

    }

}