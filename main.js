const numberDisplay = document.querySelector('.number-display');
const generateBtn = document.querySelector('.generate-btn');
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');

// Translation Data
const translations = {
    ko: {
        nav_animal: "동물상 테스트",
        nav_lotto: "로또 번호",
        nav_about: "정보",
        nav_contact: "문의",
        title_animal: "동물상 테스트",
        desc_animal: "당신은 어떤 동물을 닮았나요? 구글의 인공지능 기술을 활용해 얼굴 특징을 분석하고 가장 닮은 동물을 찾아보세요. 강아지의 명랑함부터 고양이의 우아함까지, 지금 바로 확인해보세요!",
        webcam_btn: "웹캠 시작",
        upload_btn: "사진 업로드",
        upload_label: "사진을 클릭하거나 드래그하여 업로드하세요",
        analyze_btn: "업로드된 사진 분석",
        title_lotto: "로또 번호 생성기",
        desc_lotto: "행운을 시험해보세요! 저희의 알고리즘은 공정하고 편향되지 않은 번호 선택을 보장합니다. 새로운 마음으로 행운의 번호를 뽑아보세요.",
        generate_btn: "번호 생성하기",
        subtitle_about: "도구 정보 및 팁",
        about_text: "저희 플랫폼은 일상에서 즐길 수 있는 재미있고 인터랙티브한 도구를 제공합니다.",
        animal_tip_title: "동물상 테스트 팁:",
        animal_tip_1: "밝은 곳에서 정면을 보고 촬영하면 더 정확합니다.",
        animal_tip_2: "안경이나 모자를 벗고 촬영해보세요.",
        lotto_tip_title: "로또 생성기 안내:",
        lotto_tip_1: "1부터 45 사이의 중복되지 않는 6개 숫자를 생성합니다.",
        lotto_tip_2: "생성된 번호는 단순 참고용이며 당첨을 보장하지 않습니다.",
        subtitle_safety: "안전 및 개인정보 보호 안내",
        safety_1: "저희 서비스는 사용자의 이미지를 서버에 저장하거나 전송하지 않습니다.",
        safety_2: "모든 AI 분석은 브라우저 내에서 로컬로 처리되어 데이터가 안전하게 보호됩니다.",
        safety_3: "카메라 권한은 테스트 목적으로만 사용되며, 언제든지 브라우저 설정에서 철회할 수 있습니다.",
        subtitle_contact: "제휴 및 문의",
        desc_contact: "질문, 피드백 또는 비즈니스 문의가 있으신가요? 아래 양식을 작성해 주시면 신속히 답변해 드리겠습니다.",
        form_name: "이름",
        form_email: "이메일",
        form_message: "메시지",
        form_submit: "문의 보내기",
        subtitle_comments: "댓글",
        footer_rights: "모든 권리 보유.",
        privacy: "개인정보처리방침",
        terms: "이용약관"
    },
    en: {
        nav_animal: "Animal Test",
        nav_lotto: "Lotto",
        nav_about: "About",
        nav_contact: "Contact",
        title_animal: "Animal Look Test",
        desc_animal: "Discover which animal you resemble most! Using advanced AI technology from Google's Teachable Machine, find out if you have the playful spirit of a dog or the elegant grace of a cat.",
        webcam_btn: "Start Webcam",
        upload_btn: "Upload Photo",
        upload_label: "Click or Drag & Drop Photo",
        analyze_btn: "Analyze Uploaded Photo",
        title_lotto: "Lotto Number Generator",
        desc_lotto: "Feeling lucky? Use our random number generator to pick your next winning set of numbers. Our algorithm ensures a fair and unbiased selection.",
        generate_btn: "Generate Numbers",
        subtitle_about: "About & Tips",
        about_text: "Our platform is dedicated to providing fun and interactive tools for everyday use with high-quality experience.",
        animal_tip_title: "Animal Test Tips:",
        animal_tip_1: "Best results in bright environments facing forward.",
        animal_tip_2: "Try removing glasses or hats for better accuracy.",
        lotto_tip_title: "Lotto Generator Info:",
        lotto_tip_1: "Generates 6 unique numbers between 1 and 45.",
        lotto_tip_2: "Numbers are for entertainment and don't guarantee winning.",
        subtitle_safety: "Safety & Privacy Guidelines",
        safety_1: "Our service does not store or transmit your images to any server.",
        safety_2: "All AI analysis is processed locally within your browser, ensuring your data is protected.",
        safety_3: "Camera access is used solely for testing purposes and can be revoked at any time in your browser settings.",
        subtitle_contact: "Affiliate Inquiry",
        desc_contact: "Have questions, feedback, or business inquiries? Fill out the form below and we'll get back to you soon.",
        form_name: "Name",
        form_email: "Email",
        form_message: "Message",
        form_submit: "Send Inquiry",
        subtitle_comments: "Comments",
        footer_rights: "All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
    }
};

let currentLang = localStorage.getItem('lang') || 'ko';

const updateLanguage = () => {
    const lang = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (lang[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = lang[key];
            } else {
                el.innerText = lang[key];
            }
        }
    });
    langToggle.textContent = currentLang === 'ko' ? '🇺🇸 EN' : '🇰🇷 KO';
    document.documentElement.lang = currentLang;
};

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    localStorage.setItem('lang', currentLang);
    updateLanguage();
});

// Theme Toggle Logic
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
};

themeToggle.addEventListener('click', toggleTheme);

// Initialize
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
updateLanguage();

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
    const clickedBtn = Array.from(document.querySelectorAll('.option-btn')).find(btn => {
        const text = btn.textContent.toLowerCase();
        return text.includes('webcam') || text.includes('upload') || text.includes('웹캠') || text.includes('업로드');
    });
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
        alert(currentLang === 'ko' ? '사진을 먼저 업로드해주세요!' : 'Please upload a photo first!');
        return;
    }
    
    await loadModel();
    labelContainer = document.getElementById('label-container');
    labelContainer.innerHTML = currentLang === 'ko' ? '분석 중...' : 'Analyzing...';
    
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
        
        if (className === 'Class 1') className = currentLang === 'ko' ? '강아지상' : 'Dog';
        if (className === 'Class 2') className = currentLang === 'ko' ? '고양이상' : 'Cat';
        
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