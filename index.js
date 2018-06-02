'use strict';

let playerScore = 0;
let gameProgress = 0;

//create score HTML
function generateScoreString() {
  const playerScoreString = `Score: ${playerScore}`;
  $('.current-score').html(playerScoreString);
}

//create string to show current question number
function generateProgressString() {
  const gameProgressString = `Question: ${gameProgress}/10`;
  $('.progress').html(gameProgressString);
}

// didn't fix it by putting it in a function
//function resetScoreProgress() {
 // let playerScore = 0;
  //let gameProgress = 0;
// }

//populate progress and score on start page
function renderStartPage() {
  generateScoreString();
  generateProgressString();
  $('.mainh2').removeClass('hidden');
  $('div.finalResult').html('');
  $('form').removeClass('add-background');
  $('.content').removeClass('hidden');
  $('.form-h3').html('Put on a pot of tea and let\'s find out!').removeClass('hidden');
  $('.proceed-button').removeClass('hidden view-results').html('Commence');
  console.log('render start page ran');
}

//increase the current question number displayed
function increaseProgress() {
  gameProgress++;
  generateProgressString();
}

function increaseScore() {
  playerScore++;
  generateScoreString();
}

//hide or show relevant html
function toggleHiddenClass() {
  $('.results').toggleClass('hidden');
  $('fieldset').toggleClass('hidden');
  $('.proceed-button').toggleClass('hidden');
  // $('.answer-button').toggleClass('hidden');
}

//remove <h3>, show & populate fieldset, toggle buttons
function generateQuestionElement(questionObject) {
  $('.form-h3').addClass('hidden'); //move to handleCommenceNextButton?
  $('.proceed-button').html('Next');//move to handleCommenceNextButton?
  toggleHiddenClass(); //move to renderQuestion? or HCNB?
  return ` 
      <legend class="question">${questionObject.question}</legend>
       <label for="answer1">
      <input type="radio" role="radiogroup" name="answer" id="answer1" value=0 aria-labelledby="radioId" required>
       ${questionObject.answers[0]}</label>
      <label for="answer2">
      <input type="radio" role="radiogroup" name="answer" id="answer2" value=1 aria-labelledby="radioId" required>
      ${questionObject.answers[1]}</label>
      <label for="answer3">
      <input type="radio" role="radiogroup" name="answer"  id="answer3" value=2 aria-labelledby="radioId" required>
      ${questionObject.answers[2]}</label>
      <label for="answer4">
      <input type="radio" role="radiogroup" name="answer"  id="answer4" value=3 aria-labelledby="radioId" required>
      ${questionObject.answers[3]}</label> 
      <button type="submit" class="answer-button">Submit</button>
      `;
}

//display the question content and increase progress display
function renderQuestion() {
  //increase gameProgress after assigning index
  const questionIndex = gameProgress;
  increaseProgress();
  //get html string for question set
  const currentQuestion = generateQuestionElement(questionArray[questionIndex]);
  $('fieldset').html(currentQuestion);
}

function displayFinalResults() {
      $('div.content').addClass('hidden');
      if (playerScore < 7){
         $('div.finalResult').html(`<h2 class="formh2">${playerScore} out of 10, <br>time to watch Pride and Prejudice again!</h2><img src="https://cdn3.iconfinder.com/data/icons/watercolorcafe/128/teacup.png" alt="A teacup"><button type="submit" class="startover">Start Over</button>`);
      } else {
         $('div.finalResult').html(`<h2 class="formh2">Elizabeth is proud!<br> You scored ${playerScore} out of 10. </h2><img src="https://cdn3.iconfinder.com/data/icons/watercolorcafe/128/teacup.png" alt="A dainty teacup drawing"><button type="submit" class="startover">Start Over</button>`);
      }
  }

//listens for button click to move to first question
//after last question display results
function handleCommenceNextButton() {
  $('.question-form').on('click', '.proceed-button', function(event) { 
    event.preventDefault();
    $('form').addClass('add-background');
    $('.mainh2').addClass('hidden');
    if (gameProgress < questionArray.length) {
      renderQuestion();
      $('.results').addClass('hidden'); 
    } else {
      $('.results').addClass('hidden');
      displayFinalResults();
  }
  });
}

//move if to correct/incorrect 
function displayCorrectResult() {
   toggleHiddenClass();
  $('.results').html('<h2 class="formh2">Capital! Capital!<br> You\'re making fine progress.</h2>');
   if (gameProgress == questionArray.length) {
     $('.proceed-button').html('View Results');
     $('.proceed-button').addClass('view-results');
   }
}

function displayIncorrectResult(rightAnswer) {
   toggleHiddenClass();
  $('.results').html(`<h2 class="formh2">Incorrect!<br> The correct answer is ${(questionArray[gameProgress - 1]).answers[rightAnswer]}.</h2>`); 
  if (gameProgress == questionArray.length) {
     $('.proceed-button').html('View Results');
     $('.proceed-button').addClass('view-results');
   }
}

function compareAnswer () {
  let rightAnswer = `${(questionArray[gameProgress-1]).correct}`
  let selected = $('input:checked').val();
  if (rightAnswer == selected) {
    displayCorrectResult();
    increaseScore();
  } else {
    displayIncorrectResult(rightAnswer);
  }
}

function handleAnswerButton() {
  $('.question-form').on('submit', function
  (event) {
    event.preventDefault();
    compareAnswer();
  });
}

function handleStartOverButton() {
  $('.finalResult').on('click', '.startover', function(event) { 
    event.preventDefault();
    playerScore = 0;
    gameProgress = 0;
    renderStartPage();
  });
}

function runQuiz() {
  renderStartPage();
  handleCommenceNextButton();
  handleAnswerButton();
  handleStartOverButton();

}

$(runQuiz);