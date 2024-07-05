import { CGFobject } from '../../lib/CGF.js';

export class MyCircle extends CGFobject {
    constructor(scene, radius) {
        super(scene);

        this.radius = radius;
        this.slices = 20;

        this.initBuffers();
    }

    initBuffers() {
        
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const alpha = Math.PI * 2 / this.slices;

        for (var i = 0; i < this.slices; i++) {
            let alphaAngle = alpha * i;
            // Generate vertices
            this.vertices.push(Math.cos(alphaAngle) * this.radius);
            this.vertices.push(0);
            this.vertices.push(-Math.sin(alphaAngle) * this.radius);
            
            // Generate indices
            this.indices.push(i, (i+1) % this.slices, this.slices);
            this.indices.push((i+1) % this.slices, i, this.slices);
            
            // Generate normals
            this.normals.push(Math.cos(alphaAngle));
            this.normals.push(0);
            this.normals.push(-Math.sin(alphaAngle));

            // Generate texture coordinates
            this.texCoords.push((Math.cos(alphaAngle)) / 2, (Math.sin(alphaAngle)) / 2);
        }

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}