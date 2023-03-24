
let letter_graphs = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
    "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6",
    "7", "8", "9","!","?",".","&","#","%","@","+","="
];

let digraphs = [
    "ch", "ph","ing","gh","sh","sju"
];
//bebebese
let nosound = "res/audio/bebebese_slow.wav";
let space = "res/audio/bebebese_slow.wav";


let playbackSpeedMin = 2.5;
let playbackSpeedMax = 3.0;
let playbackSpeed = null;
let sentence = '';


function onSpeakButtonClick() {
    playbackSpeed = Math.random() * (playbackSpeedMax-playbackSpeedMin) + playbackSpeedMin;
    sentence = document.getElementById("txtPhrase").value;
    sentence = buildSentence(sentence);
    speakSentence();
    
}

function speakSentence() {
    speakNextCharacter();
}

function speakNextCharacter() {
    if (sentence.length == 0) return;

    var character = sentence[0];
    sentence = sentence.substring(1, sentence.length);

    var characterFile = getCharacterAudioFile(character);
    var player = new Audio();
    player.src = characterFile;
    player.mozPreservesPitch = false;
    player.playbackRate = playbackSpeed;
    player.play();
    setTimeout(speakNextCharacter, 1300);
}

function getCharacterAudioFile(character) {
    if (character.match(/[a-z]/i)) {
        return "res/audio/" + character + ".wav";
    } else if (character == " ") {
        return space;
    } else {
        return nosound;
    }
}

function buildSentence(sentence) {
    sentence = sentence.toLowerCase();
    sentence = replaceParentheses(sentence);
    sentence = removeSpaces(sentence);
    return sentence
}



function replaceParentheses(sentence) {
    while (sentence.includes("(") || sentence.includes(")")) {
        var start = sentence.indexOf("(");
        var end = sentence.indexOf(")");
        sentence = sentence.substring(0, start) + 
            "*".repeat(end-start-1) + 
            sentence.substring(end + 1, sentence.length);
    }

    return sentence;
}

function removeSpaces(sentence) {
    sentence = sentence.replace(" ", "");
    return sentence;
}

