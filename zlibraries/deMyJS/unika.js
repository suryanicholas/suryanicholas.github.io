// Underline Effect
var underlined = document.querySelector('#underlined');
var canvas = document.querySelectorAll('.nav-buttons');
var item = document.querySelectorAll('.this-links');

function indicator(e, reset = false){
    if (reset) {
        underlined.style.left = "0";
        underlined.style.width = "0";
    } else {
        underlined.style.left = e.offsetLeft+"px";
        underlined.style.width = e.offsetWidth+"px";
    }
}

canvas.forEach(canvasItem => {
    canvasItem.addEventListener('mouseover', () => {
        var firstA = canvasItem.querySelector('.this-links');
            indicator(firstA);
    });

    canvasItem.addEventListener('mouseleave', () => {
            indicator(null, true);
    });
});