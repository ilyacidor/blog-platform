import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Link, Routes, useNavigate, Navigate } from 'react-router-dom'
import { Spin } from 'antd'

import ArticlesList from '../articles-list'
import Article from '../article/article'
import SignUp from '../sign-up'
import SignIn from '../sign-in'
import Profile from '../profile'
import NewArticle from '../new-article'
import EditArticle from '../edit-article'
import NotFoundPage from '../not-found-page'
import RequireAuth from '../require-auth'
import { logOut } from '../../redux/user-slice'

import styles from './app.module.css'

const App = () => {
  const error = useSelector((state) => state.user.error)
  const method = useSelector((state) => state.user.method)
  const status = useSelector((state) => state.user.status)
  const navigate = useNavigate()
  useEffect(() => {
    if (error) {
      console.log(error)
      if (method === 'PUT') navigate('profile', { replace: true })
      if (method === 'POST' && (error.username || error.email)) navigate('/sign-up', { replace: true })
      if (method === 'POST' && !error.username && !error.email) navigate('sign-in', { replace: true })
    }
  }, [error, method])
  let user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  if (sessionStorage.length && !user.username)
    user = {
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
      token: sessionStorage.getItem('token'),
      image: sessionStorage.getItem('image'),
    }
  const links = !user.username ? (
    <div className={styles['user-links']}>
      <Link to="/sign-in" className={styles['sign-in']}>
        Sign In
      </Link>
      <Link to="/sign-up" className={styles['sign-up']}>
        Sign Up
      </Link>
    </div>
  ) : (
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
      <button className={styles['nav__button']} onClick={() => dispatch(logOut())}>
        Log Out
      </button>
    </div>
  )
  const content =
    status === 'loading' ? (
      <Spin size="large"></Spin>
    ) : (
      <Routes>
        <Route path="/" element={<ArticlesList />}></Route>
        <Route path="/articles" element={<Navigate to="/" />}></Route>
        <Route path="/articles/:slug" element={<Article />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route
          path="/new-article"
          element={
            <RequireAuth>
              <NewArticle />
            </RequireAuth>
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            <RequireAuth>
              <EditArticle />
            </RequireAuth>
          }
        />
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    )
  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <Link to="/" className={styles['realworld-blog']}>
            Realworld Blog
          </Link>
          {links}
        </nav>
      </header>
      <main className={styles.main}>{content}</main>
    </div>
  )
}

export default App
