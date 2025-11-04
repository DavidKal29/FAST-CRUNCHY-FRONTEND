'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import "swiper/css";
import "swiper/css/pagination";
import Promociones from '../../components/Promociones';
import Header from '@/app/components/Header';

export default function EditAddress() {
  const { id_address } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState(false);

  const [form, setForm] = useState({
    name: '',
    address: ''
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
          console.log('Usuario:', data);
        } else {
          console.log(data.error);
        }
      })
      .catch(error => {
        console.log('Error al obtener perfil');
        console.error(error);
        toast.error('Error al enviar los datos');
      });
  };

  const getAddress = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/getAddress/${id_address}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.address) {
          setForm({
            name: data.address.name,
            address: data.address.address
          });
        } else {
          console.log(data.error);
          toast.error(data.error);
        }
      })
      .catch(error => {
        console.log('Error al obtener dirección');
        console.error(error);
        toast.error('Error al enviar los datos');
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

    const formFinal = { name: form.name.toUpperCase(), address: form.address };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/editAddress/${id_address}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formFinal)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast.success(data.success);
          router.push('/addresses');
        } else {
          if (data.message) toast.error(data.message[0]);
          else toast.error(data.error);
        }
      })
      .catch(error => {
        console.log('Error al enviar los datos a Edit Address');
        console.error(error);
        toast.error('Error al enviar los datos');
      });
  };

  useEffect(() => {
    document.title = 'Edit Address';
  });

  useEffect(() => {
    getProfile();
    getAddress();
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
            Editar Dirección
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full items-center">
            {/* Nombre */}
            <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
              <i className="fa-solid fa-address-card text-yellow-600 text-lg mr-2"></i>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={form.name}
                placeholder="Nombre"
                className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
              />
            </div>

            {/* Dirección */}
            <div className="flex items-center bg-white rounded-xl w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] px-3">
              <i className="fa-solid fa-map-location-dot text-yellow-600 text-lg mr-2"></i>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={form.address}
                placeholder="Domicilio"
                className="flex-1 h-full outline-none text-black text-sm placeholder-gray-500"
              />
            </div>

            {/* Texto volver */}
            <p className="text-center text-sm text-gray-300">
              ¿No quieres editar nada?{' '}
              <a href="/addresses" className="text-yellow-600 hover:underline">
                Volver
              </a>
            </p>

            {/* Botón */}
            <button
              type="submit"
              className="cursor-pointer w-[16rem] sm:w-[20rem] md:w-[24rem] h-[3rem] bg-yellow-600 rounded-xl text-black font-bold text-lg transition-transform transform hover:scale-105 hover:bg-yellow-500 active:scale-95"
            >
              Guardar Cambios
            </button>
          </form>
        </div>

        {/* Promociones */}
        <div className="w-full max-w-[28rem] xl:max-w-[36rem] flex justify-center">
          <Promociones />
        </div>
      </div>
    </div>
  );
}
