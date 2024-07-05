import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyRectangle } from './MyRectangle.js';

/**
 * MyHive - Represents a bee hive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
	constructor(scene, side, levels, pollenTexture) {
		super(scene);
        this.height = 1.5;
        this.lidScale = 1.1;
        this.side = side;
        this.levels = levels;
        this.sidePanel = new MyRectangle(this.scene, this.side, this.height);
        this.bottomPanel = new MyRectangle(this.scene, this.side, this.side);
        this.lidPanel = new MyRectangle(this.scene, this.side * this.lidScale, this.height * 0.6);
        this.topPanel = new MyRectangle(this.scene, this.side * this.lidScale, this.side * this.lidScale);

        this.pollenTexture = pollenTexture;
        this.pollenMaterial = new CGFappearance(scene);
        this.pollenMaterial.setAmbient(0.90, 0.51, 0.09, 1);
        this.pollenMaterial.setDiffuse(0.90, 0.51, 0.09, 1);
        this.pollenMaterial.setTexture(this.pollenTexture);

        this.woodTexture = new CGFtexture(this.scene, 'images/wood.jpg');
        this.woodHandlesTexture = new CGFtexture(this.scene, 'images/wood_handle.jpg');

        this.woodHues = [
            [0.84, 0.58, 0.11, 1],
            [0.68, 0.46, 0.05, 1],
            [0.64, 0.24, 0.01, 1]
        ]

        this.woodMaterials = [];
        this.woodMaterials[0] = new CGFappearance(this.scene);
        this.woodMaterials[0].setAmbient(0.48, 0.89, 0.93, 1);
        this.woodMaterials[0].setDiffuse(0.48, 0.89, 0.93, 1);
        for (let i = 1; i <= levels; i++) {
            const hue = this.woodHues[Math.floor(Math.random() * this.woodHues.length)];
            this.woodMaterials[i] = new CGFappearance(this.scene);
            this.woodMaterials[i].setAmbient(...hue);
            this.woodMaterials[i].setDiffuse(...hue);
        }
	}

    addPollen(pollen) {
        this.pollen = pollen;
    }
	
	display() {
        this.woodMaterials[0].setTexture(this.woodTexture);
        this.woodMaterials[0].apply();
        // Bottom panel
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.side/2);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.bottomPanel.display();
        this.scene.popMatrix();

        let i = 0;
        while (i < this.levels) {
            this.woodMaterials[i].setTexture(this.woodTexture);
            this.woodMaterials[i].apply();

            this.scene.pushMatrix();
            this.scene.translate(0, 0, -this.side/2);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.sidePanel.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0, this.side/2);
            this.sidePanel.display();
            this.scene.popMatrix();

            this.woodMaterials[i].setTexture(this.woodHandlesTexture);
            this.woodMaterials[i].apply();
            this.scene.pushMatrix();
            this.scene.translate(-this.side/2, 0, 0);
            this.scene.rotate(-Math.PI/2, 0, 1, 0);
            this.sidePanel.display();
            this.scene.popMatrix();
    
            this.scene.pushMatrix();
            this.scene.translate(this.side/2, 0, 0);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.sidePanel.display();
            this.scene.popMatrix();

            this.scene.translate(0, this.height, 0);
            i++;
        }

        // Lid
        this.woodMaterials[i].setTexture(this.woodTexture);
        this.woodMaterials[i].apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, (-this.side/2) * this.lidScale);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.topPanel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, (-this.side / 2) * this.lidScale);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.lidPanel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate((-this.side/2) * this.lidScale, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.lidPanel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate((this.side/2) * this.lidScale, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.lidPanel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, (this.side/2) * this.lidScale);
        this.lidPanel.display();
        this.scene.popMatrix();

        this.scene.translate(0, this.height * 0.6, 0);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, (this.side/2) * this.lidScale);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.topPanel.display();
        this.scene.popMatrix();
    }
}