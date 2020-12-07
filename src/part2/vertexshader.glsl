uniform float time;
uniform float animationTime;

varying vec3 normalWorldSpace;

vec3 modifyPosition(vec3 startPosition) {
    float inverseAnimationTime = 1.0 - animationTime;

    float frequency = 7.0 * inverseAnimationTime;
    float amplitude = 0.3 * inverseAnimationTime;

    float bump = 
        sin(time + startPosition.x * frequency) *
        sin(time + startPosition.y * frequency) *
        sin(time + startPosition.z * frequency);

    vec3 offset = normalWorldSpace * bump * amplitude;

    return startPosition + offset;
}

void main() {
  vec4 normalHomogeneousWorldSpace = modelMatrix * vec4(normal, 1.0);
  normalWorldSpace = normalHomogeneousWorldSpace.xyz/normalHomogeneousWorldSpace.w;

  vec3 modifiedPosition = modifyPosition(position);

  vec4 modelSpaceCoordinates = vec4(modifiedPosition, 1.0);
  vec4 worldSpaceCoordinates = modelMatrix * modelSpaceCoordinates;
  vec4 viewSpaceCoordinates = modelViewMatrix * modelSpaceCoordinates;
  vec4 screenSpaceCoordinates = projectionMatrix * viewSpaceCoordinates;

  gl_Position = screenSpaceCoordinates;
}