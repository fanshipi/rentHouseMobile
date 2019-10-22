import React, { Component } from 'react'
import { Flex, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import { getCurrentCity } from '../../utils/city'
import SearchHeader from '../../components/SearchHeader'
import Filter from './components/Filter'
import {
  AutoSizer,
  List,
  WindowScroller,
  InfiniteLoader
} from 'react-virtualized'
import HouseItem from '../../components/HouseItem'
import Affix from '../../components/Affix'
export default class Index extends Component {
  state = {
    cityName: '',
    houseList: null
  }
  filter = {}
  async componentWillMount() {
    const { label, value } = await getCurrentCity()
    this.label = label
    this.value = value
    this.setState({
      cityName: label
    })

    this.getHousesData()
  }
  // 处理从子组件获取到的filter数据
  onFilter = filter => {
    this.filter = filter
    //    console.log(filter);

    this.getHousesData()
  }
  // 获取房源数据
  getHousesData = async (start = 1, end = 20) => {
    Toast.loading('拼命加载中...', 0)
    let res = await this.$axios.get('houses', {
      params: {
        cityId: this.value,
        start,
        end,
        ...this.filter
      }
    })
    Toast.hide()
    //    console.log(res);
    const { count, list } = res.data.body

    // 判断是否数据获取到
    if (count > 0) {
      Toast.info(`共查询到${count}套房源`, 1)
    }
    // this.count = count

    this.setState({
      count,
      houseList: list
    })
    // console.log(this.state.houseList)
  }
  // 渲染房源信息的每一行
  rowRenderer = ({ key, index, style }) => {
    const { houseList } = this.state
    // console.log(houseList)
    const item = houseList[index]
    if (!item) {
      return (
        <div key={key} style={style}>
          <p className={styles.loading}></p>
        </div>
      )
    }
    return (
      <div key={key} style={style}>
        <HouseItem {...item}/>
      </div>
    )
  }
  //   判断一行是否加载完毕//箭头函数的作用
  isRowLoaded = ({ index }) => {
    return !!this.state.houseList[index]
  }
  //   加载更多
  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise(async (resolve, reject) => {
      Toast.loading('正在加载中...', 0)
      const res = await this.$axios.get('/houses', {
        params: {
          cityId: this.value,
          start: startIndex + 1,
          end: stopIndex,
          ...this.filter
        }
      })
      Toast.hide()
      // Store response data in list...
      const { count, list } = res.data.body
      if (count > 0) {
        Toast.info(`共查询到 ${count} 套房源`, 1)
      }
      this.setState({
        count,
        houseList: [...this.state.houseList, ...list]
      })
      resolve()
    })
  }
// 渲染房源列表
  renderHouseList = () => {
    const { count } = this.state
    // console.log(count)

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={count}
      >
        {({ onRowsRendered }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer>
                {({ width }) => (
                  <List
                    autoHeight
                    height={height}
                    rowCount={count}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    rowHeight={120}
                    rowRenderer={this.rowRenderer}
                    onRowsRendered={onRowsRendered}
                    width={width}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    )
  }
  render() {
    return (
      <div className={styles.root}>
        {/* houselist顶部搜索栏 */}
        <Flex className={styles.listHeader}>
          <i
            className="iconfont icon-back"
            style={{ color: 'black', marginTop: '50px' }}
            onClick={() => {
              this.props.history.goBack()
            }}
          ></i>
          <SearchHeader
            cityName={this.state.cityName}
            className={styles.listSearch}
          />
        </Flex>
        {/* Filter */}
        <Affix>
          <Filter onFilter={this.onFilter} />
        </Affix>
        {/* 房源列表 */}
        <div className={styles.houseList}>
          {' '}
          {this.state.houseList && this.renderHouseList()}
        </div>
      </div>
    )
  }
}
