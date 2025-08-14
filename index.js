"use strict"

function playGame(maxScore = 5) {
    let computerScore = 0;
    let humanScore = 0;
    let roundResult;

    while (computerScore !== maxScore && humanScore !== maxScore) {
        const computerChoice = getComputerChoice();
        const humanChoice = getHumanChoice();

        roundResult = playRound(computerChoice, humanChoice);
        if (roundResult === "computer") { computerScore++ } else if (roundResult === "human") { humanScore++ }
        alert(`Score:\nComputer: ${computerScore} | Human: ${humanScore}`);
    }

    if (computerScore === maxScore) {
        alert("You've lost the game, unfortunately...");
    } else if (humanScore === maxScore) {
        alert("Congratulations, you've won the game!");
    }
}

function getComputerChoice() {
    const computerChoice = Math.floor(Math.random() * 3);
    const items = ["rock", "paper", "scissors"];

    return items[computerChoice];
}

function getHumanChoice() {
    const humanChoice = prompt("Choose an item:", "paper").trim().toLowerCase();

    return humanChoice;
}

function playRound(computerChoice, humanChoice) {
    const roundResult = checkRoundResult(computerChoice, humanChoice)

    if (roundResult === "computer") {
        alert(`You lose!\nThe computer chose - ${computerChoice} : The human chose - ${humanChoice}`);
    } else if (roundResult === "human") {
        alert(`You won!\nThe computer chose - ${computerChoice} : The human chose - ${humanChoice}`);
    } else if (roundResult === "draw") {
        alert(`Draw!\nThe computer chose - ${computerChoice} : The human chose - ${humanChoice}`);
    }

    return roundResult;
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

playGame();