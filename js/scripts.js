window.onload = () => {
  document.documentElement.style.setProperty('--actual-height', window.innerHeight + 'px');
  document.getElementById('number-input').addEventListener('input', e => {
    let containsNumber = e.target.value && typeof parseInt(e.target.value) === 'number';
    document.getElementById('submit-button').disabled = !containsNumber;
  })
  document.getElementById('number-form').addEventListener('submit', async e => {
    e.preventDefault();
    if (document.querySelector('#output-area > li')) {
      console.warn('empty')
      document.getElementById('output-area').style.opacity = 0;
      await pause(300); // wait for fade out
      document.getElementById('output-area').innerHTML = '';
    }
    document.getElementById('output-area').style.opacity = 1;
    let submittedNumber = parseInt(document.getElementById('number-input').value);
    let numberArray = getNumberArray(submittedNumber);
    let convertedArray = getConvertedArray(numberArray);
    convertedArray.forEach((item, i) => {
      document.getElementById('output-area').innerHTML += `
        <li>
          <div class="center-flex">${numberArray[i]}</div>
          <div class="center-flex">${item}</div>
        </li>
      `
    });
  });
}

// business logic

function getNumberArray(num) {
  let outputArray = [];
  if (num >= 0) {
    for (let i = 0; i <= num; i++) {
      outputArray.push(i);
    }
  } else {
    for (let i = 0; i >= num; i--) {
      outputArray.push(i);
    }
  }
  return outputArray;
}

function getConvertedNumber(num) {
  let numberString = num.toString();
  let convertedNumber = num;
  if (numberString.includes('3')) {
    convertedNumber = 'Won\'t you be my neighbor?';
  } else if (numberString.includes('2')) {
    convertedNumber = 'Boop!';
  } else if (numberString.includes('1')) {
    convertedNumber = 'Beep!';
  }
  return convertedNumber;
}

function getConvertedArray(numberArray) {
  return numberArray.map(num => getConvertedNumber(num));
}

// UI logic


// utility functions

const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));