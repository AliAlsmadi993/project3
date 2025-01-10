const darkModeToggle = document.getElementById("darkModeToggle");
        const resultModal = document.getElementById("result-modal");
        const modalMessage = document.getElementById("modal-message");
        const viewResultBtn = document.getElementById("view-result-btn");

        // Toggle Dark Mode
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });

        // Handle Test Selection
        document.querySelectorAll('.start-test').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const testType = card.dataset.test;
                const previousAnswers = localStorage.getItem(`answers_${testType}`);

                if (previousAnswers) {
                    modalMessage.textContent = `You have already taken the ${testType} test.`;
                    resultModal.style.display = "flex";
                    viewResultBtn.onclick = () => {
                        window.location.href = `result.html?testType=${testType}`;
                    };
                } else {
                    localStorage.setItem('currentTest', testType);
                    window.location.href = 'test.html';
                }
            });
        });