import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyLegSection } from './MyLegSection.js';

export class MyLegPair extends CGFobject {
    constructor(scene, pair) {
        super(scene);
        this.sections = [];
        this.pair = pair;

        if (this.pair === 1) {
            this.sections.push(new MyLegSection(this.scene, pair * 2, 0.17, true));
            this.sections.push(new MyLegSection(this.scene, pair * 2, 0.17, false));
            this.sections.push(new MyLegSection(this.scene, pair, 0.17, false));
        } else if (this.pair === 2) {
            this.sections.push(new MyLegSection(this.scene, pair, 0.25, true));
            this.sections.push(new MyLegSection(this.scene, pair, 0.25, false));
            this.sections.push(new MyLegSection(this.scene, pair * 0.6, 0.25, false));
        } else {
            this.sections.push(new MyLegSection(this.scene, pair * 1.2, 0.28, true));
            this.sections.push(new MyLegSection(this.scene, pair * 1.5, 0.28, false));
            this.sections.push(new MyLegSection(this.scene, pair * 0.5, 0.28, false));
        }

        this.legMaterial = new CGFappearance(this.scene);
        this.legTexture = new CGFtexture(this.scene, "images/beeLegTex1.png");
        this.legMaterial.setTexture(this.legTexture);
        this.legMaterial.setTextureWrap('REPEAT', 'REPEAT');
         this.legMaterial.setAmbient(1, 1, 0, 1);
        this.legMaterial.setDiffuse(1, 1, 0, 1);
        this.legMaterial.setSpecular(1, 1, 0, 1);
        this.legMaterial.setShininess(20) 
    }

    display() {
        this.legMaterial.apply();
        if (this.pair === 1) this.displayPair1();
        else if (this.pair === 2) this.displayPair2();
        else this.displayPair3();
    }

    displayPair1() {
        for (let i = 0; i < 2; i++) {
            this.scene.pushMatrix();
            this.scene.translate((i === 0 ? this.pair : -this.pair), 0, 0);
            if (i === 1) {
                this.scene.scale(-1, 1, 1);
            }
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

            this.scene.popMatrix();
        }
    }

    displayPair2() {
        for (let i = 0; i < 2; i++) {
            this.scene.pushMatrix();
            this.scene.translate((i === 0 ? this.pair / 1.5 : -this.pair / 1.5), 0, 0);
            if (i === 1) {
                this.scene.scale(-1, 1, 1);
            }
            this.scene.rotate(-Math.PI/ 20, 0, 1, 0);
            this.scene.rotate(-Math.PI /3.5, 0, 0, 1);
            this.sections[0].display();
            this.scene.translate(0, this.sections[0].size, 0);
            this.scene.rotate(-Math.PI / 1.9, 0, 0, 1);
            this.sections[1].display();
            this.scene.translate(0, this.sections[1].size, 0);
            this.scene.rotate(Math.PI/20, 0, 0, 1);
            this.sections[2].display();

            this.scene.popMatrix();
        }
    }

    displayPair3() {
        for (let i = 0; i < 2; i++) {
            this.scene.pushMatrix();
            this.scene.translate((i === 0 ? this.pair/3 : -this.pair/3), 0, 0);
            if (i === 1) {
                this.scene.scale(-1, 1, 1);
            }
    
            this.scene.rotate(-Math.PI /7, 0, 0, 1);
            this.scene.rotate(-Math.PI /10, 1, 0, 0);
            this.sections[0].display();
            this.scene.translate(0, this.sections[0].size, 0);
            this.scene.rotate(-Math.PI / 1.3, 0, 0, 1);
            this.scene.rotate(-Math.PI / 4.9, 1, 0, 0);
            this.sections[1].display();
            this.scene.translate(0, this.sections[1].size, 0);
            this.scene.rotate(-Math.PI/15, 1, 0, 0);
            this.scene.rotate(Math.PI / 10, 0, 1, 0);
            this.sections[2].display();
    
            this.scene.popMatrix();
        }
    }
}