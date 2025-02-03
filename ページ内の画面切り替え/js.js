//let temp;
const Hutae_No_Kiwami = document.querySelector(".sencerd");

window.onload = function(){
    //temp = Hutae_No_Kiwami.innerHTML;

    let Hutae_String = `
        <h1>同ページ内でのHTMLの変更</h1>
        <button class="next" onclick="clickKiwami();">
        \\\\変化//
        </button>
    `;

    Hutae_No_Kiwami.innerHTML = Hutae_String;
}

function clickKiwami(){
    //Hutae_No_Kiwami.innerHTML = temp;
    Hutae_No_Kiwami.innerHTML = `
        <h1>
            見えてますかー？
        </h1>
    `;
}