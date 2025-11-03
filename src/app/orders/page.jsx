'use client';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import "swiper/css";
import "swiper/css/pagination";
import OrderTarget from '../components/OrderTarget';
import Header from '../components/Header';


export default function Orders() {

    const router = useRouter()

    const [user,setUser] = useState(null)
    const [orders,setOrders] = useState([])

    const getProfile = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/profile`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.success) {
                setUser(data.user)
            }else{
                router.push('/')
                
            }
        })
        .catch(error=>{
            console.log('Error al enviar los datos a Perfil');
            console.error(error);
            toast.error('Error al enviar los datos')  
        })
   
    }

    const getOrders = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/getOrders`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.orders) {
                setOrders(data.orders)
            }else{
                console.log(data.error);
                toast.error(data.error)
            }
        })
        .catch(error=>{
            console.log('Error al enviar los datos a get Orders');
            console.error(error);
            toast.error('Error al enviar los datos')  
        })
   
    }

    const deleteOrder = (id_order) => {
        toast("¿Seguro que quieres eliminar este pedido?", {
            action: {
                label: "Eliminar",
                onClick: () => {
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/deleteOrder/${id_order}`, {
                        method: "GET",
                        credentials: "include",
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
    
                        if (data.success) {
                            toast.success(data.success);
                            getOrders();
                        } else {
                            console.log(data.error);
                            toast.error(data.error);
                        }
                    })
                    .catch((error) => {
                        console.log("Error al enviar los datos a Delete Order");
                        console.error(error);
                        toast.error("Error al enviar los datos");
                    });
                },
            },
            cancel: {
                label: "Cancelar",
                onClick: () => toast.info("Eliminación cancelada"),
            },
        });
    }

    
    useEffect(()=>{
        document.title = 'Orders'
    },[])

    useEffect(()=>{
        getProfile()
        getOrders()
    },[])


    const [menu,setMenu] = useState(false)

    return (
        <div className='bg-black min-h-screen flex flex-col justify-start items-center px-4 lg:px-16 py-2 gap-6'>
            {/* Header */}
            <Header router={router} toast={toast} user={user} setUser={setUser} menu={menu} setMenu={setMenu} cartVisibility={true}></Header>

            <div className='flex flex-col justify-center items-center gap-2 w-full'>
                    {/* Agregar mas */}
                    <div className='flex justify-between items-center w-full'>
                        {orders.length===0 ? (<><h1 className='font-bold text-white text-[30px]'>Sin Pedidos</h1></>) : (<><h1 className='font-bold text-white text-[30px]'>Mis Pedidos</h1></>)}
                        
                        
                    </div>
                    
                    {/* Pedidos */}
                    <div className='grid grid-cols-1 md:grid-cols-2 justify-start items-start gap-6 max-h-[500px] md:max-h-[1000px] lg:max-h-[500px] w-full overflow-y-auto'>

                        {/* Tarjetas de Direccion */}
                        {orders.map((order)=>(
                            <OrderTarget key={order._id} order={order} deleteOrder={deleteOrder}></OrderTarget>
                        ))}       
        
                    </div>
                </div>
            
        </div>
    )
}