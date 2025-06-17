import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { PERMS } from '../../../constants/permission/perms'

export default function BlankPage() {
  const { access_token, checkPermission } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!checkPermission(PERMS.MANAGE_BLANK_PAGE)) {
      navigate('/', { replace: true })
    }
  }, [checkPermission, navigate])
  if (!checkPermission(PERMS.MANAGE_BLANK_PAGE)) {
    return null
  }
  return <div>BlankPage</div>
}
