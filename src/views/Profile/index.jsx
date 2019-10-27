import React, { Component } from 'react'
import styles from './index.module.scss'
import { BASEURL } from '../../utils/url'
import { Modal, Button, Grid, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import {deleteToken} from '../../utils/token'
const alert = Modal.alert
// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', icon: 'icon-coll', to: '/' },
  { id: 2, name: '我的出租', icon: 'icon-index', to: '/rent' },
  { id: 3, name: '看房记录', icon: 'icon-record', to: '/' },
  {
    id: 4,
    name: '成为房主',
    icon: 'icon-identity',
    to: '/'
  },
  { id: 5, name: '个人资料', icon: 'icon-myinfo', to: '/' },
  { id: 6, name: '联系我们', icon: 'icon-cust', to: '/' }
]
export default class Profile extends Component {
  state = {
    isLogin: false,
    userInfo: {
      avatar:
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2018939532,1617516463&fm=26&gp=0.jpg',
      nickname: '游客'
    }
  }
  // 获取数据，判断是否登录
  componentDidMount() {
    this.getUserInfoData()
  }
  //
  getUserInfoData = async () => {
    Toast.loading('正在加载中...', 0)
    let res = await this.$axios.get(`/user`)
    Toast.hide()
    // console.log(res)
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        userInfo: body,
        isLogin: true
      })
    }
  }
  // 登出
  logout = () => {
    alert('登出提示', '确定退出登录吗?', [
      { text: '取消', onPress: () => {} },
      {
        text: '确认',
        onPress: async () => {
          //  退出api
          await this.$axios.post('/user/logout')
          //  退出之后，重置个人信息页面
          this.setState({
            isLogin: false,
            userInfo: {
              avatar:
                '/img/avatar.png',
              nickname: '游客'
            }
          })
          // 删除token
          deleteToken()
        }
      }
    ])
  }
  render() {
    const {
      userInfo: { avatar, nickname },
      isLogin
    } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.title}>
          <img
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2154903547,554467892&fm=26&gp=0.jpg"
            className={styles.bg}
            alt=""
          />
          <div className={styles.info}>
            {/* {isLogin ? ( */}
              {/* <>
                <img
                  src={`${BASEURL}${avatar}`}
                  className={styles.myIcon}
                  alt=""
                />
              </>
            ) : ( */}
              <img src={`${BASEURL}${avatar}`} className={styles.myIcon} alt="" />
            {/* )} */}
            <div className={styles.user}>
              <div className={styles.name}>恒客88_105</div>
              {/* 判断是否登录 */}
              {isLogin ? (
                <>
                  <div className={styles.auth}>
                    <span onClick={this.logout}>登出</span>
                  </div>
                  <div className={styles.edit}>
                    <span>编辑个人资料</span>
                  </div>
                </>
              ) : (
                <div className={styles.edit}>
                  <Button
                    type="primary"
                    size="small"
                    inline
                    onClick={() => this.props.history.push('/login')}
                  >
                    登录
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={dataItem => (
            <Link to={dataItem.to}>
              <div style={{ padding: '12.5px' }}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${dataItem.icon}`}></i>
                  <span>{dataItem.name}</span>
                </div>
              </div>
            </Link>
          )}
        />
        <div className={styles.ad}>
          <img src="" alt="" />
        </div>
      </div>
    )
  }
}
