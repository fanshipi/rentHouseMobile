
# rentHouseMobile
布局使用 https://mobile.ant.design/index-cn
## 创建项目
（1）npx create-react-app proName;
（2）or :npm i create-react-app,create-react-app proName

## 遇到的问题
(1). 箭头函数this为父作用域的this，不是调用时的this
箭头函数的this永远指向其父作用域，任何方法都改变不了，包括call，apply，bind。
普通函数的this指向调用它的那个对象.

## 自定义吸顶组件
(1).定义一个占位div，高度为0;
(2).定义一个内容div，高度始终为40px;

    render() {
        return (
            <>
                <div ref={this.placeHolderRef}></div>
                <div ref={this.contentRef}>{this.props.children}</div>
            </>
        )
    }
}

通过this.refs.placeHolderRef可以访问到该组件实例，其实就是dom元素节点；通过this.placeHolderRef.current可以观察所打印的数据，获取想要进行操作的数据

## 百度地图API的使用，参考网址http://lbsyun.baidu.com/index.php?title=jspopular3.0
(1).首先需要在顶部获取BMap:var BMap = window.BMap
(2).创建实例 var map = new BMap.Map('container') ,(container为容器 <div id="container"></div>)
(3).创建点坐标 var point = new BMap.Point(116.404, 39.915) 
(4).初始化地图，设置中心点坐标和地图级别 map.centerAndZoom(point, 15);
(5).添加覆盖物参考http://lbsyun.baidu.com/jsdemo.htm#canvaslayer

##登录页面表单验证
使用formik,yup https://juejin.im/post/5cd0df17f265da036902ac83
(1).布局使用了Ant Design组件的WingBlank两翼留白、Flex布局
(2).使用formik,yup先安装 
    npm i formik yup --save
(3).导入
    import { Form, Field, ErrorMessage, withFormik } from 'formik'
    import * as Yup from 'yup'
(4).代码
 <WingBlank size="lg">
          <Form className={styles.formItem}>
            <div className={styles.formSubmit}>
              <Field
                name="username"
                type="text"
                placeholder="请输入用户名"
                className={styles.input}
              />
              <ErrorMessage name="username" component="div" />
              <Field
                name="password"
                type="password"
                placeholder="请输入密码"
                className={styles.input}
              />
              <ErrorMessage name="password" component="div" />
              <div className={styles.formSubmit}>
                <input type="submit" className={styles.submit} />
              </div>
            </div>
          </Form>
          <Flex className={styles.backHome}>
            <Flex.Item>还没有账号，去注册~</Flex.Item>
          </Flex>
        </WingBlank>
(5).验证规则，参考 https://github.com/jquense/yup#stringmatchesregex-regex-message-string--function-schema
     validationSchema: Yup.object().shape({
    username: Yup.string().required('用户名不能为空').matches(USER_REGEX,'必须为5-8位'),
    password: Yup.string().required('密码不能为空').matches(PASSWORD_REGEX,'必须为6-12位')
    })
