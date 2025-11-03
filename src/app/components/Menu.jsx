import React from 'react'
import HomeLink from './HomeLink'
import LoginLink from './LoginLink'

export default function Menu({menu,setMenu,user,logout,deleteProfile}) {
  return (
    <div className='flex justify-between items-center w-full border-b-yellow-600 border-b-2 md:border-b-4 mx-4 xl:h-[10rem]'>
        <HomeLink></HomeLink>
        {
            user ? 
            (<>
                <button onClick={()=>{setMenu(!menu)}} className='cursor-pointer xl:hidden'><i className={`fa-solid fa-${menu ? 'x' : 'bars'} text-white text-[25px] md:text-[35px]`}></i></button>

                {/* Opciones */}
                <div className='flex justify-center items-center gap-4 hidden xl:flex'>
                    {/* Mi perfil */}
                    <a href='/editProfile' className='flex items-center bg-[#363333] rounded-[10px] px-4 py-2'>
                        <i className="fa-solid fa-user text-yellow-600 mr-1 text-[16px]"></i>
                        <p className='text-white font-semibold text-[16px]'>Mi perfil</p>
                    </a>

                    {/* Productos */}
                    <a href='/products' className='flex items-center bg-[#363333] rounded-[10px] px-4 py-2'>
                        <i className="fa-solid fa-utensils text-yellow-600 mr-1 text-[16px]"></i>
                        <p className='text-white font-semibold text-[16px]'>Productos</p>
                    </a>
    
                    {/* Mis direcciones */}
                    <a href='/addresses' className='flex items-center bg-[#363333] rounded-[10px] px-4 py-2'>
                        <i className="fa-solid fa-location-dot text-yellow-600 mr-1 text-[16px]"></i>
                        <p className='text-white font-semibold text-[16px]'>Mis direcciones</p>
                    </a>
    
                    {/* Últimos pedidos */}
                    <a href='/orders' className='flex items-center bg-[#363333] rounded-[10px] px-4 py-2'>
                        <i className="fa-solid fa-folder-open text-yellow-600 mr-1 text-[16px]"></i>
                        <p className='text-white font-semibold text-[16px]'>Últimos Pedidos</p>
                    </a>
    
                    {/* Borrar cuenta */}
                    {deleteProfile}

                    {/* Logout */}
                    {logout}
                </div>
            </>) 
                        
            : 
                        
            (<><LoginLink></LoginLink></>)
        }
    </div>
  )
}
