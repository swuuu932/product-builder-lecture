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

// Animal Look Test Logic (Teachable Machine)
const URL = "https://teachablemachine.withgoogle.com/models/xrC062gbn/";
let model, maxPredictions;

const uploadArea = document.getElementById('upload-area');
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const predictBtn = document.getElementById('predict-btn');
const resultContainer = document.getElementById('result-container');
const resultMessage = document.getElementById('result-message');

// Load the image model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        predictBtn.disabled = false;
        predictBtn.textContent = "Analyze Photo";
    } catch (e) {
        console.error("Model failed to load", e);
        predictBtn.textContent = "Error Loading Model";
    }
}

// Handle Image Upload
uploadArea.addEventListener('click', () => imageUpload.click());

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
            document.querySelector('.upload-label').style.display = 'none';
            resultContainer.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Drag and Drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = 'var(--shadow-color)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.backgroundColor = 'transparent';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = 'transparent';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        imageUpload.files = e.dataTransfer.files;
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
            document.querySelector('.upload-label').style.display = 'none';
            resultContainer.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Predict function
async function predict() {
    if (!imagePreview.src || imagePreview.src.endsWith('#') || imagePreview.style.display === 'none') {
        alert("Please upload a photo first!");
        return;
    }

    predictBtn.disabled = true;
    predictBtn.textContent = "Analyzing...";
    
    // Create a temporary image object for prediction
    const tempImg = new Image();
    tempImg.src = imagePreview.src;
    
    tempImg.onload = async () => {
        const prediction = await model.predict(tempImg);
        
        resultContainer.style.display = 'block';
        const labelContainer = document.getElementById('label-container');
        labelContainer.innerHTML = '';
        
        // Sort predictions by probability
        prediction.sort((a, b) => b.probability - a.probability);
        
        const topResult = prediction[0];
        resultMessage.textContent = `You look like a ${topResult.className}!`;

        prediction.forEach(p => {
            const percent = (p.probability * 100).toFixed(0);
            const barHtml = `
                <div class="bar-container">
                    <div class="bar-label">${p.className}</div>
                    <div class="bar-outer">
                        <div class="bar-inner" style="width: ${percent}%"></div>
                    </div>
                    <div class="bar-percent">${percent}%</div>
                </div>
            `;
            labelContainer.innerHTML += barHtml;
        });

        predictBtn.disabled = false;
        predictBtn.textContent = "Analyze Photo";
        
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    };
}

predictBtn.addEventListener('click', predict);

// Initialize model on load
init();

