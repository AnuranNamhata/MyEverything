let highestZ = 1;
class Paper {
    holdingPaper = false;
    mouseTouchX = 0;
    mouseTouchY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;
    init(paper) {
        // Handle mouse movement
        const handleMouseMove = (e) => {
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            if (!this.rotating) {
                this.mouseX = clientX;
                this.mouseY = clientY;
                this.velX = this.mouseX - this.prevMouseX;
                this.velY = this.mouseY - this.prevMouseY;
            }
            const dirX = clientX - this.mouseTouchX;
            const dirY = clientY - this.mouseTouchY;
            const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
            const dirNormalizedX = dirX / dirLength;
            const dirNormalizedY = dirY / dirLength;
            const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
            let degrees = 180 * angle / Math.PI;
            degrees = (360 + Math.round(degrees)) % 360;
            if (this.rotating) {
                this.rotation = degrees;
            }
            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
            }
        };

        // Attach mouse events
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleMouseMove, { passive: false });

        // Handle mouse/touch start
        const handleStart = (e) => {
            if (this.holdingPaper) return;
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            this.mouseTouchX = clientX;
            this.mouseTouchY = clientY;
            this.prevMouseX = clientX;
            this.prevMouseY = clientY;
            if (e.type === 'touchstart') {
                e.preventDefault(); // Prevent scrolling when touching the element
            }
        };

        paper.addEventListener('mousedown', handleStart);
        paper.addEventListener('touchstart', handleStart, { passive: false });

        // Handle mouse/touch end
        const handleEnd = () => {
            this.holdingPaper = false;
            this.rotating = false;
        };

        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchend', handleEnd);
    }
}

// Initialize Paper instances for each .paper element
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});



const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const popup = document.getElementById("popup");

noButton.addEventListener("mouseover", () => {
    noButton.style.position = "absolute";
    noButton.style.left = Math.random() * 80 + "vw";
    noButton.style.top = Math.random() * 80 + "vh";
});

yesButton.addEventListener("click", () => {
    popup.style.display = "block";
});

// Hide the popup initially
popup.style.display = "none";
