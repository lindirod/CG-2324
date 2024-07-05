import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyRockElement } from './MyRockElement.js';
/**
 * MyRock - represents a rock
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
	constructor(scene, textures) {
		super(scene);
        this.material = new CGFappearance(this.scene);

        const texture = textures[Math.floor(Math.random() * textures.length)];

        this.material.setTexture(texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setAmbient(0.7, 0.7, 0.7, 1);
        this.material.setDiffuse(0.7, 0.7, 0.7, 1);
        this.rockElement = new MyRockElement(scene);
        this.scaleX = this.getRandom(0.6, 0.9);
        this.scaleY = this.getRandom(0.2, 0.5);
        this.scaleZ = this.getRandom(0.6, 0.9);
	}
	
	display() {
        this.scene.setDefaultAppearance();
        
        this.scene.pushMatrix();
        this.scene.scale(this.scaleX, this.scaleY, this.scaleZ);
        this.material.apply();
        this.scene.rotate(1, 0, 1, 0);
        if (Math.random < 0.5) {
            this.scene.rotate(Math.PI, 1, 0, 0);
        }
        this.rockElement.display();
        this.scene.popMatrix();
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
}