import React from 'react'
import { Link } from 'react-router-dom'

import styles from './not-found-page.module.css'

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Oops!</h1>
      <p className={styles.description}>Looks like you got somewhere wrong</p>
      <Link to={'/'} className={styles.link}>
        Click here to return to the main page
      </Link>
    </div>
  )
}

export default NotFoundPage
