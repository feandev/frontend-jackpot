const rules = document.querySelector('.rules__outer');
const exit = document.querySelector('.rules__exit');

function displayRules() {
  exit.classList.remove('animate')
  rules.style.display = "flex";
}

function closeRules() {
  exit.classList.add('animate')
  setTimeout(() => rules.style.display = "none", 300) 
}
document.querySelector('.rules__btn').addEventListener('click', displayRules)
exit.addEventListener('click', closeRules)