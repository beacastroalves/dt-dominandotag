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
          } else if (!controlRef.value.match(/^[\w\-.]+@(?:[\w-]+\.)+[\w-]{2,}$/)) {
            errorName = 'invalidEmail';
          }
          break;
        case 'whatsapp':
          if (!controlRef.value) {
            errorName = 'required';
          } else if (!controlRef.value.match(/^\([1-9]{2}\) (?:9[0-9])[0-9]{3}\-[0-9]{4}$/)) {
            errorName = 'invalidWhatsapp';
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
      if (controlRef.getAttribute('mask')) {
        applyMaskOnInput(controlRef);
      }

      validateAllControls();
    });

    controlRef.addEventListener('blur', () => {
      controlRef.classList.add('touched');
      validateAllControls();
    });
  });

  buttonRef.addEventListener('click', async () => {
    if (buttonRef.getAttribute('disabled')) {
      return;
    }

    const obj = {};
    controlRefs.forEach(controlRef => obj[controlRef.name] = controlRef.value);

    buttonRef.classList.add('loading');
    buttonRef.setAttribute('disabled', true);

    try {
      await fetch('/api/', {
        method: 'POST',
        body: JSON.stringify({
          action: 'signup',
          data: obj
        })
      });

      window.location.href = dataModal.url;
    } catch (error) {
      alert(error);
      buttonRef.removeAttribute('disabled');
    } finally {
      buttonRef.classList.remove('loading');
    }
  });

  validateAllControls();
};