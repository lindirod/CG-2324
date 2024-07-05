import {CGFobject} from '../../lib/CGF.js';
/**
 * MyRectangle - Represents a rectangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRectangle extends CGFobject {
	constructor(scene, width, height) {
		super(scene);
		this.height = height;
        this.width = width;

		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [
            -this.width/2, 0, 0,          // 0
            this.width/2, 0, 0,           // 1
            this.width/2, this.height, 0, // 2
            -this.width/2, this.height, 0 // 3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            0, 2, 3,
            0, 2, 1,
            0, 3, 2,
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];

		this.texCoords = [
			0, 1,
            1, 1,
            1, 0,
            0, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}