"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const router = useRouter();

    const getProfile = () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/profile`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            router.push("/home");
          }
        })
        .catch((error) => {
          console.log("Error al enviar los datos a Login");
          console.error(error);
          toast.error("Error al enviar los datos");
        });
    };

    const [form, setForm] = useState({
      email: "",
    });

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/forgotPassword`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
          } else {
            if (data.message) {
              toast.error(data.message[0]);
            } else {
              toast.error(data.error);
            }
          }
        })
        .catch((error) => {
          console.log("Error al enviar los datos a Forgot Password");
          console.error(error);
          toast.error("Error al enviar los datos");
        });
    };

    useEffect(()=>{
      document.title = 'Forgot Password'
    })

    useEffect(() => {
      getProfile();
    }, []);

    return (
      <div className="bg-black min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 text-white relative overflow-hidden">

        {/* Logo */}
        <img
          src="/images/logos/logo.png"
          alt="Logo"
          className="relative z-10 w-[10rem] sm:w-[12rem] md:w-[14rem] lg:w-[26rem] mb-6 lg:mb-0 lg:mr-16"
        />

        {/* Contenedor formulario */}
        <div className="relative z-10 bg-zinc-950/60 backdrop-blur-xl rounded-2xl p-8 lg:p-10 shadow-2xl border-2 border-yellow-600 max-w-md w-full flex flex-col items-center gap-8">

          {/* Texto de bienvenida */}
          <p className="text-center text-yellow-600 font-bold text-lg sm:text-xl max-w-sm">
            ¡Si olvidaste la contraseña, utiliza el mejor sistema de recuperación del planeta!
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center">

            {/* Email */}
            <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
              <i className="fa-solid fa-envelope text-yellow-600 text-lg mr-2"></i>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
              />
            </div>

            {/* Iniciar Sesión */}
            <p className="text-center text-sm text-gray-300">
              ¿Recordaste la contraseña?{" "}
              <a href="/" className="text-yellow-600 hover:underline">
                Iniciar Sesión
              </a>
            </p>

            {/* Botón Enviar correo */}
            <button
              className="cursor-pointer w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] bg-yellow-600 rounded-xl text-black font-bold text-lg transition-transform transform hover:scale-105 hover:bg-yellow-500 active:scale-95"
            >
              Enviar Correo
            </button>
          </form>
        </div>
      </div>
    );
}
