import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, textures) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.topMaterial = new CGFappearance(scene);
        this.bottomMaterial = new CGFappearance(scene);
        this.frontMaterial = new CGFappearance(scene);
        this.backMaterial = new CGFappearance(scene);
        this.leftMaterial = new CGFappearance(scene);
        this.rightMaterial = new CGFappearance(scene);
        this.topMaterial.setTexture(textures[0]);
        this.bottomMaterial.setTexture(textures[5]);
        this.frontMaterial.setTexture(textures[1]);
        this.backMaterial.setTexture(textures[2]);
        this.leftMaterial.setTexture(textures[3]);
        this.rightMaterial.setTexture(textures[4]);
    }

    display() {
        // back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.backMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.frontMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // left
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI /2, 0, 1, 0);
        this.leftMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // right
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI /2, 0, 1, 0);
        this.rightMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI /2, 1, 0, 0);
        this.topMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // bottom
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI /2, 1, 0, 0);
        this.bottomMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
    }

    
}