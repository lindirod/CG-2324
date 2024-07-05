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
			0.5, -0.5, 0.5,  // A  //0   // Right face
			0.5, -0.5, -0.5, // B  //1
			0.5, 0.5, 0.5,   // C  //2
			0.5, 0.5, -0.5,  // D  //3
			0.5, -0.5, -0.5, // B  //4     // Back face
			-0.5, -0.5, -0.5, // E //5
			0.5, 0.5, -0.5,  // D  //6
			-0.5, 0.5, -0.5,  // G //7
			-0.5, -0.5, -0.5, // E //8  // Left Face
			-0.5, -0.5, 0.5,  // F //9
			-0.5, 0.5, -0.5,  // G //10
			-0.5, 0.5, 0.5,   // H //11
			-0.5, -0.5, 0.5,  // F //12  // Front Face
			0.5, -0.5, 0.5,  // A  //13
			-0.5, 0.5, 0.5,   // H //14
			0.5, 0.5, 0.5,   // C  //15
			-0.5, 0.5, 0.5,   // H //16  // Top Face
			0.5, 0.5, 0.5,   // C  //17
			0.5, 0.5, -0.5,  // D  //18
			-0.5, 0.5, -0.5,  // G //19
			-0.5, -0.5, 0.5,  // F //20  // Bottom Face
			0.5, -0.5, 0.5,  // A  //21
			0.5, -0.5, -0.5, // B  //22
			-0.5, -0.5, -0.5, // E //23
		]

		//Counter-clockwise reference of vertices
		this.indices = [
            // Right
			0, 1, 2,
			1, 3, 2,
			// Back
			4, 5, 6,
			5, 7, 6,
			// Left
			8, 9, 10,
			9, 11, 10,
			// Front
			12, 13, 14,
			13, 15, 14,
			// Top
			16, 17, 19,
			18, 19, 17,
			// Bottom
			23, 21, 20,
			21, 23, 22

		];

		this.normals = [
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

