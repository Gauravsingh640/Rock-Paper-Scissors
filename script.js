let userScore = 0;
let compScore = 0;
let roundLimit;

const message = document.querySelector("#msg");
const choices = document.querySelectorAll(".choice");
const userScorePara = document.querySelector("#user");
const compScorePara = document.querySelector("#comp");

// Function to prompt for the number of rounds
const setRoundLimit = () => {
    roundLimit = parseInt(prompt("Enter the number of rounds to win the tournament"));
};

// Initialize the game by asking for the round limit
setRoundLimit();

const compId = () => {
    const option = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * 3);
    return option[index];
};

const checkTournamentWinner = () => {
    if (userScore === roundLimit) {
        message.innerText = "Congratulations! You won the tournament!";
        message.style.backgroundColor = "green";
        setTimeout(resetGame, 2000); // Wait 2 seconds before resetting the game
    } else if (compScore === roundLimit) {
        message.innerText = "You lost the tournament! Try again.";
        message.style.backgroundColor = "red";
        setTimeout(resetGame, 2000); // Wait 2 seconds before resetting the game
    }
};

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    setTimeout(setRoundLimit, 500); // Ask for a new round limit after a short delay
};

const showWinner = (userWin) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        message.innerText = "You win!";
        message.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        message.innerText = "You lose!";
        message.style.backgroundColor = "red";
    }
    checkTournamentWinner();
};

const drawGame = () => {
    message.innerText = "Game Tie! Play Again";
    message.style.backgroundColor = "black";
};

const playGame = (userId) => {
    const comId = compId();
    if (userId === comId) {
        drawGame();
    } else {
        let userWin = true;
        if (userId === "rock") {
            userWin = comId === "paper" ? false : true;
        } else if (userId === "paper") {
            userWin = comId === "scissors" ? false : true;
        } else {
            userWin = comId === "rock" ? false : true;
        }
        showWinner(userWin);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userId = choice.getAttribute("id");
        playGame(userId);
    });
});
