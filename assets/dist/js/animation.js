document.addEventListener('DOMContentLoaded', function() {
    const screenshot = document.querySelector('.app-screenshot');
    
    let rect = screenshot.getBoundingClientRect();
    let mouseX, mouseY;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;

    screenshot.addEventListener('mousemove', (e) => {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetRotateX = (mouseY - centerY) / 30;
        targetRotateY = (centerX - mouseX) / 30;
    });

    screenshot.addEventListener('mouseleave', () => {
        targetRotateX = 0;
        targetRotateY = 0;
    });

    window.addEventListener('resize', () => {
        rect = screenshot.getBoundingClientRect();
    });

    function animate() {
        // Smoothly interpolate between current and target rotations
        currentRotateX += (targetRotateX - currentRotateX) * 0.1;
        currentRotateY += (targetRotateY - currentRotateY) * 0.1;

        screenshot.style.transform = `
            perspective(1000px)
            rotateX(${currentRotateX}deg)
            rotateY(${currentRotateY}deg)
            translateY(${screenshot.matches(':hover') ? -5 : 0}px)
            scale(${screenshot.matches(':hover') ? 1.02 : 1})
            `;

        const shine = screenshot.querySelector('.shine');
        if (shine) {
            shine.style.background = `
                radial-gradient(
                    circle at ${mouseX}px ${mouseY}px,
                    rgba(255,255,255,0.2) 0%,
                    rgba(255,255,255,0) 60%
                )
            `;
        }

        requestAnimationFrame(animate);
    }

    animate();
});