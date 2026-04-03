import {Point3D} from "./Point3D.js";

export class Ray {

    #o;
    #v;

    constructor(o, v) {

        this.#o = o;
        this.#v = v;

    }

    getPoint3D(t) {

        return new Point3D(

            this.#o.getX() + this.#v.getX() * t,
            this.#o.getY() + this.#v.getY() * t,
            this.#o.getZ() + this.#v.getZ() * t

        )

    }

    getOrigin() {
        return this.#o
    }

    getDirectionVector() {
        return this.#v
    }

}