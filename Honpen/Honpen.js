const GoKok = document.querySelector(".swi_Japa")
const GoSan = document.querySelector(".swi_Math")
const GoEng = document.querySelector(".swi_Eng")
const GoSci = document.querySelector(".swi_Sci")
const GoSya = document.querySelector(".swi_Sya")
const Goret = document.querySelector(".swi_Ret")

GoKok.addEventListener('click',function(){
    window.location.href = './../kokugo/kokukgo.html';
},false);

GoSan.addEventListener('click',function(){
    window.location.href = './../Sansu/Sansu.html';
},false);

GoEng.addEventListener('click',function(){
    window.location.href = './../Eng/eng.html';
},false);

GoSci.addEventListener('click',function(){
    window.location.href = './../rikamondai/rika.html';
},false);

GoSya.addEventListener('click',function(){
    window.location.href = './../syakai/syakai.html';
},false);

Goret.addEventListener('click',function(){
    window.location.href = './../Start/start.html';
},false);