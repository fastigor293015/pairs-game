let arr = [],
    colCount = 0,
    founded = 0,
    timer,
    interval,
    timeRemaining,
    prev,
    result;

const TIMER_MS = 60000,
      retryBtn = document.querySelector('.result__btn'),
      fixedOverlay = document.querySelector('.fixed-overlay'),
      form = document.querySelector('.form'),
      gameContainer = document.querySelector('.game'),
      resultField = document.querySelector('.result'),
      timerModal = document.querySelector('.timer'),
      timerField = document.querySelector('.timer__value');

settings();

function settings() {
  fixedOverlay.classList.add('display');
  form.classList.add('display');
  setTimeout(() => {
    form.classList.add('visible');
  }, 200);
}

form.onsubmit = (e) => {
  e.preventDefault();
  form.classList.remove('visible');
  setTimeout(() => {
    form.classList.remove('display');
  }, 200);
  fixedOverlay.classList.remove('display');

  value = e.currentTarget.querySelector('.form__input').value;

  if ((value >= 2) && (value <= 10) && (value % 2 === 0)) {
    colCount = value;
  } else {
    colCount = 4;
  }

  e.currentTarget.querySelector('.form__input').value = '';
  cardsCreate();
}

function cardsCreate() {
  let cardsCount = colCount * colCount,
      digit = 1;

  arr.length = cardsCount;

  for (let i = 0; i < arr.length; i++) {
      arr[i] = digit;
      digit += (i % 2); // после каждых двух обработанных элементов массива digit будет увеличиваться на 1
  }

  shuffle(arr); // перемешиваем элементы в массиве

  gameContainer.style.gridTemplateColumns = `repeat(${colCount}, 220px)`;

  for (let i = 0; i < arr.length; i++) {
    let card = document.createElement('div'),
        cardFlipper = document.createElement('div'),
        cardFront = document.createElement('div'),
        cardBack = document.createElement('div');

    card.classList.add('flip-card');
    card.dataset.number = arr[i];
    cardFlipper.classList.add('flipper');
    cardBack.classList.add('back');
    cardBack.textContent = arr[i];
    cardFront.classList.add('front');
    gameContainer.append(card);
    card.append(cardFlipper);
    cardFlipper.append(cardFront);
    cardFlipper.append(cardBack);
    setTimeout(() => {
      card.classList.add('visible');
    }, 200)
    card.onclick = () => {
      card.classList.add('opened');
      card.classList.add('not-clickable');
      setTimeout(() => {
        pairCheck(card);
      }, 800);
    }
  }
  launchTimer();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами
    // мы используем для этого синтаксис "деструктурирующее присваивание"
    // то же самое можно записать как:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function launchTimer() {
  timer = setTimeout(() => {
    gameResult();
    fixedOverlay.classList.add('display');
    resultField.classList.add('display');
    setTimeout(() => {
      resultField.classList.add('visible');
    }, 200);
  }, TIMER_MS);

  timeRemaining = TIMER_MS / 1000;

  timerDecrement();

  timerModal.classList.add('visible');
  interval = setInterval(timerDecrement, 1000);
}

function timerDecrement() {
  let min = timeRemaining / 60,
      sec = `${timeRemaining % 60}`;
  min = `${Math.floor(min)}`;
  if (min.length < 2) {
    min = '0' + min;
  }
  if (sec.length < 2) {
    sec = '0' + sec;
  }

  timerField.textContent = `${min}:${sec}`;
  if (timeRemaining === 0) {
    clearInterval(interval);
    timerModal.classList.remove('visible');
  }
  timeRemaining -= 1;
}

function pairCheck(clickedCard) {
  if (prev === undefined) {
    prev = clickedCard;
  } else {
    if (prev.dataset.number !== clickedCard.dataset.number) {
      clickedCard.classList.remove('opened');
      prev.classList.remove('opened');
      clickedCard.classList.remove('not-clickable');
      prev.classList.remove('not-clickable');
    } else {
      founded += 2;
    }
    prev = undefined;
    gameResult();
  }
}

function gameResult() {
  if (founded === arr.length) {
    clearTimeout(timer);
    clearInterval(interval);
    timerModal.classList.remove('visible');
    result = 'Вы победили!';
    resultField.querySelector('.result__title').textContent = result;
    fixedOverlay.classList.add('display');
    resultField.classList.add('display');
    setTimeout(() => {
      resultField.classList.add('visible');
    }, 200);
  } else {
    result = 'Вы проиграли!';
    resultField.querySelector('.result__title').textContent = result;
  }
}

retryBtn.onclick = () => {
  arr = [];
  founded = 0;
  prev = undefined;

  document.querySelectorAll('.flip-card').forEach((item) => {
    item.classList.remove('visible');
    setTimeout(() => {
      item.remove();
    }, 200)
  })

  resultField.classList.remove('visible');
  setTimeout(() => {
    resultField.classList.remove('display');
  }, 200);

  settings();
}
