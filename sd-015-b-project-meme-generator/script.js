// Variáveis
const textInput = document.querySelector('#text-input');
const imgInput = document.querySelector('#meme-insert');
const text = document.querySelector('#meme-text');
const img = document.querySelector('#meme-image');

// Funções
function updateText(event) {
  text.innerHTML = event.target.value;
}

function updateImg(event) {
  const newImg = event.target.files[0];
  img.src = URL.createObjectURL(newImg);
}

// Event Listeners
textInput.addEventListener('input', updateText);
imgInput.addEventListener('change', updateImg);
