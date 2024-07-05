import {CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangleLeaf - Represents a stretched triangle to be part of a leaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleLeaf extends CGFobject {
	constructor(scene, size) {
		super(scene);
		this.size = size;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-this.size, 0, 0, //0
            0, 0.5 * this.size, 0,  //1
            this.size, 0, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            2, 1, 0
		];

		this.texCoords = [
			0, 0.5,
			0.5, 0,
			0, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}