document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ ページが読み込まれました！");

    displayQuiz(); // クイズを表示
    addRadioListeners(); // ラジオボタンのリスナーを追加

    document.getElementById("check-button").addEventListener("click", checkAnswers);
});

const questions = [
    {
        question: "1. 日本で一番高い山はどれですか？",
        options: ["富士山", "八ヶ岳", "木曽駒ケ岳", "阿曾山"],
        correctAnswer: 0
    },
    {
        question: "2. 日本の首都はどれですか？",
        options: ["大阪", "東京", "京都", "名古屋"],
        correctAnswer: 1
    },
    {
        question: "3. 大化の改新が始まったのは何年ですか？",
        options: ["645年", "794年", "1185年", "1603年"], 
        correctAnswer: 0
    },
    {
        question: "4.日本の主要な四つの島のうち、最も南に位置するのはどれですか？",
        options: ["北海道", "本州", "四国", "九州"], 
        correctAnswer: 3
    },
    {
        question: "5. 平安時代が始まった年はどれですか？",
        options: ["710年", "794年", "1185年", "1603年"], 
        correctAnswer: 1
    },
    {
        question: "6. 日本の国旗の正式な名前は何ですか？",
        options: ["日の丸", "櫻の旗", "鶴の旗", "富士の旗"], 
        correctAnswer: 0
    },
    {
        question: "7. 江戸時代の最初の将軍は誰ですか？",
        options: ["伊達政宗", "織田信長", "豊臣秀吉", "徳川家康"], 
        correctAnswer: 3
    },
    {
        question: "8. 日本で一番長い川はどれですか？",
        options: ["利根川", "信濃川", "木曾川", "釧路川"], 
        correctAnswer: 1
    },
    {
        question: "9. 明治維新が始まったのは何年ですか？",
        options: ["2020年", "1945年", "1868年", "1603年"], 
        correctAnswer: 2
    },
    {
        question: "10. 日本の国土を構成する主なプレートの数は？",
        options: ["２枚", "３枚", "４枚", "５枚"], 
        correctAnswer: 2
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
function navigateToAnotherPage(){
    window.location.href="../Honpen/Honpen.html";
}
