import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { updateArticle } from '../../redux/articles-slice'
import { increaseTagsIds, deleteTag, clearTags, createTags } from '../../redux/tags-slice'

import '../../forms.css'

const EditArticle = () => {
  const dispatch = useDispatch()
  const slug = sessionStorage.getItem('slug')
  const article = useSelector((state) => state.articles.currentArticle)
  const { title, description, body, tagList } = article
  const newTagList = tagList.map((el, index) => index)
  useEffect(() => {
    dispatch(createTags(newTagList))
  }, [slug])
  const tagsIds = useSelector((state) => state.tagsIds.tagsIds)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })
  const onIncreaseTags = () => {
    dispatch(increaseTagsIds())
  }
  const onDeleteTag = (id) => {
    dispatch(deleteTag(id))
  }
  const tags = tagsIds.map((id) => {
    return (
      <div className="tag" key={id}>
        <input
          className="form__input"
          placeholder="Tag"
          style={{ width: '300px', marginTop: '4px', marginBottom: '4px' }}
          defaultValue={tagList[id] ? tagList[id] : ''}
          {...register(`tag${id}`, {
            minLength: {
              value: 3,
              message: 'Tag must be longer than 3 characters',
            },
            maxLength: {
              value: 30,
              message: 'Tag must be shorter than 30 characters',
            },
          })}
        />
        <button type="button" className="tag__button" onClick={() => onDeleteTag(id)}>
          Delete
        </button>
        <div className="error">{errors?.tag0 && <p>{errors?.tag0?.message || 'Error!'}</p>}</div>
      </div>
    )
  })
  const navigate = useNavigate()
  const onSubmit = (data) => {
    let tagListt = []
    for (let i = 0; i < tagsIds.length; i++) {
      tagListt.push(data[`tag${i}`])
    }
    const newData = { body: data.body, title: data.title, description: data.description, tagList: tagListt }
    dispatch(updateArticle(newData))
    dispatch(clearTags())
    navigate('/', { replace: true })
  }
  return (
    <form className="form" style={{ width: '938px' }} onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__title">Edit article</h2>
      <label className="form__element">
        Title
        <input
          className="form__input"
          placeholder="Title"
          defaultValue={title}
          {...register('title', {
            required: 'The field is required',
            minLength: {
              value: 3,
              message: 'Title must be longer than 3 characters',
            },
            maxLength: {
              value: 40,
              message: 'Title must be shorter than 40 characters',
            },
          })}
        />
      </label>
      <div className="error">{errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}</div>
      <label className="form__element">
        Short description
        <input
          className="form__input"
          placeholder="Title"
          defaultValue={description}
          {...register('description', {
            required: 'The field is required',
            minLength: {
              value: 3,
              message: 'Title must be longer than 3 characters',
            },
            maxLength: {
              value: 100,
              message: 'Title must be shorter than 100 characters',
            },
          })}
        />
      </label>
      <div className="error">{errors?.description && <p>{errors?.description?.message || 'Error!'}</p>}</div>
      <label className="form__element">
        Text
        <textarea
          className="form__textarea"
          placeholder="Text"
          defaultValue={body}
          {...register('body', {
            required: 'The field is required',
          })}
        />
      </label>
      <div className="error">{errors?.body && <p>{errors?.body?.message || 'Error!'}</p>}</div>
      <div className="tags">
        <p className="tags__title">Tags</p>
        {tags}
        <button type="button" className="tags__button" onClick={onIncreaseTags}>
          Add tag
        </button>
      </div>
      <button type="submit" className="form__button">
        Send
      </button>
    </form>
  )
}

export default EditArticle
