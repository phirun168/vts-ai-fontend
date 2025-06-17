import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
//
import httpCommon from 'utils/http-common.js'
import { AuthContext } from 'contexts/AuthContext'
//
//
// middleware
const ProtectedRoute = ({ children }) => {
  const { setAccessTokenFn, removeToken, access_token } =
    useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  //
  useEffect(() => {
    if (!access_token) {
      navigate('/login', { state: { from: location.pathname } })
    } else {
      httpCommon
        .get('/admin/refresh_token', {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
          setAccessTokenFn(res.data.accessToken) // Update the token
        })
        .catch((err) => {
          removeToken()
          navigate('/login', { state: { from: location.pathname } })
        })
    }
  }, [location.pathname, access_token, navigate, setAccessTokenFn, removeToken])

  //

  return <React.Fragment>{children}</React.Fragment>
  //
}
//
export default ProtectedRoute
