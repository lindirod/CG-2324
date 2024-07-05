import { CGFobject } from '../../lib/CGF.js';

export class MyTube extends CGFobject {
    constructor(scene, radius, size) {
        super(scene);

        this.slices = 7;
        this.stacks = 1;
        this.radius = radius;
        this.size = size;

        this.initBuffers();
    }

    initBuffers() {
        
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const alpha = Math.PI * 2 / this.slices;

        for (var i = 0; i <= this.stacks; ++i) {
            // Obtain the vertices of this stack and the next one
            // to use in this.indices
            let v1 = i * (this.slices + 1);
            let v2 = v1 + this.slices + 1;

            for (var j = 0; j <= this.slices; j++) {
                let alphaAngle = alpha * j;
                // Generate vertices
                this.vertices.push(Math.cos(alphaAngle) * this.radius);
                this.vertices.push(this.size * i);
                this.vertices.push(Math.sin(alphaAngle) * this.radius);
                
                // Generate indices
                // Draw two triangles per slice, front and back
                if (i == 0) {
                    this.indices.push(v1);
                    this.indices.push(v2);
                    this.indices.push(v1 + 1);

                    this.indices.push(v2);
                    this.indices.push(v1);
                    this.indices.push(v1 + 1);
                }

                if (i == this.stacks - 1) {
                    this.indices.push(v1 + 1);
                    this.indices.push(v2);
                    this.indices.push(v2 + 1);

                    this.indices.push(v2);
                    this.indices.push(v1 + 1);
                    this.indices.push(v2 + 1);
                }

                // Increment the values of v1 and v2 to use in the next slice
                v1++; v2++;
                
                // Generate normals
                this.normals.push(Math.cos(alphaAngle));
                this.normals.push(0);
                this.normals.push(Math.sin(alphaAngle));

                // Generate texture coordinates
                this.texCoords.push(j / this.slices, i / this.stacks);
            }
            
        }

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}