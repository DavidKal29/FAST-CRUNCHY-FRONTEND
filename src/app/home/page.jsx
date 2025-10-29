'use client';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import HomeLink from '../components/HomeLink';
import LoginLink from '../components/LoginLink';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


export default function Home() {

    const router = useRouter()

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

    const logout = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            
            if (data.success) {
                setUser(null)
                router.push('/')
            }else{
                toast.error(data.error)
                console.log(data.error);
            }
        })
        .catch(error=>{
            console.log('Error al enviar los datos a Logout');
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
        <div className='bg-black min-h-screen flex flex-col justify-start items-center px-4 lg:px-16 py-2 gap-6'>
            {/* Menú hamburguesa */}
            <div className={`
                fixed top-0 left-0 h-screen w-[80%] max-w-[400px] sm:max-w-[500px] md:max-w-[600px]
                bg-orange-500 flex justify-center items-start
                p-3 pt-6 sm:pt-8 md:pt-10
                overflow-y-auto
                z-[10]
                transition-all duration-300
                ${menu ? 'left-0' : 'left-[-2000px]'}
            `}>

                {/* Contenedor negro que ocupa todo el alto */}
                <div className='bg-black w-full h-full rounded-[20px] px-4 sm:px-6 md:px-8 flex flex-col'>
                    
                    {/* Cabecera */}
                    <div className='flex items-center gap-3 p-4 border-b-2 border-orange-500 mb-4'>
                        <i className="fa-regular fa-circle-user text-orange-500 text-[35px] sm:text-[40px] md:text-[50px]"></i>
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
                            <div className='flex items-center bg-[#363333] rounded-[10px] p-3'>
                                <i className="fa-solid fa-user text-orange-500 mr-3 text-[16px] sm:text-[18px] md:text-[20px]"></i>
                                <p className='text-white font-semibold text-[16px] sm:text-[18px] md:text-[20px]'>Mi perfil</p>
                            </div>

                            {/* Mis direcciones */}
                            <div className='flex items-center bg-[#363333] rounded-[10px] p-3'>
                                <i className="fa-solid fa-location-dot text-orange-500 mr-3 text-[16px] sm:text-[18px] md:text-[20px]"></i>
                                <p className='text-white font-semibold text-[16px] sm:text-[18px] md:text-[20px]'>Mis direcciones</p>
                            </div>

                            {/* Últimos pedidos */}
                            <div className='flex items-center bg-[#363333] rounded-[10px] p-3'>
                                <i className="fa-solid fa-folder-open text-orange-500 mr-3 text-[16px] sm:text-[18px] md:text-[20px]"></i>
                                <p className='text-white font-semibold text-[16px] sm:text-[18px] md:text-[20px]'>Últimos Pedidos</p>
                            </div>

                            {/* Borrar cuenta */}
                            <div className='flex items-center bg-red-500 rounded-[10px] p-3'>
                                <i className="fa-solid fa-trash text-white mr-3 text-[16px] sm:text-[18px] md:text-[20px]"></i>
                                <p className='text-white font-semibold text-[16px] sm:text-[18px] md:text-[20px]'>Borrar Cuenta</p>
                            </div>
                        </div>
                    </div>

                    {/* Pie: Cerrar sesión */}
                    <div className='mt-4 p-4 border-t-2 border-orange-500'>
                        <button onClick={logout} className='flex items-center bg-[#363333] p-3 rounded-[10px] w-full'>
                            <i className="fa-solid fa-right-from-bracket text-orange-500 mr-3 text-[16px] sm:text-[18px] md:text-[20px]"></i>
                            <p className='text-white font-semibold text-[16px] sm:text-[18px] md:text-[20px]'>Cerrar Sesión</p>
                        </button>
                    </div>

                </div>
            </div>



            {/* Menu */}
            <div className='flex justify-between items-center w-full border-b-orange-500 border-b-2 md:border-b-4 mx-4'>
                <HomeLink></HomeLink>
                {
                    user ? 
                    (<>
                        <button onClick={()=>{setMenu(!menu)}} className='cursor-pointer'><i className={`fa-solid fa-${menu ? 'x' : 'bars'} text-white text-[25px] md:text-[35px]`}></i></button>
                    </>) 
                    
                    : 
                    
                    (<><LoginLink></LoginLink></>)
                }
            </div>

            <div className='flex flex-col xl:flex-row justify-center items-start xl:justify-start gap-6 w-full'>
                <div className='flex flex-col gap-4 xl:gap-6 justify-center items-start w-full'>
                    <div className='flex flex-col gap-2'>
                        {/* Texto de Bienvenida */}
                        <p className="text-left text-[18px] md:text-[30px] text-orange-500 font-bold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
                        ¡Bienvenid@ a Fast & Crunchy!
                        </p>

                        {/* Subtitulo de Bienvenida */}
                        <p className="text-left text-[15px] md:text-[20px] text-white font-semibold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
                        Comienza a configurar tu pedido y échale un ojo a las novedades, por supuesto
                        </p>
                    </div>

                    {/* Tipo de Pedido */}
                    <div className='flex gap-2'>
                        {/* Domicilio */}
                        <button onClick={()=>{pedidoDomicilio()}} className={`cursor-pointer font-semibold text-white ${domicilio ? 'bg-orange-500' : 'bg-black border-2 border-orange-500'} rounded-[10px] px-4 py-1 text-sm md:text-[20px]`}>Envío a domicilio</button>
                        
                        {/* Recoger */}
                        <button onClick={()=>{pedidoRecoger()}} className={`cursor-pointer font-semibold text-white ${!domicilio ? 'bg-orange-500' : 'bg-black border-2 border-orange-500'} rounded-[10px] px-4 py-1 text-sm md:text-[20px]`}>Para recoger</button>
                    </div>

                    <div className='rounded-[10px] w-full '>
                        <img className='w-full' src="/images/logos/promociones/image.png" alt="" />
                    </div>
                    
                    <div className='flex flex-col justify-center items-center w-full gap-4'>
                        {/* Dirección */}
                        <div className={`${domicilio ? 'block' : 'hidden'} bg-[#1B1A1A] text-break text-white font-bold text-sm md:text-[20px] w-full text-center rounded-[15px] py-4`}>
                        <i className="fa-solid fa-location-dot"></i> Avenida Constitución Manzaneda, 89
                        </div>

                        {/* Boton de pedir */}
                        <button className='bg-orange-500 cursor-pointer text-white rounded-[20px] py-2 font-semibold w-full md:text-[20px]'>Empezar pedido {domicilio ? 'a domicilio' : 'para recoger'}</button>
                        </div>
                </div>

                


                {/* Carrusel de promociones */}
                <div className="w-full max-w-3xl">
                    {/* Promociones */}
                    <div className='flex justify-center items-start max-w-3xl flex-col gap-2'>
                        {/* Texto de Promoción */}
                        <p className="text-left text-[18px] md:text-[30px] text-orange-500 font-bold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
                        PROMOCIONES DEL MES
                        </p>

                        {/* Subtitulo de Promoción */}
                        <p className="text-left text-[15px] md:text-[20px] text-white font-semibold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
                        Estas son algunas de las promociones que podrás disfrutar ahora mismo:
                        </p> 
                    </div>
                    
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1} 
                        loop={true}
                        centeredSlides={true}
                        autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        }}
                        grabCursor={true}
                    >
                        {[1, 2, 3, 4].map((num) => (
                        <SwiperSlide key={num}>
                            <img
                            src={`/images/logos/promociones/promo${num}.png`}
                            alt={`Promoción ${num}`}
                            className="rounded-2xl w-full object-cover"
                            />
                        </SwiperSlide>
                        ))}
                    </Swiper>

                    </div>
                
                

            </div>

            
        </div>
    )
}
