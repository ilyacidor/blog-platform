import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { registerUser, clearError } from '../../redux/user-slice'

import '../../forms.css'

const SignUp = () => {
  const error = useSelector((state) => state.user.error)
  const errorStatus = error === null ? null : error.username ? 'username' : error.email ? 'email' : null
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })
  const navigate = useNavigate()
  const onSubmit = (data) => {
    if (data.password === data.repeatPassword) {
      dispatch(clearError())
      dispatch(registerUser(data))
      navigate('/', { replace: true })
    } else {
      alert('Repeat password does not match password')
    }
  }
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__title">Create new account</h2>
      <label className="form__element">
        Username
        <input
          className="form__input"
          placeholder="Username"
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
        {errorStatus === 'email' && <p>Email address {error.email}</p>}
      </div>
      <label className="form__element">
        Password
        <input
          type="password"
          className="form__input"
          placeholder="Password"
          {...register('password', {
            required: 'The field is required',
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
        Repeat Password
        <input
          type="password"
          className="form__input"
          placeholder="Password"
          {...register('repeatPassword', {
            required: 'The field is required',
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
      <div className="error">{errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'Error!'}</p>}</div>
      <label className="check">
        <input type="checkbox" className="check__input" required />
        <span className="check__box"></span>I agree to the processing of my personal information
      </label>
      <button type="submit" className="form__button">
        Create
      </button>
      <p className="form__clue">
        Already have an account?
        <Link to="/sign-in" className="link">
          Sign In.
        </Link>
      </p>
    </form>
  )
}

export default SignUp
