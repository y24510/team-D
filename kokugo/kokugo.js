document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ ページが読み込まれました！");

    displayQuiz(); // クイズを表示
    addRadioListeners(); // ラジオボタンのリスナーを追加

    document.getElementById("check-button").addEventListener("click", checkAnswers);
    //チェックボタンを押したときに107行目の関数発動
});
//問題文
const questions = [
    {
        question: "1. この漢字の読みは: 紡ぐ",
        options: ["ふさぐ", "つむぐ", "あおぐ", "つな"],
        correctAnswer: 1
    },
    {
        question: "2. この漢字の読みは: 師走",
        options: ["しそう", "しわす", "しそく", "しばしり"],
        correctAnswer: 1
    },
    {
        question: "3. この漢字の読みは: 牛車",
        options: ["ぎゅうしゃ", "うしぐるま", "ぎっしゃ", "うししゃ"],
        correctAnswer: 2
    },
    {
        question: "4. この漢字の読みは: 袴",
        options: ["えり", "ほこら", "そで", "はかま"],
        correctAnswer: 3
    
    },
    {
        question: "5. この漢字の読みは:専ら",
        options: ["もっぱら", "ほこら", "みずから", "せせら"],
        correctAnswer: 0
    },
    {
        question: "6. この漢字の読みは:檬果",
        options: ["れもん", "ぐれーぷふるーつ", "まんごー", "きうい"],
        correctAnswer: 2
    },
    {
        question: "7. この漢字の読みは:玉蜀黍",
        options: ["たまねぎ", "たまこんにゃく", "とうもろこし", "にんにく"],
        correctAnswer: 2
    },
    {
        question: "8. この漢字の読みは:柳葉魚",
        options: ["ししゃも", "とびうお", "いわし", "さんま"],
        correctAnswer: 0
    },
    {
        question: "9. この漢字の読みは:仙人掌",
        options: ["またたび", "さぼてん", "さるすべり", "さくらんぼ"],
        correctAnswer: 1
    },
    {
        question: "10. この漢字の読みは:含羞草",
        options: ["ざっそう", "まりふぁな", "ひやしんす", "おじぎそう"],
        correctAnswer: 3
    }
];

// クイズを表示する関数
function displayQuiz() {
    // クイズを表示するためのコンテナ要素を取得
    const quizContainer = document.getElementById("quiz-container");

    // クイズコンテナ内の内容を一旦クリア（新しい問題を表示する前に）
    quizContainer.innerHTML = "";

    // 問題の配列 `questions` をループ処理
    questions.forEach((question, index) => {
        // 各問題を囲む div 要素を作成
        const questionElement = document.createElement("div");
        questionElement.classList.add("question"); // クラス名 "question" を追加してスタイルを適用

        // 問題と選択肢の HTML を作成して、`questionElement` にセット
        questionElement.innerHTML = `
            <p>${question.question}</p> <!-- 問題の文言を表示 -->
            <ul class="answers"> <!-- 選択肢をリストで表示 -->
                ${question.options.map((option, i) => `
                    <li> <!-- 各選択肢をリストアイテムとして表示 -->
                        <input type="radio" id="q${index}_o${i}" name="question${index}" value="${i}"> <!-- ラジオボタン -->
                        <label for="q${index}_o${i}">${option}</label> <!-- ラジオボタンに対するラベル -->
                    </li>
                `).join('')} <!-- map() を使って選択肢の HTML を作成し、リストに結合 -->
            </ul>
        `;
        
        // 作成した `questionElement` をクイズコンテナに追加
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
            allAnswered = false;  // 未回答だよー
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
//--------------------------------------------------------------
const nowtime = document.querySelector(".Quiz_Timer")
function TimerQ(){
    let timer = 120; 
    Timer1 = setTimeout(() => { //120秒たったら終了処理
        nowtime.innerHTML = `時間切れ！！`;
        alert("時間切れです！再挑戦してね！");
        result.innerHTML = `<a href="./../Honpen/Honpen.html"><br>ホームに戻る</a>`;
    }, 120000);
    Timer2 = setInterval (() => { //1秒ごとにタイマー更新
        nowtime.innerHTML = `残り${timer}秒`;
        timer--;
        if(timer < 0){
            nowtime.innerHTML = `時間切れ！！`;
            alert("時間切れです！再挑戦してね！");
            result.innerHTML = `<a href="./../Honpen/Honpen.html"><br>ホームに戻る</a>`;
        }
    }, 1000);
    
}
window.onload = function timer(){
    TimerQ();
}