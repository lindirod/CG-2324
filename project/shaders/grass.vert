uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

attribute vec3 position;
varying vec3 vPosition;

void main() {
    float frequency = 0.2;
    float amplitude = 0.1 * position.y;
    float z = position.z + sin(timeFactor * frequency + position.x) * amplitude;

    vec4 newPosition = vec4(position.x, position.y, z, 1.0);
    vPosition = position;
 
    gl_Position = uPMatrix * uMVMatrix * newPosition;
}