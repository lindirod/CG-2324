import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MyBlade } from './MyBlade.js';

export class MyGrass extends CGFobject {
    constructor(scene, width, length) {
        super(scene);
        this.width = width;
        this.length = length;

        this.distance = 0.1;

        this.blade = new MyBlade(this.scene);
        this.bladeAngles = [];
        for (let i = 0; i < this.width * this.length; i++) {
            this.bladeAngles[i] = this.getRandom(-Math.PI, Math.PI);
        }

        this.grassMaterial = new CGFappearance(this.scene);
        this.grassMaterial.setAmbient(0.09, 0.58, 0.04, 1);
        this.grassMaterial.setDiffuse(0.09, 0.58, 0.04, 1);
    }

    display() {
        this.grassMaterial.apply();
        for (let i = 0; i < this.width * this.length; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(this.bladeAngles[i], 0, 1, 0);
            let x = (i % this.width) * this.distance;
            let z = Math.floor(i /this.width) * this.distance;

            this.scene.translate(x, 0, z);
            this.blade.display();
            this.scene.popMatrix();
        }
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
}