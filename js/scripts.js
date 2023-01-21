let jsStarted = Date.now();
loadPrinceFont();

const options = {
  themes: ['lightmode', 'darkmode', 'princemode'],
  languages: ['us', 'gb'],
};

let generating = false;

window.onload = async () => {
  setDimensions();
  document.getElementById('number-input').addEventListener('input', handleNumberInput);
  document.getElementById('number-form').addEventListener('submit', handleSubmitClick);
  document.getElementById('themes-select-button').addEventListener('pointerdown', handleThemeSelectClick);
  document.getElementById('languages-select-button').addEventListener('pointerdown', handleLanguageSelectClick);
  document.querySelector('main').addEventListener('pointerdown', closeMenusIfOpen);
  [...document.getElementById('themes-menu').children].forEach(element => setMenuClickHandlers(element.id));
  [...document.getElementById('languages-menu').children].forEach(element => setMenuClickHandlers(element.id));
  document.body.classList.add('revealed');
  console.warn('end of onload', (Date.now() - jsStarted));
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
    convertedNumber = `Won't ${document.body.classList.contains('princemode') ? 'U B' : 'you be'} my neighbo${document.body.classList.contains('gb') ? 'u' : ''}r?`;
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
  document.getElementById('submit-button').disabled = !containsNumber || generating;
}

async function handleSubmitClick(e) {
  e.preventDefault();
  let submittedNumber = parseInt(document.getElementById('number-input').value);
  document.getElementById('number-input').value = '';
  document.getElementById('submit-button').disabled = true;
  generating = true;
  if (document.querySelector('#output-area > li')) {
    document.getElementById('output-area').style.opacity = 0;
    await pause(150); // wait for fade out
    document.getElementById('output-area').innerHTML = '';
  }
  document.getElementById('output-area').style.opacity = 1;
  let numberArray = getNumberArray(submittedNumber);
  let convertedArray = getConvertedArray(numberArray);
  for (let i = 0; i < convertedArray.length; i++) {
    let newRow = document.createElement('li');
    newRow.innerHTML = `
      <div class="center-flex">${numberArray[i]}</div>
      <div class="center-flex"><p>${convertedArray[i]}</p></div>
    `;
    if (i % 2 === 0) {
      newRow.classList.add('from-right');;
    }
    document.getElementById('output-area').append(newRow);
    await pause(20);
    newRow.classList.add('showing');
    await pause(100);
  }
  generating = false;
  let containsNumber = document.getElementById('number-input').value && typeof parseInt(document.getElementById('number-input').value) === 'number';
  await pause(120);
  document.getElementById('submit-button').disabled = !containsNumber
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
    setStyleForDuration(document.getElementById('submit-button'), 'pointerEvents', 'none', 200);
    replaceOptionClass(elementID, menuChoice);
    changeExistingTextLanguage(menuChoice);
    let optionType = typeOfOption(menuChoice);
    let imageExt = optionType === 'languages' ? 'svg' : 'png';
    e.target.classList.add('pressed');
    let otherChoices = options[optionType].filter(optionName => !document.body.classList.contains(optionName));
    otherChoices.forEach(choiceName => {
      document.getElementById(`${choiceName}-button`).classList.remove('pressed');;
    });
    document.getElementById(`${optionType}-display`).src = `media/${menuChoice}.${imageExt}`;
    await pause(75); // pause to show new choice highlighted
    document.getElementById(`${optionType}-menu`).classList.remove('open');
  });
}

function changeExistingTextLanguage() {
  let isGB = document.body.classList.contains('gb');
  let isPrinceMode = document.body.classList.contains('princemode');
  let neighbor = { correct: isGB ? 'neighbour' : 'neighbor', incorrect: isGB ? 'neighbor' : 'neighbour'} 
  let youBe = { correct: isPrinceMode ? ' U B ' : ' you be ', incorrect: isPrinceMode ? ' you be ' : ' U B '};
  let for4 = { correct: isPrinceMode ? ' 4 ' : ' for ', incorrect: isPrinceMode ? ' for ' : ' 4 '};
  [...document.getElementById('output-area').children].forEach(row => {
    let textArea = row.children[1];
    textArea.innerHTML = textArea.innerHTML.replace(neighbor.incorrect, neighbor.correct);
    textArea.innerHTML = textArea.innerHTML.replace(youBe.incorrect, youBe.correct);
  });
  let footer = document.querySelector('footer > p');
  footer.innerHTML = footer.innerHTML.replace(for4.incorrect, for4.correct);
  let properTitle = `Mr. Roboger's Neighbo${isGB ? 'u' : ''}rhood`;
  document.querySelector('header p:first-child').innerText = properTitle;
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

function setStyleForDuration(element, styleName, setValue, duration) {
  let oldValue = element.style[styleName];
  element.style[styleName] = setValue;
  setTimeout(() => {
    element.style[styleName] = oldValue;
  }, duration);
}

function setDimensions() {
  document.documentElement.style.setProperty('--actual-height', window.innerHeight + 'px');
  window.onresize = () => document.documentElement.style.setProperty('--actual-height', window.innerHeight + 'px');
}

function loadPrinceFont() {
  let started = Date.now();
  const princeFont = new FontFace('Purple Rain', 'url(media/purplerain.ttf)');
  document.fonts.add(princeFont);
  princeFont.load().then(() => {
    console.warn(`loaded font in ${Date.now() - started}`);
  });
}