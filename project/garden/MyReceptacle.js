import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyCircle } from './MyCircle.js';
import { MyCone } from './MyCone.js';

export class MyReceptacle extends CGFobject {
    constructor(scene, radius, direction, centerColor, stemColor, recepTexture) {
        super(scene);

        this.slices = 15;
        this.radius = radius;
        this.direction = direction;
        this.centerColor = centerColor;
        this.stemColor = stemColor;

        this.circle = new MyCircle(scene, this.radius);
        this.cone = new MyCone(scene, this.radius * 0.8);

        this.recepTexture = recepTexture;
        this.recepAppearance = new CGFappearance(this.scene);
        this.recepAppearance.setTexture(this.recepTexture);
        this.recepAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');
        this.recepAppearance.setAmbient(...this.stemColor, 1);
        this.recepAppearance.setDiffuse(...this.stemColor, 1);
    }

    display() {
        this.recepAppearance.apply();
        this.scene.rotate(this.direction[0], 1, 0, 0);
        this.scene.rotate(this.direction[1], 0, 0, 1);
        this.scene.setAmbient(...this.stemColor, 1);
        this.scene.setDiffuse(...this.stemColor, 1);
        this.cone.display();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.2, 0);
        this.scene.setAmbient(...this.centerColor, 1);
        this.scene.setDiffuse(...this.centerColor, 1);
        this.circle.display();
        this.scene.popMatrix();
    }

    
}