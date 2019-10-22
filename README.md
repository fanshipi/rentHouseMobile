# rentHouseMobile
rentHouse
1、创建项目
（1）npx create-react-app 项目名称;
（2）或者分为两个步骤:npm i create-react-app,create-react-app 项目名称

2、遇到的问题
(1). 箭头函数this为父作用域的this，不是调用时的this
箭头函数的this永远指向其父作用域，任何方法都改变不了，包括call，apply，bind。
普通函数的this指向调用它的那个对象.

3、自定义吸顶组件
（1）定义一个占位div，高度为0;
（2）定义一个内容div，高度始终为40px;
