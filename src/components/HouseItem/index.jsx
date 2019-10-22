import React from 'react'
import styles from './index.module.scss'
import { BASEURL } from '../../utils/url'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

function HouseItem({ houseCode, houseImg, title, desc, tags, price,history }) {
  return (
    <div className={styles.house} onClick={()=>history.push(`/detail/${houseCode}`)}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={`${BASEURL}${houseImg}`} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.desc}>{desc}</div>
        {tags.map((tag, index) => {
          const tagName = `tag${(index % 3) + 1}`

          return (
            <span key={tag} className={classNames(styles.tag, styles[tagName])}>
              {tag}
            </span>
          )
        })}
        <div className={styles.price}>
          <span className={styles.priceNum}>{price}</span> 元/月
        </div>
      </div>
    </div>
  )
}

HouseItem.propTypes = {
  houseCode: PropTypes.string.isRequired,
  houseImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  tags: PropTypes.array,
  price: PropTypes.number.isRequired
}

export default withRouter(HouseItem)
