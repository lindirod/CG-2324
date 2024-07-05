import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyPetal } from './MyPetal.js';
import { MyPollen } from '../pollen-hive/MyPollen.js';

export class MyFlower extends CGFobject {
    constructor(scene, stemRadius, tubeAmount, centerRadius, petalAmount, petalColor, receptacleColor, stemColor, leafColor, petalTex, stemTex, leafTex, recepTex, pollenTex) {
        super(scene);

        this.tubeAmount = tubeAmount;
        this.petalAmount = petalAmount;
        this.petalColor = petalColor;
        this.receptacleColor = receptacleColor;

        const xDirection = this.getRandom(0, Math.PI/8);
        const zDirection = this.getRandom(0, Math.PI/8);
        const outerRadius = this.getRandom(1.5, 3.5);
        const petalSize = outerRadius - centerRadius;

        this.stem = new MyStem(scene, tubeAmount, stemRadius, stemColor, leafColor, stemTex, leafTex);
        this.receptacleY = 0;
        for (let tube of this.stem.tubes) {
            this.receptacleY += tube.size;
        }
        this.receptacle = new MyReceptacle(scene, centerRadius, [xDirection, zDirection], receptacleColor, stemColor, recepTex);
        this.pollen = new MyPollen(scene);
        this.petals = [];

        this.pollenMaterial = new CGFappearance(scene);
        this.pollenMaterial.setAmbient(0.90, 0.51, 0.09, 1);
        this.pollenMaterial.setDiffuse(0.90, 0.51, 0.09, 1);
        this.pollenMaterial.setTexture(pollenTex);

        this.pollenAngleX = this.getRandom(-Math.PI/3, Math.PI/3);
        this.pollenAngleZ = this.getRandom(-Math.PI/3, Math.PI/3);

        for (let i = 0; i < this.petalAmount; i++) {
            const petalAngle = this.getRandom(-Math.PI/6, -Math.PI/10);
            const internalAngle = this.getRandom(0, Math.PI/4);
            const petal = new MyPetal(scene, petalSize, petalAngle, internalAngle, petalColor, petalTex);
            this.petals.push(petal);
        }
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    removePollen() {
        this.pollen = null;
    }

    display() {
        this.stem.display();
        this.scene.setAmbient(...this.receptacleColor, 1);
        this.scene.setDiffuse(...this.receptacleColor, 1);
        this.scene.translate(0, -0.02, 0);
        this.receptacle.display();
        
        if (this.pollen !== null) {
            this.scene.pushMatrix();
            this.pollenMaterial.apply();
            this.scene.translate(0, 0.25, 0);
            this.scene.rotate(this.pollenAngleX, 1, 0, 0);
            this.scene.rotate(this.pollenAngleZ, 0, 0, 1);
            this.pollen.display();
            this.scene.popMatrix();
        }
        
        this.scene.translate(0, 0.1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        for (let i = 0; i < this.petalAmount; i++) {
            let angle = (Math.PI * 2 / this.petalAmount) * i;
            this.scene.pushMatrix();
            this.scene.rotate(angle, 0, 0, 1);
            this.scene.translate(0, this.receptacle.radius * 0.6, 0);
            this.scene.scale(0.8, 0.8, 0.8);
            this.petals[i].display();
            this.scene.popMatrix();
        }
    }
}