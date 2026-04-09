import { Vector3D } from "../../core/Vector3D.js";
import { SceneObject } from "../SceneObject.js";

export class Cylinder extends SceneObject {

    #radius;
    #axisVector = new Vector3D(0,0,1);
    #length;


    constructor(center, length, radius, material) {

        super(center, material)
        this.#radius = radius
        this.#length = length;

    }

    rotate(x,y,z){

        this.#axisVector = this.#axisVector.rotateX(x);
        this.#axisVector = this.#axisVector.rotateY(y);
        this.#axisVector = this.#axisVector.rotateZ(z);
        
    }

    intersect(ray) {

        let bHit = Infinity;
        let cHit = Infinity;

        let d = ray.getDirectionVector();
        let w = Vector3D.fromPoints3D(this.center, ray.getOrigin());

        let a = d.dot(d) - Math.pow(d.dot(this.#axisVector), 2);
        let b = 2 * (d.dot(w) - d.dot(this.#axisVector) * w.dot(this.#axisVector));
        let c = w.dot(w) - Math.pow(w.dot(this.#axisVector), 2) - this.#radius * this.#radius;

        let delta = b * b - 4 * a * c;

        if (delta > 0) {
    
            let t1 = (-b - Math.sqrt(delta)) / (2 * a);
            let t2 = (-b + Math.sqrt(delta)) / (2 * a);

            let borderSolution = Math.min(t1,t2);

            if (borderSolution > 0) {
                let hitPoint = ray.getPoint3D(borderSolution);
                let h = Vector3D.fromPoints3D(this.center, hitPoint).dot(this.#axisVector);
                if (Math.abs(h) < this.#length / 2) {
                    bHit = borderSolution; 
                }
            }
            
        }

        let c1 = this.center.vectorMove(this.#axisVector, this.#length / 2);
        let c2 = this.center.vectorMove(this.#axisVector, -this.#length / 2);

        let div = d.dot(this.#axisVector);
      
        let td1 = Vector3D.fromPoints3D(ray.getOrigin(), c1).dot(this.#axisVector) / div;
        let td2 = Vector3D.fromPoints3D(ray.getOrigin(), c2).dot(this.#axisVector) / div;

        if (td1 > 0 && Vector3D.fromPoints3D(c1, ray.getPoint3D(td1)).len() <= this.#radius)
            cHit = td1;
        if (td2 > 0 && Vector3D.fromPoints3D(c2, ray.getPoint3D(td2)).len() <= this.#radius && td2 < cHit)
            cHit = td2;
        
        let finalSolution = Math.min(cHit, bHit);

        if (finalSolution === Infinity) return null;

        return { closestHitPoint: ray.getPoint3D(finalSolution), material: this.material };

    }

    getSurfaceNormal(point,ray) {

        let approx = Vector3D
            .fromPoints3D(this.center,point)
            .dot(this.#axisVector);
        
        if (Math.abs(Math.abs(approx) - this.#length / 2) < 0.0001) {
            return this.#axisVector.multiply(
                Math.sign(
                    ray.getDirectionVector().dot(this.#axisVector)
                )
            )
        }

        let pointOnAxis = this.center.vectorMove(this.#axisVector, approx);
        return Vector3D.fromPoints3D(pointOnAxis, point).norm();

    }

}