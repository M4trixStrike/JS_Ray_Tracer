import { ColorRGB } from "../core/ColorRGB.js";
import { ColorMixer } from "../core/ColorMixer.js";
import { Ray } from "../core/Ray.js";
import { Vector3D } from "../core/Vector3D.js";

export class Renderer {

    #sceneCamera;
    #scene;
    #canvas;
    #ctx;

    #max_bounces = 3;
    #samples_per_pixel = 16;

    #gamma = 2.2

    constructor(sceneCamera, scene) {

        this.#canvas = document.createElement("canvas");
        this.#sceneCamera = sceneCamera;
        this.#scene = scene;

        this.#ctx = canvas.getContext("2d");

        this.canvasInit();
    }

    #castRay(ray, object) {

        let hitData = object.intersect(ray);

        if (hitData == null) return null;

        return {

            hitPoint: hitData.closestHitPoint,
            hitMaterial: hitData.material,
            surfaceNormal: object.getSurfaceNormal(hitData.closestHitPoint,ray),
            dist: hitData.closestHitPoint.distanceFrom(ray.getOrigin())

        }

    }

    setGamma(g){

        this.#gamma = g;

    }

    setSamplesPerPixel(ammount){

        this.#samples_per_pixel = ammount;

    }

    setMaxRayBounceAmmount(ammount){

        this.#max_bounces = ammount;

    }

    #intersectScene(ray) {

        let closestObject = null;
        let smallestDist = Infinity;

        this.#scene.getScene().forEach(sceneObject => {

            let data = this.#castRay(ray, sceneObject);
            if (data != null && data.dist < smallestDist) {

                smallestDist = data.dist;
                closestObject = data;

            }

        });

        return closestObject;

    }

    #castShadowRay(hitData) {

        let totalLight = new ColorRGB(0, 0, 0);

        this.#scene.getSceneLight().forEach(lightSource => {

            let lightVector = Vector3D.fromPoints3D(lightSource.center,hitData.hitPoint).norm();

            let baseHelper = new Vector3D(Math.random(), Math.random(), Math.random());

            let v = lightVector.crossProduct(baseHelper).norm();
            let w = lightVector.crossProduct(v).norm();

            let radius = Math.sqrt( Math.random() ) * lightSource.getRadius();

            let theta = Math.random() * 2 * Math.PI;

            let x = Math.cos(theta) * radius;
            let y = Math.sin(theta) * radius;

            let randomLightPos = lightSource.center.vectorMove(v, x).vectorMove(w, y);

            let vectorToLight = Vector3D.fromPoints3D(hitData.hitPoint, randomLightPos);
            let distanceToLight = vectorToLight.len();
            vectorToLight = vectorToLight.norm()

            let shadowRay = new Ray(hitData.hitPoint.vectorMove(hitData.surfaceNormal, 0.00001), vectorToLight);
            let obstacle = this.#intersectScene(shadowRay);

            if (obstacle == null || obstacle.dist > distanceToLight) {

                let material = hitData.hitMaterial;

                let lambertCosine = Math.max(0,vectorToLight.dot(hitData.surfaceNormal));

                let cameraVector = Vector3D.fromPoints3D(hitData.hitPoint,this.#sceneCamera.getOrigin()).norm();
                
                let lightReflectionVector = lightVector
                    .subtract(
                        hitData.surfaceNormal.multiply(
                            2 * lightVector.dot(hitData.surfaceNormal)
                        )
                    )
                    .norm();
                
                let phongSpecular = Math.max(0,material.getSpecularIntensity() * Math.pow(cameraVector.dot(lightReflectionVector),material.getPhongExponent()));

                totalLight = totalLight.addRGB(
                    lightSource.getColor().multiply(
                       (lambertCosine + phongSpecular*lambertCosine) * lightSource.getIntensity()
                    ).power(this.#gamma)
                );
            }

        });

        return totalLight;
    }

    renderScene() {

        let vpW = this.#sceneCamera.getVpWidth();
        let vpH = this.#sceneCamera.getVpHeight();

        for (let z = 0; z < vpH; z++) {
            for (let x = 0; x < vpW; x++) {

                let vpPoint = this.#sceneCamera.screenToVp(x, z);

                for (let s = 0; s < this.#samples_per_pixel; s++) {

                    let ray = this.#sceneCamera.getRayJitter(vpPoint);
                    let sampleColor = new ColorRGB(1, 1, 1); 
                    let finalColor = new ColorRGB(0, 0, 0); 

                    for (let b = 0; b < this.#max_bounces; b++) {
                        let sceneData = this.#intersectScene(ray);

                        if (sceneData == null) {
                            sampleColor = this.#scene.getSkyboxColor().multiplyRGB(sampleColor);
                            break;
                        }

                        let material = sceneData.hitMaterial;
                        let reflectivity = material.getReflectivity();
                        let albedo = ColorRGB.from(material.getAlbedo()).power(this.#gamma);

                        let directionVector = ray.getDirectionVector();
                    
                        let directLight = this.#castShadowRay(sceneData)

                        let localColor = albedo.multiplyRGB(directLight)
                        .multiplyRGB(sampleColor)
                        .multiply(1 - reflectivity);
                            
                        finalColor = finalColor.addRGB(localColor);

                        if (reflectivity > 0) {

                            let reflectionVector = directionVector
                                .subtract(
                                    sceneData.surfaceNormal.multiply(
                                        2 * directionVector.dot(sceneData.surfaceNormal)
                                    )
                                )
                                .norm();

                            sampleColor = sampleColor.multiplyRGB(albedo).multiply(reflectivity);

                            ray = new Ray(sceneData.hitPoint.vectorMove(sceneData.surfaceNormal, 0.0001), reflectionVector);
                        
                        } 
                        else break;
                    }
                    ColorMixer.addColor(finalColor);
                }

                this.#ctx.fillStyle = ColorMixer.averageColors().power(1/this.#gamma).get();
                ColorMixer.flush();
                this.#ctx.fillRect(x, z, 1, 1);
            }
        }

        return this.#ctx.getImageData(0, 0, vpW, vpH);

    }

    canvasInit() {

        this.#canvas.width = this.#sceneCamera.getVpWidth();
        this.#canvas.height = this.#sceneCamera.getVpHeight();

    }
}