# jquery 相关

移动端使用 zepto，使用方法和 jquery 一样。API 地址 http://jquery.cuishifeng.cn/

直接代码演示即可，无需准备PPT

## DOM 操作

### DOM 查询

```js
// 建议是用 $xxx 命名
var $p1 = $('#p1')

var $div = $('div')
$div.forEach(function () {
    console.log(this)
})
```

### DOM 结构操作

```js
var $div1 = $('#div1')

// 增加新建节点
var $newP = $('<p>new p</p>')
$div1.append($newP)
// 移动现有节点
var $p1 = $('#P1')
$div1.append($p1)

// 获取父节点
$p1.parent()

// 获取子节点
$div1.children()

// 移除节点
$p1.remove()
```

## 事件绑定

### 基本应用

```js
var $a = $('#a1')
$a.on('click', function (e) {
    e.preventDefault()
    console.log('clicked')
})
```

### 代理

```js
var $div = $('div')
$div.on('click', 'a', function (e) {
    console.log(this.html())
})
```

## ajax

### 非跨域

```js
$.ajax({
    url: '/api',
    success: function (result) {
        console.log(result)
    }
})
```

### JSONP

提供方提供的数据：

```js
myCallback({
    "x": 100,
    "y": 200
})
```

接收方的写法：

```js
$.ajax({
    url: 'http://localhost:8882/x-origin.json',
    dataType: 'jsonp',
    jsonpCallback: 'myCallback',
    success: function (data) {
        console.log(data)
    }
})
```
