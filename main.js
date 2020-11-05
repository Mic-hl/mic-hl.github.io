// images

var imgs = document.getElementById("playground_imgs");
imgs.onclick = function () {
    var mySrc = imgs.getAttribute("src");
    if(mySrc === "https://www.thetreecenter.com/wp-content/uploads/pin-oak-2.jpg") {
        imgs.setAttribute("src", "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/a-tree-in-the-forest-vertical-lisa-wooten.jpg");
    } else if (mySrc === "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/a-tree-in-the-forest-vertical-lisa-wooten.jpg") {
        imgs.setAttribute("src", "https://www.freechristmaswallpapers.net/web/wallpapers/Snowy-Christmas-Tree_640x960.jpeg");
    } else {
        imgs.setAttribute("src", "https://www.thetreecenter.com/wp-content/uploads/pin-oak-2.jpg");
    }
}
