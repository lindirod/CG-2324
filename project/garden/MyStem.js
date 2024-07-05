import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyTube } from './MyTube.js';
import { MyLeaf } from './MyLeaf.js';

export class MyStem extends CGFobject {
    constructor(scene, tubeAmount, radius, stem_color, leaf_color, stemTexture, leafTexture) {
        super(scene);

        this.tubeAmount = tubeAmount;
        this.stem_color = stem_color;
        this.leaf_color = leaf_color;

        this.stemTexture = stemTexture;
        this.stemAppearance = new CGFappearance(this.scene);
        this.stemAppearance.setTexture(this.stemTexture);
        this.stemAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.stemAppearance.setAmbient(...this.stem_color, 1);
        this.stemAppearance.setDiffuse(...this.stem_color, 1);

        this.leafTexture = leafTexture;
        this.leafAppearance = new CGFappearance(this.scene);
        this.leafAppearance.setTexture(this.leafTexture);
        this.leafAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.leafAppearance.setEmission(1, 1, 1, 1);
        this.leafAppearance.setAmbient(...this.leaf_color, 1);
        this.leafAppearance.setDiffuse(...this.leaf_color, 1); 

        this.tubes = [];
        this.tubeAngles = [];
        this.leaves = [];

        for (let i = 0; i < this.tubeAmount; i++) {
            let l = this.getRandom(0.8, 1);
            let position = this.getRandom(0, Math.PI * 2);
            let leaf_angle = this.getRandom(-Math.PI/5, 0);
            let internal_angle = this.getRandom(0, Math.PI/4);
            const tube = new MyTube(scene, radius, l);
            const leaf = new MyLeaf(scene, radius, position, leaf_angle, internal_angle, leaf_color)
            this.tubes.push(tube);
            this.leaves.push(leaf);
            this.tubeAngles.push(this.getRandom(-Math.PI/20, Math.PI/20));
        }
    }

    getRandom(min, max){
        return Math.random() * (max - min) + min;
    }

    display() {
        for (let i = 0; i < this.tubeAmount; i++) {
            this.stemAppearance.apply();
            this.scene.rotate(this.tubeAngles[i], 0, 0, 1);
            this.scene.setAmbient(...this.stem_color, 1);
            this.scene.setDiffuse(...this.stem_color, 1);
            this.tubes[i].display();
            if (i !== 0 && i < this.tubeAmount) {
                this.scene.setAmbient(...this.leaf_color, 1);
                this.scene.setDiffuse(...this.leaf_color, 1);
                this.scene.pushMatrix();
                this.leafAppearance.apply();
                this.leaves[i].display();
                this.scene.popMatrix();
            }
            this.scene.translate(0, this.tubes[i].size, 0);
        }
    }
}