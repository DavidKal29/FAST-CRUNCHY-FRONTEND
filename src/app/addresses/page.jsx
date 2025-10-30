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
    const [addresses,setAddresses] = useState([])

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
                router.push('/')
                
            }
        })
        .catch(error=>{
            console.log('Error al enviar los datos a Perfil');
            console.error(error);
            toast.error('Error al enviar los datos')  
        })
   
    }

    const getAddresses = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/myAddresses`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.addresses) {
                setAddresses(data.addresses)
            }else{
                console.log(data.error);
                toast.error(data.error)
            }
        })
        .catch(error=>{
            console.log('Error al enviar los datos a My Addresses');
            console.error(error);
            toast.error('Error al enviar los datos')  
        })
   
    }

    const deleteAddress = (id_address) => {
        toast("¿Seguro que quieres eliminar esta dirección?", {
            action: {
                label: "Eliminar",
                onClick: () => {
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/deleteAddress/${id_address}`, {
                        method: "GET",
                        credentials: "include",
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);

                        if (data.success) {
                            toast.success(data.success);
                            getAddresses();
                        } else {
                            console.log(data.error);
                            toast.error(data.error);
                        }
                    })
                    .catch((error) => {
                        console.log("Error al enviar los datos a My Addresses");
                        console.error(error);
                        toast.error("Error al enviar los datos");
                    });
                },
            },
            cancel: {
                label: "Cancelar",
                onClick: () => toast.info("Eliminación cancelada"),
            },
        });
    }



    
    useEffect(()=>{
        document.title = 'Addresses'
    },[])

    useEffect(()=>{
        getProfile()
        getAddresses()
    },[])


    const [menu,setMenu] = useState(false)

    return (
        <div className='bg-black min-h-screen flex flex-col justify-start items-center px-4 lg:px-16 py-2 gap-6'>
            {/* Menú hamburguesa */}
            <MenuBurguer menu={menu} user={user} logout={<Logout toast={toast} router={router} setUser={setUser}></Logout>}></MenuBurguer>
            
            {/* Menu */}
            <Menu menu={menu} setMenu={setMenu} user={user} logout={<Logout toast={toast} router={router} setUser={setUser}></Logout>}></Menu>

            <div className='flex flex-col justify-center items-center gap-2 w-full'>
                    {/* Agregar mas */}
                    <div className='flex justify-between items-center w-full'>
                        {addresses.length===0 ? (<><h1 className='font-bold text-white text-[30px]'>Sin Direcciones</h1></>) : (<><h1 className='font-bold text-white text-[30px]'>Mis Direcciones</h1></>)}
                        
                        <a href="/addAddress" className='bg-yellow-600 font-semibold text-black rounded-[10px] px-4 py-2'><i className="fa-solid fa-plus"></i> Añadir</a>
                    </div>
                    {/* Direcciones */}
                    <div className='flex flex-col justify-start items-center gap-6 max-h-[500px] w-full overflow-y-auto'>

                        {/* Tarjetas de Direccion */}
                        {addresses.map((addr,index)=>(
                            <AddressTarget key={index} address={addr} deleteAddress={deleteAddress} getAddresses={getAddresses}></AddressTarget>
                        ))}


                        
        
                    </div>
                </div>
            
        </div>
    )
}
