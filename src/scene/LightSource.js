import { SceneObject } from "./SceneObject.js";

export class LightSource extends SceneObject {

    #intensity;
    #color;

    constructor(center, intensity, color) {
        super(center, null)

        this.#intensity = intensity;
        this.#color = color;

    }

    getIntensity() {

        return this.#intensity;

    }

    getColor() {

        return this.#color;

    }

}