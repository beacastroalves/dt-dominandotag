document.addEventListener('DOMContentLoaded', () => {
  const splide = new Splide('.splide', {
    type: 'loop',
    autoplay: true,
  });
  splide.mount();
});

const sections = document.querySelectorAll('main section');
let currentIndex = 0;

window.addEventListener('wheel', e => {
  e.preventDefault(); // prevent default scroll

  if (e.deltaY > 0 && currentIndex < sections.length - 1) {
    currentIndex++;
  } else if (e.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
  }

  sections[currentIndex].scrollIntoView();

}, { passive: false });

const setFullHeight = () => {
  document.documentElement.style.setProperty('--app-full-height', `${window.innerHeight}px`)
};
window.addEventListener('resize', setFullHeight);
setFullHeight();