'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import "swiper/css";
import "swiper/css/pagination";
import Promociones from '../components/Promociones';
import Header from '../components/Header';

export default function EditProfile() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState(false);

  const [form, setForm] = useState({
    email: user?.email || '',
    name: user?.name || '',
    lastname: user?.lastname || '',
    phone: user?.phone || ''
  });

  const getProfile = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/profile`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
          setForm({
            email: data.user.email || '',
            name: data.user.name || '',
            lastname: data.user.lastname || '',
            phone: data.user.phone || ''
          });
        } else {
          router.push('/');
        }
      })
      .catch(error => {
        console.error('Error al obtener perfil:', error);
        toast.error('Error al cargar los datos del perfil');
      });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/editProfile`, {
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
          if (data.message) toast.error(data.message[0]);
          else toast.error(data.error);
        }
      })
      .catch(error => {
        console.error('Error al editar perfil:', error);
        toast.error('Error al enviar los datos');
      });
  };

  useEffect(() => {
    document.title = 'Edit Profile';
    getProfile();
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-start px-4 sm:px-8 lg:px-16 py-6 gap-8">
      {/* Header */}
      <Header
        router={router}
        toast={toast}
        user={user}
        setUser={setUser}
        menu={menu}
        setMenu={setMenu}
        cartVisibility={true}
      />

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 w-full max-w-7xl">

        {/* Contenedor Formulario */}
        <div className="relative z-10 bg-zinc-950/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-yellow-600 w-full max-w-md flex flex-col items-center">
          <h1 className="text-center text-yellow-600 font-bold text-2xl sm:text-3xl mb-6">
            Editar Perfil
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center">
            {/* Email */}
            <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
              <i className="fa-solid fa-envelope text-yellow-600 text-lg mr-2"></i>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={form.email}
                placeholder="Email"
                className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
              />
            </div>

            {/* Nombre */}
            <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
              <i className="fa-solid fa-user text-yellow-600 text-lg mr-2"></i>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={form.name}
                placeholder="Nombre"
                className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
              />
            </div>

            {/* Apellido */}
            <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
              <i className="fa-solid fa-user text-yellow-600 text-lg mr-2"></i>
              <input
                type="text"
                name="lastname"
                onChange={handleChange}
                value={form.lastname}
                placeholder="Apellido"
                className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
              />
            </div>

            {/* Teléfono */}
            <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
              <i className="fa-solid fa-phone text-yellow-600 text-lg mr-2"></i>
              <input
                type="tel"
                name="phone"
                onChange={handleChange}
                value={form.phone}
                placeholder="Teléfono"
                className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="cursor-pointer w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] bg-yellow-600 rounded-xl text-black font-bold text-lg transition-transform transform hover:scale-105 hover:bg-yellow-500 active:scale-95"
            >
              Guardar Cambios
            </button>
          </form>
        </div>

        {/* Promociones (carrusel fijo) */}
        <div className="w-full max-w-[28rem] xl:max-w-[36rem] flex justify-center">
          <Promociones />
        </div>
      </div>
    </div>
  );
}
