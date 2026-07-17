const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const toast = document.getElementById("toast");

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";

const numberChars = "0123456789";

const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
function getRandomCharacter(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}
function shuffleString(text) {

    const array = text.split("");

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

    return array.join("");

}

function updateStrength(password) {

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[a-z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {

        strengthBar.style.width = "33%";
        strengthBar.style.background = "#ef4444";
        strengthText.textContent = "Weak";

    }

    else if (score <= 4) {

        strengthBar.style.width = "66%";
        strengthBar.style.background = "#f59e0b";
        strengthText.textContent = "Medium";

    }

    else {

        strengthBar.style.width = "100%";
        strengthBar.style.background = "#22c55e";
        strengthText.textContent = "Strong";

    }

}

function showToast() {

    console.log(toast);

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

}


function generatePassword() {

    let availableCharacters = "";
    let password = "";

    if (uppercaseCheck.checked) {
        availableCharacters += uppercaseChars;
        password += getRandomCharacter(uppercaseChars);
    }

    if (lowercaseCheck.checked) {
        availableCharacters += lowercaseChars;
        password += getRandomCharacter(lowercaseChars);
    }

    if (numbersCheck.checked) {
        availableCharacters += numberChars;
        password += getRandomCharacter(numberChars);
    }

    if (symbolsCheck.checked) {
        availableCharacters += symbolChars;
        password += getRandomCharacter(symbolChars);
    }

    if (availableCharacters === "") {
        alert("Please select at least one option.");
        return;
    }

    while (password.length < lengthSlider.value) {

        password += getRandomCharacter(availableCharacters);

    }

   password = shuffleString(password);

passwordInput.value = password;
updateStrength(password);

}
generateBtn.addEventListener("click", generatePassword);
generatePassword();

copyBtn.addEventListener("click", async () => {

    if (!passwordInput.value) return;

    try {

        await navigator.clipboard.writeText(passwordInput.value);

        showToast();

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

});