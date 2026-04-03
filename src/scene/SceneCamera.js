import { Point3D } from "../core/Point3D.js";
import { Ray } from "../core/Ray.js";
import { Vector3D } from "../core/Vector3D.js";

export class SceneCamera {

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