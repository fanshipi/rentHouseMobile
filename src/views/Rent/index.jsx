import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import styles from './index.module.scss'
export default class Rent extends Component {
    render() {
        return (
            <div className={styles.root}>
                <NavHeader>我的出租</NavHeader>
            </div>
        )
    }
}
