const generatePasswordButton = document.getElementById("generate-password-button");
const generatedPassword = document.getElementById("generated-password");
const passwordLengthOutput = document.getElementById("password-length-output");
const passwordLengthRangeInput = document.getElementById("password-length-range-input");
const copyButton = document.getElementById("copy-button");
const message = document.getElementById("message");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";

const generatePassword = () => {
  let password = "";
  const random = new Uint32Array(1);
  const limit = Math.floor(2 ** 32 / characters.length) * characters.length;
  
  for (let i= 0; i < Number(passwordLengthRangeInput.value); i++){
    do {
    crypto.getRandomValues(random);
  } while (random[0] > limit);
    password += characters[random[0] % characters.length];
  };
    generatedPassword.value = password;
};

const pass = () => {
  passwordLengthOutput.textContent = passwordLengthRangeInput.value;
  generatePassword();
};

const generatePassProcess = () => {
    navigator.clipboard.writeText(generatedPassword.value)
    copyButton.textContent= "Copied!";
    message.textContent = "Password copied to clipboard.";
    setTimeout(()=>{
    copyButton.textContent= "Copy";
    message.textContent = "Uses letters, numbers, and symbols.";
    }, 1500);
}

generatePasswordButton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", generatePassProcess)
passwordLengthRangeInput.addEventListener("input", pass);

generatePassword();
