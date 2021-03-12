

/* This is the script for the game */

"use strict";



/* --- mazes --- */


let container = document.querySelector("#screenBox");

/**
 * Diese Funktion lädt die layouts der einzelnen Labyrinthe mit AJAX
 * @param maze 
 */
function loadMaze(maze) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status != 200) return;
        let xml = xhr.responseText;
        container.innerHTML += xml;
    }
    xhr.open("GET", "snippets/" + maze + ".html");
    xhr.send();

    xhr.onloadend = function() {
        let targetClasses = document.querySelector("#target").classList;
        if (maze == "maze_01") {
            targetClasses.remove("inactive");
            targetClasses.add("position_01");
            $(function() {
                $("#cover").fadeOut();
            })
        } else if (maze == "maze_02") {
            targetClasses.remove("position_01");
            targetClasses.add("position_02");
        }
        targetPixels = getTargetPixels();
        pathPixels = getPathPixels();
        // saveAsJSON();
    }
}



/* --- path --- */

/**
 * Diese Funktion erstellt ein Array aus den Elementen, die den begehbaren Pfad beschreiben
 * @returns pathElements
 */
function getPath() {
    let path = document.querySelectorAll(".maze div.path");
    let pathElements = [];

    for (let i = 0; i < path.length; i++) {
        let pathStyle = getComputedStyle(document.getElementById(path[i].id));
        pathElements[i] = {
            id:     path[i].id,
            top:    pathStyle.top,
            left:   pathStyle.left,
            width:  pathStyle.width,
            height: pathStyle.height
        }
    }
    return pathElements;
}

/**
 * Diese Funktion erstellt ein Array aus den Positionen, auf denen der User sich durch
 * die Labyrinthe bewegen kann und gibt dieses zurück.
 * @returns pathPixels
 */
function getPathPixels() {
    let path = getPath();
    let pathPixels = [];

    for (let i = 0; i < path.length; i++) {

        let pathTop = parseInt(path[i].top);
        let pathLeft = parseInt(path[i].left);
        let pathRight = pathLeft + parseInt(path[i].width);
        let pathBottom = pathTop + parseInt(path[i].height);
    
        for (let j = pathLeft; j < pathRight; j++) {
            for (let k = pathTop; k < pathBottom; k++) {
                pathPixels.push({
                    top:    k,
                    left:   j
                });
            }
        }
    }
    return pathPixels;
}



/* --- target --- */

/**
 * Diese Funktion gibt das Zielelement zurück
 * @returns target
 */
function getTarget() {
    let targetSelect = document.querySelector("#target");
    let targetStyle = getComputedStyle(targetSelect);
    let targetLeft = targetStyle.left;
    let targetTop = targetStyle.top;

    let target = {
        id:     "target",
        top:    targetTop,
        left:   targetLeft,
        width:  48,
        height: 48
    };
    return target;
}

/**
 * Diese Funktion gibt die Positionen der Pixel, aus denen das Zielelement besteht, zurück
 * @returns targetPixels
 */
function getTargetPixels() {
    let target = getTarget();
    let targetTop = parseInt(target.top);
    let targetLeft = parseInt(target.left);
    let targetRight = targetLeft + 48;
    let targetBottom = targetTop + 48;
    let targetPixels = [];

    for (let i = targetLeft; i < targetRight; i++) {
        for (let j = targetTop; j < targetBottom; j++) {
            targetPixels.push({
                top:    j,
                left:   i
            });
        }
    }
    return targetPixels;
}



/* --- collision (walls or target) --- */


let pathPixels = [];
let targetPixels = getTargetPixels();
let wallHits = 0;

/**
 * Diese Funktion überprüft, ob der User sich auf dem Pfad befindet
 * @param player
 */
function checkOnPath(player, prevPos) {
    let coordinates = player.top + "/" + player.left;
    let isOnPath = false;
    for (let i = 0; i < pathPixels.length; i++) {
        let pathCoordinates = pathPixels[i].top + "/" + pathPixels[i].left;
        if (coordinates == pathCoordinates) {
            isOnPath = true;
        }
    }
    if (!isOnPath) hitWall(player, prevPos);
    triggerTrap(player);
    reachTarget(player);
}

/**
 * Diese Funktion überprüft, ob der User das Ziel erreicht hat.
 * @param player 
 */
function reachTarget(player) {
    let coordinates = player.top + "/" + player.left;
    for(let i = 0; i < targetPixels.length; i++) {
        let targetCoordinates = targetPixels[i].top + "/" + targetPixels[i].left;
        if (coordinates == targetCoordinates) {
            setDefault();
            let maze = container.querySelector(".maze");
            if (maze != null) {
                switch(maze.getAttribute("id")) {
                    case "maze_01":
                        container.removeChild(container.querySelector(".maze"));
                        loadMaze("maze_02");
                        break;
                    case "maze_02":
                        stopTimer();
                        document.querySelector("#buttonStart").disabled = false;
                        container.removeChild(container.querySelector(".maze"));
                        break;
                }
            }
        }
    }
}

/**
 * Diese Funktion zählt die Menge an Berührungen mit der Wand
 */
function hitWall(player, prevPos) {
    let div = document.querySelectorAll("body div.playground");
    if (div.length == 1) {
        wallHits = 1;
    } else {
        wallHits++;
    }

    document.querySelector(".second p:last-of-type").textContent = "wall hits: " + wallHits;
    sessionStorage.setItem("wallHits", wallHits);
    if (wallHits < 15) {
        setDefault();
    } else {
        setBack(prevPos);
    }
}

/**
 * Diese Funktion aktiviert die Fallen des Labyrinths
 * @param player 
 */
function triggerTrap(player) {
    try{
        let maze = document.querySelector(".maze").getAttribute("id");
        if (maze == "maze_01") {
            if (player.top == 5 && player.left == 309) {
                let trapClasses = document.querySelector("#trap02").classList;
                trapClasses.remove("inactive");
            } else if (player.top == 33 && player.left == 277) {
                let trapClasses = document.querySelector("#trap03").classList;
                let second = document.querySelector("#trap06").classList;
                trapClasses.remove("inactive");
                second.add("inactive");
            } else if (player.top == 237 && player.left == 201) {
                let trapClasses = document.querySelector("#trap04").classList;
                trapClasses.remove("inactive");
            }
        } else if (maze == "maze_02") {
            if (player.top == 33 && player.left == 217) {
                let trapClasses = document.querySelector("#trap01").classList;
                trapClasses.remove("inactive");
            } else if (player.top == 277 && player.left == 357) {
                let trapClasses = document.querySelector("#trap05").classList;
                trapClasses.remove("inactive");
            } else if (player.top == 117 && player.left == 273) {
                let trapClasses = document.querySelector("#wall111").classList;
                trapClasses.add("inactive");
            }
        }
    } catch {}
}

/**
 * Diese Funktion erstellt einen DOM-Teilbaum, der zur Anzeige der Statistiken dient
 */
function createStatsDisplay() {

    // create container for current game stats
    let body = document.querySelector("body");
    let div = document.createElement("div");
    let pOne = document.createElement("p");
    let pTwo = document.createElement("p");
    div.className = "playground second";
    pOne.className = "time";
    pTwo.className = "wallHits";
    div.appendChild(pOne);
    div.appendChild(pTwo);

    pOne.textContent = "time: ";
    pTwo.textContent = "wall hits: ";


    // create Table for High Scores
    let div2 = document.createElement("div");
    let tableInfo = document.createElement("p");
    let table = document.createElement("table");
    let tableHeadRow = document.createElement("tr");
    let tableHeadUser = document.createElement("th");
    let tableHeadTime = document.createElement("th");
    let tableHeadHits = document.createElement("th");

    div2.className = "playground third";
    tableHeadUser.textContent = "Username";
    tableHeadTime.textContent = "Time";
    tableHeadHits.textContent = "Wall hits";
    tableHeadTime.className = "tableTime";
    tableInfo.innerHTML = "HIGH SCORES - <span class=\"small\" style=\"margin-top: 2px;"
        + "margin-bottom: 25px;\">Click here to display the time in Minutes.</span>";

    tableHeadRow.appendChild(tableHeadUser);
    tableHeadRow.appendChild(tableHeadTime);
    tableHeadRow.appendChild(tableHeadHits);
    table.appendChild(tableHeadRow);
    div2.appendChild(tableInfo);
    div2.appendChild(table);

    body.insertBefore(div, body.querySelector("script"));
    body.insertBefore(div2, body.querySelector("script"));
}

/**
 * Diese Funktion lädt die HighScores aus dem Storage und zeigt sie an.
 * Werden keine Einträge gefunden, werden welche geschrieben.
 */
function loadHighScore() {
    try {
        let highScore01 = localStorage.getItem("mega_maze_highscore_01");
        let highScore02 = localStorage.getItem("mega_maze_highscore_02");
        let highScore03 = localStorage.getItem("mega_maze_highscore_03");
        let highScore04 = localStorage.getItem("mega_maze_highscore_04");
        let highScore05 = localStorage.getItem("mega_maze_highscore_05");
        let highScore06 = localStorage.getItem("mega_maze_highscore_06");
        let highScore07 = localStorage.getItem("mega_maze_highscore_07");
        let highScore08 = localStorage.getItem("mega_maze_highscore_08");
        let highScore09 = localStorage.getItem("mega_maze_highscore_09");
        let highScore10 = localStorage.getItem("mega_maze_highscore_10");
        let highScores = [highScore01, highScore02, highScore03, highScore04, highScore05, highScore06, highScore07, highScore08, highScore09, highScore10];
    
        for (let i = 0; i < highScores.length; i++) {
            let indexTime = highScores[i].indexOf(", time=");
            let indexHits = highScores[i].indexOf(", hits=");
            let name = highScores[i].slice(9, indexTime);
            let time = highScores[i].slice(indexTime + 7, highScores[i].indexOf(":") + 3);
            let hits = highScores[i].slice(indexHits + 7);
            let stats = [name, time, hits];
            updateHighScores(stats);
        }
    } catch {
        let first = ["kupu_kupu", "190:54", 6];
        let second = ["Мишка", "213:23", 7];
        let third = ["el_gato", "242:83", 9];
        let fourth = ["ثعبان", "257:12", 10];
        let fifth = ["Igel", "309:35", 10];
        let sixth = ["loScoiattolo", "321:69", 11];
        let seventh = ["mouse", "346:72", 12];
        let eigth = ["kelinci", "361:26", 13];
        let ninth = ["mehr schweinchen", "370:01", 13];
        let tenth = ["tikus", "393:20", 14];
        updateHighScores(first);
        updateHighScores(second);
        updateHighScores(third);
        updateHighScores(fourth);
        updateHighScores(fifth);
        updateHighScores(sixth);
        updateHighScores(seventh);
        updateHighScores(eigth);
        updateHighScores(ninth);
        updateHighScores(tenth);
    }
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


/* --- initialisation --- */


function init() {
    createStatsDisplay();
    loadHighScore();
    saveInStorage();
    document.querySelector(".playground.third").onclick = function() {
        let query = document.querySelectorAll("td.hiscoreTime");
        for (let i = 0; i < query.length; i++) {
            let time = query[i].textContent;
            let index = time.indexOf(":");
            let secs = time.slice(0, index);
            let mils = time.slice(index + 1);
            let niceTime = getNiceTime(secs, mils);

            if (query[i].querySelector(".timeInMinutes").textContent == "") {
                query[i].querySelector(".timeInMinutes").textContent = niceTime;
            } else {
                query[i].querySelector(".timeInMinutes").textContent = "";
            }
        }
    };
}

init();
