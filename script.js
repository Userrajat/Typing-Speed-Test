const textToType = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold."
];

let startTime;
let timer;
let wordCount;
let errors;

const textElement = document.getElementById('text-to-type');
const inputArea = document.getElementById('input-area');
const timeElement = document.getElementById('time');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', startTest);
inputArea.addEventListener('input', checkInput);

function startTest() {
    const randomText = textToType[Math.floor(Math.random() * textToType.length)];
    textElement.textContent = randomText;
    inputArea.value = '';
    inputArea.disabled = false;
    inputArea.focus();

    startTime = new Date();
    wordCount = randomText.split(' ').length;
    errors = 0;

    if (timer) clearInterval(timer);
    timer = setInterval(updateTime, 1000);
}

function updateTime() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    timeElement.textContent = elapsedTime;

    if (elapsedTime >= 60) {
        endTest();
    }
}

function checkInput() {
    const typedText = inputArea.value;
    const originalText = textElement.textContent;

    if (typedText === originalText) {
        endTest();
    } else {
        const typedWords = typedText.split(' ');
        errors = 0;
        typedWords.forEach((word, index) => {
            if (word !== originalText.split(' ')[index]) {
                errors++;
            }
        });
    }
}

function endTest() {
    clearInterval(timer);
    inputArea.disabled = true;

    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const wpm = Math.floor((wordCount / elapsedTime) * 60);
    const accuracy = Math.floor(((wordCount - errors) / wordCount) * 100);

    wpmElement.textContent = wpm;
    accuracyElement.textContent = accuracy;
}
