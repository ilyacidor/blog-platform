import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination, ConfigProvider } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import whiteHeart from '../../icons/not-favorite.svg'
import redHeart from '../../icons/favorite.svg'
import ArticlesListContainer from '../article-list-container'
import { updatePage, favoriteArticle, unfavoriteArticle, fetchArticle } from '../../redux/articles-slice'

import styles from './articles-list.module.css'

const ArticlesList = () => {
  const articlesCount = useSelector((state) => state.articles.articlesCount)
  const { currentPage, articles } = ArticlesListContainer()
  const dispatch = useDispatch()
  const changePage = (page) => {
    dispatch(updatePage(page))
  }
  const username = sessionStorage.getItem('username')
  const navigate = useNavigate()
  const changeFavorite = (slug, favorite) => {
    if (!username) navigate('/sign-in', { replace: true })
    if (favorite) {
      dispatch(unfavoriteArticle(slug))
    } else {
      dispatch(favoriteArticle(slug))
    }
    dispatch(fetchArticle(slug))
  }
  const elements = articles.map((el) => {
    let maxId = 1
    const id = el.id
    const tags = el.tagList.map((tag) => (
      <span className={styles.tag} key={maxId++}>
        {tag}
      </span>
    ))
    const createdAt = format(new Date(el.createdAt), 'MMMM dd, yyyy')
    return (
      <li className={styles['articles__item']} key={id}>
        <article className={styles.article}>
          <div className={styles['short-info']}>
            <div className={styles['title-container']}>
              <Link to={`/articles/${el.slug}`}>
                <h2 className={styles.title}>{el.title}</h2>
              </Link>
              <button className={styles.favorite} onClick={() => changeFavorite(el.slug, el.favorited)}>
                <img src={el.favorited ? redHeart : whiteHeart} />
              </button>
              <div className={styles.likes}>{el.favoritesCount}</div>
            </div>
            {tags}
            <p className={styles.description}>{el.description}</p>
          </div>
          <div className={styles.author}>
            <p className={styles.username}>{el.author.username}</p>
            <p className={styles.date}>{createdAt}</p>
            <img className={styles.avatar} src={el.author.image} alt="avatar" width="46px" height="46px" />
          </div>
        </article>
      </li>
    )
  })
  return (
    <ul className={styles.articles}>
      {elements}
      <div className={styles.pagination}>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#1890FF',
              colorPrimary: '#FFFFFF',
            },
          }}
        >
          <Pagination
            current={currentPage}
            total={articlesCount}
            pageSize={5}
            pageSizeOptions={[]}
            onChange={changePage}
          />
        </ConfigProvider>
      </div>
    </ul>
  )
}

export default ArticlesList
