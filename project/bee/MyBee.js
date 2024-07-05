import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyBeeSphere } from './MyBeeSphere.js'; // Change this line
import { MyBeeAbs } from './MyBeeAbs.js';
import { MyLeg } from './MyLeg.js';
import { MyLegPair } from './MyLegPair.js';
import { MyWing } from './MyWing.js';

export class MyBee extends CGFobject {
    constructor(scene, pollenTexture) {
        super(scene);

        this.position = [0, 10, 0];
        this.gardenPosition = [0, 10, 0];
        this.orientation = 0;
        this.velocity = [0, 0, 0];

        this.currentTime = 0;
        this.verticalPosition = 3;
        this.wingRotation = 0;

        this.head = new MyBeeSphere(scene, 1.9, 0.9); 
        this.eye = new MyBeeSphere(scene, 0.4, 0.4); 
        this.abdomen = new MyBeeAbs(scene, 2.3);
        this.body = new MyBeeSphere(scene, 4.2, 3.2); 
        this.wing = new MyWing(scene, 4, 1.2);
        this.smallWing = new MyWing(scene, 2.5, 0.8);
        this.legPair1 = new MyLegPair(scene, 1);
        this.legPair2 = new MyLegPair(scene, 2);
        this.legPair3 = new MyLegPair(scene, 3);
        this.antenna = new MyLeg(scene, 0.5);
        this.pollen = null;

        this.pollenTexture = pollenTexture;
        this.pollenMaterial = new CGFappearance(scene);
        this.pollenMaterial.setAmbient(0.90, 0.51, 0.09, 1);
        this.pollenMaterial.setDiffuse(0.90, 0.51, 0.09, 1);
        this.pollenMaterial.setTexture(this.pollenTexture);

        this.headMaterial = new CGFappearance(scene);
        this.headTexture = new CGFtexture(this.scene, "images/beeHeadTex.jpg");
        this.headMaterial.setTexture(this.headTexture);
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.headMaterial.setAmbient(0.99, 0.82, 0.01, 1); 
        this.headMaterial.setDiffuse(0.99, 0.82, 0.01, 1);

        this.eyeMaterial = new CGFappearance(scene);
        this.eyeTexture = new CGFtexture(this.scene, "images/beeEyeTex.jpg");
        this.eyeMaterial.setTexture(this.eyeTexture);
        this.eyeMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.abdomenMaterial = new CGFappearance(scene);
        this.abdomenTexture = new CGFtexture(this.scene, "images/beeAbsTex.jpg");
        this.abdomenMaterial.setTexture(this.abdomenTexture);
        this.abdomenMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');
        this.abdomenMaterial.setAmbient(0.99, 0.82, 0.01, 1);
        this.abdomenMaterial.setDiffuse(0.99, 0.82, 0.01, 1);

        this.bodyMaterial = new CGFappearance(scene);
        this.bodyTexture = new CGFtexture(this.scene, "images/beeTex.png");
        this.bodyMaterial.setTexture(this.bodyTexture);
        this.bodyMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');
        this.bodyMaterial.setAmbient(0.99, 0.82, 0.01, 1);
        this.bodyMaterial.setDiffuse(0.99, 0.82, 0.01, 1);

        this.wingMaterial = new CGFappearance(scene);
        this.wingTexture = new CGFtexture(this.scene, "images/beeWingTex.jpg");
        this.wingMaterial.setTexture(this.wingTexture);
        this.wingMaterial.setTextureWrap('MIRRORED_REPEAT', 'REPEAT');
        this.wingMaterial.setAmbient(0.7, 0.8, 0.9, 0.0);
        this.wingMaterial.setDiffuse(0.7, 0.8, 0.9, 0.4);
        this.wingMaterial.setSpecular(0.7, 0.8, 0.9, 0.0);
        this.wingMaterial.setEmission(0.7, 0.8, 0.9, 0.4);

    }

    addPollen(pollen) {
        this.pollen = pollen;
    }

    removePollen() {
        this.pollen = null;
    }

    display() {
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);

        // Vertical oscillation
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.translate(0, this.verticalPosition, 0);
        this.scene.rotate(this.orientation, 0, 1, 0);

        // Main body
        this.bodyMaterial.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.9, 1, 1);
        this.body.display();
        this.scene.popMatrix();

        // Legs
        this.scene.pushMatrix();
        this.scene.rotate((Math.PI / 15), 1, 0, 0);
        this.scene.translate(0, -0.5, 3.8);
        this.legPair3.display();
        this.scene.translate(0, 0, 1);
        this.legPair2.display();
        this.scene.translate(0, 0, 0.8);
        this.legPair1.display();
        this.scene.popMatrix();
        
        // Abdomen
        this.abdomenMaterial.apply();
        this.scene.translate(0, 0, 5);
        this.abdomen.display();

        if (this.pollen !== null) {
            this.scene.pushMatrix();
            this.pollenMaterial.apply();
            this.scene.scale(8, 8, 8);
            this.scene.translate(0, -0.4, 0);
            this.pollen.display();
            this.scene.popMatrix();
        }

        // Wings
        // Left wings
        this.wingMaterial.apply();
        this.scene.pushMatrix();
        this.scene.rotate(this.wingRotation, 0, 0, 1);  //rotation of the wing
        this.scene.translate(4.5, 1.5, 0);
        this.scene.rotate(Math.PI / 7, 0, 1, 0);
        
        //left wing
        this.wing.display();
        //left small wing
        this.scene.translate(-1, 0, -1);
        this.smallWing.display();
        this.scene.popMatrix();
        
        // Right wings
        this.scene.pushMatrix();
        this.scene.rotate(-this.wingRotation, 0, 0, 1);  //rotation of the wing
        this.scene.translate(-4.5, 1.5, 0);
        this.scene.rotate(-Math.PI / 7, 0, 1, 0);
        
        //right wing
        this.wing.display();
        //right small wing
        this.scene.translate(1, 0, -1);
        this.smallWing.display();
        this.scene.popMatrix();

        this.scene.translate(0, 0.8, 2.5);
        // Head
        this.headMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.8, 1, 1);
        this.scene.rotate(-(Math.PI / 15), 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.head.display(); 
        this.scene.popMatrix();

        // Left eye
        this.eyeMaterial.apply();
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/10, 0, 0, 1);
        this.scene.translate(1.3, -0.1, 0.4);
        this.scene.scale(0.8, 1.6, 1);
        this.scene.rotate(-Math.PI/3, 0, 1, 0);
        this.eye.display();
        this.scene.popMatrix();
        
        // Right eye
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/10, 0, 0, 1);
        this.scene.translate(-1.3, -0.1, 0.4);
        this.scene.scale(0.8, 1.6, 1);
        this.scene.rotate(Math.PI + Math.PI / 3, 0, 1,0);
        this.eye.display();
        this.scene.popMatrix();

        // Antennae
        this.scene.pushMatrix();
        this.scene.translate(0.2, 0, 0.95);
        this.antenna.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, 0.95);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.antenna.display();
        this.scene.popMatrix();

    }

    update(time){
        let delta_t = (time - this.currentTime) / 1000;
        this.currentTime = time;
        this.verticalPosition = 3 + Math.sin(Math.PI * time / 500) * 0.5;
        this.wingRotation = Math.sin(Math.PI * time / 150) * Math.PI / 12; //velocity of the wings

        this.position[0] += this.velocity[0] * delta_t;
        this.position[1] += this.velocity[1] * delta_t;
        this.position[2] += this.velocity[2] * delta_t;

        this.gardenPosition[0] = this.position[0] * this.scene.scaleFactor;
        this.gardenPosition[1] = this.position[1] * this.scene.scaleFactor;
        this.gardenPosition[2] = this.position[2] * this.scene.scaleFactor;

        if (time % 50 === 0) {
            console.log(this.gardenPosition);
        }
    }

    accelerate(v) {
        if (v === 0){
            let deceleration = 0.9;
            this.velocity[0] *= deceleration;
            this.velocity[2] *= deceleration;
    
            if (Math.abs(this.velocity[0]) < 0.01 && Math.abs(this.velocity[2]) < 0.01) {
                this.velocity[0] = 0;
                this.velocity[2] = 0;
            }
        } else {
            this.velocity[0] = v * Math.sin(this.orientation);
            this.velocity[2] = v * Math.cos(this.orientation);
        }    
    }

    vertical(v) {
        if (v === 0){
            let deceleration = 0.9;
            this.velocity[1] *= deceleration;
    
            if (Math.abs(this.velocity[1]) < 0.01) {
                this.velocity[1] = 0;
            }
        } else {
            this.velocity[1] = v;
        }
    }

    turn(v) {
        this.orientation += v;
        let speed = Math.sqrt(this.velocity[0]**2 + this.velocity[2]**2);
        this.velocity = [speed * Math.cos(this.orientation), this.velocity[1], speed * Math.sin(this.orientation)];
    }

    reset() {
        this.position = [0, 10, 0];
        this.gardenPosition = [0, 10, 0];
        this.orientation = 0;
        this.velocity = [0, 0, 0];
    }
}