const baseWords = ["outlook", "The Last of Us", "Gentleman Jack", "Diesel Only The Brave", " Petrol Industriesc", "Frywolne Zakonnice", "Imperialistyczne Frankfurterki"]
let currentlyWord = "";

function randomWord(){
    const randomNumber = Math.floor(Math.random() * (baseWords.length));
    console.log(randomNumber);
    currentlyWord = baseWords[randomNumber];
    currentlyWord = currentlyWord.toUpperCase();

}




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
    const length = currentlyWord.length;
    for (let i = 0; i < length; i++) {
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

function checkStatusGame(){
    const wordOne = tableToString(hidenWord);
    const wordTwo =tableToString(currentlyWordTable);
    if(wordOne == wordTwo){
        alert("juchu wygrałeś")
        newGame();
    }
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
    setTimeout(function(){checkStatusGame();},10);
}

function resetVariables(){
    currentlyWordTable = [];
    hidenWord = [];
}

function newGame(){
    resetVariables();
    randomWord();
    lettersMake();
    wordToTable();
    makeHidenWord();
    wordWrite();
}
window.onload = newGame;









// const button = document.querySelector('.button');
// var video = document.getElementById("video");
// let stateAnimate = 0;
// const timeAnimation = [1000,2000,3000,500,500]
// button.addEventListener('click', ()=>{
// video.play();
// setTimeout(function(){video.pause();},timeAnimation[stateAnimate]);
// stateAnimate++;
// });