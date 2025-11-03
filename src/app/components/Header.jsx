import React from 'react'
import Menu from './Menu'
import MenuBurguer from './MenuBurguer'
import Logout from './Logout'
import DeleteProfile from './DeleteProfile'
import CartLink from './CartLink'

export default function Header({router,toast,user,setUser,menu,setMenu,cartVisibility}) {
  return (
    <div className='w-full'>
        {/* Menú hamburguesa */}
        <MenuBurguer menu={menu} user={user} logout={<Logout toast={toast} router={router} setUser={setUser}></Logout>}  deleteProfile={<DeleteProfile router={router} toast={toast}></DeleteProfile>}></MenuBurguer>
                                    
        {/* Menu */}
        <Menu menu={menu} setMenu={setMenu} user={user} logout={<Logout toast={toast} router={router} setUser={setUser}></Logout>} deleteProfile={<DeleteProfile router={router} toast={toast}></DeleteProfile>}></Menu>

        {/* Carrito */}
        <div className={`w-full ${cartVisibility ? 'block' : 'hidden'}`}>
            <CartLink></CartLink>
        </div>

    </div>
  )
}
