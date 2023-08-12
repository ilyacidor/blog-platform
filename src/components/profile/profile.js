import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { updateUser, clearError } from '../../redux/user-slice'

import '../../forms.css'

const Profile = () => {
  const error = useSelector((state) => state.user.error)
  let user = useSelector((state) => state.user.user)
  if (!user.username)
    user = {
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
      token: sessionStorage.getItem('token'),
      image: sessionStorage.getItem('image'),
    }
  const errorStatus = error === null ? null : error.username ? 'username' : error.email ? 'email' : null
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })
  const navigate = useNavigate()
  const onSubmit = (data) => {
    if (!data.password) data = { ...data, password: sessionStorage.getItem('password') }
    if (!data.image) data = { ...data, image: user.image }
    if (
      data.username === user.username &&
      data.email === user.email &&
      data.password === sessionStorage.getItem('password') &&
      data.image === user.image
    ) {
      alert('You have not made any changes to your profile')
    } else {
      dispatch(clearError())
      dispatch(updateUser(data, user.token))
      navigate('/', { replace: true })
    }
  }
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__title">Edit Profile</h2>
      <label className="form__element">
        Username
        <input
          className="form__input"
          placeholder="Username"
          defaultValue={user.username}
          {...register('username', {
            required: 'The field is required',
            minLength: {
              value: 3,
              message: 'Username must be longer than 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'Username must be shorter than 20 characters',
            },
          })}
        />
      </label>
      <div className="error">
        {errors?.username && <p>{errors?.username?.message || 'Error!'}</p>}
        {errorStatus === 'username' && <p>Username {error.username}</p>}
      </div>
      <label className="form__element">
        Email address
        <input
          className="form__input"
          placeholder="Email address"
          defaultValue={user.email}
          type="email"
          {...register('email', {
            required: 'The field is required',
            pattern: {
              value: /^([A-z0-9_.-]{1,})@([a-z]).([a-z])/i,
              message: 'Email addres must be correct',
            },
          })}
        />
      </label>
      <div className="error">
        {errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}
        {errorStatus === 'email' && <p>Email Address {error.email}</p>}
      </div>
      <label className="form__element">
        New password
        <input
          type="password"
          className="form__input"
          placeholder="New password"
          {...register('password', {
            minLength: {
              value: 6,
              message: 'Password must be longer than 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Password must be shorter than 40 characters',
            },
          })}
        />
      </label>
      <div className="error">{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>
      <label className="form__element">
        Avatar image (url)
        <input type="url" className="form__input" placeholder="Avatar image" {...register('image')} />
      </label>
      <button type="submit" className="form__button">
        Save
      </button>
    </form>
  )
}

export default Profile
