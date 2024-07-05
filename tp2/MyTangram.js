import {CGFobject} from '../lib/CGF.js';
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

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleBig = new MyTriangleBig(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
	}

	
    display(){

        //Pink Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(-1, 1, 0);
        this.scene.setAmbient(1, 0.753, 0.796, 1);
        this.scene.setDiffuse(1, 0.753, 0.796, 1);
        this.triangle.display();
        this.scene.popMatrix();

        //Yellow Parallelogram
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.scale(-1, 1, 1);
        this.scene.translate(-1, 1, 0);
        this.scene.setAmbient(1, 1, 0, 1);
        this.scene.setDiffuse(1, 1, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

        //Red small triangle
        this.scene.pushMatrix();
        this.scene.translate(-1, -2, 0);
        this.scene.setAmbient(1, 0, 0, 1);
        this.scene.setDiffuse(1, 0, 0, 1);
        this.triangleSmall.display();
        this.scene.popMatrix();

        //Blue Big triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * 3 / 4, 0, 0, 1);
        this.scene.translate(0.56, -1.44, 0);
        this.scene.setAmbient(0, 0, 1, 1);
        this.scene.setDiffuse(0, 0, 1, 1);
        this.triangleBig.display();
        this.scene.popMatrix();


        //Orange Big triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI /2, 0, 0, 1);
        this.scene.translate(2.8, -1.2, 0);
        this.scene.setAmbient(1, 0.647, 0, 1);
        this.scene.setDiffuse(1, 0.647, 0, 1);
        this.triangleBig.display();
        this.scene.popMatrix();

        //Purple small triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI /4, 0, 0, 1);
        this.scene.translate(2.9, 0.2, 0);
        this.scene.setAmbient(0.6, 0.2, 0.6, 1);
        this.scene.setDiffuse(0.6, 0.2, 0.6, 1);
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
        this.scene.setAmbient(0, 1, 0, 1);
        this.scene.setDiffuse(0, 1, 0, 1);
        this.diamond.display();
        this.scene.popMatrix();
        
    }
}

