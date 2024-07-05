import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyRockRing } from './MyRockRing.js';
/**
 * MyRockSet - represents a pile of rocks, with random scaling
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
	constructor(scene, layers) {
		super(scene);
        this.layers = layers;
        this.rockRings = [];

        const textures = [];
        textures.push(new CGFtexture(this.scene, './images/rock.jpg'));
        textures.push(new CGFtexture(this.scene, './images/red_rock.jpg'));
        textures.push(new CGFtexture(this.scene, './images/dark_rock.jpg'));

        for (let i = 0; i < layers; i++) {
            this.rockRings.push(new MyRockRing(scene, 2 * i + 1, textures));
        }
	}
	
	display() {
        let displayed = false;
        for (let i = 0; i < this.layers; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(0.7, 0, 1, 0);
            this.scene.translate(0, (this.layers - i - 1) * 0.4, 0);
            this.rockRings[i].display();
            if (i === this.layers - 1 && !displayed) {
                
                this.scene.translate(-4, 0, 0);
                this.rockRings[i].rocks[0].display();
                displayed = true;
            }
            this.scene.popMatrix();
        }   
    }
}