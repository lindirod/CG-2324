import { CGFappearance, CGFobject } from '../../lib/CGF.js';

export class MyBeeAbs extends CGFobject {
    constructor(scene, radius) {
        super(scene);

        this.slices = 40;
        this.stacks = 40;

        this.radius = radius;

        this.initBuffers();
    }

    initBuffers() {
        
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const alpha = Math.PI * 2 / this.slices;
        const beta = Math.PI / this.stacks;

        for (var i = 0; i <= this.stacks; ++i) {
            let betaAngle = (Math.PI / 2) - (i * beta);

            // Obtain the vertices of this stack and the next one
            // to use in this.indices
            let v1 = i * (this.slices + 1);
            let v2 = v1 + this.slices + 1;

            for (var j = 0; j <= this.slices; ++j) {
                let alphaAngle = alpha * j;
                // Generate vertices
                let xDeviation = this.getRandom(0.85, 1.1);
                let yDeviation = this.getRandom(0.85, 1.1);
                let zDeviation = this.getRandom(0.85, 1.1);

                let y = Math.sin(betaAngle) * yDeviation * this.radius;
                if (y < 0) y *= 0.7;

                if (i != 0 && i != this.stacks) {
                    this.vertices.push(Math.cos(alphaAngle) * Math.cos(betaAngle) * xDeviation * this.radius);
                    this.vertices.push(y);
                    this.vertices.push(Math.sin(alphaAngle) * Math.cos(betaAngle) * zDeviation * this.radius);
                } else {
                    this.vertices.push(Math.cos(alphaAngle) * Math.cos(betaAngle) * this.radius);
                    this.vertices.push(Math.sin(betaAngle) * this.radius);
                    this.vertices.push(Math.sin(alphaAngle) * Math.cos(betaAngle) * this.radius);
                }
                
                // Generate indices
                // Draw two triangles per slice, except on the first and last stacks
                // For the top and bottom stacks, only one triangle is drawn
                if (i != 0) {
                    this.indices.push(v1);
                    this.indices.push(v1 + 1);
                    this.indices.push(v2);
                }

                if (i != (this.stacks - 1)) {
                    this.indices.push(v1 + 1);
                    this.indices.push(v2 + 1);
                    this.indices.push(v2);
                }

                // Increment the values of v1 and v2 to use in the next slice
                v1++; v2++;
                
                // Generate normals
                this.normals.push(Math.cos(alphaAngle) * Math.cos(betaAngle) * xDeviation);
                this.normals.push(Math.sin(betaAngle) * yDeviation);
                this.normals.push(Math.sin(alphaAngle) * Math.cos(betaAngle) * zDeviation);

                this.texCoords.push( j / this.slices, i / this.stacks);
            }
            
        }
        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
}