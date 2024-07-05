#ifdef GL_ES
precision highp float;
#endif

varying vec4 vVertexPosition;

void main() {
    if (vVertexPosition[1] > 0.5)
        gl_FragColor = vec4(1.0, 1.0, 0, 1.0);
    else if (vVertexPosition[1] < 0.5)
        gl_FragColor = vec4(0.6,0.6,0.9, 1.0);
}