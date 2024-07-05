import {CGFobject} from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initMaterials(scene);

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleBig = new MyTriangleBig(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
	}

    initMaterials(scene) {
        // Pink triangle
        this.material1 = new CGFappearance(scene);
        this.material1.setAmbient(1, 0.753, 0.796, 1);
        this.material1.setDiffuse(1, 0.753, 0.796, 1);
        this.material1.setSpecular(1, 0.753, 0.796, 1.0);
        this.material1.setShininess(10.0);

        // Yellow Parallelogram
        this.material2 = new CGFappearance(scene);
        this.material2.setAmbient(1, 1, 0, 1);
        this.material2.setDiffuse(1, 1, 0, 1);
        this.material2.setSpecular(1, 1, 0, 1.0);
        this.material2.setShininess(10.0);
        
        // Red small triangle
        this.material3 = new CGFappearance(scene);
        this.material3.setAmbient(1, 0, 0, 1);
        this.material3.setDiffuse(1, 0, 0, 1);
        this.material3.setSpecular(1, 0, 0, 1.0);
        this.material3.setShininess(10.0);

        // Blue big triangle
        this.material4 = new CGFappearance(scene);
        this.material4.setAmbient(0, 0, 1, 1);
        this.material4.setDiffuse(0, 0, 1, 1);
        this.material4.setSpecular(1, 1, 1, 1.0);
        this.material4.setShininess(10.0);

        // Orange big triangle
        this.material5 = new CGFappearance(scene);
        this.material5.setAmbient(1, 0.647, 0, 1);
        this.material5.setDiffuse(1, 0.647, 0, 1);
        this.material5.setSpecular(1, 0.647, 0, 1.0);
        this.material5.setShininess(10.0);

        // Purple small triangle
        this.material6 = new CGFappearance(scene);
        this.material6.setAmbient(0.6, 0.2, 0.6, 1);
        this.material6.setDiffuse(0.6, 0.2, 0.6, 1);
        this.material6.setSpecular(0.6, 0.2, 0.6, 1.0);
        this.material6.setShininess(10.0);

        // Green diamond
        this.material7 = new CGFappearance(scene);
        this.material7.setAmbient(0, 1, 0, 1);
        this.material7.setDiffuse(0, 1, 0, 1);
        this.material7.setSpecular(0, 1, 0, 1.0);
        this.material7.setShininess(10.0);
    }

	
    display(){

        //Pink Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(-1, 1, 0);
        this.material1.apply();
        this.triangle.display();
        this.scene.popMatrix();

        //Yellow Parallelogram
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.scale(-1, 1, 1);
        this.scene.translate(-1, 1, 0);
        this.material2.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        //Red small triangle
        this.scene.pushMatrix();
        this.scene.translate(-1, -2, 0);
        this.material3.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        //Blue Big triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * 3 / 4, 0, 0, 1);
        this.scene.translate(0.56, -1.44, 0);
        this.material4.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        //Orange Big triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI /2, 0, 0, 1);
        this.scene.translate(2.8, -1.2, 0);
        this.material5.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        //Purple small triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI /4, 0, 0, 1);
        this.scene.translate(2.9, 0.2, 0);
        this.material6.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        let cos = Math.cos(Math.PI/8);
        let sin = Math.sin(Math.PI/8)
        let matrix = [
            cos, sin, 0, 0,
            -sin, cos, 0, 0,
            0, 0, 1, 0,
            2.1, 4.8, 0, 1
        ];
        this.scene.multMatrix(matrix);
        this.scene.materials[4].apply();
        this.diamond.display();
        this.scene.popMatrix();
        
    }
}

