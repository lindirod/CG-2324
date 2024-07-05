attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec4 vVertexPosition;

void main() {
    vec3 offset = vec3(0.0,0.0,0.0);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

    vVertexPosition = gl_Position;
}