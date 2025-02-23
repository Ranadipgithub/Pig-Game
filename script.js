"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const rollDice = document.querySelector(".btn--roll");
const holdDice = document.querySelector(".btn--hold");
const newDice = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const startGameBtn = document.getElementById("start-game");
const rulesModal = document.getElementById("rules-modal");
const gameContainer = document.getElementById("game-container");

score0El.textContent = "0";
score1El.textContent = "0";
dice.classList.add("hidden");

gameContainer.classList.add("hidden");

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
  currentScore = 0;
};

let randomNumberGenerator = () => Math.floor(Math.random() * 6) + 1;

rollDice.addEventListener("click", () => {
  if (playing) {
    let diceVal = randomNumberGenerator();
    dice.classList.remove("hidden");
    dice.src = `dice-${diceVal}.png`;
    if (diceVal !== 1) {
      currentScore += diceVal;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdDice.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

newDice.addEventListener("click", () => {
  location.reload();
});

startGameBtn.addEventListener("click", () => {
  rulesModal.classList.add("hidden");
  gameContainer.classList.remove("hidden");
});
