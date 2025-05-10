console.log('Form started!');
const startForm = dataModal => {
  const formRef = document.querySelector('#form-vsl');
  const controlRefs = formRef.querySelectorAll('input');
  const buttonRef = formRef.querySelector('button');

  const validateAllControls = () => {
    let disableTheButton = false;
    controlRefs.forEach(controlRef => {
      let errorName = '';

      switch (controlRef.name) {
        case 'name':
          if (!controlRef.value) {
            errorName = 'required';
          } else if (controlRef.value.length < 4) {
            errorName = 'minLength';
          }
          break;
        case 'email':
          if (!controlRef.value) {
            errorName = 'required';
          }
          break;
        case 'whatsapp':
          if (!controlRef.value) {
            errorName = 'required';
          }
          break;
      }

      const smallRefs = controlRef.parentElement.querySelectorAll('small');
      controlRef.classList.remove('invalid');
      smallRefs.forEach(smallRef => {
        smallRef.style.display = 'none';
      });

      if (errorName) {
        controlRef.classList.add('invalid');
        disableTheButton = true;

        if (controlRef.classList.contains('touched')) {
          smallRefs.forEach(smallRef => {
            if (smallRef.classList.contains(errorName)) {
              smallRef.style.display = 'block';
            }
          });
        }
      }
    });

    if (disableTheButton) {
      buttonRef.setAttribute('disabled', true);
    } else {
      buttonRef.removeAttribute('disabled');
    }
  };

  controlRefs.forEach(controlRef => {
    controlRef.addEventListener('input', () => {
      console.log(controlRef.value);
      validateAllControls();
    });

    controlRef.addEventListener('blur', () => {
      controlRef.classList.add('touched');
      validateAllControls();
    });
  });

  buttonRef.addEventListener('click', () => {
    if (buttonRef.getAttribute('disabled')) {
      return;
    }

    const obj = {};
    controlRefs.forEach(controlRef => obj[controlRef.name] = controlRef.value);

    console.log(obj);
    // window.location.href = dataModal.url;
  });

  validateAllControls();
};