// Array to store quiz questions and their details
const questions = [
    {
      question: "Which of the following keywords is used to define a variable in Javascript?",
      choices: ["var", "let", "Both A and B", "None of the above"],
      correctAnswer: "Both A and B"
    },
    {
      question: "Which of the following methods is used to acces HTML elements using Javascript?",
      choices: ["getElementbyId()", "getElemenTByClass()", "Both A and B", "None of the above"],
      correctAnswer: "JavaScript"
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        choices: ["const", "var", "let", "constant"],
        correctAnswer: "const"
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["var", "let", "Both A and B", "None of the above"],
        correctAnswer: "Both A and B"
    },
  ];
  
  // Variables to track quiz state
  let currentQuestionIndex = 0;
  let timer;
  let timeRemaining = 60; // in seconds
  
  // DOM elements
  const startBtn = document.getElementById("start-btn");
  const questionContainer = document.getElementById("question-container");
  const choicesContainer = document.getElementById("choices-container");
  const feedbackContainer = document.getElementById("feedback-container");
  const timerDisplay = document.getElementById("timer");
  
  // Event listener for the start button
  startBtn.addEventListener("click", startQuiz);
  
  // Function to start the quiz
  function startQuiz() {
    startBtn.style.display = "none"; // Hide the start button
    displayQuestion(); // Display the first question
    timer = setInterval(updateTimer, 1000); // Start the timer
  }
  
  // Function to display the current question
  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question; // Display the question text
  
    choicesContainer.innerHTML = ""; // Clear previous choices
  
    // Create buttons for each choice and add event listeners
    currentQuestion.choices.forEach((choice, index) => {
      const choiceBtn = document.createElement("button");
      choiceBtn.textContent = choice;
      choiceBtn.addEventListener("click", () => checkAnswer(choice));
      choicesContainer.appendChild(choiceBtn);
    });
  }
  
  // Function to check the user's answer
  function checkAnswer(choice) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (choice === currentQuestion.correctAnswer) {
      feedbackContainer.textContent = "Correct!"; // Display correct feedback
    } else {
      feedbackContainer.textContent = "Incorrect!"; // Display incorrect feedback
      timeRemaining -= 10; // Subtract 10 seconds for incorrect answers
    }
  
    // Move to the next question after a short delay
    setTimeout(() => {
      feedbackContainer.textContent = "";
      currentQuestionIndex++;
  
      // Check if there are more questions or end the quiz
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }, 1000);
  }
  
  // Function to update the timer
  function updateTimer() {
    timerDisplay.textContent = "Time: " + timeRemaining;
  
    // Checks if the time is up
    if (timeRemaining <= 0) {
      endQuiz();
    } else {
      timeRemaining--;
    }
  }
  
  // Function to end the quiz
  function endQuiz() {
    clearInterval(timer); // Stop the timer
    timerDisplay.textContent = "Time's up!";
  
    // Prompts user for initials
  const userInitials = prompt("Enter your initials:");

  // Creates an object to store the user's data
  const userData = {
    initials: userInitials,
    score: timeRemaining // You can modify this based on your scoring logic
  };

  // Retrieves existing high scores from local storage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Adds the current user's data to the high scores array
  highScores.push(userData);

  // Sorts high scores based on score in descending order
  highScores.sort((a, b) => b.score - a.score);

  // Stores the updated high scores back to local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
function displayHighscores() {
    const highscoresContainer = document.getElementById("highscores-container");
    highscoresContainer.style.display = "block";
  }