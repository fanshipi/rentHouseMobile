import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import styles from './index.module.scss'
import HouseItem from '../../components/HouseItem'
export default class Rent extends Component {
    state ={
        houseList:[]
    }
    componentDidMount() {
        this.getHouseList()
    }
    getHouseList = async () => {
        let res = await this.$axios.get('/user/houses')
        this.setState({
            houseList:res.data.body
        })
    }
    render() {
        const {houseList} = this.state
        return (
            <div className={styles.root}>
                <NavHeader>我的出租</NavHeader>
                <div className={styles.houses}>
                    {houseList.map(item=>{
                        return <HouseItem key={item.houseCode} {...item}/>
                    })}
                </div >
            </div>
        )
    }
}
