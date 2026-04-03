export class ColorRGB {

    #r;
    #g;
    #b;

    constructor(r, g, b) {

        this.#r = Math.min(Math.max(0, r), 1)
        this.#g = Math.min(Math.max(0, g), 1)
        this.#b = Math.min(Math.max(0, b), 1)

    }

    static from(c) {

        return new ColorRGB(
            c.getR(),
            c.getG(),
            c.getB()
        )

    }

    addRGB(colorRGB) {

        return new ColorRGB(
            this.#r + colorRGB.getR(),
            this.#g + colorRGB.getG(),
            this.#b + colorRGB.getB()
        )

    }

    add(scalar) {

        return new ColorRGB(
            Math.min(1, this.#r + scalar),
            Math.min(1, this.#g + scalar),
            Math.min(1, this.#b + scalar)
        )

    }

    averageRGB(colorRGB) {

        return new ColorRGB(
            (this.#r + colorRGB.getR()) / 2,
            (this.#g + colorRGB.getG()) / 2,
            (this.#b + colorRGB.getB()) / 2
        )

    }

    multiplyRGB(colorRGB) {

        return new ColorRGB(
            this.#r * colorRGB.getR(),
            this.#g * colorRGB.getG(),
            this.#b * colorRGB.getB()
        )

    }

    multiply(scalar) {

        return new ColorRGB(
            this.#r * scalar,
            this.#g * scalar,
            this.#b * scalar
        )

    }

    get() {
        return `rgb(${this.#r * 255},${this.#g * 255},${this.#b * 255})`
    }

    getR() {
        return this.#r;
    }

    getG() {
        return this.#g;
    }

    getB() {
        return this.#b;
    }
}