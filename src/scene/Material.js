import { ColorRGB } from "../core/ColorRGB.js";

export class Material {

    #albedo = new ColorRGB(1,1,1);
    #reflectivity = 0;
    #specularIntensity = 0;
    #phongExp = 0;

    setAlbedo(a) {

        this.#albedo = a;

    }

    setSpecularIntensity(s) {

        this.#specularIntensity = s;

    }

    setPhongExponent(e) {

        this.#phongExp = e;

    }

    setReflectivity(r) {

        this.#reflectivity = Math.min(Math.max(0, r), 1);

    }

    getAlbedo() {

        return this.#albedo;

    }

    getSpecularIntensity(){

        return this.#specularIntensity;

    }

    getPhongExponent(){

        return this.#phongExp;

    }

    getReflectivity() {

        return this.#reflectivity;

    }
}