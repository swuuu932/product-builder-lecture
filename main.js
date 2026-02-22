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

// Teachable Machine Logic
const URL = "https://teachablemachine.withgoogle.com/models/xrC062gbn/";
let model, webcam, labelContainer, maxPredictions;
let isWebcamRunning = false;

// Load the model
async function loadModel() {
    if (model) return;
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// Option Switching
window.showOption = function(option) {
    document.querySelectorAll('.test-option-content').forEach(el => el.style.display = 'none');
    document.getElementById(option + '-option').style.display = 'block';
    
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
    // Fixed: find the button that was clicked
    const clickedBtn = Array.from(document.querySelectorAll('.option-btn')).find(btn => btn.textContent.toLowerCase().includes(option));
    if (clickedBtn) clickedBtn.classList.add('active');
    
    // Stop webcam if switching to upload
    if (option === 'upload' && isWebcamRunning) {
        webcam.stop();
        isWebcamRunning = false;
        document.getElementById('webcam-container').innerHTML = '';
        document.getElementById('webcam-start-btn').style.display = 'block';
    }
};

// Webcam Logic
window.initAnimalModel = async function() {
    await loadModel();
    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    isWebcamRunning = true;
    window.requestAnimationFrame(loop);

    document.getElementById('webcam-start-btn').style.display = 'none';
    document.getElementById('webcam-container').innerHTML = '';
    document.getElementById('webcam-container').appendChild(webcam.canvas);
    
    labelContainer = document.getElementById('label-container');
    labelContainer.innerHTML = '';
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement('div'));
    }
};

async function loop() {
    if (!isWebcamRunning) return;
    webcam.update();
    await predict(webcam.canvas);
    window.requestAnimationFrame(loop);
}

// File Upload Logic
const uploadArea = document.getElementById('upload-area');
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');

if (uploadArea) {
    uploadArea.addEventListener('click', () => imageUpload.click());

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.src = event.target.result;
                imagePreview.style.display = 'block';
                document.querySelector('.upload-label').style.display = 'none';
                document.getElementById('label-container').innerHTML = '';
            };
            reader.readAsDataURL(file);
        }
    });
}

window.predictImage = async function() {
    if (!imagePreview.src || imagePreview.src.endsWith('#') || imagePreview.style.display === 'none') {
        alert('Please upload a photo first!');
        return;
    }
    
    await loadModel();
    labelContainer = document.getElementById('label-container');
    labelContainer.innerHTML = 'Analyzing...';
    
    const tempImg = new Image();
    tempImg.src = imagePreview.src;
    tempImg.onload = async () => {
        labelContainer.innerHTML = '';
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement('div'));
        }
        await predict(tempImg);
    };
};

// Unified Prediction
async function predict(input) {
    const prediction = await model.predict(input);
    for (let i = 0; i < maxPredictions; i++) {
        const percent = (prediction[i].probability * 100).toFixed(0);
        let className = prediction[i].className;
        
        if (className === 'Class 1') className = 'Dog';
        if (className === 'Class 2') className = 'Cat';
        
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