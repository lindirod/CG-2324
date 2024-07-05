import { CGFobject } from "../lib/CGF.js";

/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall2 extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            1, 0, 0,
            -1, 0, 0,
            0, 1, 0
        ];

        this.indices = [
            0, 2, 1,
            2, 1, 0
        ];

        this.texCoords = [
            0, 0.5,
            0, 0,
            0.25, 0.25
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}