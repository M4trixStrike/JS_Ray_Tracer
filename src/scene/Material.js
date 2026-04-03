export class Material {

    #albedo;
    #reflectivity;

    setAlbedo(a) {

        this.#albedo = a;

    }

    setReflectivity(r) {

        this.#reflectivity = Math.min(Math.max(0, r), 1);

    }

    getAlbedo() {

        return this.#albedo;

    }

    getReflectivity() {

        return this.#reflectivity;

    }
}