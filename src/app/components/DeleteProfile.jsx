import React from 'react'

export default function DeleteProfile({router,toast}) {
    const handleDelete = ()=>{
        toast("¿Seguro que quieres eliminar tu cuenta?", {
            action: {
                label: "Eliminar",
                onClick: () => {
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/deleteProfile`,{
                        method:'GET',
                        credentials:'include'
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(data);
                        
                        if (data.success) {
                            toast.success('Perfil Borrado')
                            router.push('/')
                        }else{
                            toast.error(data.error)
                            console.log(data.error);
                        }
                    })
                    .catch(error=>{
                        console.log('Error al enviar los datos a Delete Profile');
                        console.error(error);
                        toast.error('Error al enviar los datos')  
                    })
                },
            },
            cancel: {
                label: "Cancelar",
                onClick: () => toast.info("Eliminación cancelada"),
            },
        });
            
        }

    return (
        <button onClick={()=>{handleDelete()}} className='flex cursor-pointer items-center bg-red-600 rounded-[10px] p-3 xl:rounded-[10px] xl:px-4 xl:py-2'>
            <i className="fa-solid fa-trash text-white mr-3 text-[16px] sm:text-[18px] md:text-[20px] xl:text-[16px]"></i>
            <p className='text-white font-semibold text-[16px] sm:text-[18px] md:text-[20px] xl:text-[16px]'>Borrar Cuenta</p>
        </button>
    )
}