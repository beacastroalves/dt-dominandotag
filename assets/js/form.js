const startForm = () => {
  console.log('Form started!');
  const modalButtonRef = document.querySelector('#modal-button');
  modalButtonRef.addEventListener('click', () => {
    window.location.href = data.modal.url;
  });
};