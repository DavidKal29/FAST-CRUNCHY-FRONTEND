'use client';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Promociones from '../components/Promociones';
import Menu from '../components/Menu';
import MenuBurguer from '../components/MenuBurguer';
import Logout from '../components/Logout';


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
            <MenuBurguer menu={menu} user={user} logout={<Logout toast={toast} router={router} setUser={setUser}></Logout>}></MenuBurguer>
            
            {/* Menu */}
            <Menu menu={menu} setMenu={setMenu} user={user}></Menu>

            {/* Div Principal */}
            <div className='flex flex-col xl:flex-row justify-center items-start xl:justify-start gap-6 w-full'>
                <div className='flex flex-col gap-4 xl:gap-6 justify-center items-start w-full'>
                    <div className='flex flex-col gap-2'>
                        {/* Texto de Bienvenida */}
                        <p className="text-left text-[18px] md:text-[30px] text-yellow-600 font-bold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
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
                        <button onClick={()=>{pedidoDomicilio()}} className={`cursor-pointer font-semibold text-white ${domicilio ? 'bg-yellow-600' : 'bg-black border-2 border-yellow-600'} rounded-[10px] px-4 py-1 text-sm md:text-[20px]`}>Envío a domicilio</button>
                        
                        {/* Recoger */}
                        <button onClick={()=>{pedidoRecoger()}} className={`cursor-pointer font-semibold text-white ${!domicilio ? 'bg-yellow-500' : 'bg-black border-2 border-yellow-500'} rounded-[10px] px-4 py-1 text-sm md:text-[20px]`}>Para recoger</button>
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
                        <button className='bg-yellow-600 cursor-pointer text-white rounded-[20px] py-2 font-semibold w-full md:text-[20px]'>Empezar pedido {domicilio ? 'a domicilio' : 'para recoger'}</button>
                        </div>
                </div>

                
                {/* Carrusel y Promociones */}
                <Promociones></Promociones>

            </div>

            
        </div>
    )
}
