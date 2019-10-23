import React, { Component } from 'react'
import styles from './index.module.scss'
import NavHeader from '../../components/NavHeader'
import { Flex, WingBlank, Toast } from 'antd-mobile'
import { Formik, Form, Field, ErrorMessage, withFormik } from 'formik'
import * as Yup from 'yup'
import { axios } from '../../utils/axios'
import { setToken } from '../../utils/token'
class Login extends Component {
  render() {
    return (
      <div className={styles.root}>
        <NavHeader className={styles.navHeader}>登录</NavHeader>
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
      </div>
    )
  }
}
const USER_REGEX = /^[a-zA-Z0-9]{5,8}$/
const PASSWORD_REGEX = /^[a-zA-Z0-9]{6,12}$/
const EnhancedLogin = withFormik({
  // 表单默认数据
  mapPropsToValues: () => ({ username: 'Lina', password: '123456' }),
  //  表单验证
  validationSchema: Yup.object().shape({
    username: Yup.string().required('用户名不能为空').matches(USER_REGEX,'必须为5-8位'),
    password: Yup.string().required('密码不能为空').matches(PASSWORD_REGEX,'必须为6-12位')
  }),
  handleSubmit: async (values, { props }) => {
    let res = await axios.post('/user/login', values)
    //   console.log(res);
    const { status, description, body } = res.data
    if (status === 200) {
      // 保存token
      setToken(body.token)
      // 页面跳转
      props.history.goBack()
    }
    // console.log(props)
    Toast.info(description, 1.5)
  }
})(Login)

export default EnhancedLogin
