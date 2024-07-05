attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
varying vec4 vVertexPosition;

uniform sampler2D water;

void main() {
	vTextureCoord = aTextureCoord;

    float water_texture = texture2D(water, vTextureCoord + vec2(0.1*timeFactor, 0.1*timeFactor)).g;  

    vec3 offset = aVertexNormal * 0.05 * water_texture;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}