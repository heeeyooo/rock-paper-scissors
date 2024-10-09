const playWithCompBtn = document.querySelector(".js-play-with-comp-btn");
playWithCompBtn.addEventListener("click", () => {
    start();
});

const rockBtn = document.querySelector(".js-rock-btn");
rockBtn.addEventListener("click", () => {
    playGame("rock");
});
const paperBtn = document.querySelector(".js-paper-btn");
paperBtn.addEventListener("click", () => {
    playGame("paper");
});
const scissorsBtn = document.querySelector(".js-scissors-btn");
scissorsBtn.addEventListener("click", () => {
    playGame("scissors");
});

const resetScoreBtn = document.querySelector(".js-reset-score-btn");
resetScoreBtn.addEventListener("click", () => {
    localStorage.removeItem("score");
    document.querySelector(".result").innerHTML = "";
    document.querySelector(".moves").innerHTML = "vs";
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    updateScore();
});

addEventListener("keydown", (event) => {
    if (event.key === "r") {
        playGame("rock");
    } else if (event.key === "p") {
        playGame("paper");
    } else if (event.key === "s") {
        playGame("scissors");
    }
});

const autoplayBtn = document.querySelector(".js-autoplay-btn");
autoplayBtn.addEventListener("click", () => {
    autoPlay();
});

let isAutoPlay = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlay) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlay = true;
        autoplayBtn.textContent = "Stop";
    } else {
        clearInterval(intervalId);
        isAutoPlay = false;
        document.querySelector(".result").innerHTML = "";
        document.querySelector(".moves").innerHTML = "vs";
        autoplayBtn.textContent = "Autoplay";
    }
}

function start() {
    document.querySelector(".preview").remove();
    document.querySelector(".container").classList.remove("none");
}

let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    ties: 0,
    losses: 0,
};

updateScore();

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = "";
    if (playerMove === "rock") {
        if (computerMove === "rock") {
            result = "Tie!";
        } else if (computerMove === "paper") {
            result = "You lose!";
        } else if (computerMove === "scissors") {
            result = "You win!";
        }
    } else if (playerMove === "paper") {
        if (computerMove === "rock") {
            result = "You win!";
        } else if (computerMove === "paper") {
            result = "Tie!";
        } else if (computerMove === "scissors") {
            result = "You lose!";
        }
    } else if (playerMove === "scissors") {
        if (computerMove === "rock") {
            result = "You lose!";
        } else if (computerMove === "paper") {
            result = "You win!";
        } else if (computerMove === "scissors") {
            result = "Tie!";
        }
    }

    if (result === "You win!") {
        score.wins += 1;
    } else if (result === "You lose!") {
        score.losses += 1;
    } else if (result === "Tie!") {
        score.ties += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));

    document.querySelector(".result").innerHTML = result;
    document.querySelector(
        ".moves"
    ).innerHTML = `<img class="move-icon" src="img/${playerMove}-emoji.png" alt=""> vs <img class="move-icon"
                src="img/${computerMove}-emoji.png" alt="">`;
    updateScore();
}

function updateScore() {
    document.querySelector(
        ".score"
    ).innerHTML = `${score.wins}:${score.losses}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = "";

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "paper";
    } else if (randomNumber > 2 / 3 && randomNumber < 1) {
        computerMove = "scissors";
    }
    return computerMove;
}
