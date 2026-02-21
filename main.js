const numberDisplay = document.querySelector('.number-display');
const generateBtn = document.querySelector('.generate-btn');

const generateNumbers = () => {
    numberDisplay.innerHTML = '';
    const lottoNumbers = new Set();

    while (lottoNumbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        lottoNumbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(lottoNumbers).sort((a, b) => a - b);

    sortedNumbers.forEach(number => {
        const circle = document.createElement('div');
        circle.classList.add('number-circle');
        circle.textContent = number;

        let backgroundColor;
        if (number <= 10) {
            backgroundColor = '#f1c40f'; // Yellow
        } else if (number <= 20) {
            backgroundColor = '#3498db'; // Blue
        } else if (number <= 30) {
            backgroundColor = '#e74c3c'; // Red
        } else if (number <= 40) {
            backgroundColor = '#95a5a6'; // Gray
        } else {
            backgroundColor = '#2ecc71'; // Green
        }
        circle.style.backgroundColor = backgroundColor;

        numberDisplay.appendChild(circle);
    });
};

generateBtn.addEventListener('click', generateNumbers);

// Generate initial numbers on page load
generateNumbers();
