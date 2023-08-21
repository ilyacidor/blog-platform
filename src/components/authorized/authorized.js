import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logOut } from '../../redux/user-slice'

import styles from './authorized.module.css'

const Authorized = () => {
  let user = useSelector((state) => state.user.user)
  if (sessionStorage.length && !user.username)
    user = {
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
      token: sessionStorage.getItem('token'),
      image: sessionStorage.getItem('image'),
    }
  const dispatch = useDispatch()
  return (
    <div className={styles['user-links']}>
      <Link to="/new-article" className={styles['create-article']}>
        Create article
      </Link>
      <Link to="/profile" className={styles.user}>
        <div className={styles['user-data']}>
          {user.username}
          <img className={styles.avatar} src={user.image} alt="avatar" />
        </div>
      </Link>
      <button className={styles['log-out']} onClick={() => dispatch(logOut())}>
        Log Out
      </button>
    </div>
  )
}

export default Authorized
