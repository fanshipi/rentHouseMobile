import React from 'react'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import styles from './index.module.scss'
import classNames from 'classnames'
function NavHeader({ children,history,className,rightContent }) {
  return (
      <NavBar
      className={classNames(styles.title,className) }
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
        rightContent={rightContent}
      >
      {children}
      </NavBar>
  )
}
NavHeader.prototype = {
  children: PropTypes.string.isRequired,
  className:PropTypes.string
}
export default withRouter(NavHeader)
