{
const baseWords = ["outlook", "The Last of Us", "Gentleman Jack", "Diesel Only The Brave",
                   "Petrol Industriesc", "Frywolne Zakonnice", "Imperialistyczne Frankfurterki",
                   "dwa oblicza życia", "horse", "drugs", "dynamite", "oświeceni", "lachowice",
                   "cmentarz", "szczęśliwa piwnica", "deszczówka", "alkohol to życie",
                   "energetyki to życie", "prawo jazdy", "goticzek to życie",
                   "wywaliło blendera", "brką pierdolnij", "karny cieplutki",
                   "zimny jak lód", "cymboł nad cymboły", "firewire", "sprzątaczka", 
                   "linkin park", "nowe niskie podatki", "hard sadistic", "black lives matter", 
                   "państwo daje pieniążki", "prostytuty", "myślę więc jestem", "czarna dziura", 
                   "rakieta wybuchła", "wygrałem zakład", "darmowy kebab", "degenerat", "cymboł", 
                   "wiwisekcja", "komunista", "bolszewik", "policyjna prowokacja", "cenzura", 
                   "strona na tabelkach", "japońskie badania", "a my wiemy", "i nie powiemy", 
                   "jeżeli ktoś to", "skojarzy to będę", "bardzo zdziwiony", "nie usuwaj proszę", 
                   "gumy orbit", "lokowanie produktu", "wolny rynek", "handel niewolnikami", 
                   "strzelanie w tył głowy", "pan Januszek kochany", "filozofia życia XD", 
                   "friedrich nietzsche", "katalizator z opla", "znowu silnik", 
                   "programy tylko z chmury", "biały proszek", "Ambiwalnetny stosunek do życia", 
                   "na zimnym mu daj", "bączki koło lidla"];
let currentlyWord = "";
function randomWord(){
    const randomNumber = Math.floor(Math.random() * (baseWords.length));
    currentlyWord = baseWords[randomNumber];
    currentlyWord = currentlyWord.toUpperCase();
}




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
const endContainer = document.getElementById("end-container");
function createEndScreen(state, word){
    let color = "red";
    let text = "PRZEGRAŁEŚ"
    if(state == 1){
        color = "green";
        text = "WYGRAŁEŚ"
    }
    const endScreen = `<div class="and-screen"><p><span class="end-text" style="color: ${color}">${text}</span><br><span class="end-word">HASŁO TO ${word}</span></p></div>`
    endContainer.innerHTML = endScreen;
}

const word = document.getElementById('word');
let gameEnd = false;
function checkStatusGame(){
    if (stateAnimation >= timeAnimation.length){
        gameEnd = true;
        stateAnimation = 0;
        setTimeout(function(){
            newGame();
        },5000);
        setTimeout(function(){
            createEndScreen(0, currentlyWord);
        },2000);
    }
    const actuallyWord = arrayToString(hidenWord);
    const chceckedWord = arrayToString(currentlyWordArray);
    if(actuallyWord == chceckedWord){
        animationProgres = true;
        setTimeout(function(){
            newGame();
        },5000);
        setTimeout(function(){
            createEndScreen(1, currentlyWord);
        },500);
    }
}

const video = document.getElementById("video");
const timeAnimation = [2000,2000,1000,2000,1000,1000,2000,1000,1400,500];
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
        stateAnimation++;
        
    }
}

function checkLetter(number){
    if (!animationProgres && !gameEnd) {
        let flag = false
        for (let i = 0; i < currentlyWordArray.length; i++) {
            if(currentlyWordArray[i] == lettersName[number]){
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
    word.classList.remove('winAnimation');
    animationProgres = false;
    gameEnd = false;
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