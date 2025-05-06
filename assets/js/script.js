const mainRef = document.querySelector('main');
const sections = document.querySelectorAll('main section');

let currentIndex = 0;

window.addEventListener('wheel', e => {
  if (mainRef.className === 'no-scroll') {
    return;
  }

  e.preventDefault(); // prevent default scroll

  if (e.deltaY > 0 && currentIndex < sections.length - 1) {
    currentIndex++;
  } else if (e.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
  }

  sections[currentIndex].scrollIntoView();

}, { passive: false });

document.addEventListener('DOMContentLoaded', () => {
  const splide = new Splide('.splide', {
    type: 'loop',
    autoplay: true,
  });
  splide.mount();
});

const setFullHeight = () => {
  document.documentElement.style.setProperty('--app-full-height', `${window.innerHeight}px`)
};
window.addEventListener('resize', setFullHeight);
setFullHeight();

const modalWrapperRef = document.querySelector('.modal-wrapper');

const openModal = () => {
  mainRef.classList.add('no-scroll');
  modalWrapperRef.classList.add('open');
};

const closeModal = () => {
  mainRef.classList.remove('no-scroll');
  modalWrapperRef.classList.remove('open');
};

document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', openModal);
});

document.querySelectorAll('.close-modal').forEach(button => {
  button.addEventListener('click', closeModal);
});