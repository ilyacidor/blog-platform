import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { getUser, clearError } from '../../redux/user-slice'

import '../../forms.css'

const SignIn = () => {
  const error = useSelector((state) => state.user.error)
  const method = useSelector((state) => state.user.method)
  const navigate = useNavigate()
  useEffect(() => {
    if (!error && method === 'POST(sign-in)') navigate('/', { replace: true })
  }, [error, method])
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(clearError())
    sessionStorage.setItem('password', data.password)
    dispatch(getUser(data))
  }
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__title">Sign In</h2>
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
      <div className="error">{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>
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
      <div className="error">
        {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
        {error && !errors?.password && <p>Email Address or Password is not correct</p>}
      </div>
      <button type="submit" className="form__button">
        Login
      </button>
      <p className="form__clue">
        Don’t have an account?
        <Link to="/sign-up" className="link">
          Sign Up.
        </Link>
      </p>
    </form>
  )
}

export default SignIn
