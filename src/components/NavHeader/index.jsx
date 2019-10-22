import React from 'react'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import styles from './index.module.scss'
function NavHeader({ children,history }) {
  return (
      <NavBar
      className={styles.title }
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.push('/home')}
      >
      {children}
      </NavBar>
  )
}
NavHeader.prototype = {
  children: PropTypes.string.isRequired
}
export default withRouter(NavHeader)
