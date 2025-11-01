'use client';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Menu from '../components/Menu';
import MenuBurguer from '../components/MenuBurguer';
import Logout from '../components/Logout';


export default function Home() {

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
            setCart(cart)
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
        }else{
            setCart([])
        }

    }

    const ingredientsFormalizer = (ingredients_array)=>{
        let text = 'Sin:'

        const notSelectedIngredients = ingredients_array.filter(ing => ing.selected === false)

        if (notSelectedIngredients.length===0) {
            return ''
        }


        notSelectedIngredients.forEach(i => {
            if (i === notSelectedIngredients[0]) {
                text =  text + ' ' + i.name
            }else{
                text = text + ', ' + i.name
            }
        });

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
                    <h1 className='font-bold text-white text-[20px]'>{price.toFixed(2)}€</h1>
                            
                    <button className='cursor-pointer font-semibold rounded-[20px] px-4 py-2 bg-yellow-600 text-black'>Pagar</button>
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
            
        </div>
    )
}