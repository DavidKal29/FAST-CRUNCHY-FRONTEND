import React, { useEffect } from 'react'
import { useState } from 'react'

export default function CartLink({cartCounter}) {
    
    
    return (
        <div className="fixed bottom-6 right-6 z-50">
        <a
            href="/cart"
            className="relative flex justify-center items-center w-16 h-16 rounded-full bg-yellow-600 text-black"
                >
            {/* Icono */}
            <i className="fa-solid fa-cart-shopping text-2xl"></i>

            {/* Contador */}
            {cartCounter > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-md font-bold rounded-full w-8 h-8 flex items-center justify-center">
                {cartCounter}
            </div>
            )}
        </a>
        </div>
    )
}
