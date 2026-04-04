import { Point3D } from "../core/Point3D.js";
import { Ray } from "../core/Ray.js";
import { Vector3D } from "../core/Vector3D.js";

export class SceneCamera {

    #origin;
    #vpDist;
    #vpHeight;
    #vpWidth;

    #thetaX = 0;
    #thetaY = 0;
    #thetaZ = 0;

    constructor(origin, resolution, FOV) {

        this.#origin = origin;

        this.#vpHeight = resolution;
        this.#vpWidth = resolution;

        this.#vpDist = resolution / ( 2 * Math.tan( ( FOV / 2 ) * 180 / Math.PI ) );

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

        let finalX = x - this.#vpWidth / 2;
        let finalY = this.#vpDist;
        let finalZ = z - this.#vpHeight / 2;

        if (this.#thetaX !== 0) {
            let tempY = finalY * Math.cos(this.#thetaX) - finalZ * Math.sin(this.#thetaX);
            let tempZ = finalY * Math.sin(this.#thetaX) + finalZ * Math.cos(this.#thetaX);
            finalY = tempY;
            finalZ = tempZ;
        }

        if (this.#thetaY !== 0) {
            let tempX = finalX * Math.cos(this.#thetaY) + finalZ * Math.sin(this.#thetaY);
            let tempZ = -finalX * Math.sin(this.#thetaY) + finalZ * Math.cos(this.#thetaY);
            finalX = tempX;
            finalZ = tempZ;
        }

        if (this.#thetaZ !== 0) {
            let tempX = finalX * Math.cos(this.#thetaZ) - finalY * Math.sin(this.#thetaZ);
            let tempY = finalX * Math.sin(this.#thetaZ) + finalY * Math.cos(this.#thetaZ);
            finalX = tempX;
            finalY = tempY;
        }

        return new Point3D(
            finalX + this.#origin.getX(),
            finalY + this.#origin.getY(),
            finalZ + this.#origin.getZ()
        );

    }

    rotateX(a){

        this.#thetaX = a * Math.PI / 180;

    }

    rotateY(a){

        this.#thetaY = a * Math.PI / 180

    }

    rotateZ(a){

        this.#thetaZ = a * Math.PI / 180;

    }

}