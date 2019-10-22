import React, { Component } from 'react'

import NavHeader from '../../components/NavHeader'
import { getCurrentCity,setCity } from '../../utils/city'
import { AutoSizer, List } from 'react-virtualized'

import styles from './index.module.scss'
import { Toast } from 'antd-mobile';

const CITY_TITLE_HEIGHT = 36
const CITY_ROW_HEIGHT = 50
const HOT_CITY = ['深圳','北京','上海','广州']
export default class CityList extends Component {
  constructor() {
    super()
    this.state = {
      cityList: {},
      cityIndex: [],
      indexActive:0
    }
  }
 registerChild = React.createRef()
 
  componentDidMount() {
    this.getCityListData()
  }
  //   获取城市列表
  async getCityListData() {
    let res = await this.$axios.get('/area/city?level=1')
    // console.log(res)
    const obj = {}
    res.data.body.forEach(item => {
      let letter = item.short.substring(0, 1)
      // console.log(letter);

      // 将首字母进行分组到对象中
      if (obj[letter]) {
        obj[letter].push(item)
      } else {
        obj[letter] = [item]
      }
    })
    // console.log(obj);
    // 生成索引数组
    const cityIndex = Object.keys(obj).sort()
    // console.log(cityIndex);

    // hotCity获取热门城市北上广深
    const hotCity = await this.$axios.get('/area/hot')
    // console.log(hotCity)
    // // 给右边的字母索引列添加热门城市项
    cityIndex.unshift('hot')
    obj['hot'] = hotCity.data.body

    cityIndex.unshift('#')
    // locationCity获取当前定位城市-shenzhen
    const city = await getCurrentCity()
    obj['#'] = [city]

    this.setState({
      cityList: obj,
      cityIndex
    })
    // console.log(obj);
    // console.log(this.state.cityList);
  }
  //  虚拟列表
  //   格式化城市首字母
  formatLetter = letter => {
    switch (letter) {
      case '#':
        return '当前城市'
      case 'hot':
        return '热门城市'
      default:
        return letter.toUpperCase()
    }
  }
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style // Style object to be applied to row (to position it)
  }) => {
    //   首字母
    const letter = this.state.cityIndex[index]
    // 城市列表
    const list = this.state.cityList[letter]
    return (
      <div key={key} style={style} className={styles.content}>
        {/* 渲染获取到的城市列表 */}
        <div className={styles.title}>{this.formatLetter(letter)}</div>
        {list.map(item => {
          return (
            <div key={item.value} className={styles.name} onClick={()=>{this.toggleCity(item)}}>
              {item.label}
            </div>
          )
        })}
      </div>
    )
  }
  toggleCity = ({label,value}) => {
    if(!HOT_CITY.includes(label)) {
      Toast.info('该城市无房源',1)
      return
      }
      setCity({label,value})
      this.props.history.goBack()
  }
  //   每行高度
  calRowHeight = ({ index }) => {
    // console.log(index)
    //   return 300;
    // 首字母
    const letter = this.state.cityIndex[index]
    // 城市列表
    const list = this.state.cityList[letter]
    return CITY_TITLE_HEIGHT + list.length * CITY_ROW_HEIGHT
  }
  // 渲染右边索引
  renderRightIndex = () => {
    console.log(this.state.cityIndex)

    return (
      <div>
        {this.state.cityIndex.map((item,index) => {
          return (
            <div key={item} className={styles.words} onClick={()=>this.triggerCityIndex(index)}>
              <span className={this.state.indexActive === index ? styles.indexActive:''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
            </div>
          )
        })}
      </div>
    )
  }
  // 点击城市首字母列表???
  // 通过React.createRef创建ref,将其值赋给一个变量，通过ref挂载到dom节点或者组件实例上，该ref的current属性可以获得到dom节点或者组件的实例
  triggerCityIndex = (index)=>{
    this.registerChild.current.scrollToRow(index)
  }
  // 城市列表滚动条
  onRowsRendered = ({startIndex}) => {
    // console.log(startIndex)
    if(startIndex != this.state.indexActive) {
      this.setState({
        indexActive:startIndex
      })
    }
  }
  render() {
    const { cityIndex } = this.state
    return (
      <div className={styles.cityList}>
        <NavHeader>城市列表</NavHeader>
        {cityIndex.length > 0 && (
          <AutoSizer>
            {({ height, width }) => (
              <List
                ref={this.registerChild}
                height={height}
                rowCount={cityIndex.length}
                rowHeight={this.calRowHeight}
                rowRenderer={this.rowRenderer}
                width={width}
                onRowsRendered={this.onRowsRendered}
                scrollToAlignment="start"
              />
            )}
          </AutoSizer>
        )}
        <div className={styles.rightIndex}>{this.renderRightIndex()}</div>
      </div>
    )
  }
}
