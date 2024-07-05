import {CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangle - Represents an equilateral triangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene, height) {
		super(scene);
		this.height = height;
		this.side = 2 * (height / Math.tan(Math.PI/3));
		this.initBuffers();
	}
	
	initBuffers() {
		const halfSide = this.side / 2;

		this.vertices = [
			-halfSide, 0, 0,                //0
            0, this.height, 0, //1
            halfSide, 0, 0,	               //2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            2, 1, 0
		];

		this.normals = [
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
		];

		this.texCoords = [
			0, 1,
			0.5, 0,
			1, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();

	}
}