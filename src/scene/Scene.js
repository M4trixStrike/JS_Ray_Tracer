export class Scene {

    #objectList = [];
    #lighSources = [];

    #skyboxColor;

    constructor(skyboxColor) {

        this.#skyboxColor = skyboxColor;

    }

    addObject(sceneObject) {

        this.#objectList.push(sceneObject)

    }

    addLightSource(point3D) {
        this.#lighSources.push(point3D)
    }

    getScene() {

        return this.#objectList;

    }

    getSceneLight() {

        return this.#lighSources;

    }

    getSkyboxColor() {
        return this.#skyboxColor;
    }

}