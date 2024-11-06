// Function to show a specific page
function startBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(error => {
            console.log('Error playing background music:', error);
        });
    }
}


function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.add('hidden');
    });

    // Show the specified page
    const pageToShow = document.getElementById(pageId);
    pageToShow.classList.remove('hidden');

    // Handle background music and video
    const backgroundMusic = document.getElementById('background-music');

    if (pageId === 'visualization-page') {
        // Pause background music
        backgroundMusic.pause();

        // Initialize visualization
        initVisualization();
    } else {
        // Do not automatically play background music here
        // It will be handled by user interaction
        if (pageId === 'grounding-page') {
            initGroundingExercise();
        } else if (pageId === 'breathing-page') {
            initBreathingExercise();
        } else if (pageId === 'affirmations-page') {
            initAffirmations();
        } else if (pageId === 'puzzle-page') {
            initPuzzle();
        } else if (pageId === 'math-quiz-page') {
            startQuiz();
        } else if (pageId === 'coloring-page') {
            initColoringActivity();
        } else if (pageId === 'pmr-page') {
            initPMR();
        }
    }
}

// Function for the 'Next' button on the welcome page
function nextStep() {
    showPage('grounding-page');
}

/* ================================
   Grounding Exercise Logic
================================ */
function initGroundingExercise() {
    // Grounding Exercise Logic
    const steps = [
        { prompt: "List 5 things you can see around you", count: 5 },
        { prompt: "List 4 things you can touch", count: 4 },
        { prompt: "List 3 things you can hear", count: 3 },
        { prompt: "List 2 things you can smell", count: 2 },
        { prompt: "List 1 thing you can taste", count: 1 }
    ];

    let currentStep = 0;

    showGroundingStep(currentStep);

    function showGroundingStep(stepIndex) {
        const exerciseDiv = document.getElementById("exercise");
        exerciseDiv.innerHTML = ""; // Clear previous content

        const step = steps[stepIndex];
        const promptText = document.createElement("p");
        promptText.textContent = step.prompt;
        exerciseDiv.appendChild(promptText);

        for (let i = 0; i < step.count; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `Enter item ${i + 1}`;
            input.classList.add("response-input");
            input.addEventListener("input", checkAllFilled); // Add input event listener to check inputs
            exerciseDiv.appendChild(input);
        }

        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.onclick = handleNextStep;
        nextButton.id = "nextButton";
        exerciseDiv.appendChild(nextButton);

        // Initially disable the next button
        document.getElementById("nextButton").disabled = true;

        function checkAllFilled() {
            const inputs = exerciseDiv.querySelectorAll(".response-input");
            const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
            document.getElementById("nextButton").disabled = !allFilled;
        }
    }

    function handleNextStep() {
        currentStep++;
        if (currentStep < steps.length) {
            showGroundingStep(currentStep);
        } else {
            displayCheckInGrounding();
        }
    }

    function displayCheckInGrounding() {
        document.getElementById("exercise").classList.add("hidden");
        document.getElementById("check-in-grounding").classList.remove('hidden');
    }
}

function handleCheckInGrounding(response) {
    if (response === 'yes') {
        showPage('welcome-page');
    } else if (response === 'no') {
        showPage('breathing-page');
    }
}

/* ================================
   Breathing Exercise Logic
================================ */
let breathCount = 0;
const maxBreaths = 4; // Number of breathing cycles

function initBreathingExercise() {
    // Breathing Exercise Logic
    let instructions = document.getElementById('instruction');
    let circle = document.querySelector('.circle');
    let startButton = document.getElementById('startButton');
    let checkInDiv = document.getElementById('check-in-breathing');

    // Reset any previous state
    instructions.textContent = 'Click "Start" to begin the exercise.';
    circle.style.transform = 'scale(1)';
    circle.style.animation = '';
    startButton.style.display = 'inline-block';
    checkInDiv.classList.add('hidden');
    breathCount = 0; // Reset breath count
}

function startBreathing() {
    let instructions = document.getElementById('instruction');
    let circle = document.querySelector('.circle');
    let startButton = document.getElementById('startButton');
    let checkInDiv = document.getElementById('check-in-breathing');

    startButton.style.display = 'none';
    instructions.textContent = 'Breathe In...';
    circle.style.animation = 'breatheIn 4s forwards';
    circle.style.animationTimingFunction = 'ease-in-out';

    setTimeout(() => {
        instructions.textContent = 'Hold...';
        circle.style.animation = ''; // Stop the animation
        circle.style.transform = 'scale(1.5)'; // Keep the circle at expanded size

        setTimeout(() => {
            instructions.textContent = 'Breathe Out...';
            circle.style.animation = 'breatheOut 4s forwards';
            circle.style.animationTimingFunction = 'ease-in-out';

            setTimeout(() => {
                breathCount++; // Increment the breath count
                if (breathCount < maxBreaths) {
                    resetCircle();
                    startBreathing(); // Repeat the cycle
                } else {
                    endBreathingExercise(); // End the exercise
                }
            }, 4000); // Wait for breathe out
        }, 2000); // Hold after breathe in
    }, 4000); // Wait for breathe in

    function resetCircle() {
        circle.style.transform = 'scale(1)'; // Reset circle size
    }

    function endBreathingExercise() {
        instructions.textContent = 'Exercise complete. Are you feeling better?';
        checkInDiv.classList.remove('hidden');
    }
}

function handleCheckInBreathing(response) {
    if (response === 'yes') {
        showPage('welcome-page');
    } else if (response === 'no') {
        showPage('affirmations-page');
    }
}

/* ================================
   Affirmations Logic
================================ */
function initAffirmations() {
    let affirmationCount = 0;
    const affirmations = [
        "I am capable and strong.",
        "I believe in myself and my abilities.",
        "Every day is a new opportunity.",
        "I am in control of my thoughts and emotions.",
        "I embrace peace and positivity.",
        "I am worthy of happiness and love.",
        "I face challenges with courage.",
        "I am growing and learning every day.",
        "My potential is limitless.",
        "I choose to be grateful and optimistic.",
        "I am calm and in control",
        "I feel the fear and let it go",
        "I let my anxious thoughts flow in one ear and out the other",
        "I am getting through this anxious moment, just as I have done a million times before",
        "I am strong and resilient",
        "I choose to feel calm and peaceful",
        "I’ve survived this before, I’ll survive now",
        "I am free from my anxiety. I am in control",
        "I’m in charge of my breathing, and I can slow it down",
        "I can do this",
        "I am above stress of any kind",
        "I am familiar with these feelings and they do not scare me",
        "I am surrounded by people who understand",
        "I am supported, loved, and cared for",
        "I have the techniques and tools needed to persevere",
        "I am safe and in control.",
        "I have done this before, and I can do it again.",
        "This too shall pass.",
        "I am strong.",
        "I trust myself.",
        "I am capable.",
        "I take things one day at a time.",
        "I inhale peace and exhale worry.",
        "This feeling is only temporary.",
        "I am loved and accepted.",
        "I can move past this moment.",
        "I am in charge.",
        "As I breathe, I am calm and relaxed.",
        "My body is my ally."
    ];

    displayAffirmation();

    document.getElementById('new-affirmation-button').addEventListener('click', function() {
        displayAffirmation();
    });

    function displayAffirmation() {
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        const affirmationText = affirmations[randomIndex];

        document.getElementById('affirmation-text').textContent = affirmationText;

        affirmationCount++;
        if (affirmationCount % 3 === 0) {
            showCheckInAffirmations();
        }
    }

    function showCheckInAffirmations() {
        document.getElementById('check-in-affirmations').classList.remove('hidden');
    }
}

function handleCheckInAffirmations(response) {
    if (response === 'yes') {
        showPage('welcome-page');
    } else if (response === 'no') {
        showPage('visualization-page');
    }
}

/* ================================
   Visualization Logic
================================ */
function initVisualization() {
    const video = document.getElementById('calming-video');
    const videoContainer = document.getElementById('video-container');
    const checkIn = document.getElementById('check-in-visualization');

    // Ensure the video container and check-in are visible/invisible as appropriate
    videoContainer.classList.remove('hidden');
    checkIn.classList.add('hidden');

    // Play the video
    video.currentTime = 0; // Start from the beginning
    video.play();

    // Event listener for when the video ends
    video.onended = function() {
        // Show the check-in question
        checkIn.classList.remove('hidden');

        // Resume background music
        const backgroundMusic = document.getElementById('background-music');
        backgroundMusic.play();
    };
}

function handleCheckInVisualization(response) {
    if (response === 'yes') {
        showPage('welcome-page');
    } else if (response === 'no') {
        showPage('puzzle-page');
    }
}

/* ================================
   Puzzle Game Logic
================================ */
function initPuzzle() {
    const container = document.getElementById('puzzle-container');
    container.innerHTML = ''; // Clear any previous pieces
    console.log("Initializing puzzle"); // Log to confirm the function is called
    createPuzzle('puzzle-image.png'); // Ensure this image is 400x400 pixels or will be scaled accordingly
    
    let container;
    let totalPieces;
    let piecesPlaced = 0;
    
    function createPuzzle(imageSrc2) {
        console.log("Image source for puzzle:", imageSrc2); // Add this inside createPuzzle to confirm the path
        container = document.getElementById('puzzle-container');
        container.innerHTML = ''; // Clear previous content
        const rows = 3;
        const cols = 3;
        const pieceWidth = 400 / cols;  // Now 133.33px
        const pieceHeight = 400 / rows; // Now 133.33px
        totalPieces = rows * cols;

        let pieces = [];

        // Create slots
        for (let i = 0; i < rows * cols; i++) {
            let slot = document.createElement('div');
            slot.className = 'puzzle-slot';
            container.appendChild(slot);
        }

        // Create puzzle pieces
        for (let i = 0; i < totalPieces; i++) {
            let piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.style.backgroundImage = "url('puzzle-image.png')";
            console.log(`Background image set for piece: ${piece.style.backgroundImage}`); // Add this to verify

            // Calculate background position
            let row = Math.floor(i / cols);
            let col = i % cols;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;

            piece.dataset.correctSlot = i;

            // Randomly position pieces outside the container
            piece.style.left = `${Math.random() * (window.innerWidth - pieceWidth)}px`;
            piece.style.top = `${Math.random() * (window.innerHeight - pieceHeight)}px`;
            piece.style.position = 'absolute';
            document.body.appendChild(piece); // Place pieces outside the container
            pieces.push(piece);
            initDrag(piece);
        }

        function initDrag(piece) {
            // Bind the event handlers to the piece
            piece.onMouseDownHandler = onMouseDown.bind(null, piece);
            piece.addEventListener('mousedown', piece.onMouseDownHandler);
        }

        function onMouseDown(piece, event) {
            event.preventDefault();

            if (piece.placed) {
                return; // Do nothing if the piece is already placed
            }

            let shiftX = event.clientX - piece.getBoundingClientRect().left;
            let shiftY = event.clientY - piece.getBoundingClientRect().top;

            piece.style.zIndex = 1000; // Bring the piece to the front

            // Bind the event handlers
            piece.onMouseMoveHandler = onMouseMove.bind(null, piece, shiftX, shiftY);
            piece.onMouseUpHandler = onMouseUp.bind(null, piece);

            document.addEventListener('mousemove', piece.onMouseMoveHandler);
            document.addEventListener('mouseup', piece.onMouseUpHandler);

            piece.ondragstart = function() {
                return false;
            };
        }

        function onMouseMove(piece, shiftX, shiftY, event) {
            piece.style.left = event.pageX - shiftX + 'px';
            piece.style.top = event.pageY - shiftY + 'px';
        }

        function onMouseUp(piece, event) {
            document.removeEventListener('mousemove', piece.onMouseMoveHandler);
            document.removeEventListener('mouseup', piece.onMouseUpHandler);

            piece.style.zIndex = ''; // Reset z-index

            checkPiecePlacement(piece, event.pageX, event.pageY);
        }

        function checkPiecePlacement(piece, x, y) {
            const slots = document.querySelectorAll('#puzzle-container .puzzle-slot');
            let placed = false;

            slots.forEach((slot, index) => {
                const slotRect = slot.getBoundingClientRect();
                if (
                    x >= slotRect.left &&
                    x <= slotRect.right &&
                    y >= slotRect.top &&
                    y <= slotRect.bottom
                ) {
                    // Check if this is the correct slot
                    const correctSlotIndex = parseInt(piece.dataset.correctSlot);

                    if (correctSlotIndex === index) {
                        // Snap piece into slot
                        piece.style.position = 'relative';
                        piece.style.left = '0px';
                        piece.style.top = '0px';
                        piece.removeEventListener('mousedown', piece.onMouseDownHandler); // Remove event listener
                        piece.placed = true; // Mark the piece as placed
                        piece.parentNode.removeChild(piece); // Remove from body
                        slot.appendChild(piece); // Add to slot
                        piecesPlaced++;

                        if (piecesPlaced === totalPieces) {
                            showCompletionMessage();
                        }
                        placed = true;
                    }
                }
            });

            if (!placed) {
                // If not placed in a slot, piece remains where it was dropped
            }
        }

        function showCompletionMessage() {
            document.getElementById('check-in-puzzle').classList.remove('hidden');
        }
    }
}

function handleCheckInPuzzle(response) {
    if (response === 'yes') {
        showPage('welcome-page');
    } else if (response === 'no') {
        showPage('math-quiz-page');
    }
}

/* ================================
   Math Quiz Logic
================================ */
let currentQuestionIndex = 0;
const totalQuestions = 5;
let questions = [];

function startQuiz() {
    generateQuestions();
    showQuestion(currentQuestionIndex);
}

function generateQuestions() {
    questions = []; // Reset questions array
    // Generate 5 simple addition or subtraction questions
    for (let i = 0; i < totalQuestions; i++) {
        const question = createQuestion();
        questions.push(question);
    }
}

function showQuestion(index) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ''; // Clear previous content

    if (index < totalQuestions) {
        const questionObj = questions[index];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionText = document.createElement('span');
        questionText.textContent = `${questionObj.num1} ${questionObj.operator} ${questionObj.num2} = `;

        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.id = 'answer-input';
        inputField.autocomplete = 'off';

        // Feedback message area
        const feedbackDiv = document.createElement('div');
        feedbackDiv.id = 'feedback';

        // Append elements to the quiz container
        questionDiv.appendChild(questionText);
        quizContainer.appendChild(questionDiv);
        quizContainer.appendChild(inputField);
        quizContainer.appendChild(feedbackDiv);

        // Focus on the input field
        inputField.focus();

        // Add event listener to input field
        inputField.addEventListener('input', function() {
            checkAnswer(inputField, questionObj, feedbackDiv);
        });
    } else {
        // All questions answered, proceed to check-in
        quizContainer.classList.add('hidden');
        document.getElementById('check-in-math-quiz').classList.remove('hidden');
    }
}

function createQuestion() {
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2, correctAnswer;

    if (operator === '+') {
        num1 = getRandomInt(0, 20);
        num2 = getRandomInt(0, 20);
        correctAnswer = num1 + num2;
    } else {
        num1 = getRandomInt(0, 20);
        num2 = getRandomInt(0, num1); // Ensure the result is not negative
        correctAnswer = num1 - num2;
    }

    return { num1, num2, operator, correctAnswer };
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkAnswer(inputField, currentQuestion, feedbackDiv) {
    const userAnswer = parseInt(inputField.value);

    if (isNaN(userAnswer)) {
        feedbackDiv.textContent = '';
        return;
    }

    if (userAnswer === currentQuestion.correctAnswer) {
        feedbackDiv.textContent = 'Correct!';
        feedbackDiv.className = 'feedback';

        // Disable the input field to prevent further input
        inputField.disabled = true;

        // Move to the next question after a short delay
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }, 1000);
    } else {
        feedbackDiv.textContent = 'Incorrect, please try again.';
        feedbackDiv.className = 'error';
    }
}

function handleCheckInMathQuiz(response) {
    if (response === 'yes') {
        showPage('welcome-page');
    } else if (response === 'no') {
        showPage('coloring-page');
    }
}

/* ================================
   Coloring Activity Logic
================================ */
function initColoringActivity() {
    setupColorPicker();
    setupCanvas();
    setupDoneButton();
}

let currentColor = '#000000'; // Default color is black
let isDrawing = false;
let canvas, ctx;

function setupColorPicker() {
    const colorPicker = document.getElementById('color-picker');
    colorPicker.innerHTML = ''; // Clear previous colors
    const colors = ['#000000', '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3', '#FFFFFF'];
    colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-option';
        colorDiv.style.backgroundColor = color;
        colorDiv.addEventListener('click', function() {
            currentColor = color;
            // Highlight the selected color
            document.querySelectorAll('.color-option').forEach(el => el.style.borderColor = '#fff');
            colorDiv.style.borderColor = '#000';
        });
        colorPicker.appendChild(colorDiv);
    });
}

function setupCanvas() {
    canvas = document.getElementById('drawing-canvas');
    ctx = canvas.getContext('2d');

    // Set the canvas dimensions to fit its container
    resizeCanvas();

    // Redraw the canvas when the window is resized
    window.addEventListener('resize', resizeCanvas);

    // Set up event listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('touchstart', startDrawing, {passive: false});

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', draw, {passive: false});

    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);
}

function resizeCanvas() {
    // Get the container's width
    const containerWidth = document.getElementById('canvas-container').offsetWidth;
    canvas.width = containerWidth;
    canvas.height = containerWidth * 0.75; // Adjusted height ratio remains the same
}

function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    ctx.beginPath();
    const pos = getMousePos(e);
    ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    const pos = getMousePos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function stopDrawing(e) {
    if (!isDrawing) return;
    e.preventDefault();
    isDrawing = false;
    ctx.closePath();
}

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    return { x, y };
}

function setupDoneButton() {
document.getElementById('check-in-coloring').classList.remove('hidden');
}

function handleCheckInColoring(response) {
    if (response === 'yes') {
        showPage('welcome-page');
    } else if (response === 'no') {
        showPage('pmr-page');
    }
}



/* ================================
   Pmr Activity Logic
================================ */

/* ================================
   PMR Activity Logic
=============================== */
function initPMR() {
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');

    // Remove existing event listeners if necessary
    yesButton.replaceWith(yesButton.cloneNode(true));
    noButton.replaceWith(noButton.cloneNode(true));

    // Re-select the buttons
    const newYesButton = document.getElementById('yes-button');
    const newNoButton = document.getElementById('no-button');

    // Add event listeners
    newYesButton.addEventListener('click', function() {
        showPage('welcome-page');
    });

    newNoButton.addEventListener('click', function() {
        alert("Please take a rest or try another relaxation exercise.");
    });
}

document.getElementById('yes-button').addEventListener('click', function() {
    handleCheckInPMR('yes');
});
document.getElementById('no-button').addEventListener('click', function() {
    handleCheckInPMR('no');
});

function handleCheckInPMR(response) {
    if (response === 'yes') {
        showPage('welcome-page');
    } else if (response === 'no') {
        alert("Please take a rest or try another relaxation exercise.");
    }
}
