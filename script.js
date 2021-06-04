const passwordField = document.getElementById("psw");
const passwordButton = document.getElementById("psw-btn");
const launchButton = document.getElementById("launch-btn");
const checkboxes = Array.from(document.querySelectorAll("input[type='checkbox']"));
const levers = Array.from(document.querySelectorAll("input[type='range']"));
const rocket = document.querySelector(".rocket");

passwordButton.onclick = () => {
    if (passwordField.value === "TrustNo1") {
        checkboxes.forEach(input => input.disabled = false);
        levers.forEach(input => input.disabled = false);
        passwordField.disabled = true;
        passwordButton.disabled = true;
    }
};

levers.forEach(lever => lever.onchange = verifyInputs);
checkboxes.forEach(checkbox => checkbox.onchange = verifyInputs);

function verifyInputs() {
    launchButton.disabled = !(checkboxes.every(c => c.checked) && levers.every(l => l.value === l.max));
}

const rocketSpeed = 3;
const rocketSpeedY = rocketSpeed * Math.cos(0.3490659);
const rocketSpeedX = rocketSpeed * Math.sin(0.3490659);

let intervalId;

launchButton.addEventListener('click', () => {
    if (!launchButton.disabled) {
        intervalId = setInterval(() => {
            if (rocket.offsetTop < -rocket.offsetHeight) {
                clearInterval(intervalId);
            } else {
                rocket.style.top = (rocket.offsetTop - rocketSpeedY) + 'px';
                rocket.style.left = (rocket.offsetLeft + rocketSpeedX) + 'px';
            }
        }, 20);
    }
});

