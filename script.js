// --- Configuration Section ---
// 1. Define your workout sets here.
//    - exercise: The name to display.
//    - duration: How long the exercise lasts, in seconds.
//    - prompt: The name of your .wav file in the 'audio' folder.

const workoutPlan = [
    { exercise: "Get Ready", duration: 5, prompt: "get-ready.wav" },
    { exercise: "Arm Curls", duration: 30, prompt: "start-curls.wav" },
    { exercise: "Rest", duration: 15, prompt: "rest.wav" },
    { exercise: "Jumping Jacks", duration: 30, prompt: "start-jacks.wav" },
    { exercise: "Rest", duration: 15, prompt: "rest.wav" },
    { exercise: "Workout Complete", duration: 5, prompt: "complete.wav" }
];

// --- App Logic ---
const statusDisplay = document.getElementById('status-display');
const timerDisplay = document.getElementById('timer-display');
const startPauseBtn = document.getElementById('start-pause-btn');

let currentSetIndex = 0;
let isRunning = false;
let timerInterval = null;

// Function to play an audio prompt
function playPrompt(fileName) {
    const audio = new Audio(`audio/${fileName}`);
    audio.play().catch(error => console.error("Audio playback failed:", error));
}

// Main workout loop function
function runNextSet() {
    if (currentSetIndex >= workoutPlan.length) {
        statusDisplay.textContent = "Workout Complete!";
        clearInterval(timerInterval);
        isRunning = false;
        startPauseBtn.textContent = "Start Over";
        return;
    }

    const currentSet = workoutPlan[currentSetIndex];
    statusDisplay.textContent = currentSet.exercise;
    playPrompt(currentSet.prompt);

    let timeLeft = currentSet.duration;
    timerDisplay.textContent = formatTime(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            currentSetIndex++;
            runNextSet();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Event Listener for the button
startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        // This is a simple implementation. A true pause/resume is more complex.
        // For now, we'll just reset.
        location.reload(); 
    } else {
        isRunning = true;
        startPauseBtn.textContent = "Stop & Reset";
        startPauseBtn.classList.add('running');
        runNextSet();
    }
});
