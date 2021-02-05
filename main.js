let currentlyWord = "Hejka tu lenka";
currentlyWord = currentlyWord.toUpperCase();

function tableToString(table){
    let string = "";
    for (let i = 0; i < table.length; i++) {
        string += table[i];
    }
    return string;
}

let currentlyWordTable = [];
function wordToTable(){
    const length = currentlyWord.length;
    for (let i = 0; i < length; i++) {
        let word = currentlyWord.charAt(i)
        currentlyWordTable.push(word);
    }
}

let hidenWord = [];
function makeHidenWord(){
    const lenght = currentlyWord.length;
    for (let i = 0; i < lenght; i++) {
        if(currentlyWordTable[i] == " "){
            hidenWord.push(" ");
        } else{
            hidenWord.push("_");
        }
        
    }
}

const lettersName = ["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","Q","R","S","Ś","T","U","V","W","X","Y","Z","Ź","Ż"];
function lettersMake(){
    let letters = "";
    for (let i = 0; i <= 34; i++) {
        const number = `number${i}`
        letters += `<div class="letter" id="${number}" onclick="checkLetter(${i})">${lettersName[i]}</div>`
        
    }
    document.getElementById("letters").innerHTML = letters;
}

function wordWrite(){
    const word = tableToString(hidenWord);
    document.getElementById("word").innerHTML = word;
}

function wordStatus(number, status){
const idLetter = `number${number}`
const letter = document.getElementById(idLetter);
letter.classList.add(`${status}Word`);
}


function checkLetter(number){
    for (let i = 0; i < currentlyWordTable.length; i++) {
        if(currentlyWordTable[i] == lettersName[number]){
            console.log(i);
            hidenWord[i] = lettersName[number];
            wordStatus(number, true);
        }
        if(currentlyWordTable[i] != lettersName[number]){
            wordStatus(number, false);
        }
    }
    wordWrite();
}

function start(){
    lettersMake();
    wordToTable();
    makeHidenWord();
    wordWrite();
}
window.onload = start;









// const button = document.querySelector('.button');
// var video = document.getElementById("video");
// let stateAnimate = 0;
// const timeAnimation = [1000,2000,3000,500,500]
// button.addEventListener('click', ()=>{
// video.play();
// setTimeout(function(){video.pause();},timeAnimation[stateAnimate]);
// stateAnimate++;
// });