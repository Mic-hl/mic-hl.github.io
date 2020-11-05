// images

var imgs = document.getElementById("playground_imgs");
imgs.onclick = function () {
    var mySrc = imgs.getAttribute("src");
    if(mySrc === "images/tree01.jpg") {
        imgs.setAttribute("src", "images/tree02.jpg");
    } else if (mySrc === "images/tree02.jpg") {
        imgs.setAttribute("src", "images/tree03.jpg");
    } else {
        imgs.setAttribute("src", "images/tree01.jpg");
    }
}


// Math.round(NUMBER);
// (NUMBER).toFixed(DECIMAL);


// converter
// temperature

function celsiusToFahrenheit() {
    var celsius = document.getElementById("celsius").value;
    var celsiusResult = document.getElementById("result_celsiusToFahrenheit");

    celsiusResult.innerHTML = ((celsius * 1.8000) + 32).toFixed(1) + " °F";
}

function fahrenheitToCelsius() {
    var fahrenheit = document.getElementById("fahrenheit").value;
    var fahrenheitResult = document.getElementById("result_fahrenheitToCelsius");

    fahrenheitResult.innerHTML = ((fahrenheit - 32) / 1.8000).toFixed(1) + " °C";
}


// converter
// weight_kglb

function kgToPounds() {
    var kg = document.getElementById("kg").value;
    var kgResult = document.getElementById("result_kgToPounds");

    kgResult.innerHTML = (kg * 2.2046).toFixed(1) + " lb";
}

function poundsToKg() {
    var pounds = document.getElementById("pounds").value;
    var poundsResult = document.getElementById("result_poundsToKg");

    poundsResult.innerHTML = (pounds / 2.2046).toFixed(1) + " kg";
}


// converter
// weight_goz

function gramsToOunces() {
    var grams = document.getElementById("grams").value;
    var gramsResult = document.getElementById("result_gramsToOunces");

    gramsResult.innerHTML = (grams * 0.035274).toFixed(1) + " oz";
}

function ouncesToGrams() {
    var ounces = document.getElementById("ounces").value;
    var ouncesResult = document.getElementById("result_ouncesToGrams");

    ouncesResult.innerHTML = (ounces / 0.035274).toFixed(1) + " g";
}


// converter
// length_kmm

function kmToMiles() {
    var km = document.getElementById("km").value;
    var kmResult = document.getElementById("result_kmToMiles");

    kmResult.innerHTML = (km * 0.62137).toFixed(1) + " mi";
}

function milesToKm() {
    var miles = document.getElementById("miles").value;
    var milesResult = document.getElementById("result_milesToKm");

    milesResult.innerHTML = (miles / 0.62137).toFixed(1) + " km";
}


// converter
// length_cmft

function centimetersToFeet() {
    var centimeters = document.getElementById("centimeters").value;
    var centimetersResult = document.getElementById("result_centimetersToFeet");

    centimetersResult.innerHTML = (centimeters * 0.032808).toFixed(1) + " ft";
}

function feetToCentimeters() {
    var feet = document.getElementById("feet").value;
    var feetResult = document.getElementById("result_feetToCentimeters");

    feetResult.innerHTML = (feet / 0.032808).toFixed(1) + " cm";
}
