import React from 'react'
import '../../styles/dropdown-user.css'

const DropDownUser = () => {
  return (
    <div className='dropdown-container'>
      <ul className='dropdown-list'>
        <li>Thay đổi thông tin</li>
        <li>Đổi mật khẩu</li>
        <li>Đăng xuất</li>
      </ul>
    </div>
  )
}

export default DropDownUser
