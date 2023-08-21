import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { updatePage, favoriteArticle, unfavoriteArticle, fetchArticle, fetchArticles } from '../../redux/articles-slice'

const ArticlesListContainer = () => {
  const articles = useSelector((state) => state.articles.articles)
  const article = useSelector((state) => state.articles.currentArticle)
  const currentPage = useSelector((state) => state.articles.page)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticles((currentPage - 1) * 5))
  }, [article, currentPage])
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
  return { articles, currentPage, changePage, changeFavorite }
}

export default ArticlesListContainer
