import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import MainNavigation from './MainNavigation'
import classes from './Layout.module.css'
const Layout = props => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  )
}


export default Layout