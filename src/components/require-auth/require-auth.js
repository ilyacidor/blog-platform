import { useLocation, Navigate } from 'react-router-dom'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  if (!sessionStorage.getItem('username')) {
    return <Navigate to="/sign-in" state={{ from: location }}></Navigate>
  }

  return children
}

export default RequireAuth
