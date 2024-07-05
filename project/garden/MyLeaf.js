import {CGFobject} from '../../lib/CGF.js';
import { MyTriangleLeaf } from './MyTriangleLeaf.js';
import { MyTube } from './MyTube.js';
/**
 * MyLeaf - Represents a leaf in the leaf of the flower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
	constructor(scene, radius, position, leaf_angle, internal_angle, leaf_color) {
		super(scene);
        this.radius = radius;
        this.size = this.radius * 15;
        this.triangle1 = new MyTriangleLeaf(scene, this.size);
        this.triangle2 = new MyTriangleLeaf(scene, this.size);
        this.tube = new MyTube(scene, this.radius * 0.3, 0.5 * this.size);
        this.position = position;
        this.leaf_angle = leaf_angle;
        this.internal_angle = internal_angle;
        this.leaf_color = leaf_color;
	}
	
	display() {
        this.scene.setAmbient(...this.leaf_color, 1);
        this.scene.setDiffuse(...this.leaf_color, 1);
        this.scene.rotate(this.position, 0, 1, 0);
        this.scene.rotate(this.leaf_angle, 0, 0, 1);
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.tube.display();
        this.scene.popMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0.5, 0);
        this.scene.translate(this.size * 1.3, 0, 0);
        this.scene.translate(0, -0.5, 0);
        this.scene.pushMatrix();
        this.scene.rotate(0, 1, 0, 0);
        this.scene.scale(1, -1, 1);
        this.triangle1.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(this.internal_angle, 1, 0, 0);
        this.triangle2.display();
        this.scene.popMatrix();
    }
}