"use client";
import { useState } from "react";

export default function Home() {

  const [visiblePassword, setVisiblePassword] = useState(false)

  return (
    <div className="bg-black min-h-screen flex flex-col lg:flex-row justify-center items-center p-4 lg:p-12 gap-6 lg:gap-24">

      {/* Logo */}
      <img className="w-[10rem] sm:w-[12rem] md:w-[14rem] lg:w-[30rem]" src="/images/logos/logo.png" alt="" />

      <div className="flex flex-col justify-center items-center gap-6 lg:bg-orange-500 lg:p-6 lg:rounded lg:gap-8">
        {/* Texto de Bienvenida */}
        <p className="text-center text-[15px] lg:text-[20px] text-orange-500 lg:text-white font-bold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
          ¡Inicia sesión y disfruta de la mejor app Fast Food del Planeta!
        </p>

        {/* Invitado */}
        <button className="text-center text-[15px] lg:text-[20px] font-bold text-white cursor-pointer">
          <i className="fa-solid fa-user"></i> Acceder como Invitado
        </button>

        {/* Formulario */}
        <form className="flex flex-col justify-center items-center gap-6">

          <div className="grid grid-cols-1 gap-6">
            {/* Email */}
            <div className="bg-white rounded flex items-center w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
              <i className="fa-solid fa-envelope text-[20px] mr-2"></i>
              <input
                type="email"
                placeholder="Email"
                className="flex-1 h-full outline-none"
              />
            </div>

            {/* Password */}
            <div className="bg-white rounded flex items-center w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
              <i className="fa-solid fa-lock text-[20px] mr-2"></i>
              <input
                type={visiblePassword ? 'text' : 'password'}
                placeholder="Password"
                className="flex-1 h-full outline-none"
              />
              <button type="button" onClick={() => setVisiblePassword(!visiblePassword)} className="cursor-pointer">
                <i className={visiblePassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
              </button>
            </div>
          </div>

          {/* Olvido de contraseña */}
          <p className="text-white text-center max-w-[16rem] sm:max-w-[20rem] md:max-w-[24rem]">
            ¿Olvidaste la contraseña? <a href="" className="text-orange-500 lg:text-yellow-200">Recuperar</a>
          </p>

          {/* Botón Iniciar Sesión */}
          <button className="rounded text-center font-bold bg-orange-500 lg:bg-white text-white lg:text-orange-500 w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] cursor-pointer">
            Iniciar Sesión
          </button>

          {/* Crear Cuenta */}
          <p className="text-white text-center max-w-[16rem] sm:max-w-[20rem] md:max-w-[24rem]">
            ¿No tienes cuenta? <a href="/register" className="text-orange-500 lg:text-yellow-200">Crear Cuenta</a>
          </p>
        </form>
      </div>

    </div>
  );
}
