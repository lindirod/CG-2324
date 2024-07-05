import {CGFobject} from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';
/**
 * MyRockRing - represents a pile of rocks, with random scaling
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockRing extends CGFobject {
	constructor(scene, amount, textures) {
		super(scene);
        this.amount = amount;
        this.rocks = [];
        this.xDeviations = [];
        this.zDeviations = [];
        this.rotations = [];
        for (let i = 0; i < amount; i++) {
            this.rocks.push(new MyRock(scene, textures));
            this.xDeviations.push(this.getRandom(-0.2, 0.2));
            this.zDeviations.push(this.getRandom(-0.2, 0.2));
            this.rotations.push(this.getRandom(-Math.PI/8, Math.PI/8));
        }
        this.segment = Math.PI * 2 / amount;
	}
	
	display() {
        let angle = 0;
        for (let i = 0; i < this.amount; i++) {
            const x = Math.cos(angle) * (this.amount / 5.3);
            const y = 0;
            const z = Math.sin(angle) * (this.amount / 5.3);
            this.scene.pushMatrix();
            this.scene.translate(x + this.xDeviations[i], y, z + this.zDeviations[i]);
            this.scene.rotate(this.rotations[i], 0, 1, 0);
            this.rocks[i].display();
            this.scene.popMatrix();
            angle += this.segment;
        }
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
}