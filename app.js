let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator");
let scoreO = document.querySelector("#score-o");
let scoreX = document.querySelector("#score-x");

let turnO = true;
let count = 0;
let scores = { O: 0, X: 0 };

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  turnIndicator.innerText = "Player O's Turn";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    turnIndicator.innerText = `Player ${turnO ? "X" : "O"}'s Turn`;
    box.disabled = true;
    count++;

    if (checkWinner()) {
      scores[turnO ? "O" : "X"]++;
      updateScores();
    } else if (count === 9) {
      gameDraw();
    }
    turnO = !turnO;
  });
});

const gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winning-box");
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      boxes[a].classList.add("winning-box");
      boxes[b].classList.add("winning-box");
      boxes[c].classList.add("winning-box");
      showWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
};

const updateScores = () => {
  scoreO.innerText = `O: ${scores.O}`;
  scoreX.innerText = `X: ${scores.X}`;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
