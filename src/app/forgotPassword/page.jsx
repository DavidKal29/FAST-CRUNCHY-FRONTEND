"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const router = useRouter()

    const getProfile = ()=>{
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/profile`,{
        method:'GET',
        credentials:'include'
      })
      .then(res=>res.json())
      .then(data=>{
        if (data.success) {
          router.push('/home')
        }
      })
      .catch(error=>{
        console.log('Error al enviar los datos a Login');
        console.error(error);
        toast.error('Error al enviar los datos')  
      })
          
    }

    const [form,setForm] = useState({
      email:'',
    })

    const handleChange = (e)=>{
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = (e)=>{
      e.preventDefault()

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/forgotPassword`,{
        method:'POST',
        credentials:'include',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form)

      })
      .then(res=>res.json())
      .then(data=>{
        if (data.success) {
          toast.success(data.success)
        }else{
          toast.error(data.error)
        }
      })
      .catch(error=>{
        console.log('Error al enviar los datos a Forgot Password');
        console.error(error);
        toast.error('Error al enviar los datos')  
      })
    
    
    }

    useEffect(()=>{
      document.title = 'Forgot Password'
    },[])

    useEffect(()=>{
      getProfile()
    },[])


    return (
      <div className="bg-black min-h-screen flex flex-col lg:flex-row justify-center items-center p-4 lg:p-12 gap-6 lg:gap-24">

        {/* Logo */}
        <img className="w-[10rem] sm:w-[12rem] md:w-[14rem] lg:w-[30rem]" src="/images/logos/logo.png" alt="" />

        <div className="flex flex-col justify-center items-center gap-6 lg:bg-orange-500 lg:p-6 lg:rounded lg:gap-8">
          {/* Texto de Bienvenida */}
          <p className="text-center text-[15px] lg:text-[20px] text-orange-500 lg:text-white font-bold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
            ¡Si olvidaste la contraseña, utiliza el mejor sistema de recuperación del Planeta!
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6">

            <div className="grid grid-cols-1 gap-6">
              {/* Email */}
              <div className="bg-white rounded flex items-center w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
                <i className="fa-solid fa-envelope text-[20px] mr-2"></i>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  className="flex-1 h-full outline-none"
                />
              </div>
            </div>

            {/* Iniciar Sesión */}
            <p className="text-white text-center max-w-[16rem] sm:max-w-[20rem] md:max-w-[24rem]">
              ¿Recordaste la contraseña? <a href="/" className="text-orange-500 lg:text-yellow-200">Iniciar Sesión</a>
            </p>

            {/* Botón Enviar correo */}
            <button className="rounded text-center font-bold bg-orange-500 lg:bg-white text-white lg:text-orange-500 w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] cursor-pointer">
              Enviar Correo
            </button>

            
          </form>
        </div>

      </div>
    );
}