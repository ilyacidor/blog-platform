import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Link, Routes, Navigate } from 'react-router-dom'
import { Spin } from 'antd'

import ArticlesList from '../articles-list'
import Article from '../article/article'
import Authorized from '../authorized'
import NotAuthorized from '../not-authorized/not-authorized'
import SignUp from '../sign-up'
import SignIn from '../sign-in'
import Profile from '../profile'
import NewArticle from '../new-article'
import EditArticle from '../edit-article'
import NotFoundPage from '../not-found-page'
import RequireAuth from '../require-auth'

import styles from './app.module.css'

const App = () => {
  const status = useSelector((state) => state.user.status)
  const user = useSelector((state) => state.user.user)
  const links = !user.username && !sessionStorage.username ? <NotAuthorized /> : <Authorized />
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
