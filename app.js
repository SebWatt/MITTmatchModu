// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function (array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
// All icons in boxes
const icons = [
  "fa-atom",
  "fa-frog",
  "fa-feather-alt",
  "fa-cogs",
  "fa-anchor",
  "fa-fan",
  "fa-bolt",
  "fa-hat-wizard",
  "fa-apple-alt",
  "fa-bell",
  "fa-bomb",
  "fa-brain",
];

const gameState = {
  cards: [
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
    {
      isMatched: false,
      showCard: false,
      icon: "",
    },
  ],
  cardToMatch: [],
  matchedCards: 0,
  currentScore: 0,
};
// renders the gameState
function render() {
  // change the icons on the cards to match the icon
  // change the icons to match when they are Matched
  // gives each box a icon attribute on which icon they have.
  const card = document.querySelectorAll(".card");
  const cardIcon = document.querySelectorAll(".card i");
  const matchCard = document.querySelector("#next-card i");
  for (let i = 0; i < gameState.cards.length; i++) {
    cardIcon[i].classList.replace(
      cardIcon[i].classList[1],
      gameState.cards[i].icon
    );
    if (gameState.cards[i].isMatched) {
      card[i].classList.add("matched");
    } else {
      card[i].classList.remove("matched");
      if (gameState.cards[i].showCard) {
        card[i].classList.add("show");
      } else {
        card[i].classList.remove("show");
      }
    }
    cardIcon[i].dataset.icon = gameState.cards[i].icon;
  }
  matchCard.classList.replace(
    matchCard.classList[1],
    gameState.cardToMatch[gameState.matchedCards]
  );
  matchCard.dataset.icon = gameState.cardToMatch[gameState.matchedCards];
  document.getElementById("score").innerText = gameState.currentScore;
}

function reset() {
  const removeIsMatchedAtr = document.querySelectorAll("[data-is-matched]");
  const newBoard = shuffle(icons);
  // sets all cards to not matched
  // sets all cards to not showed
  // reshuffles the board of cards
  // changes current score back to 0
  const numOfCards = gameState.cards;
  for (let i = 0; i < numOfCards.length; i++) {
    numOfCards[i].isMatched = false;
    numOfCards[i].showCard = false;
    numOfCards[i].icon = newBoard[i];
    for (let j = 0; j < removeIsMatchedAtr.length; j++) {
      removeIsMatchedAtr[j].removeAttribute("data-is-matched");
    }
  }
  gameState.cardToMatch = shuffle(icons);
  gameState.matchedCards = 0;
  gameState.currentScore = 0;

  render();
}

function handleCards(event) {
  // When clicked on show the icon
  // does not count as a click if the icon is already clicked
  const allNotClickedCards = document.querySelectorAll(".card");
  const clickedCardIcon = event.target.querySelector("i").dataset.icon;
  const cardToMatchIcon = document.querySelector("#next-card i").dataset.icon;
  if (!event.target.dataset.isMatched)
    for (let i = 0; i < gameState.cards.length; i++) {
      if (!allNotClickedCards[i].dataset.doNotClick) {
        allNotClickedCards[i].dataset.doNotClick = true;
        if (clickedCardIcon === gameState.cards[i].icon) {
          gameState.cards[i].showCard = true;
          setTimeout(() => {
            gameState.cards[i].showCard = false;
            if (clickedCardIcon == cardToMatchIcon) {
              event.target.dataset.isMatched = true;
              gameState.cards[i].isMatched = true;
            }
            render();
            endGame();
          }, 500);
          if (clickedCardIcon == cardToMatchIcon) {
            gameState.matchedCards++;
          }
        }
        setTimeout(() => {
          allNotClickedCards[i].removeAttribute("data-do-not-click");
        }, 500);
      }
    }
  gameState.currentScore++;
  // adds a point to the the total score
  // When a card is matched it won't count as added a point and will basically disable you from clicking it again.
  render();
}

function endGame() {
  const numberOfMatchedItems =
    document.querySelectorAll("[data-is-matched]").length;

  if (gameState.cards.length === numberOfMatchedItems) {
    setTimeout(
      () =>
        alert(`Game Over. It took you ${gameState.currentScore} moves to win.`),
      100
    );
  }
}
document.querySelector(".restart").addEventListener("click", reset);
document.querySelector("#cards").addEventListener("click", handleCards);
reset();
