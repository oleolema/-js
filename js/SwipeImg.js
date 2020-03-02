{

    /**
     * @param imgbox        图片容器的class
     * @param resources     图片资源
     * @param isColorImg    （可选，默认 false）是否为纯颜色
     */
    window.SwipeImg = function (imgbox, resources, {
        type = SwipeImg.TYPE.image,
        button = false,
        ms = 1000,
        fn = 'ease',
    } = {}) {
        this.imgbox = $(imgbox); //图片外层
        this.resources = resources; //资源   (默认资源图片资源)
        this.swipeListener = function () {};
        this.imgCache = [];
        this.imgCacheCount = 5;
        this.buttonClass = button === true ? ['pre-img-btn', 'next-img-btn', 'img-btn'] : button;
        this.ms = ms;
        this.fn = fn;
        this.swipeTimer = 0;

        this.swipeIng = false;

        this.index = 0;
        this.imgClass = ["swipe-img1" + randomStr(), "swipe-img2" + randomStr(), "swipe-img3" + randomStr()];
        this.transform = [{
            transform: "translate(-100%, 0px)"
        }, {
            transform: "translate(0px, 0px)"
        }, {
            transform: "translate(100%, 0px)"
        }, ];
        if (type === SwipeImg.TYPE.color) { //采用哪种方式加载资源
            this.setNextResource = function (img) {
                img.css("background-color", this.resources[this.index++ % this.resources.length]);
            };
        } else if (type === SwipeImg.TYPE.element) {
            this.setNextResource = function (img) {
                img[0].innerHTML = (this.resources[this.index++ % this.resources.length]);
            };
            this.imgCacheCount = 0;
        } else if (type === SwipeImg.TYPE.image) {
            this.setNextResource = function (img) {
                img.css("background-image", `url(${ this.resources[this.index++ % this.resources.length]})`);
            };
        }
        //初始化
        this.init();
    }

    SwipeImg.TYPE = {
        image: Symbol(),
        color: Symbol(),
        element: Symbol(),
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
        this.t = t || 2000;;
        delay = delay || 0;
        setTimeout(() => {
            this.autoNext();
        }, delay);
        return this;
    }

    SwipeImg.prototype.autoNext = function () {

        this.swipeTimer = setInterval(() => {
            this.swipeListener();
            //图片资源开启缓存
            if (this.imgCacheCount !== 0) {
                if (this.index == 1 && !this.isColorImg) {
                    for (var i = 0; i < this.resources.length && i < this.imgCacheCount; i++) {
                        this.imgCache[i] = $(`<img src="${this.resources[i]}"  style="width:0px;height:0px;" >`);
                        this.imgbox.append(this.imgCache[i]);
                    }
                } else if (this.index + this.imgCacheCount < this.resources.length) {
                    this.imgCache[this.index % this.imgCacheCount].attr("src", this.resources[this.index + this.imgCacheCount]);
                }
            }
            //显示这个class
            this.setNextClass(this.imgClass[0], this.imgClass[1], this.imgClass[2]);
        }, this.t);
    }

    SwipeImg.prototype.pre = function () {
        if (this.swipeIng) {
            return;
        }
        this.swipeListener();
        clearInterval(this.swipeTimer);
        this.setNextClass(this.imgClass[2], this.imgClass[1], this.imgClass[0]);
        this.autoNext();
    }

    SwipeImg.prototype.next = function () {
        if (this.swipeIng) {
            return;
        }
        this.swipeListener();
        clearInterval(this.swipeTimer);
        this.setNextClass(this.imgClass[0], this.imgClass[1], this.imgClass[2]);
        this.autoNext();
    }


    SwipeImg.prototype.setNextClass = function (preClass, hidenClass, showClass) {
        this.swipeIng = true;
        setTimeout(() => {
            this.swipeIng = false;
        }, this.ms);
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

        //加载图片动画效果
        this.loadTransform();

        let btnCl = this.buttonClass;
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
            display: 'flex',
            'align-items': 'center',
        });
        this.setImgCss({
            height: "100%",
            width: "100%",
            position: "absolute",
            transition: `transform ${this.ms}ms ${this.fn}`,
            "background-repeat": "no-repeat",
            "background-position": "center",
            "background-size": "cover",

        });

        if (btnCl) {
            let pre = $(`<div class='${btnCl[0]} ${btnCl[2]}'></div>`);
            let next = $(`<div class='${btnCl[1]} ${btnCl[2]}'><</div>`);
            pre.text('⬅️');
            next.text('➡️');
            pre.click(() => {
                this.pre();
            });
            next.click(() => {
                this.next();
            })
            // pre.css()
            this.imgbox.append(pre, next);
            $('head').append(`<style>
                .${this.buttonClass[2]}{
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    opacity: 0.8;
                }
                .${this.buttonClass[0]}{
                    left:0;
                }
                .${this.buttonClass[1]}{
                    right:0;
                }
                </style>`)
        }
    }

}
