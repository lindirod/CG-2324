import { CGFobject } from "../lib/CGF.js";

/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,   //0
            1, 1, 0,   //1
            3, 1, 0,   //2
            2, 0, 0    //3
        ];

        this.indices = [
            // counter-clockwise reference
            0, 2, 1,
            0, 3, 2,
            // clockwise reference
            1, 2, 0,
            2, 3, 0
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        
        this.initGLBuffers();
    }
}