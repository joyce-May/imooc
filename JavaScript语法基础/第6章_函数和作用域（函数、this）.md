## 函数、作用域

### 一、函数

#### 1.概念

函数是一块JavaScript代码，被定义一次，但可执行和调用多次。JS中的函数也是对象，所以JS函数可以像其它对象那样操作和传递，所以我们也常叫JS中的函数为函数对象。

```javascript
function foo(x,y){
    if(typeof x === 'undefined' && typeof y === 'number'){
        return x + y;
    }else{
        return 0;
    }
}

//action:函数的返回值依赖于return，如果没有return,默认在所有代码执行完后返回undefined，这是一般的函数调用。
//如果是使用构造器，外部使用new去调用的话，这里默认如果没有return语句或者return后是基本类型的话，会将this作为返回值。反之，如果return了一个对象的话，将由这个对象作为new构造器的返回值。
foo(1,2); //3
```

#### 2.重点关注

+ this
    + 函数在不同调用下this指向不一样，并且不同的调用方式下也会有一些细微的差别
+ arguments
    + 函数中特殊的对象，和参数有一定的关系
+ 作用域
    + 我们可以使用函数声明、函数表达式和new构造器的方式创建函数对象，不同的创建方法，不同的调用方式都会产生一些不同的细微差别。
+ 不同调用方式
+ 不同创建方法

#### 3.不同的调用方式

+ 直接调用
    + foo();
+ 对象方法
    + o.method();
+ 构造器
    + new Foo();
+ call/apply/bind
    + func.call(o);

### 二、函数声明 VS 函数表达式

#### 1.函数声明

```javascript
//函数声明：
function add(a,b){
    a = +a;
    b = +b;
    if(isNaN(a) || isNaN(b)){
        return;
    }
    return a+b;
}
```

#### 2.函数表达式

```javascript
//函数表达式：

//function variable
var add = function(a,b){
    //do sth
}

//IEF(Immediately Executed Function)
(function(){
    //do sth
})(); //也叫函数表达式，并且是立即执行函数表达式

//first-class function
return function(){
    //do sth
}; //将函数对象作为一个返回值

//NFE(Named Function Expression)
var add = function foo(a,b){
    //do sth
}; //命名式函数表达式
```

### 三、变量&函数的声明前置

函数声明和函数表达式最主要的区别就是：函数声明会被前置

```javascript
var num = add(1,2);
console.log(num); //result:3

function add(a,b){
    a = +a;
    b = +b;
    if(isNaN(a) || isNaN(b)){
        return;
    }
    return a + b;
}
```

```javascript
var num = add(1,2);
console.log(num); //TypeError:undefined is not a function

var add = function(a,b){
    a = +a;
    b = +b;
    if(isNaN(a) || isNaN(b)){
        return;
    }
    return a + b;
}
```

### 四、命名函数表达式（NFE)

```javascript
var func = function nfe(){};
alert(func === nfe);  //IE6~8:false IE9+:'nfe' is undefined

//递归调用
var func=function nfe(){
    /**
    ** do sth
    **/
    nfe();
}
```

### 五、Function构造器

#### 1.概念

除了函数表达式和函数声明外，还有一种不常见的函数创建方法：使用函数构造器Function。
我们知道函数的所有方法及属性都来自构造器Function的prototype属性。

```javascript
var func = new Function('a','b','console.log(a+b);'); //这也是为什么这种方式并不常见的原因
func(1,2); //3

var func = Function('a','b','console.log(a+b);');
func(1,2); //3
```

#### 2.与一般函数的差异

```javascript
//CASE 1
Function('var localVal ="local";console.log(localVal);')(); //最后加()的意思是立即调用执行的意思
//localVal仍为局部变量
console.log(typeof localVal); //result:local,undefined     
//说明我们在Function构造器中创建的变量是局部变量

//CASE 2
var globalVal = 'global';
(function(){
    var localVal='local';
    Function('console.log(typeof localVal,typeof globalVal);')();  //local不可访问，全局变量global可以访问
})(); //retult:undefined,string
```

#### 3.对比回顾3种创建方式：

+ 只有函数声明会被前置，除了函数外，还有变量声明；所以我们可以在函数生命前，调用函数。函数表达式和函数构造器都是在代码执行阶段才会去创建对应的函数对象。
+ 函数表达式和函数构造器都是允许匿名的，但是函数声明不可以省略名字。
+ 函数声明不能够立即调用，也就是不允许在后面直接加一对括号。如果加，就会报异常，因为函数声明会被提前解析，相当于整个函数都会被放在最前面，最后只留下一对(),所以会报错。因为函数表达式和函数构造器因为不会前置，所以我们可以加()让他们立即调用。

### 六、this

JS中的this比较灵活，同一函数在不同环境下，或不同的调用方式，JS中的this都有可能不一样。

#### 1.全局的this(浏览器)

```javascript
console.log(this.document === document); //true

console.log(this === window);    //true

this.a = 37;
console.log(window.a); //37
```

#### 2.一般函数的this(浏览器)

```javascript
function f1(){
    return this;
}
f1() === window; //true,global object


//严格模式下，一般函数的this会指向undefined
funcion f2(){
    "use strict"; //see strict mode
    return this;
}
f2() === undefined; //true
```

#### 3.作为对象方法的函数的this

```javascript
var o = {
    prop:37,
    f:function(){
        return this.prop;
    }
};
console.log(o.f()); //logs 37
```

```javascript
var o = {prop:37};

function independent(){
    return this.prop;
}

o.f = independent;

console.log(o.f()); //logs 37
```

总结：也就是说，不管函数是如何创建的，只要作为对象的方法去调用，this就指向调用的这个对象。

#### 4.对象原型链上的this

```javascript
var o = {f:function(){
    return this.a + this.b;
}};
var p = Object.create(o);   //p是一个空对象，并且它的原型指向o
p.a = 1;
p.b = 4;

console.log(p.f());    //5
//action: p的原型是o，也就是我们调用p.f()，其实是调用p的原型上的属性方法。
```

#### 5.get/set方法与this

```javascript
function modulus(){
    return Math.sqrt(this.re * this.re + this.im * this.im);
}

var o = {
    re:1,
    im:-1,
    get phase(){
        return Math.atan2(this.im,this.re);
    }
};

Object.defineProperty(o,'modulus',{
    get:modulus,
    enumerable:true,
    configurable:true
});

console.log(o.phase,o.modulus); //logs -0.78 1.4142
```

#### 6.构造器中的this

```javascript
function MyClass(){
    this.a = 37;
}

var o = new MyClass();
console.log(o.a); //37

function C2(){
    this.a = 37;
    return {a:38};
}

o = new C2();
console.log(o.a); //38
```

#### 7.call/apply方法与this

```javascript
function add(c,d){
    retturn this.a + this.b + c + d;
}

var o = {a:1,b:3};

add.call(o,5,7);  //1 + 3 + 5 + 7 = 16

addapply(o,[10,20]); //1 + 3 + 10 + 20 = 34

function bar(){
    console.log(Object.prototype.toString.call(this));
}

bar.call(7); //"[object Number]"
```

#### 8.bind方法与this

//IE9+

```javascript
function f(){
    return this.a;
}

var g = f.bind({a:"test"});
console.log(g()); //test

var o = {a:37,f,g:g};
console.log(o.f(),o,g()); //37,test
```

### 七、函数属性 & arguments

#### 1.函数属性 & arguments

```javascript
function foo(x,y,z){
    //arguments是一个类数组的对象。为什么说它是类数组，是因为它的原型并不是Array.prototype，所以没有Join、slice等数组对象才有的方法。
    arguments.lenth;    //2
    //这里我们可以通过类似数组去访问
    arguments[0];       //1
    arguments[0] = 10;  //与x有绑定关系，严格模式下仍是1
    x;  //change to 10

    arguments[2] = 100; //未传参失去绑定关系
    z;          //still undefined!!!
    arguments.callee === foo; //true 严格模式下不能使用
}

foo(1,2);
foo.length;      //3
foo.name;        //"foo"

//foo.name - 函数名
//foo.length - 形参个数
//arguments.length - 实参个数
```

#### 2.apply/call方法（浏览器）

```javascript
function foo(x,y){
    console.log(x,y,this);
}

//第一个参数就是想作为this的对象，如果不是对象，会转为对象
foo.call(100,1,2);        //1,2,Number(100)
foo.apply(true,[3,4]);    //3,4,Boolean(true)

//如果传入的是null或undefined，则会指向全局对象
foo.apply(null);          //undefined,undefined,window
foo.apply(undefined);     //undefined,undefined,window
```

```javascript
//严格模式下：
function foo(x,y){
    'use strict';
    console.log(x,y,this);
}

foo.apply(null);          //undefined,undefined,null
foo.apply(undefined);     //undefined,undefined,undefined
```

#### 3.bind方法

IE9+支持

```javascript
this.x = 9;
var module = {
    x:81
    getX:function(){
        return this.x;
    }
}

module.getX(); //81

var getX = module.getX;
getX();  //9

var boundGetX = getX.bind(module);
boundGetX(); //81
```

#### 4.bind与currying

bind与柯里化

函数柯里化：把一个函数拆成多个单元。

```javascript
function add(a,b,c){
    return a + b + c;
}

var func = add.bind(undefined,100); //a绑定100
func(1,2);      //103

var func2 = func.bind(undefined,200); //b绑定200
func2(10);     //310
```

为什么要这么折腾？我们看一个实际的例子：

```javascript
function getConfig(colors,size,otherOptions){
    console.log(colors,size,otherOptions);
}

var defaultConfig = getConfig.bind(null,"#CC0000","1024*768");

defaultConfig("123");   //#CC0000 1024*768 123
defaultConfig("456");   //#CC0000 1024*768 456
```

#### 5.bind与new

```javascript
function foo(){
    this.b = 100;
    return this.a;
}

var func = foo.bind({a:1});

func();  //1

//用new又会比较特殊：我们知道，如果new一个函数，return的是一个对象，那么就把这个对象作为返回值。如果不是对象，将把this作为返回值，并且this作为初始化默认的一个空对象，这个对象的原型是foo.prototype.
//也就是说用new调用的话bind方法就会被忽略掉，当然是this层面上的忽略掉。
new func(); //{b:100}
```

#### 6.bind方法模拟

因为bind方法在IE9+及现代浏览器才支持，那么老的浏览器如何实现bind方法？

bind方法实现了两个功能：
+ 绑定this
+ 柯里化

```javascript
function foo(){
    this.b = 100;
    return this.a;
}

var func = foo.bind({a:1});

func(); //1
new func(); //{b:100}



//MDN实现方式
if(!Function.prototype.bind){
    Function.prototype.bind = function(oThis){
        if(typeof this !== 'function'){
            //closet thing possible to the ECMAScript 5
            //internal IsCallable function
            throw new TypeError('What is trying to be bound is not callable');
        }
        var aArgs = Array.prototype.slice.call(arguments,1),
            fToBind = this,
            fNOP = function(){},
            fBound = function(){
                return fToBind.apply(this instanceof fNOP ? this : oThis,aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    }
}
```
