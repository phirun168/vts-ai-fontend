// src/pages/ManageProperty/PlaceListing/Property/ChangeStatus.jsx
import Swal from 'sweetalert2'
import OtherServiceNonBusinessProperty from '../../../../services/ManageProperty/PlaceListing/Other'

/**
 * Ask for confirmation, hit the API, then toast the result.
 * You can import and call this from any component / dropdown item.
 */
function showSuccessToast(nextStatus) {
  Swal.fire({
    toast: false, // normal modal, not top-right toast
    position: 'center',
    showConfirmButton: false,
    timer: 1800,
    html: `
      <div class="swal2-custom-success">
        <div class="swal2-check-wrapper">
          <i class="swal2-icon-check"></i>
        </div>
        <h3>Add to ${nextStatus} Successfully</h3>
        <p>Your place has been added to ${nextStatus.toLowerCase()} successfully</p>
      </div>
    `,
    didOpen: () => {
      /* inject simple CSS once */
      const styleId = 'swal2-custom-success-style'
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = `
          .swal2-custom-success h3   { margin:12px 0 4px; font-size:18px; font-weight:600; }
          .swal2-custom-success p    { margin:0;        font-size:14px; color:#666;          }
          .swal2-check-wrapper       { width:64px; height:64px;
                                        border-radius:50%; background:#F4F9EF;
                                        display:flex; align-items:center; justify-content:center;
                                        margin:0 auto; }
          .swal2-icon-check          { border-radius:50%; width:28px; height:28px;
                                        background:	#FFC000 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='10' viewBox='0 0 14 10'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='2' d='M1 5l3 3 8-7'/%3E%3C/svg%3E") no-repeat center/10px 8px; }
          /* remove default SweetAlert padding so ours looks like the mock */
          .swal2-popup { padding:24px 28px; }
        `
        document.head.appendChild(style)
      }
    },
    backdrop: 'rgba(0,0,0,.25)',
  })
}
const onActive = () => {
  Swal.fire({
    icon: 'success',
    title: 'Updated!',
    text: 'Status change was successful.',
    timer: 2000,
    showConfirmButton: false,
  })
}
export async function updateNonBusinessStatus(
  id,
  preStatus,
  status,
  access_token
) {
  if (!id || !status || !access_token) return
  console.log(status, preStatus, '67yyy somnak')

  /* 1️⃣  Confirm with the user */
  const { isConfirmed } = await Swal.fire({
    title: `${status === 'Active' ? 'Approve' : status === 'In Review' ? 'In Review' : status === 'Inactive' ? 'Inactive' : status === 'Trash' ? 'Trash' : ''} `,
    text: `Status ${preStatus} will change to ${status}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText:
      status === 'Active'
        ? 'Approve'
        : status === 'In Review'
          ? 'Confirm'
          : 'Confirm',
  })
  if (!isConfirmed) return // user pressed “Cancel”

  /* 2️⃣  Do the request */
  try {
    await OtherServiceNonBusinessProperty.updateStatusNonBusinessProperty({
      doc: { id: id, status: status },
      access_token,
    })
    status === 'In Review'
      ? showSuccessToast(status === 'In Review' ? 'In-Review' : status)
      : ''
    /* 3️⃣  Success toast */
    status === 'Active' || status === 'Inactive' ? onActive() : ''
  } catch (err) {
    /* 4️⃣  Error alert */
    Swal.fire({
      icon: 'error',
      title: 'Oops…',
      text: 'Could not update status. Please try again.',
    })
    throw err // re-throw if caller wants to refetch
  }
}

/* ────────────────────────────────────────────────────────────
   Optional side-effect component (kept unchanged, just imports)
────────────────────────────────────────────────────────────── */
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext'

export default function ChangeStatus({ id, status }) {
  const { access_token } = useContext(AuthContext)

  useEffect(() => {
    updateNonBusinessStatus(id, status, access_token)
  }, [id, status, access_token])

  return null // renders nothing – pure side-effect
}
