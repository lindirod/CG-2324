import { CGFappearance } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
* MyPanorama
* @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Texture to apply to the panorama
*/

export class MyPanorama {
    constructor(scene, texture) {
        this.scene = scene;
        this.texture = texture;

        this.material = new CGFappearance(this.scene);
        this.material.setTexture(this.texture);

        this.sphere = new MySphere(this.scene, 30, 30, 200); 
    }

    display() {
        // Display the panorama
        this.scene.pushMatrix();
        let pos = this.scene.camera.position;
        this.scene.translate(pos[0], pos[1], pos[2]);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.setEmission(0.0, 0.0, 0.0, 1.0);
    }
}