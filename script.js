const words = {
    ai_terms: ['meta', 'autocorrect', 'syntax', 'alexa', 'algorithm'],
    Car_brand: ['nissan', 'renault', 'hyundai', 'mahindra', 'porsche'],
    Sports: ['golf', 'handball', 'basketball', 'fencing', 'archery']
};

let selectedWord = '';
let wrongLetters = [];
let correctLetters = [];
const wordDisplay = document.getElementById('wordDisplay');
const wrongLettersDisplay = document.getElementById('wrongLetters');
const keyboard = document.querySelector('.keyboard');
const restartBtn = document.getElementById('restartBtn');
const categoryButtons = document.querySelectorAll('.category-btn');
const categorySelection = document.getElementById('categorySelection');
const hangmanImage = document.getElementById('hangmanImage');

const maxWrongGuesses = 7; // Total stages of hangman (0 to 6)

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        startGame(category);
    });
});

function startGame(category) {
    selectedWord = words[category][Math.floor(Math.random() * words[category].length)];
    wrongLetters = [];
    correctLetters = [];
    categorySelection.style.display = 'none';
    updateDisplay();
    createKeyboard();
    updateHangmanImage();
}

function createKeyboard() {
    keyboard.innerHTML = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    alphabet.split('').forEach(letter => {
        const key = document.createElement('div');
        key.classList.add('key');
        key.textContent = letter;
        key.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(key);
    });
}

function handleGuess(letter) {
    if (selectedWord.includes(letter)) {
        correctLetters.push(letter);
    } else {
        wrongLetters.push(letter);
    }
    updateDisplay();
    updateHangmanImage();
    checkGameOver();
}

function updateDisplay() {
    wordDisplay.textContent = selectedWord.split('').map(letter => (correctLetters.includes(letter) ? letter : '_')).join(' ');
    wrongLettersDisplay.textContent = `Wrong Letters: ${wrongLetters.join(', ')}`;
}

function updateHangmanImage() {
    hangmanImage.src = `hangman${wrongLetters.length}.png`;
}

function checkGameOver() {
    if (wrongLetters.length === maxWrongGuesses) {
        alert(`Game Over! The word was: ${selectedWord}`);
        restartGame();
    } else if (selectedWord.split('').every(letter => correctLetters.includes(letter))) {
        alert('Congratulations! You guessed the word!');
        restartGame();
    }
}

function restartGame() {
    categorySelection.style.display = 'block';
    wordDisplay.textContent = '';
    wrongLettersDisplay.textContent = '';
    keyboard.innerHTML = '';
    hangmanImage.src = 'hangman0.png'; // Reset to initial hangman state
    wrongLetters = [];
    correctLetters = [];
}