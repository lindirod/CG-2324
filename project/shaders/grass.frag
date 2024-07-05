#ifdef GL_ES
precision highp float;
#endif

varying vec3 vPosition;

void main() {
    float darkness = 1.5 - vPosition.y;
    vec4 darkColor = vec4(0.01, 0.15, 0.005, 1.0);
    vec4 lightColor = vec4(0.05, 0.5, 0.02, 1.0);

    gl_FragColor = mix(lightColor, darkColor, darkness);
}