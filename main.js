{
const baseWords = ["outlook", "The Last of Us", "Gentleman Jack", "Diesel Only The Brave", " Petrol Industriesc", "Frywolne Zakonnice", "Imperialistyczne Frankfurterki"]

function randomWord(){
    const randomNumber = Math.floor(Math.random() * (baseWords.length));
    console.log(randomNumber);
    let currentlyWord = baseWords[randomNumber];
    currentlyWord = currentlyWord.toUpperCase();
    return currentlyWord;
}
let currentlyWord = randomWord();



function arrayToString(array){
    let string = "";
    for (let i = 0; i < array.length; i++) {
        string += array[i];
    }
    return string;
}

let currentlyWordArray = [];
function wordToArray(){
    const length = currentlyWord.length;
    for (let i = 0; i < length; i++) {
        let word = currentlyWord.charAt(i)
        currentlyWordArray.push(word);
    }
}

let hidenWord = [];
function makeHidenWord(){
    const length = currentlyWord.length;
    for (let i = 0; i < length; i++) {
        if(currentlyWordArray[i] == " "){
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
    const word = arrayToString(hidenWord);
    document.getElementById("word").innerHTML = word;
}

function wordStatus(number, status){
const idLetter = `number${number}`
const letter = document.getElementById(idLetter);
letter.classList.add(`${status}Word`);
}

function checkStatusGame(){
    if (stateAnimation >= timeAnimation.length){
        setTimeout(function(){
            alert("przejabłeś xddbeka z cb");
            newGame();
        },100);
        
        
        
    }
    const wordOne = arrayToString(hidenWord);
    const wordTwo = arrayToString(currentlyWordArray);
    if(wordOne == wordTwo){
        alert("juchu wygrałeś")
        newGame();
    }
}

const video = document.getElementById("video");
const timeAnimation = [8000,2000,1000,500,500];
let stateAnimation = 0;
let animationProgres = false;
function checkAndRunAnimation(flag){
    if(!flag){
        animationProgres = true;
        video.play();
        setTimeout(function(){
            video.pause();
            animationProgres = false;
        },timeAnimation[stateAnimation]);
        console.log('oj byczku przyps',timeAnimation[stateAnimation]);
        stateAnimation++;
        
    }
}

function checkLetter(number){
    if (!animationProgres) {
        let flag = false
        for (let i = 0; i < currentlyWordArray.length; i++) {
            if(currentlyWordArray[i] == lettersName[number]){
                console.log(i);
                hidenWord[i] = lettersName[number];
                flag = true
            }
        }
        checkAndRunAnimation(flag);
        wordStatus(number, flag);
        wordWrite();
        setTimeout(function(){checkStatusGame();},100);
    }
}

function resetVariables(){
    currentlyWordArray = [];
    hidenWord = [];
    stateAnimation = 0;
    video.currentTime = 0;
    video.pause();
}

function newGame(){
    resetVariables();
    randomWord();
    lettersMake();
    wordToArray();
    makeHidenWord();
    wordWrite();
}
window.onload = newGame;
}