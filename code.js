document.addEventListener("DOMContentLoaded", function () {
    const elements = {
        rock: document.querySelector("#rock"),
        paper: document.querySelector("#paper"),
        scissors: document.querySelector("#scissors"),
        userScoreValue: document.querySelector("#userScore"),
        computerScoreValue: document.querySelector("#computerScore"),
        gameScreen: document.querySelector(".game_screen"),
        resultScreen: document.querySelector(".result_screen"),
        ruleButton: document.querySelector(".rule_btn"),
        ruleWrapper: document.querySelector(".rule_wrapper"),
        ruleBoxCloseButton: document.querySelector(".close_btn"),
        playAgain: document.querySelector("#play"),
        mobilePlayButton: document.querySelector("#mobile_play"),
        nextButton: document.querySelector("#next_btn"),
        userPick: document.querySelector("#user"),
        computerPick: document.querySelector("#computer"),
        resultText: document.querySelector("#winner"),
        mobileResultText: document.querySelector("#mobile_winner"),
        userChoiceImage: document.querySelector("#userPickImage"),
        computerChoiceImage: document.querySelector("#computerChoiceImage"),
        userwiningIndicator: document.querySelector("#userwiningIndicator"),
        computerwiningIndicator: document.querySelector("#computerwiningIndicator"),
    };

    let userChoice;
    let computerChoice;

    let userScore = localStorage.getItem("userScore") || 0;
    let computerScore = localStorage.getItem("computerScore") || 0;

    elements.userScoreValue.textContent = userScore;
    elements.computerScoreValue.textContent = computerScore;

    const generateComputerChoice = () => {
        const choices = ["rock", "paper", "scissors"];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    };

    const reset = () => {
        elements.resultScreen.style.display = "none";
        elements.gameScreen.style.display = "block";

        elements.userPick.classList.remove(`${userChoice}`);
        elements.userChoiceImage.src = "";

        elements.computerChoiceImage.src = "";
        elements.computerPick.classList.remove(`${computerChoice}`);

        elements.playAgain.textContent = "PLAY AGAIN";
        userChoice = "";
        computerChoice = "";

        elements.userwiningIndicator.style.display = "none";
        elements.computerwiningIndicator.style.display = "none";
    };

    const userWins = () => {
        userScore++;
        localStorage.setItem("userScore", `${userScore}`);
        elements.userScoreValue.textContent = userScore;
        elements.nextButton.style.display = "flex";
        elements.resultText.textContent = "YOU WIN";
        elements.mobileResultText.textContent = "YOU WIN";
        elements.userwiningIndicator.style.display = "flex";
    };

    const tieUp = () => {
        elements.resultText.textContent = "TIE UP";
        elements.mobileResultText.textContent = "TIE UP";
        elements.playAgain.textContent = "REPLAY";
        elements.mobilePlayButton.textContent = "REPLAY";
    };

    const computerWins = () => {
        computerScore++;
        localStorage.setItem("computerScore", `${computerScore}`);
        elements.computerScoreValue.textContent = computerScore;
        elements.nextButton.style.display = "none";
        elements.resultText.textContent = "YOU LOST";
        elements.mobileResultText.textContent = "YOU LOST";
        elements.computerwiningIndicator.style.display = "flex";
    };

    const handleOptionClick = (chosenOption) => {
        userChoice = chosenOption;
        elements.userPick.classList.add(`${userChoice}`);
        elements.userChoiceImage.src = `module-1/${userChoice}.jpg`;

        elements.gameScreen.style.display = "none";
        elements.resultScreen.style.display = "block";

        computerChoice = generateComputerChoice();
        elements.computerChoiceImage.src = `module-1/${computerChoice}.jpg`;
        elements.computerPick.classList.add(`${computerChoice}`);

        if (
            (userChoice === "rock" && computerChoice === "scissors") ||
            (userChoice === "paper" && computerChoice === "rock") ||
            (userChoice === "scissors" && computerChoice === "paper")
        ) {
            userWins();
        } else if (userChoice === computerChoice) {
            tieUp();
        } else {
            computerWins();
        }
    };

    window.onload = function () {
        reset();
    };

    elements.playAgain.addEventListener("click", () => {
        reset();
    });

    elements.mobilePlayButton.addEventListener("click", () => {
        reset();
    });

    let isRuleBoxOpen = true;
    elements.ruleButton.addEventListener("click", () => {
        if (!isRuleBoxOpen) {
            elements.ruleWrapper.style.display = "flex";
        }
    });

    elements.ruleBoxCloseButton.addEventListener("click", () => {
        elements.ruleWrapper.style.display = "none";
        isRuleBoxOpen = false;
    });

    elements.rock.addEventListener("click", () => handleOptionClick("rock"));
    elements.paper.addEventListener("click", () => handleOptionClick("paper"));
    elements.scissors.addEventListener("click", () => handleOptionClick("scissors"));
});
