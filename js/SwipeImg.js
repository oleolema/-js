{
    /**
     * @param imgbox        图片容器的class
     * @param resources     图片资源
     * @param isColorImg    （可选，默认 false）是否为纯颜色
     */
    window.SwipeImg = function (imgbox, resources, isColorImg) {
        this.imgbox = $(imgbox); //图片外层
        this.resources = resources; //资源   (默认资源图片资源)
        this.swipeListener = function () {};
        this.imgCache = [];
        this.imgCacheCount = 5;

        this.index = 0;
        this.imgClass = ["swipe-img1" + randomStr(), "swipe-img2" + randomStr(), "swipe-img3" + randomStr()];
        this.transform = [{
            transform: "translate(-100%, 0px)"
        }, {
            transform: "translate(0px, 0px)"
        }, {
            transform: "translate(100%, 0px)"
        }, ];
        if (isColorImg) { //采用哪种方式加载资源
            this.setNextResource = function (img) {
                img.css("background-color", this.resources[this.index++ % this.resources.length]);
            };
        } else {
            this.setNextResource = function (img) {
                img.css("background-image", `url(${ this.resources[this.index++ % this.resources.length]})`);
            };
        }
        //初始化
        this.init();
    }

    function randomStr() {
        return (Math.random() + "").replace('.', '-');
    }

    function random(a) {
        return (Math.random() * (a + 1));
    }

    //图片容器的css
    SwipeImg.prototype.setImgBoxCss = function (css) {
        this.imgbox.css(css);
        return this;
    }

    //图片的css
    SwipeImg.prototype.setImgCss = function (css) {
        for (var i in this.imgClass) {
            this.imgbox.find($("." + this.imgClass[i])).css(css);
        }
        return this;
    }

    /**
     * 设置切换效果
     * @param transform 类似于this.transform的css动画效果
     */
    SwipeImg.prototype.setTransform = function (transform) {
        this.transform = transform;
        return this;
    }

    //设置切换图片的监听器
    SwipeImg.prototype.setSwipeListener = function (swipeListener) {
        this.swipeListener = swipeListener.bind(this);
        return this;
    }

    //设置预加载数里量
    SwipeImg.prototype.setImgCacheCount = function (imgCacheCount) {
        this.imgCacheCount = imgCacheCount;
        return this;
    }



    //加载切换特效
    SwipeImg.prototype.loadTransform = function () {
        var tempTransform = ["", "", ""];
        for (var j = 0; j < 3; j++) {
            for (var i in this.transform[j]) {
                tempTransform[j] += `${i}:${this.transform[j][i]};`;
            }
        }
        if (this.cssStyle) {
            this.cssStyle.remove();
        }
        this.cssStyle = $(`<style>
        .${this.imgClass[0]}{
            ${tempTransform[0]}
        }
        .${this.imgClass[1]}{
            ${tempTransform[1]}
        }
        .${this.imgClass[2]}{
            ${tempTransform[2]}
        }</style>`);
        $('head').append(this.cssStyle);
    }


    //调用show方法才会开始轮播
    SwipeImg.prototype.show = function (t, delay) {
        t = t || 2000;
        delay = delay || 0;
        //加载图片动画效果
        this.loadTransform();
        setTimeout(() => {
            setInterval(() => {
                this.swipeListener();
                //图片资源开启缓存
                if (this.index == 1 && !this.isColorImg) {
                    for (var i = 0; i < this.resources.length && i < this.imgCacheCount; i++) {
                        this.imgCache[i] = $(`<img src="${this.resources[i]}"  style="width:0px;height:0px;" >`);
                        this.imgbox.append(this.imgCache[i]);
                    }
                } else if (this.index + this.imgCacheCount < this.resources.length) {
                    this.imgCache[this.index % this.imgCacheCount].attr("src", this.resources[this.index + this.imgCacheCount]);
                }

                //显示这个class
                this.setNextClass(this.imgClass[0], this.imgClass[1], this.imgClass[2]);
            }, t);
        }, delay);
        return this;
    }



    SwipeImg.prototype.setNextClass = function (preClass, hidenClass, showClass) {
        var imga = $("." + preClass); //预备的图片
        var imgb = $("." + hidenClass); //需要隐藏的图片
        var imgc = $("." + showClass); //需要显示的图片
        imgc.css({
            "opacity": `1`,
        });
        //加载这张图片
        this.setNextResource(imgc);
        imga.css({
            "opacity": `0`,
        });
        imgb.attr("class", preClass);
        imgc.attr("class", hidenClass);
        imga.attr("class", showClass);
    }


    //初始化
    SwipeImg.prototype.init = function () {
        //生成3张图片
        var img1 = $(`<div class="${this.imgClass[0]}"></div>`);
        var img2 = $(`<div class="${this.imgClass[1]}"></div>`);
        var img3 = $(`<div class="${this.imgClass[2]}"></div>`);

        this.imgbox.append(img1, img2, img3);
        //中间一张展示图片
        this.setNextResource(img2);

        this.setImgBoxCss({
            width: "100%",
            height: "600px",
            overflow: "hidden",
            position: "relative",
            margin: "0px auto",
            "perspective-origin": "center",
            "perspective": "1500px",
        });
        this.setImgCss({
            height: "100%",
            width: "100%",
            position: "absolute",
            transition: "transform 1s",
            "background-repeat": "no-repeat",
            "background-position": "center",
            "background-size": "cover",
        });




    }
    //使用方法用法

    /*
    var imgSrc = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg"];
    var transform = [{
        transform: "translate(-100%, 0%)"
    }, {
        transform: "translate(0px, 0px)  scale(1.2)"
    }, {
        transform: "translate(100%,0%)"
    }];

    var transform1 = [{
        transform: "translate3d(-100%, 0%,-500px) rotateY(-90deg)"
    }, {
        transform: "translate3d(0%, 0%,0px) rotateY(0deg)"
    }, {
        transform: "translate3d(100%, 0%,-500px) rotateY(90deg)"
    }];


    var imgColor = ["red", "green", "blue"];

    new SwipeImg(".imgbox", imgSrc)
        .setTransform(transform1)
        .setImgBoxCss({
            width: "50%",
            height: "300px",
            "margin-top": "200px",
            "perspective-origin": "center",
            "perspective": "1500px",
            position: "relative",
            bottom:"100px",
        }).setImgCss({

        })
        .setImgCss({

        })
        .show(1500);

    var swipeImg = new SwipeImg(".imgbox2", imgSrc)
        .setTransform(transform)
        .setImgBoxCss({
            height: "500px",
            position: "absolute",
            "z-index": "-1",
            bottom: "0px",
            filter: "blur(10px)",
            "perspective-origin": "center",
            "perspective": "1500px"
        }).setImgCss({

        })
        .setSwipeListener(function () {
            // randomSwipeImg1.bind(this)();
        })
        .show(1500);

        */

}