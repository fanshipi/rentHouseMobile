import React, { Component } from 'react'
import styles from './index.module.scss'
import NavHeader from '../../components/NavHeader'
import { Carousel, Flex } from 'antd-mobile'
import { BASEURL } from '../../utils/url'
import classNames from 'classnames'
import HousePackage from '../../components/HousePackage'
import HouseItem from '../../components/HouseItem'
let BMap = window.BMap

const recommendHouses = [
  {
    id: 1,
    houseCode: '5cc477061439630e5b467b0b',
    houseImg: '/newImg/7bk83o0cf.jpg',
    desc: '72.32㎡/南 北/低楼层',
    title: '安贞西里 3室1厅',
    price: 4500,
    tags: ['随时看房']
  },
  {
    id: 2,
    houseCode: '5cc4a1dd1439630e5b502266',
    houseImg: '/newImg/7bk83o0cf.jpg',
    desc: '83㎡/南/高楼层',
    title: '天居园 2室1厅',
    price: 7200,
    tags: ['近地铁']
  },
  {
    id: 3,
    houseCode: '5cc46a921439630e5b439611',
    houseImg: '/newImg/7bk83o0cf.jpg',
    desc: '52㎡/西南/低楼层',
    title: '角门甲4号院 1室1厅',
    price: 4300,
    tags: ['集中供暖']
  }
]

export default class Detail extends Component {
  constructor() {
    super()
    this.state = {
      imgHeight: 176,
      houseDetailInfo: {
        community: '',
        oriented: []
      }
    }
  }
  componentDidMount() {
    // Carouser
    this.getHouseInfoCarouser()
  }
  // 获取轮播图
  getHouseInfoCarouser = async () => {
    // console.log(this.props);
    let res = await this.$axios.get(`/houses/${this.props.match.params.id}`)

    this.setState(
      {
        houseDetailInfo: res.data.body
      },
      () => {
        // 获取到数据后就初始化地图
        this.initMap()
      }
    )
  }
  //   渲染轮播图
  renderCarouser = () => {
    const {
      houseDetailInfo: { houseImg }
    } = this.state
    return (
      <Carousel
        className="space-carousel"
        frameOverflow="hidden"
        cellSpacing={10}
        slideWidth={0.8}
        autoplay
        infinite
        afterChange={index => this.setState({ slideIndex: index })}
      >
        {houseImg.map((val, index) => (
          <a
            key={val}
            href="http://www.alipay.com"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`${BASEURL}${val}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  //渲染房屋信息
  renderHouseInfo = () => {
    const {
      houseDetailInfo: { title, tags, price, roomType, size, floor, oriented }
    } = this.state
    // console.log(oriented);//刚开始初始值为undefined

    return (
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <Flex>
          {tags &&
            tags.map((item, index) => {
              const tagName = `tag${(tags % 3) + 1}`
              return (
                <span
                  key={index}
                  className={classNames(styles.tag, styles[tagName])}
                >
                  {item}
                </span>
              )
            })}
        </Flex>
        <Flex className={styles.infoPrice}>
          <Flex.Item className={styles.infoPriceItem}>
            <div>
              {price}
              <span className={styles.month}>/月</span>
            </div>
            <div>租金</div>
          </Flex.Item>
          <Flex.Item className={styles.infoPriceItem}>
            <div>{roomType}</div>
            <div>房型</div>
          </Flex.Item>
          <Flex.Item className={styles.infoPriceItem}>
            <div>{size}</div>
            <div>面积</div>
          </Flex.Item>
        </Flex>
        <Flex className={styles.infoBasic}>
          <Flex.Item>
            <div>
              <span className={styles.title}>精装:</span>精装修
            </div>
            <div>
              <span className={styles.title}>楼层:</span>
              {floor}
            </div>
          </Flex.Item>
          <Flex.Item>
            <div>
              {/* <span className={styles.title}>朝向:</span>{oriented.join(' ')} */}
              <span className={styles.title}>朝向：</span>
              {oriented.join(' ')}
            </div>
            <div className={styles.title}>类型:</div>普通住宅
          </Flex.Item>
        </Flex>
      </div>
    )
  }
  // 渲染map
  renderMap = () => {
    return (
      <div className={styles.map}>
        <div className={styles.mapTitle}>
          小区：{this.state.houseDetailInfo.community}
        </div>
        <div id="container" className={styles.mapContainer}></div>
      </div>
    )
  }
  //初始化地图
  initMap = () => {
    const {
      houseDetailInfo: {
        community,
        coord: { latitude, longitude }
      }
    } = this.state
    console.log(this.state)

    var map = new BMap.Map('container')
    var point = new BMap.Point(longitude, latitude)
    //中心点和地图缩放级别
    map.centerAndZoom(point, 17)
    var opts = {
      position: point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(30, -30) //设置文本偏移量
    }
    var label = new BMap.Label('', opts) // 创建文本标注对象
    label.setStyle({
      position: 'absolute',
      zIndex: -1,
      backgroundColor: 'rgb(238, 93, 91)',
      color: 'rgb(255, 255, 255)',
      height: 25,
      padding: '5px 10px',
      lineHeight: '14px',
      borderRadius: 3,
      boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
      whiteSpace: 'nowrap',
      fontSize: 12,
      userSelect: 'none'
    })
    label.setContent(`
    <span>${community}</span>
    <div class='${styles.mapArrow}'></div>
    `)
    map.addOverlay(label)
  }
  //  渲染房屋配套
  renderHouseSupporting = () => {
    const {
      houseDetailInfo: { supporting }
    } = this.state
    return (
      <div className={styles.about}>
        <h3 className={styles.houseTitle}>房屋配套</h3>
        {supporting.length > 0 ? (
          <HousePackage list={supporting} />
        ) : (
          <div>暂无配套</div>
        )}
      </div>
    )
  }
  // 渲染房源概况
  renderHouseDescription = () => {
    return (
      <div className={styles.set}>
        <div className={styles.houseTitle}>房屋概况</div>
        <div className={styles.contact}>
          <div className={styles.user}>
            <img src={BASEURL + '/img/avatar.png'} alt="头像" />
            <div className={styles.userInfo}>
              <div>王女士</div>
              <div className={styles.userAuth}>
                <i className="iconfont icon-auth">已认证房主</i>
              </div>
            </div>
          </div>
          <span className={styles.userMsg}>发消息</span>
        </div>
        <div className={styles.descText}>
          {this.state.houseDetailInfo.description || '暂无房屋描述'}
        </div>
      </div>
    )
  }
  // 猜你喜欢
  renderRecommendHouses = () => {
    return (
      <div className={styles.recommend}>
        <div className={styles.houseTitle}>猜你喜欢</div>
        <div className={styles.items}>
          {recommendHouses.map(item=>{
            return <HouseItem key={item.houseCode} {...item}/>
          })}
        </div>
      </div>
    )
  }
  // 渲染底部
  renderFooter = () =>{
    return (<Flex className={styles.fixedBottom}>
      <Flex.Item>
        <img src="http://localhost:8080/img/unstar.png" alt="收藏" className={styles.favoriteImg} />
        <span className={styles.favorite}>收藏</span>
      </Flex.Item>
      <Flex.Item>在线咨询</Flex.Item>
      <Flex.Item>
        <a href="tel:18688888888" className={styles.telephone}>电话预约</a>
      </Flex.Item>
    </Flex>)
  }
  //   渲染房源title，desc,price,tags
  render() {
    const { houseDetailInfo } = this.state
    return (
      <div className={styles.root}>
        <NavHeader
          className={styles.detailHeader}
          rightContent={[<i className="iconfont icon-share" key="share"></i>]}
        >
          {houseDetailInfo.community}
        </NavHeader>
        {/* 渲染轮播图 */}
        {houseDetailInfo.houseImg && this.renderCarouser()}
        {/* 渲染房屋信息 */}
        {this.renderHouseInfo()}
        {/* renderMap */}
        {this.renderMap()}
        {/* 房屋配套 */}
        {houseDetailInfo.supporting && this.renderHouseSupporting()}
        {/* 渲染房屋概况 */}
        {this.renderHouseDescription()}
        {/* 猜你喜欢 */}
        {this.renderRecommendHouses()}
        {/* 底部 */}
        {this.renderFooter()}
      </div>
    )
  }
}
