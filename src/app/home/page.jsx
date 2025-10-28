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

    
    return (
        <div className='bg-black min-h-screen flex flex-col justify-start items-center px-4 py-2 gap-6'>
            {/* Menú hamburguesa
            <div className='bg-orange-500 top-0 absolute h-full w-[80%] left-0 flex justify-center items-center py-4 px-2'>
                <div className='bg-black w-[20rem] rounded'>
                    hola
                </div>
            </div> */}


            {/* Menu */}
            <div className='flex justify-between items-center w-full border-b-orange-500 border-b-2 mx-4'>
                <HomeLink></HomeLink>
                {
                    user ? (<><i className="fa-solid fa-bars text-white text-[25px]"></i></>) : (<><LoginLink></LoginLink></>)
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
