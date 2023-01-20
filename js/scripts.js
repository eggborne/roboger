window.onload = () => {
  document.documentElement.style.setProperty('--actual-height', window.innerHeight + 'px');
  document.getElementById('number-input').addEventListener('input', e => {
    let containsNumber = e.target.value && typeof parseInt(e.target.value) === 'number';
    document.getElementById('submit-button').disabled = !containsNumber;
  })
  document.getElementById('number-form').addEventListener('submit', handleSubmitClick);
  document.getElementById('language-select-button').addEventListener('pointerdown', handleLanguageSelectClick);
  [...document.getElementById('language-menu').children].forEach(element => setLanguageClickHandlers(element));
  document.querySelector('main').addEventListener('pointerdown', () => {
    if (document.getElementById('language-menu').classList.contains('open')) {
      document.getElementById('language-menu').classList.remove('open');
    }
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
    convertedNumber = `Won't you be my ${document.body.classList.contains('gb') ? 'neighbour' : 'neighbor'}?`;
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

async function handleSubmitClick(e) {
  e.preventDefault();
  if (document.querySelector('#output-area > li')) {
    document.getElementById('output-area').style.opacity = 0;
    await pause(300); // wait for fade out
    document.getElementById('output-area').innerHTML = '';
  }
  document.getElementById('output-area').style.opacity = 1;
  let submittedNumber = parseInt(document.getElementById('number-input').value);
  let numberArray = getNumberArray(submittedNumber);
  let convertedArray = getConvertedArray(numberArray);
  // convertedArray.forEach((item, i) => {
  //   document.getElementById('output-area').innerHTML += `
  //     <li>
  //       <div class="center-flex">${numberArray[i]}</div>
  //       <div class="center-flex">${item}</div>
  //     </li>
  //   `
  // });
  for (let i = 0; i < convertedArray.length; i++) {
    let newRow = document.createElement('li');
    newRow.innerHTML = `
      <div class="center-flex">${numberArray[i]}</div>
      <div class="center-flex">${convertedArray[i]}</div>
    `;
    if (i % 2 === 0) {
      newRow.classList.add('from-right');;
    }
    document.getElementById('output-area').append(newRow);
    requestAnimationFrame(() => {
      newRow.classList.add('showing');
    })
    await pause(100);
  }
}

function handleLanguageSelectClick(e) {
  document.getElementById('language-menu').classList.toggle('open');
}

function setLanguageClickHandlers(element) {
  let language = element.id.split('-')[0];
  element.addEventListener('pointerdown', async () => {
    document.body.classList = [language];
    document.getElementById('flag-display').src = `media/${language}.svg`
    await pause(200);
    document.getElementById('language-menu').classList.remove('open');
    changeExistingText(language)
  })
}

function changeExistingText(newLanguage) {
  [...document.getElementById('output-area').children].forEach(row => {
    let textArea = row.children[1];
    let correct = newLanguage === 'us' ? 'neighbor' : 'neighbour';
    let incorrect = newLanguage === 'us' ? 'neighbour' : 'neighbor';
    if (textArea.innerText.includes(incorrect)) {
      textArea.innerText = textArea.innerText.replace(incorrect, correct);
    }
  })
}

// utility functions

const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));