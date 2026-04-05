import { SceneObject } from "../SceneObject.js";
import { Vector3D } from "../../core/Vector3D.js";

export class Circle extends SceneObject {

    #normal;
    #radius

    constructor(center, radius, normal, material) {

        super(center, material)

        this.#normal = normal;
        this.#radius = radius

    }

    intersect(ray) {

        let n = Vector3D.fromPoints3D(ray.getOrigin(),this.center).dot(this.#normal);
        let d = ray.getDirectionVector().dot(this.#normal);

        if(n * d == 0) return null;

        let t = n / d;

        if(t < 0) return null;

        let hitPoint = ray.getPoint3D(t);

        if(this.center.distanceFrom(hitPoint) <= this.#radius) return { closestHitPoint: hitPoint, material: this.material };
        else return null;

    }

    getSurfaceNormal(point) {

        return this.#normal;

    }

}