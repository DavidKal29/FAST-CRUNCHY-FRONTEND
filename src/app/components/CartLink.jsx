'use client'
import React, { useEffect, useState } from 'react'

export default function CartLink() {
  const [cartCounter, setCartCounter] = useState(0)

  const getCartitems = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))

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

  useEffect(() => {
    getCartitems()

    // Escuchar el evento personalizado “storage” cuando cambie el carrito
    window.addEventListener('storage', getCartitems)

    // Limpieza
    return () => window.removeEventListener('storage', getCartitems)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="/cart"
        className="relative flex justify-center items-center w-16 h-16 rounded-full bg-yellow-600 text-black shadow-lg shadow-yellow-800/40 hover:scale-110 hover:bg-yellow-500 transition-transform duration-300"
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
