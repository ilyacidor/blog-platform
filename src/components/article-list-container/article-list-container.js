import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchArticles } from '../../redux/articles-slice'

const ArticlesListContainer = () => {
  const articles = useSelector((state) => state.articles.articles)
  const article = useSelector((state) => state.articles.currentArticle)
  const currentPage = useSelector((state) => state.articles.page)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticles((currentPage - 1) * 5))
  }, [article, currentPage])
  return { articles, currentPage }
}

export default ArticlesListContainer
