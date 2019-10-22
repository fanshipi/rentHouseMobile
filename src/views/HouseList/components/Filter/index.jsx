import React, { Component } from 'react'
import styles from './index.module.scss'
import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import { getCurrentCity } from '../../../../utils/city'

import { Spring } from 'react-spring/renderprops'

export default class Filter extends Component {
  state = {
    titleSelectedStatus: {
      area: false,
      mode: false,
      price: true,
      more: false
    },
    openType: '', //记录当前打开的类型
    // 从服务器获取数据
    filterDate: {},
    selectValues: {
      area: ['area', 'null'],
      mode: ['null'],
      price: ['null'],
      more: []
    }
  }
  componentDidMount() {
    this.getFilterData()
  }
  async getFilterData() {
    const { value } = await getCurrentCity()
    let res = await this.$axios.get(`/houses/condition?id=${value}`)
    // console.log(res)
    this.setState({
      filterDate: res.data.body
    })
  }
  onTitleChange = type => {
    const { titleSelectedStatus } = this.state
    this.setState(
      {
        openType: type,
        titleSelectedStatus: {
          ...titleSelectedStatus,
          [type]: true
        }
      },
      () => {
        this.changeTitleSelectedStatus(type)
      }
    )
  }
  // 区域，方式，租金，筛选切换
  changeTitleSelectedStatus = type => {
    const { titleSelectedStatus, selectValues } = this.state
    // key为各选项
    Object.keys(titleSelectedStatus).forEach(key => {
      if (key === 'area') {
        titleSelectedStatus[key] = selectValues[key][1] !== 'null'
      } else if (key === 'mode' || key === 'price') {
        titleSelectedStatus[key] = selectValues[key][0] !== 'null'
      } else if (key === 'more') {
        // 如果筛选项的数据长度大于0，则证明选中了'more'
        titleSelectedStatus[key] = selectValues[key].length > 0
      }
    })
    if (type) {
      titleSelectedStatus[type] = true
    }
    this.setState({
      titleSelectedStatus
    })
  }
  // 区域，方式，租金====》箭头函数的作用，获取当前的this
  renderFilterPicker = () => {
    const {
      openType,
      filterDate: { area, price, rentType, subway },
      selectValues
    } = this.state
    // console.log(openType) //''
    if (openType === '' || openType === 'more') return null
    var defaultValue = selectValues[openType]
    let data = null
    let cols = 1
    switch (openType) {
      case 'area':
        cols = 3
        data = [area, subway]
        break
      case 'mode':
        data = rentType
        break
      case 'price':
        data = price
        break
      default:
        break
    }
    return (
      <FilterPicker
        data={data}
        cols={cols}
        type={openType}
        onCancel={this.onCancel}
        onSave={this.onSave}
        defaultValue={defaultValue}
      />
    )
  }
  // 筛选
  renderFilterMore = () => {
    const {
      openType,
      filterDate: { roomType, oriented, floor, characteristic },
      selectValues
    } = this.state
    if (openType !== 'more') return null
    const data = { roomType, oriented, floor, characteristic }
    // 传递默认值
    const defaultValue = selectValues['more']
    return (
      <FilterMore
        defaultValue={defaultValue}
        data={data}
        onCancel={this.onCancel}
        onSave={this.onSave}
      />
    )
    // 将data数据传递给FilterMore
  }
  onCancel = () => {
    this.setState(
      {
        openType: ''
      },
      () => {
        this.changeTitleSelectedStatus()
      }
    )
  }
  onSave = (type, value) => {
    const { selectValues } = this.state
    this.setState(
      {
        openType: '',
        selectValues: {
          ...selectValues,
          [type]: value
        }
      },
      () => {
        this.changeTitleSelectedStatus()

        const { selectValues } = this.state
        const filter = {}
        // key = 'area'
        const key = selectValues['area'][0]
        if (selectValues['area'].length === 2) {
          filter[key] = null
        } else if (selectValues['area'].length === 3) {
          filter[key] =
            selectValues['area'][2] === 'null'
              ? selectValues['area'][1]
              : selectValues['area'][2]
        }

        filter.rentType = selectValues['mode'][0]
        filter.price = selectValues['price'][0]
        filter.more = selectValues['more'].join(',')
        this.props.onFilter && this.props.onFilter(filter)
      }
    )
  }
  renderMask = () => {
    const { openType } = this.state
    // if (openType === '' || openType === 'more') return null
    const isHidden = openType === '' || openType === 'more'
    // console.log("isHidden:",isHidden);
    //opacity:0~1 1为完全不透明

    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: isHidden ? 0 : 1 }}
        config={{ duration: 300 }}
      >
        {props => {
          if (props.opacity === 0) return null
          return (
            <div
              style={props}
              className={styles.mask}
              onClick={() => this.onCancel()}
            ></div>
          )
        }}
      </Spring>
    )
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 遮罩 */}
        {this.renderMask()}
        {/* 内容 */}
        <div className={styles.content}>
          {/* title */}
          <FilterTitle
            titleSelectedStatus={this.state.titleSelectedStatus}
            onTitleChange={this.onTitleChange}
          />

          {/* 区域，方式，租金 */}
          {this.renderFilterPicker()}
          {/*筛选 */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}


