export class Vector3D {

    #x;
    #y;
    #z;

    constructor(x, y, z) {

        this.#x = x;
        this.#y = y;
        this.#z = z;

    }

    static fromPoints3D(p1, p2) {

        return new Vector3D(
            p2.getX() - p1.getX(),
            p2.getY() - p1.getY(),
            p2.getZ() - p1.getZ()
        );

    }

    len() {

        return Math.sqrt(Math.pow(this.#x, 2) + Math.pow(this.#y, 2) + Math.pow(this.#z, 2));

    }

    norm() {

        return new Vector3D(
            this.#x / this.len(),
            this.#y / this.len(),
            this.#z / this.len()
        )

    }

    dot(v) {

        return (
            this.#x * v.getX() +
            this.#y * v.getY() +
            this.#z * v.getZ()
        );

    }

    multiply(scalar) {

        return new Vector3D(
            this.#x * scalar,
            this.#y * scalar,
            this.#z * scalar
        )

    }

    subtract(vector3D) {

        return new Vector3D(
            this.#x - vector3D.getX(),
            this.#y - vector3D.getY(),
            this.#z - vector3D.getZ()
        )

    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    getZ() {
        return this.#z;
    }

    toString() {
        return `X: ${this.#x} | Y: ${this.#y} | Z: ${this.#z}`;
    }

}