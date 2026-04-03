export class SceneObject {

    center;

    material

    constructor(center, material) {

        this.center = center

        this.material = material;
    }

    intersect(ray) {
        return null;
    }

    getSurfaceNormal(point) {
        return null;
    }

    setX(newX) {
        this.x = newX;
    }

    setY(newY) {
        this.y = newY;
    }

    setZ(newZ) {
        this.z = newZ;
    }

    moveX(offset) {
        this.x += offset;
    }

    moveY(offset) {
        this.y += offset;
    }

    moveZ(offset) {
        this.z += offset;
    }
}