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


export default function EditProfile() {

    const router = useRouter()

    const [user,setUser] = useState(null)

    const [form,setForm] = useState({
      email:user?.email || '',
      name:user?.name || '',
      lastname:user?.lastname || '',
      phone:user?.phone || ''
    })

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

    const handleChange = (e)=>{
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = (e)=>{
      e.preventDefault()

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,{
        method:'POST',
        credentials:'include',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form)

      })
      .then(res=>res.json())
      .then(data=>{
        if (data.success) {
          router.push('/home')
        }else{
          toast.error(data.error)
        }
      })
      .catch(error=>{
        console.log('Error al enviar los datos a Register');
        console.error(error);
        toast.error('Error al enviar los datos')  
      })
    
    
    }

    
    useEffect(()=>{
        document.title = 'Edit Profile'
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

            <div className='flex flex-col xl:flex-row justify-center items-center gap-6 w-full'>
                {/* Formulario */}
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6 lg:gap-12 border-[2px] border-yellow-600 p-6 rounded">

                    <h1 className='text-center text-[30px] font-semibold text-white'>Editar Perfil</h1>

                    <div className="grid grid-cols-1 gap-6">
                    {/* Email */}
                    <div className="bg-black text-white border-[2px] rounded border-yellow-600 rounded flex items-center w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
                        <i className="fa-regular fa-envelope text-[20px] mr-2"></i>
                        <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={user?.email}
                        placeholder="Email"
                        className="flex-1 h-full outline-none"
                        />
                    </div>

                    {/* Nombre */}
                    <div className="bg-black text-white border-[2px] rounded border-yellow-600 rounded flex items-center w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
                    <i className="fa-regular fa-user text-[20px] mr-2"></i>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={user?.name}
                        placeholder="Nombre"
                        className="flex-1 h-full outline-none"
                    />
                    </div>

                    {/* Apellidos */}
                    <div className="bg-black text-white border-[2px] rounded border-yellow-600 rounded flex items-center w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
                    <i className="fa-regular fa-user text-[20px] mr-2"></i>
                    <input
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        value={user?.lastname}
                        placeholder="Apellido"
                        className="flex-1 h-full outline-none"
                    />
                    </div>

                    {/* Teléfono */}
                    <div className="bg-black text-white border-[2px] rounded border-yellow-600 rounded flex items-center w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
                    <i className="fa-solid fa-phone text-[20px] mr-2"></i>
                    <input
                        type="tel"
                        name="phone"
                        onChange={handleChange}
                        value={user?.phone}
                        placeholder="Phone"
                        className="flex-1 h-full outline-none"
                    />
                    </div>

                    </div>

                    {/* Botón Crear Cuenta */}
                    <button className="rounded text-center font-bold bg-yellow-600 lg:bg-white text-white lg:text-yellow-600 w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] cursor-pointer">
                        Guardar Cambios
                    </button>

                    
                </form>

                <Promociones></Promociones>

            </div>
            
        </div>
    )
}
