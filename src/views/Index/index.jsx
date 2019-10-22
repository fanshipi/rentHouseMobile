import React, { Component } from 'react'
import { Carousel, Flex, Grid,WingBlank } from 'antd-mobile'
import { BASEURL } from '../../utils/url'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import SearchHearder from '../../components/SearchHeader'
import {getCurrentCity,setCity} from '../../utils/city'

import image1 from '../../assets/images/nav-1.png'
import image2 from '../../assets/images/nav-2.png'
import image3 from '../../assets/images/nav-3.png'
import image4 from '../../assets/images/nav-4.png'
export default class Index extends Component {
  constructor() {
    super()
    this.state = {
      // sliper
      imgHeight: 176,
      slider: [],
      isLoadingSlider: true,
      // 租房小组
      groupData: [],
      newsList:[],
      cityName:'深圳'
    }
  }

  //导航图标
  navs = [
    { icon: image1, text: '整租', path: '/home/list' },
    { icon: image2, text: '合租', path: '/home/list' },
    { icon: image3, text: '地图找房', path: '/map' },
    { icon: image4, text: '去租房', path: '/rent/ass' }
  ]
  componentDidMount() {
    //   请求接口
    this.loadSliderImg()
    this.getRendGroupImg()
    this.renderNews()
    this.getNewsList();
    // 获取当前城市
    this.loadLocationCity()
  }
  async loadLocationCity () {
    let res = await getCurrentCity()
    console.log(res);//{label,value}
    this.setState({
      cityName:res.label
    })
    
  }
  // 加载轮播图图片
  async loadSliderImg() {
    let res = await this.$axios.get('/home/swiper')
    // console.log(res)
    this.setState({
      isLoadingSlider: false,
      slider: res.data.body
    })
  }
  // swiper
  renderSlider() {
    return (
      <Carousel autoplay infinite>
        {this.state.slider.map(item => (
          <a
            key={item.id}
            href="http://www.alipay.com"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              className={styles.imgSrc}
              src={`${BASEURL}${item.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  // navs
  renderNavs() {
    return (
      <Flex className={styles.nav}>
        {this.navs.map(item => (
          <Flex.Item key={item.text}>
            <Link to={item.path}>
              <img src={item.icon} alt="" />
              <p>{item.text}</p>
            </Link>
          </Flex.Item>
        ))}
      </Flex>
    )
  }
  // 加载租房小组里面的图片
  async getRendGroupImg() {
    let res = await this.$axios.get(
      '/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
    )
    // console.log(res);
    this.setState({
      groupData: res.data.body
    })
  }
  // rendGroup
  renderRendGroup() {
    return (
      <div className={styles.rendGroup}>
        <Flex justify="between">
          <Flex.Item className={styles.title}  style={{margin:'5px'}}>租房小组</Flex.Item>
          <Flex.Item align="end">
            <Link to="more">更多</Link>
          </Flex.Item>
        </Flex>
        <Grid
          className={styles.rendGrid}
          data={this.state.groupData}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={dataItem => (
            <div className={styles.navItem}>
              <div className={styles.left}>
                <p>{dataItem.title}</p>
                <p>{dataItem.desc}</p>
              </div>
              <div className={styles.right}>
                <img
                  src={`${BASEURL}${dataItem.imgSrc}`}
                  style={{ width: '50px', height: '50px' }}
                  alt=""
                />
              </div>
            </div>
          )}
        />
      </div>
    )
  }
  // 最新咨询
  async getNewsList( ){
    let res = await this.$axios.get('/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
    // console.log(res);
    this.setState({
      newsList:res.data.body
    })
    
  }
  renderNews(){
    return (
      <div className={styles.news}>
        <h3 style={{margin:'12px 15px'}} className={styles.groupTitle}>最新咨询</h3>
        <div>
          {this.state.newsList.map(item=>{
            return (
              <WingBlank key={item.id} className={styles.newsWrap}>
                <div className={styles.newsListImg}>
                  <img src={`${BASEURL}${item.imgSrc}`} alt=""/>
                </div>
                <Flex className={styles.newsListCon} direction="column" justify="around">
                  <h3 className={styles.conTitle}>{item.title}</h3>
                  <Flex className={styles.newsListFrom} justify="between" style={{padding:'0 10px'}}>
                  <span>{item.from}&nbsp;&nbsp;</span>
                  <span>{item.date}</span>
                  </Flex>
                </Flex>
              </WingBlank>
            )
          })}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.slider}>
          {/* city搜索 */}
          <SearchHearder cityName={this.state.cityName} />
          {!this.state.isLoadingSlider && this.renderSlider()}
        </div>
        {/* nav */}
        {this.renderNavs()}
        {/*  租房小组*/}
        {this.renderRendGroup()}
        {/* 最新咨询 */}
        {this.renderNews()}
      </div>
    )
  }
}
