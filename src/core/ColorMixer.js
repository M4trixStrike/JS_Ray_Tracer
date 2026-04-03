import { ColorRGB } from "./ColorRGB.js";

export class ColorMixer {

    static #colors = [];

    static addColor(colorRGB) {
        this.#colors.push(colorRGB);
    }

    static averageColors() {

        let r = 0;
        let g = 0;
        let b = 0;

        this.#colors.forEach(color => {
            r += color.getR();
            g += color.getG();
            b += color.getB();
        });

        return new ColorRGB(
            r / this.#colors.length,
            g / this.#colors.length,
            b / this.#colors.length
        )

    }

    static flush() {

        this.#colors = [];

    }
}