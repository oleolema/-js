var imgSrc = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg"];
var colors = ["#F44336", "#E91E63", "#673AB7", "#9C27B0", "#3F51B5", "#03A9F4", "#2196F3", "#00BCD4", "#4CAF50", "#009688", "#CDDC39", "#FFEB3B", "#FF9800", "#FFC107", "#FF9800", "#9E9E9E", "#795548", "#607D8B", ];

//平滑样式
var transform = [{
    transform: "translate(-100%, 0%)"
}, {
    transform: "translate(0px, 0px)  scale(1.2)"
}, {
    transform: "translate(100%,0%)"
}];

/**
 *  3d滑动样式  
 * 需要设置容器
 *      (默认已设置)
 *      perspective-origin": "center",
        "perspective": "1500px",
 * */
var transform1 = [{
    transform: "translate3d(-100%, 0%,-500px) rotateY(-90deg)"
}, {
    transform: "translate3d(0%, 0%,0px) rotateY(0deg)"
}, {
    transform: "translate3d(100%, 0%,-500px) rotateY(90deg)"
}];


var imgColor = ["red", "green", "blue"];

//忠县图片轮播（内层）
new SwipeImg(".imgbox", imgSrc)
    .setTransform(transform1)
    .setImgBoxCss({
        width: "50%",
        height: "300px",
        "margin-top": "200px",
        position: "relative",
        bottom: "100px",
        "z-index": "3"
    }).setImgCss({

    })
    .show(1500);

//忠县图片轮播（外层，模糊）
new SwipeImg(".imgbox2", imgSrc)
    .setTransform(transform)
    .setImgBoxCss({
        height: "500px",
        position: "absolute",
        bottom: "0px",
        filter: "blur(10px)",
    }).setImgCss({

    })
    .setSwipeListener(function () {
        // randomSwipeImg1.bind(this)();
    })
    .show(1500);

//全局纯色背景切换
new SwipeImg(".galble-background", colors.sort(() => Math.random() - 0.5), true)
    .setTransform(transform1)
    .setImgBoxCss({
        width: "100%",
        height: "100%",
        top: "0px",
        position: "fixed",
        bottom: "100px",
        "z-index": "-3",
        "opacity": "0.3",
    }).setImgCss({})
    .setImgCss({

    })
    .setSwipeListener(randomSwipeImg2)
    .show(5000);

//解析酷安图片
function parseKuanImg(json) {
    console.info(json);
    var imgs = [];
    for (var i in json.data) {
        let data = json.data[i];
        for (var j in data.entities) {
            let entities = data.entities[j];
            for (var k in entities.picArr) {
                let picArr = entities.picArr[k];
                imgs.push(picArr);
            }
        }
    }
    //打乱数组顺序
    imgs = imgs.sort(() => Math.random() - 0.5);
    console.info(imgs);
    parseKuanImgListener(imgs);
}

//酷安图片轮播
function parseKuanImgListener(imgs) {
    new SwipeImg(".imgbox-kuan", imgs) //绑定图片容器 和 图片资源
        .setTransform(transform) //动画效果
        .setImgBoxCss({ //图片容器的css
            width: "100%",
            height: "800px",
            "margin-top": "200px",
            "perspective-origin": "center",
            "perspective": "1500px",
            position: "relative",
            "z-index": "3"
        }).setImgCss({ //图片的css
            "background-size": "contain"
        })
        .setImgCacheCount(10) //如果是图片资源，可以开启预加载，防止卡顿
        .setSwipeListener(randomSwipeImg2) //切换图片时的监听器
        .show(2000); //每隔2000ms切换图片
}