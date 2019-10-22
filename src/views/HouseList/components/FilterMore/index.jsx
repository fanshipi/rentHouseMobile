import React, { Component } from 'react'
import styles from './index.module.scss'
import FilterFooter from '../FilterFooter'
import classNames from 'classnames'
export default class FilterMore extends Component {
    state ={
        // 选中的标签数组
        // selectedValue:[]
        selectedValue:this.props.defaultValue
    }
  renderRoomType = data => {
    //  console.log(this.props.data);
    // let isSelected = this.state.selectedValue.includes(data.value);
    // console.log(isSelected);
    
    return (
      <div>
        {data.map(item =>{
            {/* console.log(item); */}
            
            const isSelected = this.state.selectedValue.includes(item.value)
            return (
          <div key={item.value} className={classNames(styles.tag,{[styles.tagActive]:isSelected})} onClick={()=>this.selectTag(item.value)}>
            {item.label}
          </div>
        )})}
      </div>
    )
  }
  selectTag = (value) => {
    //   点击标签事件，如果在selecedValue中存在这个点击的标签，则删除selectedValue中的该标签，否则添加
    //   console.log(value);//选中的item的value值
    let {selectedValue} = this.state//保存
    if(selectedValue.includes(value)){
        selectedValue = selectedValue.filter(item=>item != value)
    }else {
        selectedValue.push(value)
    }
    this.setState({
        selectedValue
    })
  } 
  render() {
    const {
      data: { roomType,oriented,floor,characteristic },
      onCancel,
      onSave
    } = this.props
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={onCancel}></div>
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderRoomType(roomType)}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderRoomType(oriented)}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderRoomType(floor)}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderRoomType(characteristic)}</dd>
          </dl>
        </div>
        <div className={styles.footer}>
            <FilterFooter cancelText="清除" onCancel={()=>{this.setState({selectedValue:[]})}} onSave={()=>onSave('more',this.state.selectedValue)}/>
        </div>
      </div>
    )
  }
}
