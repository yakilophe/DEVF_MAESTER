
const mayusculas = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const minusculas = 'abcdefghijkmnopqrstuvwxyz';
const numeros = '23456789';
const simbolos = '!@#$%^&*_+-=';


const passwordOutput = document.getElementById('passwordOutput');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generateBtn');
const refreshBtn = document.getElementById('refreshBtn');
const copyBtn = document.getElementById('copyBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const securityBtns = document.querySelectorAll('.security-btn');

let currentPassword = '';

const presets = {
    weak: { length: 8, uppercase: true, lowercase: true, numbers: false, symbols: false },
    medium: { length: 12, uppercase: true, lowercase: true, numbers: true, symbols: false },
    strong: { length: 16, uppercase: true, lowercase: true, numbers: true, symbols: true },
    'very-strong': { length: 24, uppercase: true, lowercase: true, numbers: true, symbols: true }
};

function updateLengthValue() {
    lengthValue.textContent = lengthSlider.value;
}

function getAvailableChars() {
    let chars = '';
    if (includeUppercase.checked) chars += mayusculas;
    if (includeLowercase.checked) chars += minusculas;
    if (includeNumbers.checked) chars += numeros;
    if (includeSymbols.checked) chars += simbolos;
    return chars;
}


function generatePassword() {
    let availableChars = getAvailableChars();
    
    if (availableChars.length === 0) {
        includeLowercase.checked = true;
        availableChars = minusculas;
    }
    
    const length = parseInt(lengthSlider.value);
    let password = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }
    

    password = shuffleString(password);
    

    password = ensureRequirements(password);
    
    return password;
}


function shuffleString(str) {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

function ensureRequirements(password) {
    let modified = password.split('');
    
    if (includeUppercase.checked && !/[A-Z]/.test(password)) {
        modified[0] = mayusculas[Math.floor(Math.random() * mayusculas.length)];
    }
    if (includeLowercase.checked && !/[a-z]/.test(password)) {
        modified[1] = minusculas[Math.floor(Math.random() * minusculas.length)];
    }
    if (includeNumbers.checked && !/[0-9]/.test(password)) {
        modified[2] = numeros[Math.floor(Math.random() * numeros.length)];
    }
    if (includeSymbols.checked && !/[!@#$%^&*_+\-=]/.test(password)) {
        modified[3] = simbolos[Math.floor(Math.random() * simbolos.length)];
    }
    
    return shuffleString(modified.join(''));
}

function calculateStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 10;
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;
    if (password.length >= 20) score += 10;
    
    if (/[A-Z]/.test(password)) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    
    if (/(.)\1{2,}/.test(password)) score -= 10;
    
    score = Math.min(100, Math.max(0, score));
    
    if (score >= 80) {
        return { barClass: 'very-strong', text: 'Muy Fuerte' };
    } else if (score >= 60) {
        return { barClass: 'strong', text: 'Fuerte' };
    } else if (score >= 40) {
        return { barClass: 'medium', text: 'Medio' };
    } else {
        return { barClass: 'weak', text: 'Debil' };
    }
}


function updateStrengthMeter(password) {
    const { barClass, text } = calculateStrength(password);
    strengthBar.className = `strength-fill ${barClass}`;
    strengthText.textContent = text;
}

function updatePassword() {
    currentPassword = generatePassword();
    passwordOutput.textContent = currentPassword;
    updateStrengthMeter(currentPassword);
}


async function copyPassword() {
    if (!currentPassword) {
        updatePassword();
    }
    
    try {
        await navigator.clipboard.writeText(currentPassword);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copiado!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    } catch (err) {
        alert('No se pudo copiar la contraseña');
    }
}

// Aplicar preset de seguridad
function applyPreset(level) {
    const preset = presets[level];
    if (!preset) return;
    
    lengthSlider.value = preset.length;
    updateLengthValue();
    includeUppercase.checked = preset.uppercase;
    includeLowercase.checked = preset.lowercase;
    includeNumbers.checked = preset.numbers;
    includeSymbols.checked = preset.symbols;
    
    updatePassword();
}

function initSecurityButtons() {
    securityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            securityBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyPreset(btn.dataset.level);
        });
    });
}

function initEvents() {
    lengthSlider.addEventListener('input', () => {
        updateLengthValue();
        updatePassword();
    });
    
    includeUppercase.addEventListener('change', updatePassword);
    includeLowercase.addEventListener('change', updatePassword);
    includeNumbers.addEventListener('change', updatePassword);
    includeSymbols.addEventListener('change', updatePassword);
    
    generateBtn.addEventListener('click', updatePassword);
    refreshBtn.addEventListener('click', updatePassword);
    copyBtn.addEventListener('click', copyPassword);
}

function init() {
    initSecurityButtons();
    initEvents();
    updateLengthValue();
    updatePassword();
}

init();
