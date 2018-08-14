    本章我们看下JavaScript OOP，也就是面向对象编程。

我们知道OOP并不是针对于JS的，很多语言都实现了OOP这样的方法论，比如java,c++等。

### 一、概念

面向对象程序设计（Object-oriented programming,OOP)是一种程序设计范型，同时也是一种程序开发的方法。对象指的是类的实例。它将对象作为程序的基本单元，加工程序和数据封装其中，以提高软件的重用性、灵活性和扩展性。

OOP的重点特性：

+ 继承
+ 封装
+ 多态
+ 抽象

#### 1.基于原型的继承

一般的函数都会有一个prototype属性，这个属性是一个对象。

```javascript
//也就是我们随便用一个函数声明创建一个函数Foo的时候，就会有一个foo.prototype这样一个属性，并且这个属性是一个对象。
function Foo(){
    this.y = 2;
}
typeof Foo.prototype; //"object"
Foo.prototype.x = 1;
var obj3 = new Foo();

obj3.y; //2
obj3.x; //1
```

#### 2.prototype属性与原型

```javascript
function Foo(){}
typeof Foo.prototype; //"object"
Foo.prototype.x=1;
var obj3 = new Foo();

//当我们使用函数声明创建一个函数时，默认会有下面3个属性。
Foo.prototype:{
    constructor:Foo,
    __proto__:Object.prototype,
    x:1
}
```

#### 3.demo

我们看下一个例子:我么如何实现一个Class继承另一个Class.

```javascript
//如果使用new去调用的话，原型指向Person.prototype这样一个空对象
function Person(name,age){
    this.name = name;
    this.age = age;
}

//可以通过Person.prototype创建所有实例共享的方法
Person.prototype.hi = function(){
    console.log('Hi,my name is ' + this.name + ',I am ' + this.age + 'years old now.');
}

Person.prototype.LEGS_NUM = 2;
Person.prototype.ARMS_NUM = 2;
Person.prototype.walk = function(){
    console.log(this.name + 'is walking...');
};

//学生首先是人
function Student(name,age,className){
    Person.call(this,name,age);
    this.calssName = className;
}

Student.prototype = Object.create(Person.prototype); //创建一个空对象，并且对象的原型指向参数。
Student.prototype.constructor = Student;

Student.prototype.hi = function(){
    console.log("Hi,my name is" + this.age + ",I am " + this.age + "years old now,and from " + this.className + ".");
};

Student.prototype.learn = function(subject){
    console.log(this.name + "is learning" + subject + "at" + this.calssName + ".");
}

//test
var bosn = new Student('Bosn',27,'Class 3,Grade 2');
bosn.hi();    //Hi,my name is Bosn,I am 27 years old now,and from Class 3,Grade 2.
bosn.LEGS_NUM; //2
bosn.walk(); //Bosn is walkking...
bosn.learn('math'); //Bosn is learing math at Class 3,Grade 2.
```

### 二、prototype

#### 1.改变prototype

```javascript
Student.prototype.x = 101;
bosn.x; //101

Student.prototype = {y:2};
bosn.y; //undefined
bosn.x; //101

var nunnly = new Student('Nunnly',3,'Class LOL KengB');
nunnly.x; //undefined
nunnly.y; //2
```

#### 2.内置构造器的prototype

```javascript
Object.prototype.x = 1;
var obj = {};
obj.x; //1
for(var key in obj){
    console.log('result:'+key);
}
//result:x

Object.defineProperty(Object.prototype,'x',{writable:true,value:1});
var obj = {};
obj.x; //1
for(var key in obj){
    console.log('result:' + key)
}
//nothing output here
```

#### 3.创建对象-new/原型链

```javascript
function foo(){}
foo.prototype.z = 3;

var obj = new foo();
obj.y = 2;
obj.x = 1;

obj.x; //1
obj.y; //2
obj.z; //3
typeof obj.toString; //'function'
'z' in obj; //true
obj.hasOwnProperty('z'); //false
```

### 三、instanceof

```javascript
[1,2] instanceof Array === true
new Object() instanceof Array === false
[1,2] instanceof new Object() === true

//也就是只要原型链上有，就会返回true
```

我们再来看下instanceof，这是第一章讲过的数据类型的判断方法。那么instanceof是怎样去工作的呢？

instanceof左边一般要求是一个对象，右边要求是一个函数或者函数构造器，它会判断右边构造器的prototype属性是否出现在左边对象的原型链上。

这里边有两个要点：

+  1.右边必须是函数，因为如果不是函数的话，就没有prototype属性；如果右边不是函数的话，会报错。
+  左边一般来讲，要求是对象，如果不是对象的话，比如string或者number类型的，就会返回false。

### 四、实现继承的方式

```javascript
function Person(){

}

function Student(){

}

//这是错误的写法
Student.prototype = Person.prototype; //1

//这种不便于传参
Student.prototype = new Person();    //2

//这是正确的写法
Student.prototype = Object.create(Person.prototype); //3

Student.prototype.constructor = Person;

//如果没有Object.create下
if(!Object.create){
    Object.create = function(proto){
        function F(){}
        F.prototype = proto;
        return new F;
    }
}
```

### 五、模拟重载

```javascript
function Person(){
    var args = arguments;
    if(typeof args[0] === 'object' && args[0]){
        if(args[0].name){
            this.name = args[0].name;
        }
        if(args[0].age){
            this.age = args[0].age;
        }
    }else{
        if(args[0]){
            this.name=args[0];
        }
        if(args[1]){
            this.age=args[1];
        }
    }
}

Person.prototype.toString = function(){
    return 'name=' + this.name + ',age=' + this.age;
}

var bosn = new Person('Bosn',27);
bosn.toString(); //"name=Bosn,age=27"

var nunn = new Person({name:'Nunn',age:38});
nunn.toString(); //"name=Nunn,age=38"
```

### 六、调用子类方法

```javascript
function Person(name){this.name = name;}
function Student(name,className){
    this.calssName = className;
    Person.call(this,name);
}

var bosn = new Student('Bosn','Network064');
bosn; //Student {className:"Network064",name:"Bosn"}

Person.prototype.init = function(){}

Student.prototype.init = function(){
    //do sth...
    Person.prototype.init.apply(this,arguments);
}
```

### 七、链式调用

```javascript
function ClassManager(){}
ClassManager.prototype.addClass = function(str){
    console.log('Class:' + str + 'added');
    return this;
};

var manager = new ClassManager();
manager.addClass('classA').addClass('classB').addClass('classC');

//Class:classA added.
//Class:classB added.
//Class:classC added.
```

### 八、抽象类

```javascript
function DetectorBase(){
    throw new Error('Abstract class can not be invoked directly!');
}
DetectorBase.detect = function(){console.log('Detection starting...');};
DetectorBase.stop = function(){console.log('Detection stoped...');};
DetectorBase.init = function(){throw new Error('Error');};

function LinkDetector(){}
LinkDetector.prototype = Object.create(Detector.prototype);
LinkDetector.prototype.constructor = LinkDetector;
//...add methods to linkDetector
```

### 九、defineProperty(ES5)

```javascript
function Person(name){
    Object.defineProperty(this,'name')
}
```

### 十、模块化

```javascript
var moduleA;
moduleA = function(){
    var prop = 1;
    function func(){
        return{
            func:func,
            prop:prop
        }
    }
}();



var moduleA;
moduleA = new function(){
    var prop = 1;
    function func(){}
    this.func = func;
    this.prop = prop;
}
```

### 十一、实践——探测器

```javascript
!function(global){

}
```
