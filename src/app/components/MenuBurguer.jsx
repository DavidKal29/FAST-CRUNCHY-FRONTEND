import React from 'react'

export default function MenuBurguer({menu,user,logout,deleteProfile}) {
  return (
    <div className={`
        fixed top-0 left-0 h-screen w-[80%] max-w-[400px] sm:max-w-[500px] md:max-w-[600px]
        bg-yellow-600 flex justify-center items-start
        p-3 pt-6 sm:pt-8 md:pt-10
        overflow-y-auto
        z-[10]
        transition-all duration-300
        ${menu ? 'left-0' : 'left-[-2000px]'}
    `}>
    
        {/* Contenedor negro que ocupa todo el alto */}
        <div className='bg-black w-full h-full rounded-[20px] px-4 sm:px-6 md:px-8 flex flex-col'>
                        
            {/* Cabecera */}
            <div className='flex items-center gap-3 p-4 border-b-2 border-yellow-600 mb-4'>
                <i className="fa-regular fa-circle-user text-yellow-600 text-[35px] sm:text-[40px] md:text-[50px]"></i>
                <div>
                    <p className='text-white font-semibold text-[20px] sm:text-[22px] md:text-[26px]'>{user?.name}</p>
                    <p className='text-gray-200 text-sm sm:text-[14px] md:text-[16px]'>{user?.email}</p>
                </div>     
            </div>
    
            {/* Sección CUENTA */}
            <div className='flex flex-col gap-4 flex-1 overflow-y-auto'>
                <span className='text-white font-bold text-[16px] sm:text-[18px] md:text-[20px]'>CUENTA</span>
    
                {/* Opciones */}
                <div className='flex flex-col gap-3'>
                    {/* Mi perfil */}
                    <a href='/editProfile' className='flex items-center bg-[#363333] rounded-[10px] p-3'>
                        <i className="fa-solid fa-user text-yellow-600 mr-3 text-[16px] sm:text-[18px] md:text-[20px]"></i>
                        <p className='text-white font-semibold text-[16px] sm:text-[18px] md:text-[20px]'>Mi perfil</p>
                    </a>

                    {/* Productos */}
                    <a href='/products' className='flex items-center bg-[#363333] rounded-[10px] p-3'>
                        <i className="fa-solid fa-utensils text-yellow-600 mr-3 text-[16px] sm:text-[18px] md:text-[20px]"></i>
                        <p className='text-white font-semibold text-[16px] sm:text-[18px] md:text-[20px]'>Productos</p>
                    </a>
    
                    {/* Mis direcciones */}
                    <a href='/addresses' className='flex items-center bg-[#363333] rounded-[10px] p-3'>
                        <i className="fa-solid fa-location-dot text-yellow-600 mr-3 text-[16px] sm:text-[18px] md:text-[20px]"></i>
                        <p className='text-white font-semibold text-[16px] sm:text-[18px] md:text-[20px]'>Mis direcciones</p>
                    </a>
    
                    {/* Últimos pedidos */}
                    <a href='/orders' className='flex items-center bg-[#363333] rounded-[10px] p-3'>
                        <i className="fa-solid fa-folder-open text-yellow-600 mr-3 text-[16px] sm:text-[18px] md:text-[20px]"></i>
                        <p className='text-white font-semibold text-[16px] sm:text-[18px] md:text-[20px]'>Últimos Pedidos</p>
                    </a>
    
                    {/* Borrar cuenta */}
                    {deleteProfile}
                </div>
            </div>
    
            {/* Pie: Cerrar sesión */}
            <div className='mt-4 p-4 border-t-2 border-yellow-600'>
                {logout}
            </div>
    
        </div>
    </div>
  )
}
