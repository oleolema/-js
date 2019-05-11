var randomSwipeImg = (function () {
    //自定义多样式（3d滚动 和 平滑滚动）
    var transforms = [
        [{
            transform: "translate(-100%, 0%)"
        }, {
            transform: "translate(0px, 0px)  scale(1.2)"
        }, {
            transform: "translate(100%,0%)"
        }],
        [{
            transform: "translate3d(-100%, 0%,-500px) rotateY(-90deg)"
        }, {
            transform: "translate3d(0%, 0%,0px) rotateY(0deg)"
        }, {
            transform: "translate3d(100%, 0%,-500px) rotateY(90deg)"
        }]
    ];
    var index = 0;
    return function () {
        this.setTransform(transforms[index++ % transforms.length]);
        this.loadTransform();
    };
})();


//随机滑动样式1
var randomSwipeImg1 = (function () {

    return function () {
        var transform = [{
            transform: `translate(${randomMinus()}100%, ${randomMinus()}${randomStr()}%)`
        }, {
            transform: `translate(0%, 0%)  scale(1.2)`
        }, {
            transform: `translate(${randomMinus()}100%, ${randomMinus()}${randomStr()}%)`
        }];
        this.setTransform(transform);
        this.loadTransform();
    };
})();

//随机滑动样式2
var randomSwipeImg2 = (function () {
    return function () {
        var transform = [{
            transform: `translate(${randomMinus()}100%, ${randomMinus()}${randomStr()}%)`
        }, {
            transform: `translate(0%, 0%)  scale(1)`
        }, {
            transform: `translate(${randomMinus()}100%, ${randomMinus()}${randomStr()}%)`
        }];
        this.setTransform(transform);
        this.loadTransform();
    };
})();

//随机滑动样式3
var randomSwipeImg3 = (function () {
    return function () {
        var randB = randomBoolean() * 100;
        var randC = randB == 0 ? 100 : 0;

        // var transform = [{
        //     transform: `translate(${randB}%,${randC}%)`
        // }, {
        //     transform: `translate(0%, 0%)  scale(1.2)`
        // }, {
        //     transform: `translate(${randB*-1}%,${randC*-1}%)`
        // }];

        var transform = [{
            transform: "translate(0%, -100%)"
        }, {
            transform: "translate(0px, 0px)  scale(1.2)"
        }, {
            transform: "translate(0%,100%)"
        }];
        console.info(transform)
        this.setTransform(transform);
        this.loadTransform();
    };
})();

function randomStr() {
    return parseInt(Math.random() * 101);
}

function randomMinus() {
    return parseInt(Math.random() * 2) == 1 ? "-" : "";
}

function randomBoolean() {
    return parseInt(Math.random() * 2);
}