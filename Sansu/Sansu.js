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
        question: "1.ある列車は1時間に60キロメートル進みます。3時間で何キロメートル進みますか？ ",
        options: ["５個", "６個", "７個", "８個"],
        correctAnswer: 2
    },
    {
        question: "2.クラスの人数が28人で、4つのグループに分けます。一グループ何人ですか？",
        options: ["６人", "７人", "８人", "９人"],
        correctAnswer: 1
    },
    {
        question: "3. 5枚のパンケーキがあり、2人の友達と分けると1人あたり何枚のパンケーキをもらえますか？",
        options: ["１枚", "１．５枚", "２枚", "２．５枚"],
        correctAnswer: 3
    },
    {
        question: "4.10匹の魚が池にいます。5匹が泳ぎ去った後、残りの魚は何匹ですか？ ",
        options: ["4匹", "５匹", "６匹", "７匹"],
        correctAnswer: 1
    },
    {
        question: "5.三角形の内角の和は何度ですか？",
        options: ["９０度", "２７０度", "１８０度", "３６０度"],
        correctAnswer: 2
    },
    {
        question: "6.一冊の本を15分ずつ毎日読んで、2週間後に何時間読みましたか？ ",
        options: ["３時間", "３時間３０分", "４時間", "４時間３０分"],
        correctAnswer: 2
    },
    {
        question: "7.10の2乗はどれですか？",
        options: ["50", "80", "90", "100"],
        correctAnswer: 3
    },
    {
        question: "8. 72 ÷ 9 × 2 = ?",
        options: ["14", "16", "18", "20"],
        correctAnswer: 1
    },
    {
        question: "9.20%の値引き後、元の値段が500円の商品はいくらになりますか？",
        options: ["１００円", "２００円", "４００円", "４５０円"],
        correctAnswer: 2
    },
    {
        question: "10. 2と3の最小公倍数はどれですか？",
        options: ["２", "３", "５", "６"],
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