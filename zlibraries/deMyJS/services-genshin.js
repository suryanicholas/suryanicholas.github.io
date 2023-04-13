const getCanvasHeader = document.querySelector('.canvas-header');
window.addEventListener('scroll', function() {
    if (this.window.pageYOffset > 75) {
        getCanvasHeader.classList.add('scrolled');
    } else {
        getCanvasHeader.classList.remove('scrolled');
    }
});