import { CGFobject } from '../../lib/CGF.js';

export class MyCone extends CGFobject {
    constructor(scene, radius) {
        super(scene);

        this.slices = 30;
        this.radius = radius;

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
            this.vertices.push(0.2);
            this.vertices.push(-Math.sin(alphaAngle) * this.radius);
            
            // Generate indices
            this.indices.push((i+1) % this.slices);
            this.indices.push(i);
            this.indices.push(this.slices);
            
            // Generate normals
            this.normals.push(Math.cos(alphaAngle));
            this.normals.push(Math.cos(Math.PI/4));
            this.normals.push(-Math.sin(alphaAngle));

            // Generate texture coordinates
            this.texCoords.push((Math.cos(alphaAngle)) / 2, (Math.sin(alphaAngle)) / 2);
        }
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 1, 0);

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}