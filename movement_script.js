

/* This is the script for the player */

"use strict";



/* --- movement --- */


/**
 * berechnet die X-Position des player-objects
 * @returns positionX
 */
function getLeft() {
    let playerStyle = getComputedStyle(document.querySelector("#playerBox"));
    let positionX = playerStyle.left;
    return parseInt(positionX);
}

/**
 * berechnet die Y-Position des player-objects
 * @returns positionY
 */
function getTop() {
    let playerStyle = getComputedStyle(document.querySelector("#playerBox"));
    let positionY = playerStyle.top;
    return parseInt(positionY);
}

/**
 * setzt die X-Position des player-objects
 * das player-object wird um den Parameter verschoben
 * valueX ist der Wert, um den das player-object in X-Richtung (horizontal) verschoben wird
 * @param valueX
 */
function setLeft(valueX) {
    let positionX = getLeft();
    let oldLeft = positionX;
    let prevPos = [];
    if (valueX > 0) {
        if (positionX >= 0 && positionX <= 6) {
        } else {
            positionX -= valueX;
            document.querySelector("#playerBox").style.left = positionX + "px";
            let player = getPlayer();
            prevPos = player.top + "/" + oldLeft;
            checkOnPath(player, prevPos);
        }
    } else {
        if (positionX <= 515 && positionX >= 510) {
        } else {
            positionX -= valueX;
            document.querySelector("#playerBox").style.left = positionX + "px";
            let player = getPlayer();
            prevPos = player.top + "/" + oldLeft;
            checkOnPath(player, prevPos);
        }
    }
}

/**
 * setzt die Y-Position des player-objects
 * das player-object wird um den Parameter verschoben
 * valueY ist der Wert, um den das player-object in Y-Richtung (vertikal) verschoben wird
 * @param valueY
 */
function setTop(valueY) {
    let positionY = getTop();
    let oldTop = positionY;
    let prevPos = [];
    if (valueY > 0) {
        if (positionY >= 0 && positionY <= 8) {
        } else {
            positionY -= valueY;
            document.querySelector("#playerBox").style.top = positionY + "px";
            let player = getPlayer();
            prevPos = oldTop + "/" + player.left;;
            checkOnPath(player, prevPos);
        }
    } else {
        if (positionY <= 278 && positionY >= 275) {
        } else {
            positionY -= valueY;
            document.querySelector("#playerBox").style.top = positionY + "px";
            let player = getPlayer();
            prevPos = oldTop + "/" + player.left;;
            checkOnPath(player, prevPos);
        }
    }
}

/**
 * setzt das player-object auf die Startposition
 */
function setDefault() {
    document.querySelector("#playerBox").style.top = "5px";
    document.querySelector("#playerBox").style.left = "5px";
}

/**
 * setzt das player-object auf die vorherige Position zurück
 * @param prevPos 
 */
function setBack(prevPos) {
    let separator = prevPos.indexOf("/");
    let top = prevPos.slice(0, separator);
    let left = prevPos.slice(separator + 1);
    document.querySelector("#playerBox").style.top = top + "px";
    document.querySelector("#playerBox").style.left = left + "px";
}



/* --- object recognition --- */


/**
 * gibt das player-object zurück
 * (top, left, width, height)
 * @returns player-object
 */
function getPlayer() {
    let playerLeft = getLeft();
    let playerTop = getTop();

    let player = {
        id:     "player",
        top:    playerTop,
        left:   playerLeft,
        width:  20,
        height: 20
    };
    return player;
}

/* --- keyboard assignments --- */


/**
 * Event-Listener für die Tasten
 */
document.body.addEventListener("keypress", function (event) {
    if (event.key === "w" || event.key === "W") {
        setTop(4);
    } else if (event.key === "s" || event.key === "S") {
        setTop(-4);
    } else if (event.key === "a" || event.key === "A") {
        setLeft(4);
    } else if (event.key === "d" || event.key === "D") {
        setLeft(-4);
    }
    // console.log(getPlayer().top + " / " + getPlayer().left);
});



/* --- button assignments --- */


/**
 * Event-Handler für die Buttons
 */
document.querySelector("#buttonUp").onclick = function() {
    setTop(4);
};

document.querySelector("#buttonDown").onclick = function() {
    setTop(-4);
};

document.querySelector("#buttonRight").onclick = function() {
    setLeft(-4);
};

document.querySelector("#buttonLeft").onclick = function() {
    setLeft(4);
};

document.querySelector("#buttonStart").onclick = function() {
    loadMaze("maze_01");
    startTimer();
    this.disabled = true;
    document.querySelector("#buttonUp").disabled = false;
    document.querySelector("#buttonDown").disabled = false;
    document.querySelector("#buttonLeft").disabled = false;
    document.querySelector("#buttonRight").disabled = false;
    document.querySelector("#buttonDown").focus();
};

document.querySelector("#buttonStop").onclick = function() {
    $(function() {
        $("#cover").fadeIn();
    })
    clearInterval(stopwatch);
    reset();
    document.querySelector("#buttonStart").disabled = false;
    setDefault();
    wallHits = 0;
    document.querySelector(".wallHits").textContent = "wall hits: ";
}