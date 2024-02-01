document.addEventListener("DOMContentLoaded", function () {
    const ELEMENTS = {
        ROCK: document.querySelector("#rock"),
        PAPER: document.querySelector("#paper"),
        SCISSORS: document.querySelector("#scissors"),
        USER_SCORE_VALUE: document.querySelector("#userScore"),
        COMPUTER_SCORE_VALUE: document.querySelector("#computerScore"),
        GAME_SCREEN: document.querySelector(".game_screen"),
        RESULT_SCREEN: document.querySelector(".result_screen"),
        RULE_BUTTON: document.querySelector(".rule_btn"),
        RULE_WRAPPER: document.querySelector(".rule_wrapper"),
        RULE_BOX_CLOSE_BUTTON: document.querySelector(".close_btn"),
        PLAY_AGAIN: document.querySelector("#play"),
        MOBILE_PLAY_BUTTON: document.querySelector("#mobile_play"),
        NEXT_BUTTON: document.querySelector("#next_btn"),
        USER_PICK: document.querySelector("#user"),
        COMPUTER_PICK: document.querySelector("#computer"),
        RESULT_TEXT: document.querySelector("#winner"),
        MOBILE_RESULT_TEXT: document.querySelector("#mobile_winner"),
        USER_CHOICE_IMAGE: document.querySelector("#userPickImage"),
        COMPUTER_CHOICE_IMAGE: document.querySelector("#computerChoiceImage"),
        USER_WINNING_INDICATOR: document.querySelector("#userwiningIndicator"),
        COMPUTER_WINNING_INDICATOR: document.querySelector("#computerwiningIndicator"),
    };

    let userChoice;
    let computerChoice;

    let userScore = localStorage.getItem("userScore") || 0;
    let computerScore = localStorage.getItem("computerScore") || 0;

    ELEMENTS.USER_SCORE_VALUE.textContent = userScore;
    ELEMENTS.COMPUTER_SCORE_VALUE.textContent = computerScore;

    const generateComputerChoice = () => {
        const choices = ["rock", "paper", "scissors"];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    };

    const reset = () => {
        ELEMENTS.RESULT_SCREEN.style.display = "none";
        ELEMENTS.GAME_SCREEN.style.display = "block";

        ELEMENTS.USER_PICK.classList.remove(`${userChoice}`);
        ELEMENTS.USER_CHOICE_IMAGE.src = "";

        ELEMENTS.COMPUTER_CHOICE_IMAGE.src = "";
        ELEMENTS.COMPUTER_PICK.classList.remove(`${computerChoice}`);

        ELEMENTS.PLAY_AGAIN.textContent = "PLAY AGAIN";
        userChoice = "";
        computerChoice = "";

        ELEMENTS.USER_WINNING_INDICATOR.style.display = "none";
        ELEMENTS.COMPUTER_WINNING_INDICATOR.style.display = "none";
    };

    const userWins = () => {
        userScore++;
        localStorage.setItem("userScore", `${userScore}`);
        ELEMENTS.USER_SCORE_VALUE.textContent = userScore;
        ELEMENTS.NEXT_BUTTON.style.display = "flex";
        ELEMENTS.RESULT_TEXT.textContent = "YOU WIN";
        ELEMENTS.MOBILE_RESULT_TEXT.textContent = "YOU WIN";
        ELEMENTS.USER_WINNING_INDICATOR.style.display = "flex";
    };

    const tieUp = () => {
        ELEMENTS.RESULT_TEXT.textContent = "TIE UP";
        ELEMENTS.MOBILE_RESULT_TEXT.textContent = "TIE UP";
        ELEMENTS.PLAY_AGAIN.textContent = "REPLAY";
        ELEMENTS.MOBILE_PLAY_BUTTON.textContent = "REPLAY";
    };

    const computerWins = () => {
        computerScore++;
        localStorage.setItem("computerScore", `${computerScore}`);
        ELEMENTS.COMPUTER_SCORE_VALUE.textContent = computerScore;
        ELEMENTS.NEXT_BUTTON.style.display = "none";
        ELEMENTS.RESULT_TEXT.textContent = "YOU LOST";
        ELEMENTS.MOBILE_RESULT_TEXT.textContent = "YOU LOST";
        ELEMENTS.COMPUTER_WINNING_INDICATOR.style.display = "flex";
    };

    const handleOptionClick = (chosenOption) => {
        userChoice = chosenOption;
        ELEMENTS.USER_PICK.classList.add(`${userChoice}`);
        ELEMENTS.USER_CHOICE_IMAGE.src = `${userChoice}.jpg`;

        ELEMENTS.GAME_SCREEN.style.display = "none";
        ELEMENTS.RESULT_SCREEN.style.display = "block";

        computerChoice = generateComputerChoice();
        ELEMENTS.COMPUTER_CHOICE_IMAGE.src = `${computerChoice}.jpg`;
        ELEMENTS.COMPUTER_PICK.classList.add(`${computerChoice}`);

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

    reset(); // Call reset initially

    ELEMENTS.PLAY_AGAIN.addEventListener("click", reset);
    ELEMENTS.MOBILE_PLAY_BUTTON.addEventListener("click", reset);

    let isRuleBoxOpen = true;
    ELEMENTS.RULE_BUTTON.addEventListener("click", () => {
        isRuleBoxOpen = !isRuleBoxOpen;
        ELEMENTS.RULE_WRAPPER.style.display = isRuleBoxOpen ? "flex" : "none";
    });

    ELEMENTS.RULE_BOX_CLOSE_BUTTON.addEventListener("click", () => {
        ELEMENTS.RULE_WRAPPER.style.display = "none";
        isRuleBoxOpen = false;
    });

    ELEMENTS.ROCK.addEventListener("click", () => handleOptionClick("rock"));
    ELEMENTS.PAPER.addEventListener("click", () => handleOptionClick("paper"));
    ELEMENTS.SCISSORS.addEventListener("click", () => handleOptionClick("scissors"));
});
