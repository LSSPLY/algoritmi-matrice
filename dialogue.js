const dialogueBox = document.getElementById("dialogue");
const dialogueText = document.getElementById("dialogueText");

const dialogueTitle = document.getElementById("dialogueTitle");
const dialogueSubtitle = document.getElementById("dialogueSubtitle");

const infoIcon = document.getElementById("infoIcon");
const warningIcon = document.getElementById("warningIcon");

hideDialogue();

function hideDialogue() {
    dialogueBox.classList.remove("warning-box");
    dialogueBox.classList.remove("info-box");
    dialogueBox.classList.add("hidden-box");
}

function displayInfo(dist, steps) {
    dialogueBox.classList.remove("hidden-box");
    dialogueBox.classList.remove("warning-box");
    dialogueBox.classList.add("info-box");
    dialogueText.classList.remove("warning-text");
    dialogueText.classList.add("info-text");
    dialogueTitle.innerText = "Cel mai scurt drum este de " + dist + ".";
    dialogueSubtitle.innerText = "Cod executat în " + steps + " pași.";
    infoIcon.style.display = "block";
    warningIcon.style.display = "none";
}

function displayWarning(steps) {
    dialogueBox.classList.remove("hidden-box");
    dialogueBox.classList.remove("info-box");
    dialogueBox.classList.add("warning-box");
    dialogueText.classList.remove("info-text");
    dialogueText.classList.add("warning-text");
    dialogueTitle.innerText = "Niciun drum găsit!";
    dialogueSubtitle.innerText = "Cod executat în " + steps + " pași.";
    infoIcon.style.display = "none";
    warningIcon.style.display = "block";
}
