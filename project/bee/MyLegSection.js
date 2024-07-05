import { CGFobject } from '../../lib/CGF.js';

export class MyLegSection extends CGFobject {
    constructor(scene, size, radius, upsideDown) {
        super(scene);

        this.slices = 10;
        this.stacks = 8;
        this.size = size;
        this.radius = radius;
        this.upsideDown = upsideDown;

        this.initBuffers();
    }

    initBuffers() {
        
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const alpha = Math.PI * 2 / this.slices;

        this.vertices.push(0, this.size, 0);
        this.normals.push(0, 1, 0);

        for (var i = 0; i <= this.stacks; ++i) {
            // Obtain the vertices of this stack and the next one
            // to use in this.indices
            let v1 = i * (this.slices + 1);
            let v2 = v1 + this.slices + 1;

            let currentRadius;
            if (i === 1) {
                currentRadius = this.radius * 0.9;
            } else {
                currentRadius = this.radius * (1 - (i * 0.5 / this.stacks) * (i * 1.2/ this.stacks));
            }

            let currentY;
            if (this.upsideDown) {
                currentY = this.size * (Math.sqrt(i / this.stacks));
            } else {
                currentY = this.size * (1 - Math.sqrt(i / this.stacks));
            }


            for (var j = 0; j <= this.slices; ++j) {
                let alphaAngle = alpha * j;
                // Generate vertices
                this.vertices.push(Math.cos(alphaAngle) * currentRadius);
                this.vertices.push(currentY);
                this.vertices.push(Math.sin(alphaAngle) * currentRadius);
                
                // Generate indices
                // Draw two triangles per slice, front and back
                
                this.indices.push(v1);
                this.indices.push(v2);
                this.indices.push(v1 + 1);

                this.indices.push(v2);
                this.indices.push(v1);
                this.indices.push(v1 + 1);
                
                this.indices.push(v1 + 1);
                this.indices.push(v2);
                this.indices.push(v2 + 1);

                this.indices.push(v2);
                this.indices.push(v1 + 1);
                this.indices.push(v2 + 1);

                if (i === 0) {
                    this.indices.push(this.slices + 1);
                    this.indices.push((j + 1) % (this.slices + 1));
                    this.indices.push(j);
                }

                // Increment the values of v1 and v2 to use in the next slice
                v1++; v2++;
                
                // Generate normals
                this.normals.push(Math.cos(alphaAngle));
                this.normals.push(0);
                this.normals.push(Math.sin(alphaAngle));

                this.texCoords.push( j / this.slices, i / this.stacks);
            }
            
        }

        this.vertices.push(0, 0, 0);
        this.normals.push(0, -1, 0);

        for (let j = 0; j <= this.slices; ++j){
            this.indices.push(this.vertices.length / 3 -1);
            this.indices.push(this.vertices.length / 3 - 2 - (this.slices + 1) + j);
            this.indices.push(this.vertices.length / 3 - 2 - (this.slices + 1) + (j + 1) % (this.slices + 1));
        }

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}