const secondsCard = document.querySelector(".seconds .card");
const minutesCard = document.querySelector(".minutes .card");
const hoursCard = document.querySelector(".hours .card");
const daysCard = document.querySelector(".days .card");
const startBtn = document.querySelector(".start-timer-btn");

const finish = document.querySelector(".finish");
const finishTop = document.querySelector(".finish-top");
const bidzoImg = document.querySelector(".bidzina-img-container");
const poopImg = document.querySelector(".poop-img");
const tearImg = document.querySelector(".tear-img");
const relaod = document.querySelector(".reload");

let interval;
let audio;

const updateComponent = (newTime, card) => {
    const topHalf = card.querySelector(".top");
    const bottomHalf = card.querySelector(".bottom");
    let currTime = topHalf.innerText;
    newTime = newTime < 10 ? "0" + newTime : newTime;
    if (newTime != currTime) {
        let topFlip = document.createElement("div");
        let bottomFlip = document.createElement("div");
        let flipCard = document.createElement("div");

        topHalf.innerText = newTime;
        topFlip.classList.add("top");
        bottomFlip.classList.add("bottom");
        flipCard.classList.add("flip-card", "card");

        topFlip.innerText = currTime;
        bottomFlip.innerText = newTime;

        flipCard.append(topFlip);
        flipCard.append(bottomFlip);
        card.insertAdjacentElement("afterend", flipCard);

        setTimeout(() => {
            bottomHalf.innerText = newTime;
            flipCard.remove();
        }, 950)
    }
}

const finishBidzo = () => {
    finish.classList.add("added", "animated");
    finishTop.classList.add("added", "animated");
    bidzoImg.classList.add("added", "animated");
    poopImg.classList.add("added", "animated");
    tearImg.classList.add("added", "animated");

    audio = new Audio("audio/anthem.mp3");
    audio.play();
}

const updateTimer = (diff) => {
    if (diff > 0) {
        let daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= daysDiff * 1000 * 60 * 60 * 24;
        let hoursDiff = Math.floor(diff / (1000 * 60 * 60));
        diff -= hoursDiff * 1000 * 60 * 60;
        let minutesDiff = Math.floor(diff / (1000 * 60));
        diff -= minutesDiff * 1000 * 60;
        let secondsDiff = Math.floor(diff / 1000);
        updateComponent(secondsDiff, secondsCard);
        updateComponent(minutesDiff, minutesCard);
        updateComponent(hoursDiff, hoursCard);
        updateComponent(daysDiff, daysCard);
    } else {
        clearInterval(interval)
        finishBidzo();
    }
};

const setTimer = () => {
    // let newYear = new Date(new Date().getFullYear() + 1, 0, 1);
    console.log("Asd")
    startBtn.disabled = true;
    startBtn.style.pointerEvents = "none";
    startBtn.removeEventListener("click", setTimer);
    let electionsDate = new Date("2024-10-26T22:00:00.000+04:00");
    let currDate;
    interval = setInterval(() => {
        currDate = new Date();
        let diff = electionsDate - currDate;
        updateTimer(diff);
    }, 1000);
}

const reloadEnding = () => {
    finishTop.classList.remove("added", "animated");
    bidzoImg.classList.remove("added", "animated");
    poopImg.classList.remove("added", "animated");
    tearImg.classList.remove("added", "animated");

    audio.pause();
    audio.currentTime = 0;

    setTimeout(finishBidzo, 50);
}

startBtn.addEventListener("click", setTimer);

relaod.addEventListener("click", reloadEnding);