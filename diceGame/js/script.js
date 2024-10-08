"use strict";

// Selecting elements
const player0El = document.querySelector(".player0");
const player1El = document.querySelector(".player1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btnNew");
const btnRoll = document.querySelector(".btnRoll");
const btnHold = document.querySelector(".btnHold");

let scores, currentScore, activePlayer, playing;

// Function to reset everything includes starting condition
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("playerWinner");
  player1El.classList.remove("playerWinner");
  player0El.classList.add("playerActive");
  player1El.classList.remove("playerActive");
};
init();

// Switch player if 1 is rolled
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //If active player === 0 go 1 else stay 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Changes so that the player does not have playerActive class will now have it
  player0El.classList.toggle("playerActive");
  player1El.classList.toggle("playerActive");
};

// Functionality for rolling the dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `imgs/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player if 1 is rolled
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 50
    if (scores[activePlayer] >= 50) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player${activePlayer}`)
        .classList.add("playerWinner");
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove("playerActive");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
