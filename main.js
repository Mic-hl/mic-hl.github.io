// images

var imgs = document.getElementById("playground_imgs");
imgs.onclick = function () {
    var mySrc = imgs.getAttribute("src");
    if(mySrc === "/images/tree01.jpg") {
        imgs.setAttribute("src", "/images/tree02.jpg");
    } else if (mySrc === "/images/tree02.jpg") {
        imgs.setAttribute("src", "/images/tree03.jpeg");
    } else {
        imgs.setAttribute("src", "/images/tree01.jpg");
    }
}
