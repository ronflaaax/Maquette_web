marquesSlider = document.querySelector(".slider-marques");

let clientX = null;
let grabbing = false;
let prevDistanceScrolled = null;
let distanceToScroll;

marquesSlider.addEventListener("mousedown",(e) => {
  clientX = e.clientX;
  grabbing=true;
})

marquesSlider.addEventListener("mouseup",() => {
  grabbing=false;
  prevDistanceScrolled += distanceToScroll;
})

marquesSlider.addEventListener("mousemove",(e) => {
  if (grabbing) {
    let newClientX = e.clientX;
    distanceToScroll = newClientX - clientX;
    marquesSlider.style.transform = `translateX(${distanceToScroll + prevDistanceScrolled}px)`
  }
})