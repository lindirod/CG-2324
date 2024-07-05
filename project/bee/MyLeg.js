import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyLegSection } from './MyLegSection.js';

export class MyLeg extends CGFobject {
    constructor(scene, size) {
        super(scene);
        this.sections = [];
        this.size = size;

        this.sections.push(new MyLegSection(this.scene, size * 1, 0.08, true));
        this.sections.push(new MyLegSection(this.scene, size * 1, 0.08, false));
        this.sections.push(new MyLegSection(this.scene, size, 0.08, false));

        this.legMaterial = new CGFappearance(this.scene);
        this.legTexture = new CGFtexture(this.scene, "images/beeLegTex1.png");
        this.legMaterial.setTexture(this.legTexture);
        this.legMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');
        this.legMaterial.setAmbient(1, 1, 0, 1);
        this.legMaterial.setDiffuse(1, 1, 0, 1);
        this.legMaterial.setSpecular(1, 1, 0, 1);
        this.legMaterial.setShininess(20); 
    }

    display() {
        this.legMaterial.apply();
        this.scene.rotate(-Math.PI/ 20, 0, 1, 0);
        this.scene.rotate(-Math.PI /3.5, 0, 0, 1);
        this.sections[0].display();
        this.scene.translate(0, this.sections[0].size, 0);
        this.scene.rotate(-Math.PI / 1.9, 0, 0, 1);
        this.scene.rotate(Math.PI / 5, 1, 0, 0);
        this.sections[1].display();
        this.scene.translate(0, this.sections[1].size, 0);
        this.scene.rotate(-Math.PI/15, 0, 0, 1);
        this.scene.rotate(-Math.PI/ 16, 1, 0, 0);
        this.sections[2].display();
        
    }
}