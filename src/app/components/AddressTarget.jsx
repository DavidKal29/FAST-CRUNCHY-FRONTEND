import React from 'react'
import { toast } from 'sonner'

export default function AddressTarget({address,deleteAddress,getAddresses}) {
    const predeterminateAddress = (id_address)=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/predeterminateAddress/${id_address}`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.success) {
                toast.success(data.success)
                getAddresses()
                
            }else{
                console.log(data.error);
                toast.error(data.error)
            }
        })
        .catch(error=>{
            console.log('Error al enviar los datos a Perfil');
            console.error(error);
            toast.error('Error al enviar los datos')  
        })
   
    }



  return (
    <div className='flex justify-start items-start flex-col gap-4 border-[2px] border-yellow-600 p-6 rounded w-full'>
        {/* Nombre Guardado */}
        <h1 className='font-semibold text-[20px] text-white border-b-2 w-full border-yellow-600'>{address.name}</h1>
                        
        {/* Domicilio */}
        <span className='text-gray-200 text-sm'>{address.address}</span>

        {/* Panel de edición */}
        <div className='flex justify-center items-center gap-4'>
            <a href={`/editAddress/${address._id}`} className='flex gap-2 justify-center items-center border-2 border-yellow-600 text-yellow-600 p-2 rounded-[10px]'>
                <i className="fa-solid fa-pen-to-square"></i>
                <p>Editar</p>
            </a>

            <button onClick={()=>{deleteAddress(address._id)}} className='cursor-pointer flex gap-2 justify-center items-center border-2 border-yellow-600 text-yellow-600 p-2 rounded-[10px]'>
                <i className="fa-solid fa-trash"></i>
                <p>Eliminar</p>
            </button>

        </div>

        {
            address.predetermined 
            ? 
            (<>
                <div className='flex gap-2 justify-center items-center text-yellow-600 p-2 rounded-[10px]'>
                    <i className="fa-solid fa-star"></i>
                    <p>Dirección elegida</p>
                </div>
            </>) 
            : 
            (<>
                <div className='flex gap-2 justify-center items-center text-yellow-600 p-2 rounded-[10px]'>
                    <button onClick={()=>{predeterminateAddress(address._id)}} className='cursor-pointer'><i className="fa-regular fa-star"></i></button>
                    <p>Usar esta dirección</p>
                </div>
            </>)
        
        }

    </div>
  )
}
