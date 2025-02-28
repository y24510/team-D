//ここに問題を保存
var Qlibrary = [
    ["Qsam","Asam","Xsam1","Xsam2","Xsam3"],
    ["一番おいしいお菓子は？","たけのこの里","きのこの山","木こりの切り株","全部おいしい"],
    ["チキンナゲットには何ソース？","マスタードソース","BBQソース","ケチャップ","何もつけない"]
];
/* ここは問題の生成テスト
let Kind_Q = Math.round(Math.random()*100) % Qlibrary.length;
console.log("Qの長さは"+Qlibrary.length);
console.log("問題は"+Kind_Q);
console.log("Qは"+Qlibrary[Kind_Q][0]); */

let now = 0; //進行度

function SugoiRandamu(R,x){ //コピペしたやつ　重複しない乱数を生成
    var arr = [1,2,3,4];
    var a = arr.length;

    //シャッフルアルゴリズム
    while (a) {
        var j = Math.floor( R * a );
        var t = arr[--a];
        arr[a] = arr[j];
        arr[j] = t;
    }
    //シャッフルされた配列の要素を順番に表示する
    //arr.forEach( function( value ) {console.log( value )} );
    return arr[x];
}
//制限時間のうんぬん
const nowtime = document.querySelector(".Quiz_Timer")
function TimerQ(){
    let timer = 14; 
    Timer1 = setTimeout(() => { //16秒たったら終了処理
        FinQ();
    }, 16000);
    Timer2 = setInterval (() => { //1秒ごとにタイマー更新
        nowtime.innerHTML = `残り${timer}秒`;
        timer--;
    }, 1000);
    
}

//使用する問題とかいろいろ
function  MakeQ(){
    UseQ = Math.round(Math.random() * 100 % (Qlibrary.length - 1)); //問題ライブラリから使うものをランダムに取得
    MainQ(UseQ);
}

const quesion = document.querySelector(".Quiz_Q");
const AB0 = document.querySelector(".Quiz_AnsBox_1");
const AB1 = document.querySelector(".Quiz_AnsBox_2");
const AB2 = document.querySelector(".Quiz_AnsBox_3");
const AB3 = document.querySelector(".Quiz_AnsBox_4");

//問題が終わるときの処理
function FinQ(){
    //タイマー類を全部止める
    clearInterval(Timer2); 
    clearTimeout(Timer1);
    //問題文を上書き
    quesion.innerHTML = `fin`;
}
function Set_Ans(i,j,Q){
    AB0.innerHTML = `foo`;
    let use = "AB" + i;
    console.log(use);
    use.innerHTML = `
        test
    `;
}
//問題実行中のやつ
function MainQ(Q){
    //QライブラリのQ番目の問題を　HTMLに
    quesion.innerHTML = `${Qlibrary[Q][0]}`;
    TimerQ();
    let R = Math.random();
    for(i=0;i<=3;i++){
        console.log(SugoiRandamu(R,i));
        Set_Ans(i,SugoiRandamu(R,i),Q);
    }

}
