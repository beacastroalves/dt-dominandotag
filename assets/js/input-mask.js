const applyMaskOnInput = controlRef => {
  const maskPattern = controlRef.getAttribute('mask');
  const digits = controlRef.value.replace(/\D/g, '');
  let formattedValue = '';
  let digitIndex = 0;

  for (let i = 0; i < maskPattern.length; i++) {
    if (digitIndex >= digits.length) {
      break;
    }

    if (maskPattern[i] === '0') {
      formattedValue += digits[digitIndex];
      digitIndex++;
    } else {
      formattedValue += maskPattern[i];
    }
  }

  const digitIndexBefore = controlRef.value
  .slice(0, controlRef.selectionStart)
  .replace(/\D/g, '')
  .length;

  let newSelectionStart = formattedValue.length;
  let digitsFound = 0;
  for (let i = 0; i < formattedValue.length; ++i) {
    if (/\d/.test(formattedValue[i])) {
      if (digitsFound === digitIndexBefore) {
        newSelectionStart = i;
        break;
      }

      digitsFound++;
    }
  }

  controlRef.value = formattedValue;
  controlRef.setSelectionRange(newSelectionStart, newSelectionStart);
};