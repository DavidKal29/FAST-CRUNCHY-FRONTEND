'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function OrderTarget({order}) {
    const [detalles,setDetalles] = useState(false)
    const [cartCounter, setCartCounter] = useState(0)
    
    const getCartitems = () => {
        const cart = order.order.products
        
        let counter = 0
        
        if (cart) {
            cart.forEach(product => {
                counter += product.quantity
            })
            setCartCounter(counter)
        } else {
            setCartCounter(0)
        }
    }

    const repeatOrder = () =>{
        localStorage.clear()
        
        localStorage.setItem('cart',JSON.stringify(order.order.products))
        
        //Funcion para que el captador de eventos del localstorage del CartLink se de cuenta que algo cambió
        window.dispatchEvent(new Event('storage'))

        toast.success('Pedido copiado en el carrito')
    }

    useEffect(()=>{
        getCartitems()
    },[])


    return (
        <div className='flex justify-start items-start flex-col gap-4 border-[2px] border-yellow-600 p-6 rounded w-full'>
            {/* Id del Pedido */}
            <h1 className='font-bold text-[15px] lg:text-[25px] text-white border-b-2 w-full border-yellow-600'>ID: {order._id}</h1>

            <p className='text-white font-semibold text-[15px] lg:text-[20px]'>{order.order.pickUp ? 'Para Recoger' : order.order.address}</p>
                            
            {/* Fecha */}
            <span className='text-gray-200 text-sm lg:text-[15px]'>{new Date (order.order.createdAt).toLocaleString()}</span>

            {/* Articulos y precio */}
            <div className='flex justify-between items-center gap-2 w-full'>
                <p className='text-white text-[15px] lg:text-[20px] font-semibold'>{cartCounter} {cartCounter>1 ? 'artículos' : 'artículo'}</p>
                <p className='text-yellow-600 text-[15px] lg:text-[20px] font-semibold'>{order.order.price.toFixed(2)}€</p>
            </div>

            {/* Detalles */}
            <div className='flex justify-center items-center gap-2'>
                <button onClick={()=>{setDetalles(!detalles)}} className={`cursor-pointer font-semibold text-white bg-black border-2 border-yellow-600 rounded-[10px] px-4 py-1 text-sm md:text-[15px]`}>{detalles ? 'Ocultar Detalles' : 'Ver Detalles'}</button>
                                
                {/* Recoger */}
                <button onClick={()=>{repeatOrder()}} className={`cursor-pointer font-semibold text-white bg-yellow-500 rounded-[10px] px-4 py-1 text-sm md:text-[15px]`}>Repetir Pedido</button>
            </div>

            {/* Detalles del pedido */}
            {detalles && (
            <div className="flex flex-col justify-center items-start gap-2 text-white">
                {order.order.products.map((product, index) => {
                const ingredientesSin = product?.ingredients
                    ?.filter((ing) => ing.selected === false)
                    .map((ing) => ing.name);

                    return (
                        <div
                        key={index}
                        className="flex flex-col lg:flex-row lg:gap-1 justify-center items-start text-sm md:text-md" 
                        >
                            {/* Nombre y cantidad */}
                            <p className="font-semibold">
                                x{product.quantity} {product.name}
                            </p>

                            {/* Ingredientes omitidos */}
                            {ingredientesSin && ingredientesSin.length > 0 && (
                                <p className="text-gray-300">
                                (Sin: {ingredientesSin.join(", ")})
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            )}


        

        </div>
    )
}
