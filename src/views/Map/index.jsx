import React, { Component } from 'react'
import styles from './index.module.scss'
import Navheader from '../../components/NavHeader'
import { getCurrentCity } from '../../utils/city'
import classNames from 'classnames'

import { Toast } from 'antd-mobile'
import HouseItem from '../../components/HouseItem'
// 为什么需要把Bmap从window中取出来
const BMap = window.BMap
const labelStyle = {
  cursor: 'pointer',
  color: 'rgba(255,255,255)',
  fontSize: '12px',
  border: '0px solid rgba(255,0,0)',
  whiteSpace: 'nowrap',
  textAlign: 'center'
}
export default class Map extends Component {
  state = {
    isShowHouseList: false, //是否显示房源列表
    houseList: [] // 房源列表
  }
  // 在componentDidMount显示地图
  componentDidMount() {
    this.initMap()
  }
  componentWillUnmount() {
    this.map.removeEventListener('touchmove',()=>{})
  }
  initMap = async () => {
    let { label, value } = await getCurrentCity()
    // this.value = value
    // console.log('label value', label, value)
    var map = new BMap.Map('container') // 创建地图实例
    this.map = map

    this.map.addEventListener('touchmove',()=>{
      this.setState({
        isShowHouseList:false
      })
    })
    // var point = new BMap.Point(116.404, 39.915) // 创建点坐标
    // map.centerAndZoom(label, 11)
    // 开启鼠标滚轮缩放
    // map.enableScrollWheelZoom(true)
    //添加控件
    // map.addControl(new BMap.NavigationControl())
    // map.addControl(new BMap.ScaleControl())
    // 地图，卫星，三线(地图方式)
    // map.addControl(new BMap.MapTypeControl());
    // 覆盖物

    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      point => {
        if (point) {
          // 缩放级别
          map.centerAndZoom(point, 11)
          // map.addOverlay(new BMap.Marker(point))
          //添加控件
          map.addControl(new BMap.NavigationControl())
          map.addControl(new BMap.ScaleControl())
          // 添加覆盖物
          this.renderOverLays(value)
        }
      },
      label
    )
  }
  // 圆形覆盖物
  createCircleOverlays = (item, nextZoom) => {
    const {
      coord: { latitude, longitude },
      count,
      label: name,
      value: id
    } = item
    var point = new BMap.Point(longitude, latitude)
    // var point = new BMap.Point(113.903544, 22.552769)
    // console.log("first point",point)
    var opts = {
      position: point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(30, -30) //设置文本偏移量
    }
    var label = new BMap.Label('', opts) // 创建文本标注对象
    label.setStyle(labelStyle)
    // 设置内容
    label.setContent(`
    <div class=${styles.bubble}>
      <p class=${styles.name}>${name}</p>
      <p class=${styles.name}>${count}</p>
    </div>`)

    // 点击label进行第一次的缩小区域
    // 1、给label添加点击事件
    label.addEventListener('click', () => {
      setTimeout(() => {
        this.map.clearOverlays()
      }, 0)

      // 2、重新定义地图的中心位置和缩放级别
      // console.log('进行第二次的覆盖物的渲染')
      this.map.centerAndZoom(point, nextZoom)
      // console.log(point)

      // 加载下一级的覆盖物，并且渲染
      this.renderOverLays(id)
    })
    // 第一次点击了第一层覆盖物时，第一层覆盖物清除，渲染新的地图及覆盖物
    this.map.addOverlay(label)
  }
  createRectOverlays = item => {
    const {
      coord: { latitude, longitude },
      count,
      label: name,
      value: id
    } = item
    var point = new BMap.Point(longitude, latitude)
    var opts = {
      position: point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(-50, -20) //设置文本偏移量
    }
    var label = new BMap.Label('', opts) // 创建文本标注对象
    label.setStyle(labelStyle)
    // 设置内容
    label.setContent(`
    <div class=${styles.rect}>
      <span class=${styles.housename}>${name}</span>
      <span class=${styles.housenum}>${count}</span>
    </div>`)

    // 点击label进行第一次的缩小区域
    // 1、给label添加点击事件
    label.addEventListener('click', e => {
      // console.log(e);

      if (!e || !e.changedTouches) return
      const { clientX, clientY } = e.changedTouches[0]
      // console.log(clientX,clientY)
      const moveX = window.innerWidth / 2 - clientX
      const moveY = (window.innerHeight - 330 + 45) / 2 - clientY
      // console.log(moveX,moveY)
      //  在地图上平移x和y像素
      this.map.panBy(moveX, moveY)
      //  显示房源列表模板
      this.setState({
        isShowHouseList: true
      })
      // 发送请求，获取房源列表
      console.log(id)
      this.getHouseListById(id)
    })
    // 第一次点击了第一层覆盖物时，第一层覆盖物清楚，渲染新的地图及覆盖物
    this.map.addOverlay(label)
  }

  // 封装函数，用以第一次跟第二次圆形覆盖物的，及第三次方形覆盖物
  getTypeAndNextZoom = () => {
    // 方形&圆形，缩放级别
    let type, nextZoom
    let zoom = this.map.getZoom()
    // console.log('zoom:' + zoom)

    if ((zoom > 10) & (zoom < 12)) {
      type = 'circle'
      nextZoom = 13
    } else if ((zoom > 12) & (zoom < 14)) {
      type = 'circle'
      nextZoom = 15
    } else {
      type = 'rect'
    }
    return {
      type,
      nextZoom
    }
  }

  // 获取房源列表
  getHouseListById = async id => {
    console.log(id)
    Toast.loading('拼命加载中...', 0)
    let res = await this.$axios.get(`/houses?cityId=${id}`)
    console.log(res)
    Toast.hide()

    this.setState({
      houseList: res.data.body.list
    })
  }
  renderOverLays = async id => {
    Toast.loading('拼命加载中..', 0)
    // 发送请求，获取经纬度
    let res = await this.$axios.get(`/area/map?id=${id}`)
    Toast.hide()

    // console.log('renderOverLays:', res)

    let { type, nextZoom } = this.getTypeAndNextZoom()
    // console.log('type&nextZoom', type, nextZoom)

    res.data.body.forEach(item => {
      console.log(type)

      if (type === 'circle') {
        // console.log('这是circle')
        this.createCircleOverlays(item, nextZoom)
      } else if (type === 'rect') {
        // console.log('这是rect')
        this.createRectOverlays(item)
      }
    })
  }

  renderHouseList = () => {
    const { isShowHouseList, houseList } = this.state
    return (
      <div className={classNames(styles.houseList, {[styles.show]:isShowHouseList})}>
        {/* <div
        className={[styles.houseList, isShowHouseList ? styles.show : ''].join(
          ' '
        )}
      > */}
        <div className={styles.titleWrap}>
          <div className={styles.listTitle}>房源列表</div>
          <div className={styles.titleMore}>更多房源</div>
        </div>
        <div className={styles.houseItems}>
          {houseList.map(item => {
            return <HouseItem key={item.houseCode} {...item}/>
          })}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.map}>
        <Navheader>地图找房</Navheader>
        {/*创建地图容器元素
地图需要一个HTML元素作为容器，这样才能展现到页面上。这里我们创建了一个div元素。*/}
        <div id="container"></div>
        {/* 渲染房源列表 */}
        {this.renderHouseList()}
      </div>
    )
  }
}
