

/* This is the script for the stopwatch and highscores */

"use strict";


/* --- stopwatch --- */


let stopwatch;

let miliseconds = 0;
let seconds = 0;

let milisecondsOut = 0;
let secondsOut = 0;

/**
 * Diese Funktion startet den Timer
 */
function startTimer() {
    stopwatch = setInterval(timer, 10);
}

/**
 * Diese Funktion stoppt den Timer, lässt das cover wieder erscheinen und ruft die
 * updateHighscores-funktion auf
 */
function stopTimer() {
    $(function() {
        $("#cover").fadeIn();
    })
    let time = secondsOut + ":" + milisecondsOut;
    let userName;
    if (wallHits < 15) {
        userName = getUserName();
        if (userName.length > 16) {
            userName = userName.slice(0, 16);
        }
    }
    let userStats = [userName, time, wallHits];
    let targetClasses = document.querySelector("#target").classList;
    targetClasses.remove("position_02");
    targetClasses.add("inactive");

    clearInterval(stopwatch);
    reset();
    if (wallHits < 15) {
        updateHighScores(userStats);
        saveInStorage();
    }
}

/**
 * Diese Funktion zählt die sekunden hoch, sobald eine gewisse anzahl an milisekunden gezählt wurde
 */
function timer() {
    milisecondsOut = checkTime(miliseconds);
    secondsOut = checkTime(seconds);
    miliseconds = ++miliseconds

    if (miliseconds === 100) {
        miliseconds = 0;
        seconds = ++seconds;
    }

    document.querySelector(".time").textContent = "time: " + secondsOut + " : " + milisecondsOut;
}

/**
 * Diese Funktion wird zum überprüfen der Zeit, sowie zur verschönerung der anzeige (führende 0) verwendet
 * @param time 
 * @returns 
 */
function checkTime(time) {
    if (time < 10) {
      time = "0" + time;
    }
    return time;
}

/**
 * Diese Funktion setzt den Timer zurück
 */
function reset() {
    miliseconds = 0;
    seconds = 0;
}


/* --- highscores --- */


let allHighScores = [];

/*
    userStats[0] = userName
    userStats[1] = time
    userStats[2] = wallHits
*/

/**
 * Diese Funktion erstellt einen DOM-Teilbaum mit den Highscores
 * @param userStats 
 */
function updateHighScores(userStats) {
    let table = document.querySelector(".third table");
    let row = document.createElement("tr");
    let userNameCell = document.createElement("td");
    let timeCell = document.createElement("td");
    let timeSpan = document.createElement("span");
    let hitsCell = document.createElement("td");

    userNameCell.textContent = userStats[0];
    timeCell.textContent = userStats[1];
    hitsCell.textContent = userStats[2];

    userNameCell.className = "hiscoreName";
    timeCell.className = "hiscoreTime";
    timeSpan.className = "timeInMinutes";
    hitsCell.className = "hiscoreHits";
    row.className = "scoreBoard";

    timeCell.appendChild(timeSpan);

    row.appendChild(userNameCell);
    row.appendChild(timeCell);
    row.appendChild(hitsCell);

    let separator = userStats[1].indexOf(":");
    let userMili = parseInt(userStats[1].slice(separator + 1));
    let userSec = parseInt(userStats[1].slice(0, separator));

    getNiceTime(userSec, userMili);

    let userMiliseconds = (userSec * 100) + userMili;
    allHighScores.push(userMiliseconds);

    allHighScores.sort(sortHighScores);
    for (let i = 0; i < allHighScores.length; i++) {
        if (userMiliseconds == allHighScores[i]) {
            switch (i) {
                case 0:
                    table.insertBefore(row, table.querySelector("tr").nextSibling);
                    if (allHighScores.length > 10) table.removeChild(table.lastElementChild);
                    break;
                case 1:
                    table.insertBefore(row, table.querySelector("tr").nextSibling.nextSibling);
                    if (allHighScores.length > 10) table.removeChild(table.lastElementChild);
                    break;
                case 2:
                    table.insertBefore(row, table.querySelector("tr").nextSibling.nextSibling.nextSibling);
                    if (allHighScores.length > 10) table.removeChild(table.lastElementChild);
                    break;
                case 3:
                    table.insertBefore(row, table.querySelector("tr").nextSibling.nextSibling.nextSibling.nextSibling);
                    if (allHighScores.length > 10) table.removeChild(table.lastElementChild);
                    break;
                case 4:
                    table.insertBefore(row, table.querySelector("tr").nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
                    if (allHighScores.length > 10) table.removeChild(table.lastElementChild);
                    break;
                case 5:
                    table.insertBefore(row, table.querySelector("tr").nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
                    if (allHighScores.length > 10) table.removeChild(table.lastElementChild);
                    break;
                case 6:
                    table.insertBefore(row, table.querySelector("tr").nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
                    if (allHighScores.length > 10) table.removeChild(table.lastElementChild);
                    break;
                case 7:
                    table.insertBefore(row, table.querySelector("tr").nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
                    if (allHighScores.length > 10) table.removeChild(table.lastElementChild);
                    break;
                case 8:
                    table.insertBefore(row, table.querySelector("tr").nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
                    if (allHighScores.length > 10) table.removeChild(table.lastElementChild);
                    break;
                case 9:
                    if (allHighScores.length > 10) table.removeChild(table.lastElementChild);
                    table.appendChild(row);
                default:
                    break;
            }
        }
    }
}

/**
 * Diese Funktion konvertiert die Zeit, die in Sekunden gemessen wurde, in Minuten.
 * @param userSec 
 * @param userMili 
 * @returns 
 */
function getNiceTime(userSec, userMili) {
    let wholeMinutes = parseInt(userSec / 60);
    let rest = userSec - (wholeMinutes * 60);
    if (rest < 10) {
        rest = "0" + rest;
    }
    let time = wholeMinutes + ":" + rest + ":" + userMili;
    
    return time;
}

/**
 * Diese Funktion konvertiert die Zeit wieder in sekunden
 * @param time 
 */
function getSecTime(time) {
    let minutes = parseInt(time.slice(0, time.indexOf(":")));
    let seconds = parseInt(time.slice(time.indexOf(":") + 1, time.lastIndexOf(":")));
    let milis = parseInt(time.slice(time.lastIndexOf(":") + 1));
    seconds += minutes * 60;
}

/**
 * Diese Funktion wird zum sortieren der Highscores verwendet
 * @param a 
 * @param b 
 * @returns 
 */
function sortHighScores(a, b) {
    if (a > b) {
      return 1;
    } else if (b > a) {
      return -1;
    } else {
      return 0;
    }
}

/**
 * Diese Funktion wird verwendet, um den absoluten Highscore in den localstorage zu speichern
 * @param userStats 
 */
function saveInStorage() {
    let highScores = document.querySelectorAll(".scoreBoard");
    for (let i = 0; i < highScores.length; i++) {
        let name = highScores[i].querySelector(".hiscoreName").textContent;
        let time = highScores[i].querySelector(".hiscoreTime").textContent;
        let hits = highScores[i].querySelector(".hiscoreHits").textContent;

        let stats = [name, time, hits];
        let writeInStorage = "";

        switch (i) {
            case 0:
                writeInStorage = "username=" + stats[0] + ", time=" + stats[1] + ", hits=" + stats[2];
                localStorage.setItem("maze_master_highscore_01", writeInStorage);
                break;
            case 1:
                writeInStorage = "username=" + stats[0] + ", time=" + stats[1] + ", hits=" + stats[2];
                localStorage.setItem("maze_master_highscore_02", writeInStorage);
                break;
            case 2:
                writeInStorage = "username=" + stats[0] + ", time=" + stats[1] + ", hits=" + stats[2];
                localStorage.setItem("maze_master_highscore_03", writeInStorage);
                break;
            case 3:
                writeInStorage = "username=" + stats[0] + ", time=" + stats[1] + ", hits=" + stats[2];
                localStorage.setItem("maze_master_highscore_04", writeInStorage);
                break;
            case 4:
                writeInStorage = "username=" + stats[0] + ", time=" + stats[1] + ", hits=" + stats[2];
                localStorage.setItem("maze_master_highscore_05", writeInStorage);
                break;
            case 5:
                writeInStorage = "username=" + stats[0] + ", time=" + stats[1] + ", hits=" + stats[2];
                localStorage.setItem("maze_master_highscore_06", writeInStorage);
                break;
            case 6:
                writeInStorage = "username=" + stats[0] + ", time=" + stats[1] + ", hits=" + stats[2];
                localStorage.setItem("maze_master_highscore_07", writeInStorage);
                break;
            case 7:
                writeInStorage = "username=" + stats[0] + ", time=" + stats[1] + ", hits=" + stats[2];
                localStorage.setItem("maze_master_highscore_08", writeInStorage);
                break;
            case 8:
                writeInStorage = "username=" + stats[0] + ", time=" + stats[1] + ", hits=" + stats[2];
                localStorage.setItem("maze_master_highscore_09", writeInStorage);
                break;
            case 9:
                writeInStorage = "username=" + stats[0] + ", time=" + stats[1] + ", hits=" + stats[2];
                localStorage.setItem("maze_master_highscore_10", writeInStorage);
                break;
            default:
                break;
        }
    }
}

/**
 * Diese Funktion fragt den User nach seinem Namen, um diesen dann in den Highscores zu verwenden
 * @returns userName
 */
function getUserName() {
    let userName = prompt("Your username:\n(needed for highscore list)");

    if (userName == undefined) userName = "---";

    return userName;
}