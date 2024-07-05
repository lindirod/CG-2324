
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;

void main() {
	vec3 offset_translation = vec3(normScale*0.5*sin(timeFactor),0.0,0.0);
	
	vTextureCoord = aTextureCoord;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset_translation, 1.0);
}

