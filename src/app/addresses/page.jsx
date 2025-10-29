'use client';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import "swiper/css";
import "swiper/css/pagination";
import Menu from '../components/Menu';
import MenuBurguer from '../components/MenuBurguer';
import Logout from '../components/Logout';
import Promociones from '../components/Promociones';
import AddressTarget from '../components/AddressTarget';


export default function Addresses() {

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
        document.title = 'Addresses'
    },[])

    useEffect(()=>{
        getProfile()
    },[])


    const [menu,setMenu] = useState(false)

    return (
        <div className='bg-black min-h-screen flex flex-col justify-start items-center px-4 lg:px-16 py-2 gap-6'>
            {/* Menú hamburguesa */}
            <MenuBurguer menu={menu} user={user} logout={<Logout toast={toast} router={router} setUser={setUser}></Logout>}></MenuBurguer>
            
            {/* Menu */}
            <Menu menu={menu} setMenu={setMenu} user={user}></Menu>

            <div className='flex flex-col justify-center items-center gap-2 w-full'>
                    {/* Agregar mas */}
                    <div className='flex justify-between items-center w-full'>
                        <h1 className='font-bold text-white text-[30px]'>Mis Direcciones</h1>
                        <a href="" className='bg-yellow-600 font-semibold text-black rounded-[10px] px-4 py-2'><i className="fa-solid fa-plus"></i> Añadir</a>
                    </div>
                    {/* Direcciones */}
                    <div className='flex flex-col justify-start items-center gap-6 max-h-[500px] w-full overflow-y-auto'>

                        {/* Tarjetas de Direccion */}
                        <AddressTarget></AddressTarget>
                        <AddressTarget></AddressTarget>
                        <AddressTarget></AddressTarget>
                        <AddressTarget></AddressTarget>
                        <AddressTarget></AddressTarget>
                        <AddressTarget></AddressTarget>
                        <AddressTarget></AddressTarget>
                        

                        
                    </div>
                </div>
            
        </div>
    )
}
