import React, { Component } from 'react'
import styles from './index.module.scss'
import { BASEURL } from '../../utils/url'
import { Button, Grid } from 'antd-mobile'
import { Link } from 'react-router-dom'
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
    userInfo: {
      avatar: './img/na.jpg',
      nickname: '游客'
    }
  }
  render() {
    const {
      userInfo: { avatar, nickname }
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
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2018939532,1617516463&fm=26&gp=0.jpg" className={styles.myIcon} alt="" />
            <div className={styles.user}>
              <div className={styles.name}>{nickname}</div>
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
            </div>
          </div>
        </div>
        <Grid
          data={menus}
          columnNum={3}
          hasLine= {false}
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
