import {CGFobject} from '../../lib/CGF.js';
/**
 * MyBlade - represents a blade of grass
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBlade extends CGFobject {
	constructor(scene) {
		super(scene);
        this.sections = 4;

		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];

        let sectionHeight = 2.0 / this.sections;

        for (let i = 0; i < this.sections; i++) {
            let width = 0.035;

            if (i === 0) {
                this.vertices.push(-width, 0, 0);
                this.vertices.push(width, 0, 0);
            }

            if (i !== this.sections - 1) {
                width *= Math.sqrt(1 - (i / this.sections));
                this.vertices.push(-width, sectionHeight * i, 0);
                this.vertices.push(width, sectionHeight * i, 0);
            } else {
                this.vertices.push(0, sectionHeight * i, 0);
            }

            let si = i * 2;

            this.indices.push(si, si+1, si+2);
            this.indices.push(si, si+2, si+1);

            if (i !== this.sections - 1) {
                this.indices.push(si+1, si+2, si+3);
                this.indices.push(si+1, si+3, si+2);
            }
            
            for (let j = 0; j < this.sections; j++) {
                this.normals.push(0, 0, 1);
            }            
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}