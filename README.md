## 如何下载
使用需要依赖`JQuery`,在 [js/jquery-3.3.3.min.js](https://github.com/oleolema/SwipeImg-js/blob/master/js/jquery-3.3.1.min.js) 中，本项目只有一个文件[js/SwipeImg.js](https://github.com/oleolema/SwipeImg-js/blob/master/js/SwipeImg.js),下载这两个文件到本地即可。
## 如何使用
本项目就是一个例子，可以全部下载运行查看效果。  
演示一个简单的例子  
html   
```html
<div class="imgbox"></div>
```
js
```js
var imgSrc = ["img/1.jpg", "img/2.jpg", "img/3.jpg"];

new SwipeImg(".imgbox", imgSrc).show(1500);
```  
#### 使用`new SwipeImg(className,resource[,isColor])`创建一个对象  
* `className`：`String` 类型 绑定html中的一个类。  
* `resource`：`Array` 类型  图片链接数组，可以是网络链接  或者  颜色字符串数组
* [可选] `isColor`：`Boolean` 类型 是否为图片资源，默认false， 如果为true，`resource`必须传入颜色字符串数组

#### `show(time,delay)` : 必须调用show方法才会开始轮播  
* `time`: `Number`类型  切换图片的时间间隔
* `delay`: `Number` 类型    开始轮播的延迟时间

## 调整样式
```js
var imgSrc = ["img/1.jpg", "img/2.jpg", "img/3.jpg"];

new SwipeImg(".imgbox", imgSrc)
    .setImgBoxCss({     //设置图片容器css，也就是.imgbox
        width: "50%",
        height: "300px",
        "margin-top": "200px",
        "perspective-origin": "center",
        "perspective": "1500px",
        position: "relative",
        bottom:"100px",
    }).setImgCss({      //设置图片css
    })
    .show(1500);
```  
#### `setImgBoxCss(css)`：设置图片容器css，也就是.imgbox，一般用于调整图片容器大小，位置
* `css`:`Object`  和Jquery设置css相同
#### `setImgCss(css)`：设置图片css，也就是每一张图片
* `css`:`Object`  和Jquery设置css相同

## 自定义切换特效
```js
var imgSrc = ["img/1.jpg", "img/2.jpg", "img/3.jpg"];
var transform = [{
    transform: "translate3d(-100%, 0%,-500px) rotateY(-90deg)"
}, {
    transform: "translate3d(0%, 0%,0px) rotateY(0deg)"
}, {
    transform: "translate3d(100%, 0%,-500px) rotateY(90deg)"
}];
new SwipeImg(".imgbox", imgSrc)
    .setTransform(transform)
    .show(1500);
```  
#### `setTransform(transform)`：设置图片切换特效
* `transform`:`Array` 能且只能是3个有css对象的数组，transform[0]：图片消失的位置，transform[1]:图片显示时的位置，transform[2]:图片准备出现时的位置，图片会根据这3个位置来循环切换。

## 图片切换监听器
```js
//随机滑动样式
var randomSwipeImg = (function () {
    return function () {
        var transform = [{
            transform: `translate(${randomMinus()}100%, ${randomMinus()}${randomStr()}%)`
        }, {
            transform: `translate(0%, 0%)  scale(1)`
        }, {
            transform: `translate(${randomMinus()}100%, ${randomMinus()}${randomStr()}%)`
        }];
        this.setTransform(transform);
        this.loadTransform();   //show方法调用后,不会自动加载transform，需要手动调用loadTransform(),才能加载到浏览器中。
    };
})();


new SwipeImg(".imgbox", imgSrc)
    .setSwipeListener(randomSwipeImg) //切换图片时的监听器
    .show(1500);
```  

#### setSwipeListener(listener)
设置切换图片时的监听器，每次切换图片前，都会调用`listener`，通常用来动态切换transtion，实现多种切换效果
`listener`:`Function`  监听器

## 网络图片卡顿问题
#### setImgCacheCount(count)
出现网络图片加载卡顿时，可以设置预加载数，来减少卡顿,只有时图片资源时，该设置才有效。
`count`: `Number`  ,预加载的数量
