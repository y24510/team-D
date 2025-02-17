const GoEng = document.querySelector(".swi_Eng")
const GoSci = document.querySelector(".swi_Sci")
const GoSya = document.querySelector(".swi_Sya")

GoEng.addEventListener('click',function(){
    window.location.href = './../Eng/eng.html';
},false);

GoSci.addEventListener('click',function(){
    window.location.href = './../rikamondai/rika.html';
},false);

GoSya.addEventListener('click',function(){
    window.location.href = './../syakai/syakai.html';
},false);