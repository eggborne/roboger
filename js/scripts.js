const options = {
  themes: ['lightmode', 'darkmode', 'princemode'],
  languages: ['us', 'gb'],
};

window.onload = () => {
  setDimensions();
  document.getElementById('number-input').addEventListener('input', handleNumberInput);
  document.getElementById('number-form').addEventListener('submit', handleSubmitClick);
  document.getElementById('themes-select-button').addEventListener('pointerdown', handleThemeSelectClick);
  document.getElementById('languages-select-button').addEventListener('pointerdown', handleLanguageSelectClick);
  document.querySelector('main').addEventListener('pointerdown', closeMenusIfOpen);
  [...document.getElementById('themes-menu').children].forEach(element => setMenuClickHandlers(element.id));
  [...document.getElementById('languages-menu').children].forEach(element => setMenuClickHandlers(element.id));
  document.body.classList.add('revealed');
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

function handleNumberInput(e) {
  let containsNumber = e.target.value && typeof parseInt(e.target.value) === 'number';
  document.getElementById('submit-button').disabled = !containsNumber;
}

async function handleSubmitClick(e) {
  e.preventDefault();
  document.getElementById('submit-button').disabled = true;
  if (document.querySelector('#output-area > li')) {
    document.getElementById('output-area').style.opacity = 0;
    await pause(150); // wait for fade out
    document.getElementById('output-area').innerHTML = '';
  }
  document.getElementById('output-area').style.opacity = 1;
  let submittedNumber = parseInt(document.getElementById('number-input').value);
  let numberArray = getNumberArray(submittedNumber);
  let convertedArray = getConvertedArray(numberArray);
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
    await pause(20);
    newRow.classList.add('showing');
    await pause(100);
  }
  document.getElementById('submit-button').disabled = false;
}

function handleLanguageSelectClick(e) {
  document.getElementById('languages-menu').classList.toggle('open');
  closeMenusIfOpen('languages')
}

function handleThemeSelectClick(e) {
  document.getElementById('themes-menu').classList.toggle('open');
  closeMenusIfOpen('themes')
}

function setMenuClickHandlers(elementID) {
  let menuChoice = elementID.split('-')[0];
  let element = document.getElementById(elementID);
  element.addEventListener('pointerdown', async (e) => {
    document.getElementById('submit-button').style.pointerEvents = 'none';
    replaceOptionClass(elementID, menuChoice);
    let imageExt = options.themes.indexOf(menuChoice) === -1 ? 'svg' : 'png';
    let optionType = typeOfOption(menuChoice);
    e.target.classList.add('pressed');
    let otherChoices = options[optionType].filter(optionName => !document.body.classList.contains(optionName));
    otherChoices.forEach(choiceName => {
      document.getElementById(`${choiceName}-button`).classList.remove('pressed');;
    });

    document.getElementById(`${optionType}-display`).src = `media/${menuChoice}.${imageExt}`;
    await pause(75); // pause to show new choice highlighted
    document.getElementById(`${optionType}-menu`).classList.remove('open');
    if (optionType === 'languages') {
      changeExistingTextLanguage(menuChoice);
    }
    setTimeout(() => {
      document.getElementById('submit-button').style.pointerEvents = 'all';
    }, 150);
  });
}

function changeExistingTextLanguage(newLanguage) {
  let isGB = newLanguage === 'gb';
  [...document.getElementById('output-area').children].forEach(row => {
    let textArea = row.children[1];
    let correct = isGB ? 'neighbour' : 'neighbor';
    let incorrect = isGB ? 'neighbor' : 'neighbour';
    if (textArea.innerText.includes(incorrect)) {
      textArea.innerText = textArea.innerText.replace(incorrect, correct);
    }
  });
  let properTitle = `Mr. Roboger's Neighbo${isGB ? 'u' : ''}rhood`;
  document.querySelector('header > p:first-child').innerText = properTitle;
  document.title = properTitle;
}

function closeMenusIfOpen(typeToKeep) {
  if (typeToKeep !== 'themes' && document.getElementById('themes-menu').classList.contains('open')) {
    document.getElementById('themes-menu').classList.remove('open');
  }
  if (typeToKeep !== 'languages' && document.getElementById('languages-menu').classList.contains('open')) {
    document.getElementById('languages-menu').classList.remove('open');
  }
}

function replaceOptionClass(elementID, newClass) {
  let classToAdd = newClass;
  let newType = typeOfOption(newClass);
  let classArray = [...document.body.classList];
  classArray.forEach(className => {
    if (className === newClass) {
      classToAdd = undefined;
    } else if (options[newType].includes(className)) {
      document.body.classList.remove(className);
    }
  });
  if (classToAdd) {
    document.body.classList.add(classToAdd);
  }
}

// utility functions

const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function typeOfOption(option) {
  let optionType;
  for (let type in options) {
    if (options[type].includes(option)) {
      optionType = type;
    };
  };
  return optionType;
}

function setDimensions() {
  document.documentElement.style.setProperty('--actual-height', window.innerHeight + 'px');
  window.onresize = () => document.documentElement.style.setProperty('--actual-height', window.innerHeight + 'px');
}