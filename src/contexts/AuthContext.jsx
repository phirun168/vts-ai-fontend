import { createContext, useContext, useEffect, useState } from 'react'
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [access_token, setAccessToken] = useState(
    localStorage.getItem('token') || null
  )
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem('isAdmin')) || 0
  )
  const [menuBar, setMenuBar] = useState(
    JSON.parse(localStorage.getItem('menu_sidebar')) || []
  )
  const getAccessToken = () => localStorage.getItem('token') || null

  const setAccessTokenFn = (access_token) => {
    localStorage.setItem('token', access_token)

    setAccessToken(access_token)
  }

  const removeToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_info')
    localStorage.removeItem('permissions')
    localStorage.removeItem('isAdmin')
    setAccessToken(null)
  }

  const setPermissions = (permissions = []) => {
    localStorage.setItem('permissions', JSON.stringify(permissions))
  }

  const setMenuSideBar = (menu = []) => {
    setMenuBar(menu)
    localStorage.setItem('menu_sidebar', JSON.stringify(menu))
  }

  const getPermissions = () => {
    const permissions = JSON.parse(localStorage.getItem('permissions')) || []
    return permissions.length ? permissions : false
  }

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user_info')) || {}
    return user?.user || {}
  }
  const checkPermission = (code) => {
    if (code === 'vts_dev' && process.env.NODE_ENV === 'development') {
      return true
    }
    const permissions = getPermissions()
    return permissions ? permissions.includes(code) : false
  }
  const setIsAdminFn = (state) => {
    setIsAdmin(state)
    localStorage.setItem('isAdmin', JSON.stringify(state))
  }
  return (
    <AuthContext.Provider
      value={{
        access_token,
        isAdmin,
        checkPermission,
        setPermissions,
        setAccessTokenFn,
        setIsAdminFn,
        getAccessToken,
        user: getUser(),
        removeToken,
        setMenuSideBar,
        menuBar,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
