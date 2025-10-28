'use client';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import HomeLink from '../components/HomeLink';
import LoginLink from '../components/LoginLink';

export default function Home() {

    const [user,setUser] = useState(null)

    const getProfile = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/profile`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.success) {
                setUser(data.user)
                console.log('Usuario:', data)
            }else{
                console.log(data.error);
                
            }
        })
        .catch(error=>{
            console.log('Error al enviar los datos a Perfil');
            console.error(error);
            toast.error('Error al enviar los datos')  
        })
   
    }

    useEffect(()=>{
        document.title = 'Home'
    },[])

    useEffect(()=>{
        getProfile()
    },[])

    const [domicilio,setDomicilio] = useState(true)

    const pedidoDomicilio = ()=>{
        setDomicilio(true)
    }

    const pedidoRecoger = ()=>{
        setDomicilio(false)
    }

    const [menu,setMenu] = useState(false)

    
    return (
        <div className='bg-black min-h-screen flex flex-col justify-start items-center px-4 py-2 gap-6'>
            {/* Menú hamburguesa */}
            <div className={`bg-orange-500 top-0 absolute h-screen min-h-screen overflow-y-auto w-[80%] fixed flex justify-center items-center max-[360px]:px-4 px-3 ${menu ? 'left-0' : 'left-[-2000px]'} transition-all duration-300`}>
                {/* Div oscuro */}
                <div className='bg-black max-[360px]:w-[15rem] w-[20rem] rounded-[20px] py-2'>
                    
                    {/* Cabecera */}
                    <div className='flex items-center gap-2 p-4 border-b-orange-500 border-b-[2px] mb-2'>
                        <i className="fa-regular fa-circle-user text-orange-500 max-[360px]:text-[30px] text-[35px]"></i>
                        <div className=''>
                            <p className='text-white max-[360px]:text-[15px] text-[20px] font-semibold'>{user?.name}</p>
                            <p className='text-gray-200 text-sm'>{user?.email}</p>
                        </div>     
                    </div>

                    {/* Cuenta */}
                    <div className='flex flex-col p-4 gap-4'>
                        <span className='text-white font-bold'>CUENTA</span>

                        {/* Opciones */}
                        <div className='flex flex-col gap-4 items-start justify-center'>
                            {/* Mi perfil */}
                            <div className='flex bg-[#363333] justify-start items-center rounded-[10px] p-2 w-full'>
                                <i className="fa-solid fa-user text-orange-500 mr-2 text-[16px]"></i>
                                <p className='text-white max-[360px]:text-[12px] text-[16px] font-semibold'>Mi perfil</p>
                            </div>


                            {/* Mis direcciones */}
                            <div className='flex bg-[#363333] justify-start items-center rounded-[10px] p-2 w-full'>
                                <i className="fa-solid fa-location-dot text-orange-500 mr-2 text-[16px]"></i>
                                <p className='text-white max-[360px]:text-[12px] text-[16px] font-semibold'>Mis direcciones</p>
                            </div>


                            {/* Ultimos pedidos */}
                            <div className='flex bg-[#363333] justify-start items-center rounded-[10px] p-2 w-full'>
                                <i className="fa-solid fa-folder-open text-orange-500 mr-2 text-[16px]"></i>
                                <p className='text-white max-[360px]:text-[12px] text-[16px] font-semibold'>Últimos Pedidos</p>
                            </div>

                            {/* Borrar cuenta */}
                            <div className='flex bg-red-500 justify-start items-center rounded-[10px] p-2 w-full'>
                                <i className="fa-solid fa-trash text-white mr-2 text-[16px]"></i>
                                <p className='text-white max-[360px]:text-[12px] text-[16px] font-semibold'>Borrar Cuenta</p>
                            </div>
                        </div>
                    </div>

                    {/* Pie */}
                    <div className='flex items-center gap-2 p-4 border-t-orange-500 border-t-[2px] max-[360px]:mt-1 mt-32'>
                        {/* Ultimos pedidos */}
                        <div className='flex bg-[#363333] justify-start items-center rounded-[10px] p-2 w-full'>
                            <i className="fa-solid fa-right-from-bracket text-orange-500 mr-2 text-[16px]"></i>
                            <p className='text-white max-[360px]:text-[12px] text-[16px] font-semibold'>Cerrar Sesión</p>
                        </div>
                    </div>

                
                
                </div>
            </div>


            {/* Menu */}
            <div className='flex justify-between items-center w-full border-b-orange-500 border-b-2 mx-4'>
                <HomeLink></HomeLink>
                {
                    user ? 
                    (<>
                        <button onClick={()=>{setMenu(!menu)}} className='cursor-pointer'><i className={`fa-solid fa-${menu ? 'x' : 'bars'} text-white text-[25px]`}></i></button>
                    </>) 
                    
                    : 
                    
                    (<><LoginLink></LoginLink></>)
                }
            </div>

            <div className='flex flex-col justify-center items-start gap-6 w-full'>
                <div className='flex flex-col gap-2'>
                    {/* Texto de Bienvenida */}
                    <p className="text-left text-[18px] lg:text-[20px] text-orange-500 lg:text-white font-bold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
                    ¡Bienvenid@ a Fast & Crunchy!
                    </p>

                    {/* Subtitulo de Bienvenida */}
                    <p className="text-left text-[15px] lg:text-[20px] text-white font-semibold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
                    Comienza a configurar tu pedido y échale un ojo a las novedades, por supuesto
                    </p>
                </div>

                {/* Tipo de Pedido */}
                <div className='flex gap-2'>
                    {/* Domicilio */}
                    <button onClick={()=>{pedidoDomicilio()}} className={`font-semibold text-white ${domicilio ? 'bg-orange-500' : 'bg-black border-2 border-orange-500'} rounded-[10px] px-4 py-1 text-sm`}>Envío a domicilio</button>
                    
                    {/* Recoger */}
                    <button onClick={()=>{pedidoRecoger()}} className={`font-semibold text-white ${!domicilio ? 'bg-orange-500' : 'bg-black border-2 border-orange-500'} rounded-[10px] px-4 py-1 text-sm`}>Para recoger</button>
                </div>
                
                {/* Dirección */}
                <div className={`${domicilio ? 'block' : 'hidden'} bg-[#1B1A1A] text-break text-white font-bold text-sm sm w-full text-center rounded-[15px] py-4`}>
                 <i className="fa-solid fa-location-dot"></i> Avenida Constitución Manzaneda, 89
                </div>

                <button className='bg-orange-500 text-white rounded-[20px] py-2 font-semibold w-full'>Empezar pedido {domicilio ? 'a domicilio' : 'para recoger'}</button>

                {/* Promociones */}
                <div className='flex flex-col gap-2'>
                    {/* Texto de Promoción */}
                    <p className="text-left text-[18px] lg:text-[20px] text-orange-500 lg:text-white font-bold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
                     PROMOCIONES DEL MES
                    </p>

                    {/* Subtitulo de Promoción */}
                    <p className="text-left text-[15px] lg:text-[20px] text-white font-semibold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
                    Estas son algunas de las promociones que podrás disfrutar ahora mism:
                    </p>
                </div>

                {/* Pronto se incluirán promociones */}
            </div>

            
        </div>
    )
}
