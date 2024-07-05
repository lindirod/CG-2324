import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            // Front
			0.50, 0.5, 0.5,	  // Top Right
			-0.5, 0.5, 0.5,	  // Top Left
			-0.5, -0.5, 0.5,  // Bottom Left
			0.5, -0.5, 0.5,   // Bttom Right
            // Back
			0.5, -0.5, -0.5,  // Bottom Right
			0.5, 0.5, -0.5,	  // Top Right
			-0.5, 0.5, -0.5,  // Top Left
			-0.5, -0.5, -0.5  // Bottom Left
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            //Front
			0, 1, 2,
			0, 2, 3,
            //Right
            0, 3, 4,
            0, 4, 5,
            //Top
            0, 5, 6,
            0, 6, 1,
            //Left
            1, 6, 7,
            1, 7, 2,
            //Bottom
            7, 4, 3,
            7, 3, 2,
            //Back
            4, 7, 6,
            4, 6, 5

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

