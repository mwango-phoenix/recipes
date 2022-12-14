// Add text input for ingredients
let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
  let newIngredients = ingredientDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
});

// Add text input for instructions
let addStepBtn = document.getElementById('addStepBtn');
let instructionList = document.querySelector('.instructionList');
let instructionDiv = document.querySelectorAll('.instructionDiv')[0];

addStepBtn.addEventListener('click', function(){
  let newStep = instructionDiv.cloneNode(true);
  let input = newStep.getElementsByTagName('input')[0];
  input.value = '';
  instructionList.appendChild(newStep);
});

// remove text input for ingredients
let rmvIngredientsBtn = document.getElementById('rmvIngredientsBtn');

rmvIngredientsBtn.addEventListener('click', function(){
  ingredientList.removeChild(ingredientList.lastElementChild);
});

// remove text input for instructions
let rmvStepBtn = document.getElementById('rmvStepBtn');

rmvStepBtn.addEventListener('click', function(){
  instructionList.removeChild(instructionList.lastElementChild);
});