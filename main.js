// images

var imgs = document.getElementById("playground_imgs");
imgs.onclick = function () {
    var mySrc = imgs.getAttribute("src");
    if(mySrc === "tree01.jpg") {
        imgs.setAttribute("src", "tree02.jpg");
    } else if (mySrc === "tree02.jpg") {
        imgs.setAttribute("src", "tree03.jpeg");
    } else {
        imgs.setAttribute("src", "tree01.jpg");
    }
}
