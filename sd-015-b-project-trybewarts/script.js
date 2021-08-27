const email = document.getElementById('email');
const password = document.getElementById('password');
const button = document.getElementById('btn-login');
const ratingDiv = document.querySelector('.radio-rating');
const checkTerms = document.getElementById('agreement');
const submitBtn = document.getElementById('submit-btn');
const counter = document.getElementById('counter');
const textComment = document.getElementById('textarea');

function handleLogin() {
  if (email.value === 'tryber@teste.com' && password.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

function createRating() {
  for (let index = 1; index <= 10; index += 1) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('rate-div');

    const newInput = document.createElement('input');
    newInput.setAttribute('name', 'rate');
    newInput.setAttribute('value', index);
    newInput.type = 'radio';
    newInput.id = `rate-${index}`;

    const newLabel = document.createElement('label');
    newLabel.innerText = index;
    newLabel.setAttribute('for', `rate-${index}`);

    ratingDiv.appendChild(newDiv);
    newDiv.appendChild(newInput);
    newDiv.appendChild(newLabel);
  }
}

function handleTerms() {
  if (checkTerms.checked) {
    submitBtn.removeAttribute('disabled');
  } else {
    submitBtn.setAttribute('disabled', true);
  }
}

createRating();

function countText() {
  counter.innerHTML = 500 - textComment.value.length;
}

button.addEventListener('click', handleLogin);
checkTerms.addEventListener('click', handleTerms);
textComment.addEventListener('keyup', countText);
