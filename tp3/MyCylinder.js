import { CGFobject } from '../lib/CGF.js';

/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }


    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
    
        const alphaDeg = 360 / this.slices;
        const alphaRad = this.#toRadians(alphaDeg);
    
        for (let j = 0; j <= this.stacks; j++) {
            for (let i = 0; i < this.slices; i++) {
                // Generate vertices
                let x = Math.cos(alphaRad * i);
                let y = Math.sin(alphaRad * i);
                let z = j / this.stacks;
    
                this.vertices.push(x, y, z);
    
                // Generate normals
                let nx = x;
                let ny = y;
                let nz = 0;
    
                // Normalize the normals
                let length = Math.sqrt(nx * nx + ny * ny + nz * nz);
                this.normals.push(nx / length, ny / length, nz / length);
            }
        }
    
        for (let j = 0; j < this.stacks; j++) {
            for (let i = 0; i < this.slices; i++) {
                // Generate indices
                let first = j * this.slices + i;
                let second = first + this.slices;
        
                this.indices.push(first, (first + 1) % this.slices + j * this.slices, second);
                this.indices.push(second, (first + 1) % this.slices + j * this.slices, (second + 1) % this.slices + (j + 1) * this.slices);
            }
        }
    
        // The defined indices (and corresponding vertices)
        // will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }

#toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

    
}
    