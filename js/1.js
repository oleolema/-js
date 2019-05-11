(function () {
    var index = 0;
    var imgSrc = ["img/1.jpg", "img/2.jpg", "img/3.jpg","img/4.jpg", "img/5.jpg", "img/6.jpg","img/7.jpg"];
    var imgbox = $('#main-img');
    var img1 = $('<div class="img1"></div>');
    var img2 = $('<div class="img2"></div>');
    var img3 = $('<div class="img3"></div>');

    imgbox.append(img1, img2, img3);

    img2.css({
        "background-image": `url(${imgSrc[index++]}`
    });

    setInterval(() => {
        var imga = $(".img1");
        var imgb = $(".img2");
        var imgc = $(".img3");
        imgc.css({
            "opacity": `1`,
            "background-image": `url(${imgSrc[ index++ % imgSrc.length]}`
        });
        imga.css({
            "opacity": `0`
        });
        imgb.attr("class", "img1");
        imgc.attr("class", "img2");
        imga.attr("class", "img3");
    }, 1500);
})();