import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Markdown from 'markdown-to-jsx'
import { format } from 'date-fns'
import { Spin } from 'antd'

import whiteHeart from '../../icons/not-favorite.svg'
import redHeart from '../../icons/favorite.svg'
import alert from '../../icons/alert.svg'
import { fetchArticle, deleteArticle, favoriteArticle, unfavoriteArticle } from '../../redux/articles-slice'

import styles from './article.module.css'

const Article = () => {
  const [popupStyle, setPopupStyle] = useState('none')
  const status = useSelector((state) => state.articles.status)
  const element = useParams()
  const { slug } = element
  sessionStorage.setItem('slug', slug)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticle(slug))
  }, [slug])
  const article = useSelector((state) => state.articles.currentArticle)
  let { title, description, createdAt, favoritesCount, author, tagList, body, favorited } = article
  let maxId = 1
  const tags = tagList.map((tag) => (
    <span className={styles.tag} key={maxId++}>
      {tag}
    </span>
  ))
  const navigate = useNavigate()
  createdAt = format(new Date(createdAt), 'MMMM dd, yyyy')
  const onDeleteArticle = () => {
    dispatch(deleteArticle(slug))
    navigate('/', { replace: true })
  }
  const changePopupStyle = () => {
    let newPopupStyle = popupStyle === 'none' ? 'block' : 'none'
    setPopupStyle(newPopupStyle)
  }
  const changeFavorite = () => {
    if (favorited) {
      dispatch(unfavoriteArticle(slug))
    } else {
      dispatch(favoriteArticle(slug))
    }
  }
  const buttons =
    author.username === sessionStorage.getItem('username') ? (
      <div className={styles.buttons}>
        <button type="button" className={styles.button} onClick={changePopupStyle}>
          Delete
        </button>
        <Link to={`/articles/${slug}/edit`} className={styles.link}>
          Edit
        </Link>
        <div className={styles.popup} style={{ display: popupStyle }}>
          <img src={alert} alt="alert" className={styles['popup__image']} />
          <p className={styles['popup__text']}>Are you sure to delete this article?</p>
          <button type="button" className={styles['popup__button']} onClick={changePopupStyle}>
            No
          </button>
          <button type="button" className={styles['popup__button']} onClick={onDeleteArticle}>
            Yes
          </button>
        </div>
      </div>
    ) : null
  const content =
    status === 'loading' ? (
      <Spin></Spin>
    ) : (
      <div className={styles.article}>
        <div className={styles['short-info']}>
          <div className={styles['title-container']}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.favorite} onClick={changeFavorite}>
              <img src={favorited ? redHeart : whiteHeart} className={styles.favorite} />
            </button>
            <div className={styles.likes}>{favoritesCount}</div>
          </div>
          {tags}
          <p className={styles.description}>{description}</p>
        </div>
        <section className={styles.body}>
          <Markdown>{body}</Markdown>
        </section>
        <div className={styles.author}>
          <p className={styles.username}>{author.username}</p>
          <p className={styles.date}>{createdAt}</p>
          <img className={styles.avatar} src={author.image} alt="avatar" width="46px" height="46px" />
        </div>
        {buttons}
      </div>
    )
  return <div>{content}</div>
}

export default Article
