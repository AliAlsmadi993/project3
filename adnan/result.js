const darkModeToggle = document.getElementById("darkModeToggle");
const resultMessage = document.getElementById("result-message");
const scoreElement = document.getElementById("score");
const showAnswersButton = document.getElementById("show-answers");
const answersTable = document.getElementById("answers-table").querySelector("tbody");

// Function to load and display test results
function loadTestResults(testType) {
    // مسارات ملفات JSON لكل اختبار
    const testFiles = {
        iq: "data/iq.json",
        english: "data/english.json",
        technical: "data/technical.json"
    };

    // تحميل بيانات الأسئلة الصحيحة من ملف JSON
    fetch(testFiles[testType])
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load test data");
            }
            return response.json();
        })
        .then(correctAnswers => {
            // مسح الجدول والرسائل السابقة
            answersTable.innerHTML = "";
            resultMessage.textContent = "";
            showAnswersButton.style.display = "block";
            answersTable.parentElement.style.display = "none";

            // جلب إجابات المستخدم من localStorage
            const answers = JSON.parse(localStorage.getItem(`answers_${testType}`)) || [];

            // حساب النتيجة
            let score = 0;
            correctAnswers.forEach((item, index) => {
                if (answers[index] === item.correctAnswer) {
                    score++;
                }
            });

            // عرض النتيجة
            scoreElement.textContent = `Score: ${score}/${correctAnswers.length}`;

            // عرض رسالة النجاح أو الفشل
            if (score >= 5) {
                resultMessage.textContent = "Congratulations! You passed the test.";
                resultMessage.className = "score success";
            } else {
                resultMessage.textContent = "Unfortunately, you did not pass.";
                resultMessage.className = "score failure";
            }

            // عرض الإجابات عند النقر على زر Show Answers
            showAnswersButton.onclick = () => {
                answersTable.parentElement.style.display = "table";
                correctAnswers.forEach((item, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${item.question}</td>
                        <td class="${answers[index] === item.correctAnswer ? 'correct' : 'incorrect'}">${answers[index] || "Not Answered"}</td>
                        <td>${item.correctAnswer}</td>
                    `;
                    answersTable.appendChild(row);
                });
                showAnswersButton.style.display = "none";
            };
        })
        .catch(error => {
            console.error("Error loading test data:", error);
            resultMessage.textContent = "Failed to load test data. Please try again.";
        });
}

// Event listeners for test buttons
document.querySelectorAll("#test-buttons .btn").forEach(button => {
    button.addEventListener("click", () => {
        const testType = button.getAttribute("data-test");
        loadTestResults(testType);
    });
});

// Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});