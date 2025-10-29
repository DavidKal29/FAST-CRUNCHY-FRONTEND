import React from 'react'
import Carrusel from './Carrusel'

export default function Promociones() {
  return (
    <div className="w-full max-w-3xl">
        {/* Promociones */}
        <div className='flex justify-center items-start max-w-3xl flex-col gap-2'>
            {/* Texto de Promoción */}
            <p className="text-left text-[18px] md:text-[30px] text-yellow-600 font-bold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
                PROMOCIONES DEL MES
            </p>

            {/* Subtitulo de Promoción */}
            <p className="text-left text-[15px] md:text-[20px] text-white font-semibold max-w-[20rem] sm:max-w-[24rem] md:max-w-[32rem]">
                Estas son algunas de las promociones que podrás disfrutar ahora mismo:
            </p> 
        </div>
                    
        {/* Carrusel */}
        <Carrusel></Carrusel>  
    </div>
  )
}
