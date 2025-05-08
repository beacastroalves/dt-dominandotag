const mainRef = document.querySelector('main');
const sections = document.querySelectorAll('main section');
const loadingRef = document.querySelector('.loading');

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

(async () => {
  mainRef.style.display = 'none';

  let data = {
    modal: {
     title: 'Essa é a hora de destravar seus casos de TAG!',
     subTitle: 'Preencha com atenção os dados. Escolha um e-mail de fácil acesso.',
     button: 'Quero entrar para o DT!',
     url: 'https:\/\/dominandotag.com.br\/dtag\/'
    },
    first: {
     title: 'Aperte o play e entenda o porquê <span>seus casos de TAG</span> não avançam com o óbvio da TCC!',
     subTitle: '<span>Assista a aula</span> e pare de apagar incêndios nas suas sessões com pacientes cronicamente preocupados!',
     button: 'Quero entrar para o DT!',
     vimeo: {
      id: '983102307',
      hash: '',
      title: 'Toque aqui',
      text: {
       initial: 'Para assistir sua aula',
       resume: 'Para continuar sua aula',
       replay: 'Para reassistir a aula'
      }
     }
    },
    second: {
     button: 'Quero entrar para o DT!',
     images: [
      'Depoimento - Andressa Crisostomo.jpg',
      'Depoimento - Bruna Viscardi.jpg',
      'Depoimento - Daniella Magalhaes.jpg',
      'Depoimento - Larissa Oliveira.jpg',
      'Depoimento - Raissa Telles 1.jpg',
      'Depoimento - Raissa Telles 2.jpg',
      'Depoimento - Raissa Telles 3.jpg',
      'Depoimento - Raissa Telles 4.jpg'
     ]
    }
  };

  try {
    const res = await fetch('/api/', {
      method: 'POST',
      body: JSON.stringify({
        action: 'get'
      })
    });
    const json = await res.json();
    data = json;
  } catch (_) {
  }

  const setInnerHTML = (id, value) => {
    document.querySelector(id).innerHTML = value;
  };

  const setTextContent = (id, value) => {
    document.querySelector(id).textContent = value;
  };

  setInnerHTML('#first-title', data.first.title);
  setInnerHTML('#first-subTitle', data.first.subTitle);
  setTextContent('#first-vimeo-title', data.first.vimeo.title);
  setTextContent('#first-vimeo-text', data.first.vimeo.text.initial);
  setTextContent('#first-button', data.first.button);
  setTextContent('#second-button', data.second.button);
  setTextContent('#modal-title', data.modal.title);
  setTextContent('#modal-subTitle', data.modal.subTitle);
  setTextContent('#modal-button', data.modal.button);

  document.querySelector('#first-vimeo-id').setAttribute('vimeo', data.first.vimeo.id);

  document.querySelector('#second-images').innerHTML = data.second.images.map(image => {
    return `<li class="splide__slide"><img src="assets/images/deps/${image}"></li>`;
  }).join('');

  const splide = new Splide('.splide', {
    type: 'loop',
    autoplay: true,
  });
  splide.mount();

  startVimeo(data.first.vimeo);
  startForm();

  mainRef.style.display = 'block';
  loadingRef.remove();
})();