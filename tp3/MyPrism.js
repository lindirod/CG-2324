import { CGFobject } from '../lib/CGF.js';

/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers() {
        
        this.vertices = [];
        this.verticesAux = [];

        this.indices = [];
        this.indicesAux = [];
        
        this.normals = [];
        this.normals1 = [];
        this.normals2 = [];
        this.normalsAux1 = [];
        this.normalsAux2 = [];

        const alphaDeg = 360 / this.slices;
        const alphaRad = this.#toRadians(alphaDeg);
        const beta = alphaDeg / 2;

        for (var j = 0; j < this.stacks; j++) {
            for (var i = 0; i < this.slices; i++) {
                // Generate vertices
                this.verticesAux[3*i] = Math.cos(alphaRad * i);
                this.verticesAux[3*i+1] = Math.sin(alphaRad * i);
                this.verticesAux[3*i+2] = j * (1/this.stacks);
    
                this.verticesAux[3*(this.slices + i)] = Math.cos(alphaRad * i);
                this.verticesAux[3*(this.slices + i)+1] = Math.sin(alphaRad * i);
                this.verticesAux[3*(this.slices + i)+2] = j * (1/this.stacks) + (1/this.stacks);
    
                // Generate triangles from vertices
                this.indicesAux[3*i] = i + 2*this.slices*j;
                this.indicesAux[3*i+1] = (i+1) % this.slices + 2*this.slices*j;
                this.indicesAux[3*i+2] = this.slices+i + 2*this.slices*j;

                this.indicesAux[3*(this.slices + i)] = this.slices + i + 2*this.slices*j;
                this.indicesAux[3*(this.slices + i)+1] = (this.slices - 1 + i) % this.slices + this.slices + 2*this.slices*j;
                this.indicesAux[3*(this.slices + i)+2] = i + 2*this.slices*j;
                
                // Generate normals
                this.normals1[3*i] = Math.cos(this.#toRadians((alphaDeg * i) + beta));
                this.normals1[3*i+1] = Math.sin(this.#toRadians((alphaDeg * i) + beta));
                this.normals1[3*i+2] = 0;
    
                this.normals2[3*i] = Math.cos(this.#toRadians((alphaDeg * i) - beta));
                this.normals2[3*i+1] = Math.sin(this.#toRadians((alphaDeg * i) - beta));
                this.normals2[3*i+2] = 0;
            }
            this.vertices.push(...this.verticesAux);
            this.indices.push(...this.indicesAux);
            this.normalsAux1.push(...this.normals1, ...this.normals1);
            this.normalsAux2.push(...this.normals2, ...this.normals2);
        }

        this.vertices.push(...this.vertices);

        var indicesCopy = [...this.indices];
        this.indices.push(...indicesCopy.reverse());

        this.normals.push(...this.normalsAux1, ...this.normalsAux2);
        

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    #toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}