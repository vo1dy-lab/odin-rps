"use strict"

let computerScore;
let humanScore;
let maxScore = 5;

const htmlBeaten = document.querySelector("#beaten");
const htmlRoundResult = document.querySelector("#round-result")
const htmlHumanScore = document.querySelector("#human-score");
const htmlComputerScore = document.querySelector("#computer-score");
const htmlComputerChoice = document.querySelector("#computer-choice");
const htmlHumanChoice = document.querySelector("#human-choice");
const htmlDialog = document.querySelector("dialog");
const htmlEndGame = document.querySelector("#end-game");

const htmlEndGameBtn = document.querySelector("#end-game-btn");
htmlEndGameBtn.onclick = playGame;

function playGame() {
    resetGame();
    startRound();
}

function getComputerChoice() {
    const computerChoice = Math.floor(Math.random() * 3);
    const items = ["rock", "paper", "scissors"];

    return items[computerChoice];
}

function startRound() {
    let items = document.querySelectorAll(".human-choice");

    items.forEach((item) => {
        item.addEventListener('click', playRound);
    })
}

function playRound(event) {
    const computerChoice = getComputerChoice();
    const humanChoice = event.currentTarget.id;
    const roundResult = checkRoundResult(computerChoice, humanChoice)

    setItemImage(computerChoice, humanChoice);

    if (roundResult === "computer") {
        htmlBeaten.textContent = `${humanChoice} is beaten by ${computerChoice}`;
        htmlRoundResult.textContent = "You lose!";
        htmlComputerScore.textContent = ++computerScore;
    } else if (roundResult === "human") {
        htmlBeaten.textContent = `${computerChoice} is beaten by ${humanChoice}`;
        htmlRoundResult.textContent = "You won!";
        htmlHumanScore.textContent = ++humanScore;
    } else if (roundResult === "draw") {
        htmlBeaten.textContent = "no one is beaten";
        htmlRoundResult.textContent = "Draw!";
    }

    checkEndGame(maxScore)
}

function checkRoundResult(computerChoice, humanChoice) {
    if (computerChoice === "rock" && humanChoice === "scissors" || computerChoice === "paper" && humanChoice === "rock" || computerChoice === "scissors" && humanChoice === "paper") {
        return "computer";
    } else if (computerChoice === "scissors" && humanChoice === "rock" || computerChoice === "rock" && humanChoice === "paper" || computerChoice === "paper" && humanChoice === "scissors") {
        return "human";
    } else {
        return "draw";
    }
}

function setItemImage(computerChoice, humanChoice) {
    htmlComputerChoice.classList.remove("rock", "paper", "scissors");
    htmlHumanChoice.classList.remove("rock", "paper", "scissors");

    const imgComputer = document.createElement("img");
    imgComputer.setAttribute("src", `./img/${computerChoice}.png`);
    imgComputer.setAttribute("alt", computerChoice);

    const imgHuman = document.createElement("img");
    imgHuman.setAttribute("src", `./img/${humanChoice}.png`);
    imgHuman.setAttribute("alt", humanChoice);

    htmlComputerChoice.replaceChildren(imgComputer);
    htmlHumanChoice.replaceChildren(imgHuman);
    htmlComputerChoice.classList.add(computerChoice);
    htmlComputerChoice.classList.add("computer-image");
    htmlHumanChoice.classList.add(humanChoice);
    htmlHumanChoice.classList.add("human-image");
}

function checkEndGame(maxScore) {
    if (computerScore === maxScore) {
        htmlDialog.show();
        htmlEndGame.classList.add("loose");
        htmlEndGame.textContent = "You've lost the game, unfortunately... 😢";
    } else if (humanScore === maxScore) {
        htmlEndGame.classList.add("win");
        htmlEndGame.textContent = "Congratulations, you've won the game! 😊";
        htmlDialog.show();
    }
}

function resetGame() {
    computerScore = 0;
    humanScore = 0;

    if (htmlComputerChoice.hasChildNodes()) {
        htmlComputerChoice.removeChild(htmlComputerChoice.lastChild);
        htmlHumanChoice.removeChild(htmlHumanChoice.lastChild);
    }

    htmlEndGame.classList.remove("win", "loose");

    htmlComputerScore.textContent = "0";
    htmlHumanScore.textContent = "0";
    htmlBeaten.textContent = "";
    htmlRoundResult.textContent = "";

    htmlDialog.close();
}


playGame();