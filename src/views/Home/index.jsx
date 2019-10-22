import React, { Component } from 'react'

import { Route } from 'react-router-dom'
import styles from './index.module.scss'

import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'

// 导入tabBar
import { TabBar } from 'antd-mobile'
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: props.location.pathname,
    }
  }
  TabBars = [
    {
      title:'首页',
      icon:'icon-index',
      path:'/home'
    },
    {
      title:'找房',
      icon:'icon-findHouse',
      path:'/home/houselist'
    },
    {
      title:'资讯',
      icon:'icon-info',
      path:'/home/news'
    },
    {
      title:'我的',
      icon:'icon-my',
      path:'/home/profile'
    }
  ]
  componentDidUpdate(newsProps) {
    // console.log('-----',newsProps)
    // console.log('......now',this.props.location.pathname)
    if(this.props.location.pathname !== newsProps.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }
 renderTabBar = ()=>{
   return (
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
          {
            this.TabBars.map(item=>
              <TabBar.Item
              title={item.title}
              key={item.path}
              icon={<i className={`iconfont ${item.icon}`}></i>
              }
              selectedIcon={<i className={`iconfont ${item.icon}`}></i>
              }
              selected={this.state.selectedTab === item.path}
              onPress={() => {
                {/* this.setState({
                  selectedTab: 'blueTab'
                }) */}
                {/* console.log(item.path) */}
                if(item.path !== this.props.location.pathname) {
                  this.props.history.push(item.path)
                }
              }}
              data-seed="logId"
            >
            </TabBar.Item>
            )
          }
          </TabBar>
   )
 }
  render() {
    return (
      <div className={styles.home}>
        {/* <div> */}
          <Route exact path="/home" component={Index} />
          <Route exact path="/home/houselist" component={HouseList} />
          <Route exact path="/home/news" component={News} />
          <Route exact path="/home/profile" component={Profile} />
        {/* </div> */}
        {/* tabBar */}
       <div className={styles.tabbar}>{this.renderTabBar()}
        </div>
      </div>
    )
  }
}
