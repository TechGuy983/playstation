// PlayStation Secret Quiz System
document.addEventListener('DOMContentLoaded', function() {
    
    const quizQuestions = [
        {
            type: 'multiple',
            question: 'Which PlayStation console was the first to support DVD playback?',
            options: ['PlayStation 1', 'PlayStation 2', 'PlayStation 3', 'PlayStation Portable'],
            correct: 1
        },
        {
            type: 'character',
            question: 'Who is this iconic PlayStation character?',
            image: 'kratos-ghost-of-3840x2160-16038.jpg',
            options: ['Kratos', 'Nathan Drake', 'Joel Miller', 'Aloy'],
            correct: 0
        },
        {
            type: 'multiple',
            question: 'What year was the original PlayStation released?',
            options: ['1994', '1995', '1996', '1997'],
            correct: 1
        },
        {
            type: 'character',
            question: 'Which game series does this character belong to?',
            image: 'ellie-williams-the-7464x3290-13663.jpg',
            options: ['Uncharted', 'The Last of Us', 'Horizon', 'Ghost of Tsushima'],
            correct: 1
        },
        {
            type: 'multiple',
            question: 'Which PlayStation exclusive game won Game of the Year in 2018?',
            options: ['Spider-Man', 'God of War', 'Horizon Zero Dawn', 'The Last of Us Part II'],
            correct: 1
        },
        {
            type: 'character',
            question: 'This character is from which PlayStation exclusive?',
            image: 'aloy-horizon-forbidden-west-2022-games-3840x2160-7889.jpg',
            options: ['Horizon Zero Dawn', 'Ghost of Tsushima', 'Days Gone', 'Death Stranding'],
            correct: 0
        },
        {
            type: 'multiple',
            question: 'What does the triangle button on PlayStation controllers represent?',
            options: ['Viewpoint', 'Documents', 'Menus', 'Actions'],
            correct: 0
        },
        {
            type: 'multiple',
            question: 'Which PlayStation console introduced the DualShock controller?',
            options: ['PlayStation 1', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4'],
            correct: 0
        },
        {
            type: 'character',
            question: 'Who is this legendary PlayStation character?',
            image: 'marvels-spider-man-3840x2160-13003.jpeg',
            options: ['Miles Morales', 'Peter Parker', 'Spider-Gwen', 'Spider-Man 2099'],
            correct: 1
        },
        {
            type: 'multiple',
            question: 'Which studio developed The Last of Us?',
            options: ['Santa Monica Studio', 'Naughty Dog', 'Guerrilla Games', 'Insomniac Games'],
            correct: 1
        },
        {
            type: 'multiple',
            question: 'What is the maximum storage capacity of a PlayStation 5?',
            options: ['500GB', '825GB', '1TB', '2TB'],
            correct: 1
        },
        {
            type: 'character',
            question: 'This character appears in which PlayStation exclusive series?',
            image: 'ghost-of-tsushima-4320x3456-12072.jpg',
            options: ['Sekiro', 'Ghost of Tsushima', 'Nioh', 'Bloodborne'],
            correct: 1
        },
        {
            type: 'multiple',
            question: 'Which PlayStation service allows you to stream games?',
            options: ['PlayStation Plus', 'PlayStation Now', 'PlayStation Store', 'PlayStation Direct'],
            correct: 1
        },
        {
            type: 'multiple',
            question: 'What technology does PlayStation VR use for tracking?',
            options: ['Inside-out tracking', 'Outside-in tracking', 'Gyroscope only', 'Hand tracking'],
            correct: 1
        },
        {
            type: 'multiple',
            question: 'Which PlayStation console was the best-selling of all time?',
            options: ['PlayStation 1', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4'],
            correct: 1
        }
    ];
    
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;
    
    function initQuiz() {
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
    
    function showQuestion(index) {
        const question = quizQuestions[index];
        const quizContent = document.getElementById('quizContent');
        
        let imageHtml = '';
        if (question.type === 'character' && question.image) {
            imageHtml = `<img src="${question.image}" alt="Character" class="character-image" onerror="this.style.display='none'">`;
        }
        
        const optionsHtml = question.options.map((option, i) => 
            `<div class="option" onclick="selectOption(${i})" data-index="${i}">${option}</div>`
        ).join('');
        
        quizContent.innerHTML = `
            <div class="question-card active">
                <div class="question-number">Question ${index + 1} of 15</div>
                ${imageHtml}
                <div class="question-text">${question.question}</div>
                <div class="options">
                    ${optionsHtml}
                </div>
                <div class="quiz-controls">
                    <button class="quiz-btn" id="nextBtn" onclick="nextQuestion()" disabled>
                        ${index === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                </div>
            </div>
        `;
        
        selectedAnswer = null;
    }
    
    function selectOption(index) {
        // Remove previous selection
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        
        // Add selection to clicked option
        document.querySelector(`[data-index="${index}"]`).classList.add('selected');
        
        selectedAnswer = index;
        document.getElementById('nextBtn').disabled = false;
    }
    
    function nextQuestion() {
        if (selectedAnswer === null) return;
        
        // Check if answer is correct
        if (selectedAnswer === quizQuestions[currentQuestionIndex].correct) {
            score++;
        }
        
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion(currentQuestionIndex);
            updateProgress();
        } else {
            showResults();
        }
    }
    
    function updateProgress() {
        document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
        const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        document.getElementById('progressFill').style.width = progressPercent + '%';
    }
    
    function showResults() {
        const percentage = Math.round((score / quizQuestions.length) * 100);
        const quizContent = document.getElementById('quizContent');
        const quizResults = document.getElementById('quizResults');
        
        quizContent.style.display = 'none';
        quizResults.style.display = 'block';
        
        document.getElementById('finalScore').innerHTML = `
            <span style="color: var(--ps-accent); font-size: 2rem;">${score}</span> out of ${quizQuestions.length} correct
            <br>
            <span style="color: var(--ps-gold);">${percentage}% Score</span>
        `;
        
        let message = '';
        let showSecret = false;
        
        if (percentage >= 80) {
            message = `
                <span style="color: var(--ps-gold);">🏆 EXCEPTIONAL PERFORMANCE! 🏆</span><br><br>
                You are a true PlayStation master! Your deep knowledge of PlayStation history, 
                characters, and games has earned you access to exclusive content.<br><br>
                <span style="color: var(--ps-accent);">Secret content unlocked!</span>
            `;
            showSecret = true;
        } else if (percentage >= 60) {
            message = `
                <span style="color: var(--ps-accent);">🎮 Great Job! 🎮</span><br><br>
                You have solid PlayStation knowledge! You know your way around the PlayStation universe, 
                but there's still more to discover. Try again to unlock the secret content!
            `;
        } else {
            message = `
                <span style="color: var(--ps-white);">📚 Keep Learning! 📚</span><br><br>
                PlayStation has a rich history and amazing characters! Spend some time exploring 
                PlayStation games and their stories, then come back to try again.
            `;
        }
        
        document.getElementById('resultsMessage').innerHTML = message;
        
        if (showSecret) {
            document.getElementById('secretBtn').style.display = 'inline-block';
        }
        
        // Add celebration effect for high scores
        if (percentage >= 80) {
            createCelebrationEffect();
        }
    }
    
    function createCelebrationEffect() {
        const symbols = ['▲', '■', '●', '✕'];
        const colors = ['#00ff00', '#ff69b4', '#ff0000', '#0080ff'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const symbol = document.createElement('div');
                symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                symbol.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    top: -20px;
                    color: ${colors[Math.floor(Math.random() * colors.length)]};
                    font-size: ${Math.random() * 30 + 20}px;
                    font-weight: bold;
                    text-shadow: 0 0 10px currentColor;
                    animation: celebrationFall ${Math.random() * 3 + 2}s linear forwards;
                    z-index: 10000;
                    pointer-events: none;
                `;
                
                document.body.appendChild(symbol);
                
                setTimeout(() => {
                    if (symbol.parentNode) {
                        symbol.remove();
                    }
                }, 5000);
            }, i * 100);
        }
    }
    
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        
        document.getElementById('quizContent').style.display = 'block';
        document.getElementById('quizResults').style.display = 'none';
        
        initQuiz();
    }
    
    function goToSecret() {
        // Show loading message
        const loading = document.createElement('div');
        loading.className = 'quiz-activation';
        loading.innerHTML = `
            <div class="activation-content">
                <div class="activation-icon">🔓</div>
                <div class="activation-title">Accessing Secret Content...</div>
                <div class="activation-text">Preparing exclusive GTA VI information...</div>
            </div>
        `;
        
        document.body.appendChild(loading);
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'gta-vi-secret.html';
        }, 2000);
    }
    
    // Global functions
    window.selectOption = selectOption;
    window.nextQuestion = nextQuestion;
    window.restartQuiz = restartQuiz;
    window.goToSecret = goToSecret;
    
    // Add celebration animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrationFall {
            0% {
                transform: translateY(-20px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize quiz
    initQuiz();
});