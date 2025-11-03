'use client';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Menu from '../components/Menu';
import MenuBurguer from '../components/MenuBurguer';
import Logout from '../components/Logout';


export default function Cart() {

    const router = useRouter()

    const [user,setUser] = useState(null)
    const [cart,setCart] = useState([])
    const [price,setPrice] = useState(0)
    
    const getProfile = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/profile`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.success) {
                setUser(data.user)
                console.log('Usuario:', data)
            }else{
                console.log(data.error);
                    
            }
        })
        .catch(error=>{
            console.log('Error al enviar los datos a Perfil');
            console.error(error);
            toast.error('Error al enviar los datos')  
        })
       
    }

    const getCart = ()=>{
        let cart = JSON.parse(localStorage.getItem('cart'))

        if (cart) {
            const reversedCart = [...cart].reverse()
            setCart(reversedCart)
        }else{
            setCart([])
        }
    }

    const getPrice = ()=>{
        let cart = JSON.parse(localStorage.getItem('cart'))

        if (cart) {
            let price = 0
            cart.forEach(p => {
                const unilateralPrice = p.price * p.quantity
                price += unilateralPrice
            });

            setPrice(price)
        }

    }

    const ingredientsFormalizer = (ingredients_array)=>{
        const notSelectedIngredients = ingredients_array.filter(ing => ing.selected === false)

        if (notSelectedIngredients.length===0) {
            return ''
        }

        let array = notSelectedIngredients.map(ing=>ing.name)
        let text = 'Sin: ' + array.join(", ")

        return text
    }
    
    const deleteProduct = (product)=>{

        toast("¿Seguro que quieres eliminar este producto?", {
            action: {
                label: "Eliminar",
                onClick: () => {
                    setCart(
                        prevCart =>{
                            const updatedCart = prevCart.filter(p => !(p._id === product._id && JSON.stringify(p.ingredients) === JSON.stringify(product.ingredients)))

                            localStorage.setItem('cart',JSON.stringify(updatedCart))
                            return updatedCart
                        }
                    )
                },
            },
            cancel: {
                label: "Cancelar",
                onClick: () => toast.info("Eliminación cancelada"),
            },
        });

    }

    const increaseProduct = (product)=>{
        setCart(
            prevCart =>{
                const updatedCart = prevCart.map(p=>(
                    p._id === product._id 
                    && 
                    JSON.stringify(p.ingredients) === JSON.stringify(product.ingredients) 
                    ?
                    {...p,quantity:(p.quantity+1)}
                    :
                    p
                                            
                ))

                localStorage.setItem('cart',JSON.stringify(updatedCart))
                return updatedCart
            }
        )

    }

    const decreaseProduct = (product)=>{
        if (product.quantity>1) {
            setCart(
                prevCart =>{
                    const updatedCart = prevCart.map(p=>(
                        p._id === product._id 
                        && 
                        JSON.stringify(p.ingredients) === JSON.stringify(product.ingredients) 
                        ?
                        {...p,quantity:(p.quantity-1)}
                        :
                        p
                                                
                    ))

                    localStorage.setItem('cart',JSON.stringify(updatedCart))
                    return updatedCart
                }
            )
        }else{
            deleteProduct(product)
        }

    }


    const [confirmPopUp,setConfirmPopUp] = useState(null)
    const [paymentPopUp,setPaymentPopUp] = useState(null)

    const [domicilio,setDomicilio] = useState(true)
    
    const pedidoDomicilio = ()=>{
        setDomicilio(true)
    }
    
    const pedidoRecoger = ()=>{
        setDomicilio(false)
    }

    const createOrder = ()=>{
        if (!user?.address && domicilio) {
            toast.error('Debes añadir una dirección')
        }

        const address = domicilio ? user.address.address : 'none'

        const order = {price:price, products:cart, pickUp:!domicilio, address:address, createdAt: new Date()}

        console.log(order);
        
    
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/createorder`,{
            method:'POST',
            credentials:'include',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({order}) //Metemos dentro de objeto para el Body de Nest
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.success) {
                router.push('/orders');
                toast.success(data.success)
                setCart([])
                localStorage.clear()
            }else{
                console.log(data.error);
                toast.error(data.error)
                    
            }
        })
        .catch(error=>{
            console.log('Error al enviar los datos a Create Order');
            console.error(error);
            toast.error('Error al enviar los datos')  
        })
       
    }
    

    useEffect(()=>{
        document.title = 'Cart'
    },[])

    useEffect(()=>{
        getProfile()
        getCart()
        getPrice()
    },[])

    useEffect(() => {
        getPrice();
    }, [cart]);


    

    const [menu,setMenu] = useState(false)

    
    return (
        <div className='bg-black min-h-screen flex flex-col justify-start items-center px-4 lg:px-16 py-2 gap-6'>
            {/* Menú hamburguesa */}
            <MenuBurguer menu={menu} user={user} logout={<Logout toast={toast} router={router} setUser={setUser}></Logout>}></MenuBurguer>
            
            {/* Menu */}
            <Menu menu={menu} setMenu={setMenu} user={user} logout={<Logout toast={toast} router={router} setUser={setUser}></Logout>}></Menu>


            {/* Titulo */}
            <div className='flex justify-start w-full items-center gap-2'>
                <a href="/products"><i className="fa-solid fa-arrow-left text-white text-[30px]"></i></a>
                <span className='text-yellow-600 font-semibold text-[30px]'>{cart.length>0 ? 'Tu pedido:' : 'Carrito Vacío'}</span>
            </div>

            {cart.length>0 && (<>
                {/* Pagar */}
                <div className='flex justify-between items-center w-full gap-4'>
                    {/* Precio Total */}
                    <h1 className='font-bold text-white text-[20px]'>{price.toFixed(2)}€</h1>
                            
                    {/* Boton para pagar */}
                    <button onClick={()=>{user ? setConfirmPopUp(true) : router.push('/')}} className='cursor-pointer font-semibold rounded-[20px] px-4 py-2 bg-yellow-600 text-black'>Pagar</button>
                </div>
                
                {/* Productos del carrito */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center gap-4'>
                    {cart.map((product,index)=>(
                        <div key={index} className='cursor-pointer flex justify-start items-center flex-col gap-4 border-[2px] border-yellow-600 relative rounded-[10px] p-4'>

                        <div className='flex justify-start items-center gap-2'>
                            <img className='w-[20%]' key={index} src={product.image} alt="" />
                            
                            
                            <div className='flex flex-col justify-center items-start '>
                                <span className='text-yellow-600 font-bold '>{product.name}</span>
                                {product.ingredients && (<><p className='text-white text-sm'>{ingredientsFormalizer(product.ingredients)}</p></>)}
                            
                            
                            </div>
                        </div>

                        <div className='flex justify-between items-center gap-4 w-full'>
                            <span className='text-yellow-600 font-bold text-[20px]'>{(product.price * product.quantity).toFixed(2)}€</span>

                            <div className='flex justify-center items-center gap-3'>
                                <button onClick={()=>{increaseProduct(product)}} 
                                className='cursor-pointer rounded-full border-2 border-yellow-600 text-yellow-600 w-8 h-8 text-[15px]'>
                                    <i className="fa-solid fa-plus"></i>
                                </button>

                                <span className='text-yellow-600 font-bold'>{product.quantity}</span>

                                <button onClick={()=>{decreaseProduct(product)}} 
                                className='cursor-pointer rounded-full border-2 border-yellow-600 text-yellow-600 w-8 h-8 text-[15px]'>
                                    <i className="fa-solid fa-minus"></i>
                                </button>
            
                            </div>  

                            <button onClick={()=>{deleteProduct(product)}}  
                                className='cursor-pointer rounded-full flex justify-center items-center bg-red-600 text-white p-3 text-[15px]'>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>              
                        
                        
                        </div>
                    ))}
                </div>
            </>)}


            {/* Popup de confirmación */}
            {confirmPopUp && (
                <div 
                    className='fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50'
                    onClick={() => setConfirmPopUp(false)}
                >
                    <div 
                        className='bg-black border-2 border-yellow-600 rounded-2xl p-6 max-[360px]:w-[90%] md:w-[70%] xl:w-[50%] relative shadow-xl flex flex-col justify-start items-start gap-6'
                        onClick={(e) => e.stopPropagation()} // evita que se cierre al click dentro
                    >
                        <h1 className='text-yellow-600 font-semibold text-[25px]'>Confirmar Pedido</h1>

                        <p className='text-white'>Elige como completar tu pedido y revisa la dirección de entrega (si es envío a domcilio)</p>

                        <div className='flex justify-center items-center gap-4'>
                            {/* Domicilio */}
                            <button onClick={()=>{pedidoDomicilio()}} className={`cursor-pointer font-semibold text-white ${domicilio ? 'bg-yellow-600' : 'bg-black border-2 border-yellow-600'} rounded-[10px] px-4 py-1 text-sm md:text-[15px]`}>Envío a domicilio</button>
                            
                            {/* Recoger */}
                            <button onClick={()=>{pedidoRecoger()}} className={`cursor-pointer font-semibold text-white ${!domicilio ? 'bg-yellow-500' : 'bg-black border-2 border-yellow-500'} rounded-[10px] px-4 py-1 text-sm md:text-[15px]`}>Para recoger</button>
                        </div>
                        
                        {/* Dirección */}
                        {user && user.address &&(<>
                            <div className={`${domicilio ? 'block' : 'hidden'} bg-[#1B1A1A] text-white font-bold text-sm md:text-[15px] w-full rounded-[15px] p-4 flex justify-center items-center gap-4`}>
                                <div className='flex justify-center items-center gap-2'>
                                    <i className="fa-solid fa-location-dot"></i> {user.address.address}
                                </div>
                                <a className='text-yellow-600 font-semibold' href="/addresses">Cambiar</a>
                            </div>
                        </>)}

                        <div className='flex justify-between items-center w-full'>
                            <button onClick={()=>{setConfirmPopUp(false)}} className='cursor-pointer text-yellow-600 font-semibold text-md'>Cerrar</button>
                            <button onClick={()=>{setConfirmPopUp(false);setPaymentPopUp(true)}} className='cursor-pointer bg-yellow-600 text-black rounded py-2 px-4 font-semibold'>Continuar</button>
                        </div>

                    </div>
                
                </div>
         
            )}

            {/* Popup de pago */}
            {paymentPopUp && (
                <div 
                    className='fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50'
                    onClick={() => setPaymentPopUp(false)}
                >
                    <div 
                        className='bg-black border-2 border-yellow-600 rounded-2xl p-6 max-[360px]:w-[90%] md:w-[70%] xl:w-[50%] relative shadow-xl flex flex-col justify-start items-start gap-6'
                        onClick={(e) => e.stopPropagation()} // evita que se cierre al click dentro
                    >
                        <h1 className='text-yellow-600 font-semibold text-[25px]'>Simular Pago</h1>

                        {/* Importe a pagar */}
                        <div className='flex justify-center items-center gap-4 border-2 border-yellow-600 text-white rounded-[10px] p-4'>
                            <i className="fa-solid fa-id-card text-[20px]"></i>
                            <div className='flex flex-col justify-center items-start'>
                                <p className='text-[15px]'>Importe a cobrar</p>
                                <span className='font-bold text-[30px]'>{price.toFixed(2)}€</span>
                            </div>
                        </div>

                        <p className='text-white'>No se realizará ningún cargo real. Pulse Pagar Ahora para finalizar el pedido</p>
                        
                    
                        <div className='flex justify-between items-center w-full'>
                            <button onClick={()=>{setPaymentPopUp(false);}} className='cursor-pointer text-yellow-600 font-semibold text-md'>Cancelar</button>
                            <button onClick={()=>{createOrder();setPaymentPopUp(false)}} className='cursor-pointer bg-yellow-600 text-black rounded py-2 px-4 font-semibold'>Pagar Ahora</button>
                        </div>

                    </div>
                
                </div>
         
            )}
            
        </div>
    )
}