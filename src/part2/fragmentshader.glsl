uniform float time;

varying vec3 normalWorldSpace;

void main() { 
    vec3 color = vec3(normalWorldSpace) + 0.5;
    float alpha = 1.0;

    gl_FragColor = vec4(color, alpha);
}