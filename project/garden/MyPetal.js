import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyPetal - Represents a petal of a flower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene, size, petal_angle, internal_angle, petalColor, petalTexture) {
		super(scene);
        this.size = size;
        this.triangle1 = new MyTriangle(scene, size/2);
        this.triangle2 = new MyTriangle(scene, size/2);
        this.petal_angle = petal_angle;
        this.internal_angle = internal_angle;
        this.petalColor = petalColor;

        this.petalTexture = petalTexture;
        this.petalAppearance = new CGFappearance(this.scene);
        this.petalAppearance.setTexture(this.petalTexture);
        this.petalAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');
        this.petalAppearance.setAmbient(...this.petalColor, 1);
        this.petalAppearance.setDiffuse(...this.petalColor, 1);
	}
	
	display() {
        this.petalAppearance.apply();
        this.scene.rotate(this.petal_angle, 1, 0, 0);
        this.scene.translate(0, this.size/2, 0);
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