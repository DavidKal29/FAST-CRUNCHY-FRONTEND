import React from 'react'

export default function Logout({router,toast,setUser}) {
    const handleLogout = ()=>{

        toast("¿Seguro que quieres cerrar sesión?", {
            action: {
                label: "Cerrar Sesión",
                onClick: () => {
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,{
                        method:'GET',
                        credentials:'include'
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(data);
                        
                        if (data.success) {
                            setUser(null)
                            router.push('/')
                        }else{
                            toast.error(data.error)
                            console.log(data.error);
                        }
                    })
                    .catch(error=>{
                        console.log('Error al enviar los datos a Logout');
                        console.error(error);
                        toast.error('Error al enviar los datos')  
                    })
                },
            },
            cancel: {
                label: "Cancelar"
                
            },
        });
            
    }

    return (
        <button onClick={handleLogout} className='cursor-pointer flex items-center bg-[#363333] p-3 xl:px-4 xl:py-2 rounded-[10px]'>
            <i className="fa-solid fa-right-from-bracket text-yellow-600 mr-3 text-[16px] sm:text-[18px] md:text-[20px]  xl:text-[16px]"></i>
            <p className='text-white font-semibold text-[16px] sm:text-[18px] md:text-[20px] xl:text-[16px]'>Cerrar Sesión</p>
        </button>
    )
}
