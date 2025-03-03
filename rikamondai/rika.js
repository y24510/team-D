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
        question: "1. 太陽の光が地球に届く時間はおおよそ何分間か？",
        options: ["5分", "8分", "12分", "15分"],
        correctAnswer: 1
    },
    {
        question: "2. 水が沸騰(ふっとう)する温度は何度か？",
        options: ["50度", "100度", "150度", "200度"],
        correctAnswer: 1
    },
    {
        question: "3. 人間の体に必要な栄養素のうち、主にエネルギー源となるのはどれか？",
        options: ["ビタミン", "脂質", "炭水化物", "ミネラル"],
        correctAnswer: 2
    },
    {
        question: "4. 植物が光合成を行うために必要なものは何か？",
        options: ["酸素", "水", "二酸化炭素", "肥料"],
        correctAnswer: 2
    },
    {
        question: "5. 水の三態とは何か？",
        options: ["固体、液体、気体", "水、氷、蒸気", "氷、蒸気、液体", "水、空気、氷"],
        correctAnswer: 0
    },
    {
        question: "6. 地球の内部で最も高温の場所はどこか？",
        options: ["地殻", "マントル", "外核", "内核"],
        correctAnswer: 3
    },
    {
        question: "7. 鳥が飛ぶために重要な器官はどれか？",
        options: ["足", "羽", "嘴(くちばし)", "爪"],
        correctAnswer: 1
    },
    {
        question: "8. 水の状態変化で、液体が気体になる現象を何と言うか？",
        options: ["凝固", "蒸発", "融解(ゆうかい)", "凝縮(ぎょうしゅく)"],
        correctAnswer: 1
    },
    {
        question: "9. 地球を構成する層で、最も厚い層はどれか？",
        options: ["地殻", "マントル", "外核", "内核"],
        correctAnswer: 1
    },
    {
        question: "10. 風が吹く原因は何か？",
        options: ["大気の圧力の違い", "太陽の光", "地球の自転", "水蒸気の量"],
        correctAnswer: 0
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