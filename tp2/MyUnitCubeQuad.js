import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
    }
    display() {
        this.scene.setAmbient(0.549, 0.027, 0.220, 1);
        this.scene.setDiffuse(0.549, 0.027, 0.220, 1);

        this.scene.pushMatrix();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0.5);
        this.scene.rotate(Math.PI /2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.5);
        this.scene.rotate(Math.PI /2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.5, 0);
        this.scene.rotate(Math.PI /2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 0);
        this.scene.rotate(Math.PI /2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();
    }

    
}