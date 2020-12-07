export function addResizeListener(camera, renderer) {
    window.addEventListener('resize', function() {
        const height = window.innerHeight;
        renderer.setSize(window.innerWidth, height);
        camera.aspect = window.innerWidth / height;
        camera.updateProjectionMatrix();
    });
}