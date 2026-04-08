import { SceneObject } from "../SceneObject.js";
import { Vector3D } from "../../core/Vector3D.js";

export class Sphere extends SceneObject {

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

        let solution = Math.min(t1,t2)

        if (solution < 0) return null;

        let hitPoint = ray.getPoint3D(solution)

        return { closestHitPoint: hitPoint, material: this.material };

    }

    getSurfaceNormal(point, ray) {

        return Vector3D.fromPoints3D(this.center, point).norm();

    }

}
