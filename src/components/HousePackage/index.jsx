import React, { Component } from 'react'
import styles from './index.module.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// 所有房屋配置项
const HOUSE_PACKAGE = [
  {
    id: 1,
    name: '衣柜',
    icon: 'icon-wardrobe'
  },
  {
    id: 2,
    name: '洗衣机',
    icon: 'icon-wash'
  },
  {
    id: 3,
    name: '空调',
    icon: 'icon-air'
  },
  {
    id: 4,
    name: '天然气',
    icon: 'icon-gas'
  },
  {
    id: 5,
    name: '冰箱',
    icon: 'icon-ref'
  },
  {
    id: 6,
    name: '暖气',
    icon: 'icon-Heat'
  },
  {
    id: 7,
    name: '电视',
    icon: 'icon-vid'
  },
  {
    id: 8,
    name: '热水器',
    icon: 'icon-heater'
  },
  {
    id: 9,
    name: '宽带',
    icon: 'icon-broadband'
  },
  {
    id: 10,
    name: '沙发',
    icon: 'icon-sofa'
  }
]

class HousePackage extends Component {
  state  ={
    selectedValue:[]
  }
  toggleSelect = (value) =>　{
    if(!this.props.select) return 
    let newSelect = [...this.state.selectedValue]
    if(newSelect.includes(value)) {
      newSelect = newSelect.filter(item=>item.id!== value.id)
    }else {
      newSelect.push(value)
    }
    this.setState({
      selectedValue:newSelect
    },()=>{
      this.props.onSelect && this.props.onSelect(this.state.selectedValue)
    })
  }
  renderItem = () => {
    let data = null
    if (this.props.list) {
      data = HOUSE_PACKAGE.filter(item => this.props.list.includes(item.name))
    }else {
      data = HOUSE_PACKAGE
    }
    return data.map(item => {
      return (
        <li className={classNames(styles.item,{[styles.active]:this.state.selectedValue.includes(item)})} key={item.id}>
          <p>
            <i className={`iconfont ${item.icon} ${styles.icon}`} onClick={()=>this.toggleSelect(item)}></i>
          </p>
          {item.name}
        </li>
      )
    })
  }
  render() {
    return <ul className={styles.root}>{this.renderItem()}</ul>
  }
}
// 约束从父组件获取到的数据list
HousePackage.propTypes = {
  list: PropTypes.array
}
export default HousePackage
