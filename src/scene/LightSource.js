import { SceneObject } from "./SceneObject.js";

export class LightSource extends SceneObject {

    #intensity;
    #color;
    #radius;

    constructor(center, intensity, color, radius) {
        super(center, null)

        this.#intensity = intensity;
        this.#color = color;
        this.#radius = radius;

    }

    getIntensity() {

        return this.#intensity;

    }

    getColor() {

        return this.#color;

    }

    getRadius() {

        return this.#radius;

    }

}