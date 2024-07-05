import { CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, width, height, pollenTexture) {
        super(scene);
        this.width = width;
        this.height = height;

        this.petalColors = [
            [0.93, 0.93, 0.73], // white
            [0.69, 0.06, 0.02], // red
            [0.89, 0.62, 0.42], // light-orange
            [0.66, 0.25, 0.61], // pink
            [0.87, 0.59, 0.77], // light-pink
            [0.27, 0.35, 0.89], // blue
        ];

        this.receptacleColors = [
            [0.89, 0.89, 0.12], // yellow
            [0.88, 0.47, 0.12], // orange
            [0.21, 0.09, 0.01], // brown
            [0.77, 0.07, 0.71], // pink
        ]

        this.stemColors = [
            [0.16, 0.90, 0.25], // light-green
            [0.08, 0.64, 0.15], // green
            [0.02, 0.29, 0.05], // dark-green
            [0.14, 0.37, 0.17], // moss-green
            [0.20, 0.91, 0.11], // bright-green 
        ];

        this.petalTextures = [
            new CGFtexture(this.scene, 'images/bluePetalTex.jpg'),
            new CGFtexture(this.scene, 'images/redPetalTex.jpg'),
            new CGFtexture(this.scene, 'images/pinkPetalTex.jpg'),
            new CGFtexture(this.scene, 'images/purplePetalTex.jpg'),
            new CGFtexture(this.scene, 'images/orangePetalTex.jpg')
        ];

        this.recepTextures = [
            new CGFtexture(this.scene, 'images/receptTexBrown.jpg'),
            new CGFtexture(this.scene, 'images/recepTexYellow.jpg'),
        ];

        this.stemTexture = new CGFtexture(this.scene, 'images/stemTex1.jpg');
        this.leafTexture = new CGFtexture(this.scene, 'images/leafTex.jpg');
        
        this.pollenTexture = pollenTexture;

        this.flowers = [];
        this.positions = [];
        this.receptaclePositions = [];

        this.flowerAmount = this.width * this.height;
        const cellWidth = this.width / this.flowerAmount;
        const cellLength = this.height / this.flowerAmount;
        const radius = Math.min(cellWidth, cellLength) / 2;
    
        for (let i = 0; i < this.flowerAmount; i++) {
            let stemRadius = this.getRandom(0.05, 0.08);
            let tubeAmount = Math.floor(this.getRandom(4, 7));
            let centerRadius = this.getRandom(0.25, 0.5);
            let petalAmount = Math.floor(this.getRandom(10, 14));
            let petalColor = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];
            let receptacleColor = this.receptacleColors[Math.floor(Math.random() * this.receptacleColors.length)];
            let stemColor = this.stemColors[Math.floor(Math.random() * this.receptacleColors.length)];
            let leafColor = this.stemColors[Math.floor(Math.random() * this.stemColors.length)];
            let petalTex = this.petalTextures[Math.floor(Math.random() * this.petalTextures.length)];
            let recepTex = this.recepTextures[Math.floor(Math.random() * this.recepTextures.length)];
            let stemTex = this.stemTexture;
            let leafTex = this.leafTexture;
            let pollenTex = this.pollenTexture;
            this.flowers.push(new MyFlower(
                                this.scene, 
                                stemRadius, 
                                tubeAmount, 
                                centerRadius, 
                                petalAmount, 
                                petalColor, 
                                receptacleColor,
                                stemColor,
                                leafColor,
                                petalTex,
                                stemTex,
                                leafTex,
                                recepTex,
                                pollenTex));

            const gridX = i % this.width;
            const gridY = Math.floor(i / this.width);

            const centerX = (gridX + 0.5) * cellWidth;
            const centerY = (gridY + 0.5) * cellLength;

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * radius;

            const x = centerX + distance * Math.cos(angle);
            const y = centerY + distance * Math.sin(angle);

            const distancingFactor = 20

            this.positions.push({x: x * distancingFactor, y: y * distancingFactor});
        }

        for (let i = 0; i < this.flowerAmount; i++) {
            this.receptaclePositions.push([this.positions[i].x, this.flowers[i].receptacleY, this.positions[i].y]);
        }
        console.log(this.receptaclePositions);
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    display() {
        for (let i = 0; i < this.flowers.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.positions[i].x, 0, this.positions[i].y);
            this.flowers[i].display();
            this.scene.popMatrix();
        }
    }
}