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
        this.center.setX(newX);
    }

    setY(newY) {
        this.center.setY(newY);
    }

    setZ(newZ) {
        this.center.setZ(newZ);
    }

    moveX(offset) {
        this.center.setX(this.center.getX() + offset);
    }

    moveY(offset) {
        this.center.setY(this.center.getY() + offset);
    }

    moveZ(offset) {
        this.center.setZ(this.center.getZ() + offset);
    }
}