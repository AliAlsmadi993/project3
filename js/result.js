const darkModeToggle = document.getElementById("darkModeToggle");
const resultMessage = document.getElementById("result-message");
const scoreElement = document.getElementById("score");
const showAnswersButton = document.getElementById("show-answers");
const answersTable = document.getElementById("answers-table").querySelector("tbody");

// Function to load and display test results
function loadTestResults(testType) {
    const testFiles = {
        iq: "data/iq.json",
        english: "data/english.json",
        technical: "data/technical.json",
    };

    fetch(testFiles[testType])
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load test data");
            }
            return response.json();
        })
        .then((correctAnswers) => {
            answersTable.innerHTML = "";
            resultMessage.textContent = "";
            showAnswersButton.style.display = "none"; // Hide Show Answers button initially
            answersTable.parentElement.style.display = "none"; // Hide the table initially

            // Retrieve user's answers from localStorage
            const answers = JSON.parse(localStorage.getItem(`answers_${testType}`));

            // Check if the user hasn't taken the test
            if (!answers || answers.length === 0) {
                resultMessage.textContent = "You have not taken this test yet.";
                resultMessage.className = "score warning"; // Add a CSS class for warning
                scoreElement.textContent = ""; // Clear the score display
                return; // Stop further execution
            }

            // Calculate the score
            let score = 0;
            correctAnswers.forEach((item, index) => {
                if (answers[index] === item.correctAnswer) {
                    score++;
                }
            });

            // Display the score
            scoreElement.textContent = `Score: ${score}/${correctAnswers.length}`;

            // Display success or failure message
            if (score >= 5) {
                resultMessage.textContent = "Congratulations! You passed the test.";
                resultMessage.className = "score success";
            } else {
                resultMessage.textContent = "Unfortunately, you did not pass.";
                resultMessage.className = "score failure";
            }

            // Show answers when the user clicks "Show Answers"
            showAnswersButton.style.display = "block";
            showAnswersButton.onclick = () => {
                answersTable.parentElement.style.display = "table";
                correctAnswers.forEach((item, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${item.question}</td>
                        <td class="${
                            answers[index] === item.correctAnswer ? "correct" : "incorrect"
                        }">${answers[index] || "Not Answered"}</td>
                        <td>${item.correctAnswer}</td>
                    `;
                    answersTable.appendChild(row);
                });
                showAnswersButton.style.display = "none";
            };
        })
        .catch((error) => {
            console.error("Error loading test data:", error);
            resultMessage.textContent = "Failed to load test data. Please try again.";
        });
}

// Event listeners for test buttons
document.querySelectorAll("#test-buttons .btn-result").forEach((button) => {
    button.addEventListener("click", () => {
        const testType = button.getAttribute("data-test");
        console.log("Loading test type:", testType); // Debugging
        loadTestResults(testType);
    });
});

// Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
