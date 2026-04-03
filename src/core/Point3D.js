export class Point3D {

    #x;
    #y;
    #z;

    constructor(x, y, z) {

        this.#x = x;
        this.#y = y;
        this.#z = z;

    }

    multiply(v) {

        return new Point3D(

            this.#x * v,
            this.#y * v,
            this.#z * v

        )

    }

    vectorMove(vector, scalar) {

        return new Point3D(
            this.#x + vector.getX() * scalar,
            this.#y + vector.getY() * scalar,
            this.#z + vector.getZ() * scalar
        );

    }

    distanceFrom(point) {

        return Math.sqrt(Math.pow(this.#x - point.getX(), 2) + Math.pow(this.#y - point.getY(), 2) + Math.pow(this.#z - point.getZ(), 2))

    }

    toString() {
        return `X: ${this.#x} | Y: ${this.#y} | Z: ${this.#z}`;
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

    setX(x) {
        this.#x = x;
    }

    setY(y) {
        this.#y = y;
    }

    setZ(z) {
        this.#z = z;
    }
}