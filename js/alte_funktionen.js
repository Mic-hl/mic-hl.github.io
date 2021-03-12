"use strict";

/**
 * berechnet die äußeren Begrenzungen des player-objects
 */
function getPlayerPixels() {
    let player = getPlayer();
    let playerTop = player.top;
    let playerLeft = player.left;
    let playerRight = playerLeft + 20;
    let playerBottom = playerTop + 20;
    let playerPixels = [];

    for (let i = playerLeft; i < playerLeft + 1; i++) {
        for (let j = playerTop; j < playerBottom; j++) {
            playerPixels.push({
                top:j,
                left: i
            });
        }
    }

    for (let i = playerLeft; i < playerRight; i++) {
        for (let j = playerTop; j < playerTop + 1; j++) {
            playerPixels.push({
                top:j,
                left: i
            });
        }
    }

    for (let i = playerLeft; i < playerRight; i++) {
        for (let j = playerBottom - 1; j < playerBottom; j++) {
            playerPixels.push({
                top:j,
                left: i
            });
        }
    }

    for (let i = playerRight - 1; i < playerRight; i++) {
        for (let j = playerTop; j < playerBottom; j++) {
            playerPixels.push({
                top:j,
                left: i
            });
        }
    }
    return playerPixels;
}



/*
    My first approach to set the user back to the default position was to go over the walls
    when the user collides with any of the pixels which make up a wall he gets reseted to the
    default position

    For this approach I first needed to get an Object-array of the playerpixels
*/

/**
 * berechnet die obere Begrenzung des player-objects
 */
function getPlayerPixelsTop() {
    let player = getPlayer();
    let playerPixels = [];
    for (let i = player.left; i < player.left + 20; i++) {
        for (let j = player.top; j < player.top + 1; j++) {
            playerPixels.push({
                top:j,
                left: i
            });
        }
    }
    return playerPixels;
}

/**
 * berechnet die untere Begrenzung des player-objects
 */
function getPlayerPixelsBottom() {
    let player = getPlayer();
    let playerPixels = [];
    for (let i = player.left; i < player.left + 20; i++) {
        for (let j = player.top + 18; j < player.top + 20; j++) {
            playerPixels.push({
                top:j,
                left: i
            });
        }
    }
    return playerPixels;
}

/**
 * berechnet die linke Begrenzung des player-objects
 */
function getPlayerPixelsLeft() {
    let player = getPlayer();
    let playerPixels = [];
    for (let i = player.left; i < player.left + 1; i++) {
        for (let j = player.top; j < player.top + 20; j++) {
            playerPixels.push({
                top:j,
                left: i
            });
        }
    }
    return playerPixels;
}

/**
 * berechnet die rechte Begrenzung des player-objects
 */
function getPlayerPixelsRight() {
    let player = getPlayer();
    let playerPixels = [];
    for (let i = player.left + 19; i < player.left + 20; i++) {
        for (let j = player.top; j < player.top + 20; j++) {
            playerPixels.push({
                top:j,
                left: i
            });
        }
    }
    return playerPixels;
}

//
/* --- walls --- */
//

function getWalls() {
    let walls = document.querySelectorAll(".maze div.wall");
    let allWalls = [];

    for (let i = 0; i < walls.length; i++) {
        let wallStyle = getComputedStyle(document.getElementById(walls[i].id));
        allWalls[i] = {
            id:     walls[i].id,
            top:    wallStyle.top,
            left:   wallStyle.left,
            width:  wallStyle.width,
            height: wallStyle.height
        }
    }
    return allWalls;
}

function getWallPixels() {
    let walls = getWalls();
    let wallPixels = [];

    for (let i = 0; i < walls.length; i++) {

        let wallTop = parseInt(walls[i].top);
        let wallLeft = parseInt(walls[i].left);
        let wallRight = wallLeft + parseInt(walls[i].width);
        let wallBottom = wallTop + parseInt(walls[i].height);
    
        for (let j = wallLeft; j < wallRight; j++) {
            for (let k = wallTop; k < wallBottom; k++) {
                wallPixels.push({
                    top:    k,
                    left:   j
                });
            }
        }
    }
    return wallPixels;
}

function checkForCollision(playerPixels) {
    // quadranten
    for (let i = 0; i < playerPixels.length; i++) {
        for (let j = 0; j < wallPixels.length; j++) {
            if (playerPixels[i].top == wallPixels[j].top && playerPixels[i].left == wallPixels[j].left) {
                setDefault();
            }
        }
        for(let k = 0; k < targetPixels.length; k++) {
            if (playerPixels[i].top == targetPixels[k].top && playerPixels[i].left == targetPixels[k].left) {
                setDefault();
                let maze = container.querySelector(".maze");
                if (maze != null) {
                    switch(maze.getAttribute("id")) {
                        case "maze_01":
                            container.removeChild(container.querySelector(".maze"));
                            let target = getTarget();
                            // --- setTarget
                            loadMaze("maze_02");
                            break;
                        case "maze_02":
                            container.removeChild(container.querySelector(".maze"));
                            break;
                    }
                }
            }
        }
    }
}


/*
    Working with quadrants as a way of saving memory
*/
/* --- define quadrants --- */

function checkQuadrants(playerPixels) {
    let quadrant;
    for (let i = 0; i < playerPixels.length; i++) {
        if (playerPixels[i].top <= 150 && playerPixels[i].left <= 300) {
            quadrant = "Quadrant 1";
        } else if (playerPixels[i].top <= 150 && playerPixels[i].left > 300) {
            quadrant = "Quadrant 2";
        } else if (playerPixels[i].top > 150 && playerPixels[i].left <= 300) {
            quadrant = "Quadrant 3";
        } else if (playerPixels[i].top > 150 && playerPixels[i].left > 300) {
            quadrant = "Quadrant 4";
        }
    }
    return quadrant;
}







function loadPath() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status != 200) return;
        let jsonData;
        if(xhr.responseType == "json") {
            jsonData = xhr.response;
        } else {
            jsonData = JSON.parse(xhr.responseText);
        }
    }
    xhr.open("GET", "path.json");
    xhr.responseType = "json";
    xhr.send()
    
    xhr.onload = function() {
        console.log(xhr.response);
        if (typeof (Storage) == "undefined") {
            console.log("Dein Storage ist für mich leider nicht erreichbar. Für das Spiel benötigst du ihn aber.")
            console.log("Your storage is not accessible for me. Unfortunately it is necessary for the game.")
            return;
        } else {
            localStorage.setItem("path", xhr.response);
        }
    }
    console.log(localStorage.getItem("path"));
}




function saveInStorage(userStats) {
    let intoStorage = "username=" + userStats[0] + ", time=" + userStats[1] + ", hits=" + userStats[2];
    let inStorage = localStorage.getItem("maze_master_highscore");
    let userSecs = userStats[1].slice(0, 2);
    let userMils = userStats[1].slice(3);

    if (inStorage == null) {
        localStorage.setItem("maze_master_highscore", intoStorage);
    } else {
        let indexTime = inStorage.indexOf(", time=");
        let seconds = inStorage.slice(indexTime + 7, indexTime + 9);
        let milis = inStorage.slice(indexTime + 10, indexTime + 12);
        if (userSecs < seconds) {
            localStorage.setItem("maze_master_highscore", intoStorage);
        } else if (userSecs == seconds && userMils < milis) {
            localStorage.setItem("maze_master_highscore", intoStorage);
        }
    }
}



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
    if (allHighScores.length == 1) {
        table.appendChild(row);
    } else if (allHighScores.length === 2) {
        if (userMiliseconds == allHighScores[1]) {
            table.appendChild(row);
        } else {
            table.insertBefore(row, table.querySelector("tr").nextSibling);
        }
    } else {
        for (let i = 0; i < allHighScores.length; i++) {
            if (userMiliseconds == allHighScores[i]) {
                switch (i) {
                    case 0:
                        table.insertBefore(row, table.querySelector("tr").nextSibling);
                        if (allHighScores.length > 3) table.removeChild(table.lastElementChild);
                        break;
                    case 1:
                        table.insertBefore(row, table.querySelector("tr").nextSibling.nextSibling);
                        if (allHighScores.length > 3) table.removeChild(table.lastElementChild);
                        break;
                    case 2:
                        if (allHighScores.length > 3) table.removeChild(table.lastElementChild);
                        table.appendChild(row);
                        break;
                    default:
                        break;
                }
            }
        }
    }
    saveInStorage(userStats);
}



/* --- saving the path as JSON --- */

/**
 * Diese Funktion speichert die Positionen des Pfades als JSON
 */
 function saveAsJSON() {
    let path = getPathPixels();
    let jsonString = JSON.stringify(path);
    for (let i = 0; i < jsonString.length; i++) {
        
    }
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