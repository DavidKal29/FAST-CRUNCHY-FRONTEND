import React from 'react'

export default function AddressTarget() {
  return (
    <div className='flex justify-start items-start flex-col gap-4 border-[2px] border-yellow-600 p-6 rounded w-full'>
        {/* Nombre Guardado */}
        <h1 className='font-semibold text-[20px] text-white border-b-2 w-full border-yellow-600'>CASA JULIO</h1>
                        
        {/* Domicilio */}
        <span className='text-gray-200 text-sm'>Calle de las Manzanas Podridas, 25 Mislata</span>

        {/* Panel de edición */}
        <div className='flex justify-center items-center gap-4'>
            <a href='' className='flex gap-2 justify-center items-center border-2 border-yellow-600 text-yellow-600 p-2 rounded-[10px]'>
                <i className="fa-solid fa-pen-to-square"></i>
                <p>Editar</p>
            </a>

            <a href='' className='flex gap-2 justify-center items-center border-2 border-yellow-600 text-yellow-600 p-2 rounded-[10px]'>
                <i className="fa-solid fa-trash"></i>
                <p>Eliminar</p>
            </a>

        </div>

        {/* Hacer predeterminado */}
        <div className='flex gap-2 justify-center items-center text-yellow-600 p-2 rounded-[10px]'>
            <i className="fa-regular fa-star"></i>
            <p>Hacer predeterminado</p>
        </div>

        {/* Usar esta direccion */}
        <p className='text-semibold text-yellow-600'>Usar esta dirección</p>

    </div>
  )
}
