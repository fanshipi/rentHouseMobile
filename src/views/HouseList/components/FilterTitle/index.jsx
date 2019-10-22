import React from 'react'
import styles from './index.module.scss'
import { Flex } from 'antd-mobile'
import classNames from 'classnames'
import PropTypes from 'prop-types'
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]
function FilterTitle({titleSelectedStatus,onTitleChange}) {
  return (
    <div className={styles.root}>
      <Flex>
        {titleList.map(item => {
          {/* console.log(titleSelectedStatus) */}
          const isSelected = titleSelectedStatus[item.type]
          {/* console.log(isSelected); */}
          
          return (
            <Flex.Item key={item.type} onClick={()=>onTitleChange(item.type)}>
              <span
                className={classNames(styles.dropdown, {
                  [styles.selected]: isSelected
                })}
              >
                <span>{item.title}</span>
                <i className="iconfont icon-arrow"></i>
              </span>
            </Flex.Item>
          )
        })}
      </Flex>
    </div>
  )
}

FilterTitle.propsType = {
  titleSelectedStatues:PropTypes.object.isRequired,
  onTitleChange:PropTypes.func.isRequired
}
export default FilterTitle
