/*slider grab marques*/

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

/*slider actu et bons plans*/

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loading");

  const carousel = document.querySelector(".slider-actus");
  const carouselSlides = document.querySelectorAll(".item-actus");
  const carouselButtons = document.querySelectorAll("button.slider-nav");
  const sliderScrollbar = document.querySelector(".carousel-scrollbar");
  const sliderScrollbarThumb = document.querySelector(
    ".carousel-scrollbar .scrollbar-thumb"
  );

  let carouselMaxScroll = carousel.scrollWidth - carousel.clientWidth;

  const resizeScrollbarThumb = () => {
    sliderScrollbarThumb.style.width = `${
      (carousel.clientWidth / carousel.scrollWidth) * 100
    }%`;
  };

  resizeScrollbarThumb();

  let interval;
  let spaceBetween = 8;
  let slideWidth = 100;
  let slidesPerView = Math.floor(
    carousel.clientWidth / (slideWidth + spaceBetween)
  );

  const hideShowSliderNavButtons = (sliderElement) => {
    if (sliderElement) {
      document.body.classList.toggle(
        "slider-start",
        sliderElement.scrollLeft - 3 <= 0
      );
      document.body.classList.toggle(
        "slider-end",
        sliderElement.scrollLeft + sliderElement.offsetWidth + 3 >=
          sliderElement.scrollWidth
      );
    } else {
      console.error("sliderElement is not defined");
    }
  };

  let startX,
    thumbPosition,
    isMouseDown = false;

  const positionScrollbarThumb = () => {
    const scrollPositionX = carousel.scrollLeft;
    const thumbPositionX =
      (scrollPositionX / carouselMaxScroll) *
      (sliderScrollbar.clientWidth - sliderScrollbarThumb.offsetWidth);
    sliderScrollbarThumb.style.left = `${thumbPositionX}px`;
  };

/*  if (carouselSlides && carouselSlides.length > 0) {
    let intersectionObserver = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        entries.map((slide) => {
          console.log("slide.intersectionRatio:", slide.intersectionRatio);
          if (slide.isIntersecting) {
            let image = new Image();
            image.src = slide.target.dataset.imageSrc;
            image.className = "image-actus";
            image.onload = (event) => {
              slide.target.prepend(image);
              let index = parseInt(slide.target.dataset.index);
              index = index % slidesPerView;
              window.setTimeout(() => {
                slide.target.classList.add('loaded');
              }, (500 * index));
              intersectionObserver.unobserve(slide.target);
            };
          }
        });
      },
      {
        root: carousel
      }
    );
    
    carouselSlides.forEach((slide) => {
      intersectionObserver.observe(slide);
    });
  }*/

  if (carousel) {
    carousel.addEventListener("scroll", (event) => {
      let sliderWrapper = event.target || carousel;
      hideShowSliderNavButtons(sliderWrapper);
      positionScrollbarThumb();
    });

    hideShowSliderNavButtons(carousel);
  }

  if (carouselButtons && carouselButtons.length > 0) {
    carouselButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        let direction = event.target.id === "prev" ? -1 : 1;
        let slidesPerView = Math.floor(
          carousel.clientWidth / (slideWidth + spaceBetween)
        );
        let amountToScroll = (slideWidth + spaceBetween) * slidesPerView;
        carousel.scrollLeft += Math.floor(amountToScroll * direction);
      });
    });
  }

  if (sliderScrollbarThumb) {
    sliderScrollbarThumb.addEventListener("mousedown", (event) => {
      event.preventDefault();
      isMouseDown = true;
      sliderScrollbarThumb.classList.add("dragging");
      carousel.classList.add("dragging");
      startX = event.clientX;
      thumbPosition = event.target.offsetLeft;
    });

    document.addEventListener("mousemove", (event) => {
      if (!isMouseDown) return;
      event.preventDefault();
      const deltaX = event.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        sliderScrollbarThumb.offsetWidth;
      const thumbPositionX = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const sliderScrollLeft =
        (thumbPositionX / maxThumbPosition) * carouselMaxScroll;
      sliderScrollbarThumb.style.left = `${thumbPositionX}px`;
      carousel.scrollLeft = sliderScrollLeft;
    });

    const stopScrolling = (event) => {
      event.preventDefault();
      isMouseDown = false;
      sliderScrollbarThumb.classList.remove("dragging");
      carousel.classList.remove("dragging");
    };

    document.addEventListener("mouseup", stopScrolling);
  }

  window.onresize = function () {
    carouselMaxScroll = carousel.scrollWidth - carousel.clientWidth;
    slideWidth = 144;
    slidesPerView = Math.floor(carousel.clientWidth / slideWidth);
    resizeScrollbarThumb();
    positionScrollbarThumb();
  };
});

window.onload = function () {
  if (document.body.classList.contains("loading")) {
    document.body.classList.add("loaded");
  } else {
    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 1000);
  }
};
