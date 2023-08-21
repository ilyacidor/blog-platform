import React from 'react'
import { Link } from 'react-router-dom'

import styles from './not-authorized.module.css'

const NotAuthorized = () => {
  return (
    <div className={styles['user-links']}>
      <Link to="/sign-in" className={styles['sign-in']}>
        Sign In
      </Link>
      <Link to="/sign-up" className={styles['sign-up']}>
        Sign Up
      </Link>
    </div>
  )
}

export default NotAuthorized
