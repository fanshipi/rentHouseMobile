import React from 'react'
import PropTypes from 'prop-types' 
import styles from './index.module.scss' 
import {Flex} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import classNames from 'classnames'
function SearchHeader({cityName,history,className}) {
    return (
        <div className={classNames(styles.root,className)}>
            <Flex align="center">
                <div className={styles.searchLeft}>
                    <div className={styles.location} onClick={()=>history.push('/citylist')}>
                        <span>{cityName}</span>
                        <i className="iconfont icon-arrow"></i>
                    </div>
                    <div className={styles.searchForm}>
                        <i className="iconfont icon-search"></i>
                        <span>请输入小区或地址</span>
                    </div>
                </div>
                <i className="iconfont icon-map" onClick={()=>history.push('/map')}></i>
            </Flex>
        </div>
    )
}

SearchHeader.propTypes = {
    cityName:PropTypes.string.isRequired,
    className:PropTypes.string
}
export default withRouter(SearchHeader);