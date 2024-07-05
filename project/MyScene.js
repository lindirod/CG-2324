import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyPlane } from "./sky-sphere/MyPlane.js";
import { MyPanorama } from "./sky-sphere/MyPanorama.js";
import { MyGarden } from "./garden/MyGarden.js";
import { MyRockSet } from "./rocks/MyRockSet.js";
import { MyBee } from "./bee/MyBee.js";
import { MyHive } from "./pollen-hive/MyHive.js";
import { MyGrass } from "./garden/MyGrass.js";
import { MyCircle } from "./garden/MyCircle.js";
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);

    this.pollenTexture = new CGFtexture(this, 'images/pollen.jpg');
    this.hiveSide = 5;

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 5, 0, 5, 0, 5);

    this.rockSet = new MyRockSet(this, 7);
    this.garden = new MyGarden(this, 5, 5, this.pollenTexture);
    this.bee = new MyBee(this, this.pollenTexture);
    this.hive = new MyHive(this, this.hiveSide, 3, this.pollenTexture);
    this.grass = new MyGrass(this, 100, 100);
    this.circle = new MyCircle(this, 1);

    this.receptacles = this.garden.receptaclePositions;

    let startTime = Date.now();

    setInterval(() => {
      let time = Date.now() - startTime;
      this.update(time);
      this.display();
    }, 1000 / 60); //60 FPS
  
    this.groundMaterial = new CGFappearance(this);
    this.groundTexture = new CGFtexture(this, 'images/ground.jpg');
    this.groundMaterial.setTexture(this.groundTexture);
    this.groundMaterial.setTextureWrap('REPEAT', 'REPEAT');
    this.groundMaterial.setAmbient(1, 1, 1, 1);
    this.groundMaterial.setEmission(1, 1, 1, 1);

    this.dirtMaterial = new CGFappearance(this);
    this.dirtTexture = new CGFtexture(this, 'images/pollen.jpg');
    this.dirtMaterial.setTexture(this.dirtTexture);
    this.dirtMaterial.setTextureWrap('REPEAT', 'REPEAT');
    this.dirtMaterial.setAmbient(0.3, 0.05, 0.05, 1);
    this.dirtMaterial.setDiffuse(0.16, 0.05, 0.02, 1);

    this.grassShader = new CGFshader(this.gl, 'shaders/grass.vert', 'shaders/grass.frag');
    this.grassShader.setUniformsValues({ timeFactor: 0 });

    this.panoramaTex = new CGFtexture(this, "images/panorama4.png");
    this.panorama = new MyPanorama(this, this.panoramaTex);

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.displayRocks = true;
    this.displayBee = true;
    this.displayHive = true;
    this.displayFlowers = true;
    this.displayGrass = true;
    this.scaleFactor = 0.2;
    this.speedFactor = 2;

    this.hiveScale = 2;
    this.hiveHeight = this.rockSet.layers * 1.4;
    this.hiveX = -15;
    this.hiveZ = -15;

    this.hiveCorners = [
      [(-this.hiveSide/2 * this.hiveScale) + this.hiveX,
        this.hiveHeight, 
        (this.hiveSide/2 * this.hiveScale) + this.hiveZ - this.hiveSide
      ],
      [(this.hiveSide/2 * this.hiveScale) + this.hiveX,
       this.hiveHeight,
       (this.hiveSide/2 * this.hiveScale) + this.hiveZ - this.hiveSide
      ],
      [(-this.hiveSide/2 * this.hiveScale) + this.hiveX,
       this.hiveHeight,
       (-this.hiveSide/2 * this.hiveScale) + this.hiveZ - this.hiveSide
      ],
      [(this.hiveSide/2 * this.hiveScale) + this.hiveX,
       this.hiveHeight,
       (-this.hiveSide/2 * this.hiveScale) + this.hiveZ - this.hiveSide
      ]
    ];

    this.enableTextures(true);
  }

  initLights() {
    this.lights[0].setPosition(20, 10, 20, 1);
    this.lights[0].setDiffuse(0.8, 0.8, 0.8, 1);
    this.lights[0].enable();
    //this.lights[0].setVisible(true);
    this.lights[0].update();


    this.lights[1].setPosition(5, 8, 5, 1);
    this.lights[1].setDiffuse(0.8, 0.8, 0.8, 1);
    this.lights[1].enable();
    //this.lights[1].setVisible(true);
    this.lights[1].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.5,
      0.1,
      1000,
      vec3.fromValues(-20, 20, 20),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(1, 1, 1, 1);
    this.setDiffuse(0.2, 0.2, 0.2, 1.0);
    this.setSpecular(0.2, 0.2, 0.2, 1.0);
    this.setShininess(10.0);
  }

  update(time){
    this.checkKeys();
    this.bee.update(time);
    this.grassShader.setUniformsValues({ timeFactor: time / 50 % 60})
  }

  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;

    if (this.gui.isKeyPressed("KeyW")){
      text+=" W ";
      keysPressed=true;
      this.bee.accelerate(this.speedFactor * 5);
    } else {
      this.bee.accelerate(0);
    }

    if (this.gui.isKeyPressed("KeyS")){
      text+=" S ";
      keysPressed=true;
      this.bee.accelerate(-this.speedFactor);
    }

    if (this.gui.isKeyPressed("KeyA")){
      text+=" A ";
      keysPressed=true;
      this.bee.turn(this.speedFactor * 0.05);
    }

    if (this.gui.isKeyPressed("KeyD")){
      text+=" D ";
      keysPressed=true;
      this.bee.turn(-this.speedFactor * 0.05);
    }

    if (this.gui.isKeyPressed("KeyR")){
      text+=" R ";
      keysPressed=true;
      this.bee.reset();
    }

    if (this.gui.isKeyPressed("KeyF")){
      text+=" F ";
      keysPressed=true;
      this.bee.vertical(-this.speedFactor * 5);
    } else {
      this.bee.vertical(0);
    }

    if (this.gui.isKeyPressed("KeyP")){
      text+=" P ";
      keysPressed=true;
      this.bee.vertical(this.speedFactor * 5);
      if (!this.bee.pollen) {
        let index = this.nearestFlower(this.bee.gardenPosition).index;
        let distance = this.nearestFlower(this.bee.gardenPosition).distance;
        console.log(distance);
        if (distance <= 1.5) {
          let pollen = this.garden.flowers[index].pollen;
          this.garden.flowers[index].removePollen();
          this.bee.addPollen(pollen);
        }
      }
    } else {
      this.bee.vertical(0);
    }

    if (this.gui.isKeyPressed("KeyO")){
      text+=" O ";
      keysPressed=true;
      if (this.bee.pollen) {
        let pollen = this.bee.pollen;
        let isNearHive = false;
        for (let corner of this.hiveCorners) {
          let distance = this.distance3D(this.bee.gardenPosition, corner);
          if (distance <= 5) {
            isNearHive = true;
            break;
          }
        }
        if (isNearHive) {
          this.bee.removePollen();
          this.hive.addPollen(pollen);
        }
      }
    } else {
      this.bee.vertical(0);
    }

    if (keysPressed)
      console.log(text);

  }

  distance3D(point1, point2) {
    let dx = point2[0] - point1[0];
    let dy = point2[1] - point1[1];
    let dz = point2[2] - point1[2];

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  nearestFlower(bee) {
    let min = Infinity;
    let minIndex = -1;
    for (let i = 0; i < this.receptacles.length; i++) {
      let distance = this.distance3D(bee, this.receptacles[i]);
      if (distance < min) {
        min = distance;
        minIndex = i;
      }
    }
    return {index: minIndex, distance: min};
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.lights[0].update();
    this.lights[1].update();

    // Draw axis
    if (this.displayAxis) {
      this.axis.display();
    }

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.groundMaterial.apply();
    this.scale(100,100,100);

    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    if (this.displayFlowers) {
      this.pushMatrix();
      this.garden.display();
      this.popMatrix();
    }

    if (this.displayRocks) {
      this.pushMatrix();
      this.translate(this.hiveX, 1, this.hiveZ);
      this.scale(2*this.hiveScale, 2*this.hiveScale, 2*this.hiveScale);
      this.rockSet.display();
      this.popMatrix();
    }

    if (this.displayHive) {
      this.pushMatrix();
      this.translate(this.hiveX, this.rockSet.layers * 1.4, this.hiveZ);
      this.scale(this.hiveScale, this.hiveScale, this.hiveScale);
      this.hive.display();
      this.popMatrix();
    }

    if (this.displayGrass) {
      this.pushMatrix();
      this.setActiveShader(this.grassShader);
      this.translate(10, 0, 10);
      this.grass.display();
      this.setActiveShader(this.defaultShader);
      this.dirtMaterial.apply();
      this.translate(0, 0.1, 0);
      this.scale(13, 13, 13);
      this.circle.display();
      this.popMatrix();
    }

    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();

    if (this.displayBee) {
      this.pushMatrix();
      this.bee.display();
      this.popMatrix(); 
    }
    // ---- END Primitive drawing section
  }
}
