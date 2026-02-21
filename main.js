const numberDisplay = document.querySelector('.number-display');
const generateBtn = document.querySelector('.generate-btn');
const themeToggle = document.getElementById('theme-toggle');

// Theme Toggle Logic
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
};

themeToggle.addEventListener('click', toggleTheme);

// Initialize Theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Lotto Generator Logic
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
generateNumbers();

// Teachable Machine Webcam Logic
const URL = "https://teachablemachine.withgoogle.com/models/xrC062gbn/";
let model, webcam, labelContainer, maxPredictions;

async function initAnimalModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Setup a webcam
    const flip = true; 
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup(); 
    await webcam.play();
    window.requestAnimationFrame(loop);

    // Append elements to the DOM
    document.getElementById("webcam-container").innerHTML = '';
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = '';
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const percent = (prediction[i].probability * 100).toFixed(0);
        let className = prediction[i].className;
        
        // Map Class names to friendly names
        if (className === "Class 1") className = "Cat";
        if (className === "Class 2") className = "Dog";
        
        labelContainer.childNodes[i].innerHTML = `
            <div class="bar-container">
                <div class="bar-label">${className}</div>
                <div class="bar-outer">
                    <div class="bar-inner" style="width: ${percent}%"></div>
                </div>
                <div class="bar-percent">${percent}%</div>
            </div>
        `;
    }
}
