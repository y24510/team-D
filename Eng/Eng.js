document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ ページが読み込まれました！");

    displayQuiz(); // クイズを表示
    addRadioListeners(); // ラジオボタンのリスナーを追加

    document.getElementById("check-button").addEventListener("click", checkAnswers);
});

const questions = [
    {
        question: "1. 太陽の光が地球に届く時間はおおよそ何分間か？",
        options: ["5分", "8分", "12分", "15分"],
        correctAnswer: 1
    },
    {
        question: "2. 水が沸騰(ふっとう)する温度は何度か？",
        options: ["50度", "100度", "150度", "200度"],
        correctAnswer: 1
    },
   
];

// クイズを表示する関数
function displayQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        questionElement.innerHTML = `
            <p>${question.question}</p>
            <ul class="answers">
                ${question.options.map((option, i) => `
                    <li>
                        <input type="radio" id="q${index}_o${i}" name="question${index}" value="${i}">
                        <label for="q${index}_o${i}">${option}</label>
                    </li>
                `).join('')}
            </ul>
        `;
        quizContainer.appendChild(questionElement);
    });
}

// ラジオボタンにリスナーを追加
function addRadioListeners() {
    // すべてのラジオボタンに対して
    const radioButtons = document.querySelectorAll('input[type="radio"]');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            // クリックしたラジオボタンの親要素である <ul> の <li> にスタイルを追加
            const labels = e.target.closest('ul').querySelectorAll('label');
            labels.forEach(label => {
                label.classList.remove('selected');
            });

            // クリックされたラベルに選択されたスタイルを追加
            e.target.nextElementSibling.classList.add('selected');
        });
    });
}

// 正解をチェックする関数
function checkAnswers() {
    let correctCount = 0;
    let allAnswered = true;

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const answerList = document.querySelectorAll(`input[name="question${index}"] + label`);

        if (!selectedOption) {
            allAnswered = false;
            return;
        }

        const selectedIndex = parseInt(selectedOption.value);
        answerList.forEach((label, i) => {
            label.classList.remove("correct", "incorrect");
            if (i === question.correctAnswer) {
                label.classList.add("correct");
            } else if (i === selectedIndex) {
                label.classList.add("incorrect");
            }
        });

        if (selectedIndex === question.correctAnswer) {
            correctCount++;
        }
    });

    if (!allAnswered) {
        alert("すべての問題に答えてください！");
        return;
    }

    const resultElement = document.getElementById("result");
    resultElement.textContent = `あなたの正解数は ${correctCount} / ${questions.length} です！`;

    if (correctCount === questions.length) {
        resultElement.style.color = "green";
    } else {
        resultElement.style.color = "red";
    }
}