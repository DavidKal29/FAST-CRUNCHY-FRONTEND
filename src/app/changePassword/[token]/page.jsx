"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
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

    const [form, setForm] = useState({
      new_password: '',
      confirm_password: ''
    });

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visiblePassword2, setVisiblePassword2] = useState(false);
    const { token } = useParams();

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/changePassword/${token}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            toast.success(data.success);
          } else {
            toast.error(data.error);
          }
        })
        .catch(error => {
          console.log('Error al enviar los datos a Change Password');
          console.error(error);
          toast.error('Error al enviar los datos');
        });
    };

    useEffect(() => {
      document.title = 'Change Password';
    }, []);

    useEffect(()=>{
      getProfile()
    },[])

    return (
      <div className="bg-black min-h-screen flex flex-col lg:flex-row justify-center items-center p-4 lg:p-12 gap-6 lg:gap-24">

        {/* Logo */}
        <img className="w-[10rem] sm:w-[12rem] md:w-[14rem] lg:w-[30rem]" src="/images/logos/logo.png" alt="" />

        <div className="flex flex-col justify-center items-center gap-6 lg:bg-yellow-600 lg:p-6 lg:rounded lg:gap-8">
          {/* Texto de Bienvenida */}
          <p className="text-center text-[15px] lg:text-[20px] text-yellow-600 lg:text-white font-bold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
            ¡Inicia sesión y disfruta de la mejor app Fast Food del Planeta!
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6">
            <div className="grid grid-cols-1 gap-6">
              {/* New Password */}
              <div className="bg-white rounded flex items-center w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
                <i className="fa-solid fa-lock text-[20px] mr-2"></i>
                <input
                  type={visiblePassword ? 'text' : 'password'}
                  name="new_password"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="New Password"
                  className="flex-1 h-full outline-none"
                />
                <button
                  type="button"
                  onClick={() => setVisiblePassword(!visiblePassword)}
                  className="cursor-pointer"
                >
                  <i className={visiblePassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                </button>
              </div>

              {/* Confirm Password */}
              <div className="bg-white rounded flex items-center w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
                <i className="fa-solid fa-lock text-[20px] mr-2"></i>
                <input
                  type={visiblePassword2 ? 'text' : 'password'}
                  name="confirm_password"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Confirm Password"
                  className="flex-1 h-full outline-none"
                />
                <button
                  type="button"
                  onClick={() => setVisiblePassword2(!visiblePassword2)}
                  className="cursor-pointer"
                >
                  <i className={visiblePassword2 ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                </button>
              </div>
            </div>

            {/* Cambio de contraseña */}
            <p className="text-white text-center max-w-[16rem] sm:max-w-[20rem] md:max-w-[24rem]">
              ¿Cambiaste la contraseña? <a href="/" className="text-yellow-600 lg:text-yellow-200">Iniciar Sesión</a>
            </p>

            {/* Botón Cambiar Contraseña */}
            <button className="rounded text-center font-bold bg-yellow-600 lg:bg-white text-white lg:text-yellow-600 w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] cursor-pointer">
              Cambiar Contraseña
            </button>

            {/* Crear Cuenta */}
            <p className="text-white text-center max-w-[16rem] sm:max-w-[20rem] md:max-w-[24rem]">
              ¿No tienes cuenta? <a href="/register" className="text-yellow-600 lg:text-yellow-200">Crear Cuenta</a>
            </p>
          </form>
        </div>
      </div>
    );
}
