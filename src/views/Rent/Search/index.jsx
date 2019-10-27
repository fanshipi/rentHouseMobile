import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from './index.module.scss'
import { SearchBar } from 'antd-mobile'
import { getCurrentCity } from '../../../utils/city'
import _ from 'lodash'
class RentSearch extends Component {
  state = {
    value: '',
    liList: []
  }
  componentWillMount() {
    this.getLiList()
  }
  //   获取搜索输入的内容列表
  getLiList = _.debounce(async val => {
    const { value } = await getCurrentCity()
    let res = await this.$axios.get('/area/community', {
      params: {
        id: value,
        name: val
      }
    })
    console.log(res)
    this.setState({
      liList: res.data.body
    })
  }, 1000)
  componentWillUnmount(){
    this.getLiList = null
}
  onChange = value => {
    //   console.log(value);

    this.setState({ value }, () => {
      if (value.trim().length === 0) {
        return
      }
      this.getLiList(value)
    })
  }
  //   取消
  onCancel = () => {
    this.setState({
      value: ''
    })
    this.props.history.goBack()
  }
  //   enter键发送搜索
  onSubmit = value => {
    //   value输入内容
    console.log(value)
  }
//  点击名字跳转，并保存显示到前一个页面的输入框中
  getCommunity = ({community,communityName}) => {
      // const {liList} = this.state
      // this.props.history.replace(`/rent/add?community=${community}&communityName=${communityName}`)
      // 保存到本地
      // console.log(community,communityName);
      
      localStorage.setItem('hkzf_community',JSON.stringify({community,communityName}))

      // 返回
      setTimeout(() => {
        this.props.history.goBack()
      }, 0);
  }
  renderLiList = () => {
    const { liList } = this.state
    return (
      <ul className={styles.tips}>
        {liList.map(item => {
          return (
            <li key={item.community} className={styles.tip} onClick={this.getCommunity(item)}>
              {item.communityName}
            </li>
          )
        })}
      </ul>
    )
  }
  render() {
    return (
      <div className={styles.root}>
        <SearchBar
          placeholder="请输入小区或地址"
          value={this.state.value}
          onCancel={this.onCancel}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        {this.state.liList.length > 0 && this.renderLiList()}
      </div>
    )
  }
}
export default withRouter(RentSearch)
