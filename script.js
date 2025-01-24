const sliderMarques = document.querySelector('.slider-marques')
const itemMarques = document.querySelector('.item-marques')

let isPressed = false;

let cursoX;
sliderMarques.addEventListener("mousedown", (e) => {
    isPressed = true;
    cursorX = e.offsetX - itemMarques.offsetLeft;
    sliderMarques.style.cursor = "grabbing";
});

sliderMarques.addEventListener("mousemove", (e) => {
   if (!isPressed) return;
   e.preventDefault();
   itemMarques.style.left = `${e.offsetX - cursorX}px`;
});