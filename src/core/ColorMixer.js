import { ColorRGB } from "./ColorRGB.js";

export class ColorMixer {

    static #colors = [];

    static #noFlushWarning = false;

    static addColor(colorRGB) {
        this.#colors.push(colorRGB);
    }

    static averageColors() {

        if(this.#noFlushWarning) console.warn("Color bufffer hasn't been flushed since last average, please make sure that this is intentional behaviour.");

        let r = 0;
        let g = 0;
        let b = 0;

        this.#colors.forEach(color => {
            r += color.getR();
            g += color.getG();
            b += color.getB();
        });

        this.#noFlushWarning = true;

        return new ColorRGB(
            r / this.#colors.length,
            g / this.#colors.length,
            b / this.#colors.length
        )

    }

    static flush() {

        this.#noFlushWarning = false;

        this.#colors = [];

    }
}