document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ ページが読み込まれました！");

    displayQuiz(); // クイズを表示
    addRadioListeners(); // ラジオボタンのリスナーを追加

    document.getElementById("check-button").addEventListener("click", checkAnswers);
});

const questions = [
    {
        question: "1. この単語の意味は？ [twelve]",
        options: ["5", "8", "12", "20"],
        correctAnswer: 2
    },
    {
        question: "2. この単語の意味は？ [twenty]",
        options: ["5", "8", "12", "20"],
        correctAnswer: 3
    },
    {
        question: "3. この単語の意味は？ [minute]",
        options: ["秒", "分", "時間", "日"],
        correctAnswer: 1
    },
    {
        question: "4. この単語の意味は？ [time]",
        options: ["秒", "時間", "週", "年"],
        correctAnswer: 1
    },
    {
        question: "5. この単語の意味は？ [day]",
        options: ["分", "日", "月", "年"],
        correctAnswer: 1
    },
    {
        question: "6. この単語の意味は？ [Monday]",
        options: ["日曜", "月曜", "火曜", "水曜"],
        correctAnswer: 1
    },
    {
        question: "7. この単語の意味は？ [Tuesday]",
        options: ["火曜", "水曜", "木曜", "金曜"],
        correctAnswer: 0
    },
    {
        question: "8. この単語の意味は？ [Wednesday]",
        options: ["月曜", "水曜", "金曜", "日曜"],
        correctAnswer: 1
    },
    {
        question: "9. この単語の意味は？ [summer]",
        options: ["春", "夏", "秋", "冬"],
        correctAnswer: 1
    },
    {
        question: "10. この単語の意味は？ [winter]",
        options: ["春", "夏", "秋", "冬"],
        correctAnswer: 3
    }   
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
    let correctCount = 0;//間違えた数　初期値0
    let allAnswered = true;//全問といたか

    questions.forEach((question, index) => {
        // 選択されたラジオボタンを取得
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        // 選択肢のラベルを取得
        const answerList = document.querySelectorAll(`input[name="question${index}"] + label`);
    
        // もし選択肢が選ばれていなかった場合
        if (!selectedOption) {
            allAnswered = false;  // 未回答だよーだよー
            return;  
        }
    
        
        const selectedIndex = parseInt(selectedOption.value);
        
        // 各ラベルに対して、正解・不正解のクラスを設定
        answerList.forEach((label, i) => {
            label.classList.remove("correct", "incorrect"); // 以前のクラスを削除
    
            // 正解のラベルに "correct" クラスを追加
            if (i === question.correctAnswer) {
                label.classList.add("correct");
            }
            // 不正解のラベルに "incorrect" クラスを追加
            else if (i === selectedIndex) {
                label.classList.add("incorrect");
            }
        });
    
        // 正解カウント
        if (selectedIndex === question.correctAnswer) {
            correctCount++;
        }
    });
    
    // 未回答の問題があればアラートを表示
    if (!allAnswered) {
        alert("すべての問題に答えてください！");
        return;  // 未回答の問題があれば結果を表示しない
    }
    
    // 結果表示
    const resultElement = document.getElementById("result");
    const a=document.getElementById("a");
    result.innerHTML = `あなたの正解数は ${correctCount} / ${questions.length} です！
    <a href="./../Honpen/Honpen.html"><br>ホームに戻る</a>`;
    

   
    //正解数　問題数

    // 正しい場合緑色で表示
    if (correctCount === questions.length) {
        resultElement.style.color = "green";
    }
    // 間違っている場合赤色で表示
    else {
        resultElement.style.color = "red";
    }
}    
const nowtime = document.querySelector(".Quiz_Timer")
function TimerQ(){
    let timer = 120; 
    Timer1 = setTimeout(() => { //120秒たったら終了処理
        nowtime.innerHTML = `時間切れ！！`;
        result.innerHTML = `<a href="./../Honpen/Honpen.html"><br>ホームに戻る</a>`;
    }, 120000);
    Timer2 = setInterval (() => { //1秒ごとにタイマー更新
        nowtime.innerHTML = `残り${timer}秒`;
        timer--;
        if(timer < 0){
            nowtime.innerHTML = `時間切れ！！`;
            result.innerHTML = `<a href="./../Honpen/Honpen.html"><br>ホームに戻る</a>`;
        }
    }, 1000);
    
}
window.onload = function timer(){
    TimerQ();
}