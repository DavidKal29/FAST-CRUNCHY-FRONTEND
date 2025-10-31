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

    const [products,setProducts] = useState([])
    const [category,setCategory] = useState('burgers')

    const [showPopup,setShowPopup] = useState(null)
    const [selectedProduct,setSelectedProduct] = useState(null)

    const categories = ['burgers','pizzas','kebabs','tacos','complements','drinks','deserts']

    const ingredientsFormalizer = (ingredients_array)=>{
        let text = ''
        ingredients_array.forEach(i => {
            if (i === ingredients_array[0]) {
                text = i.name
            }else{
                text = text + ', ' + i.name
            }
        });

        return text
    }

    const getProducts = (cat)=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/getproducts/${cat}`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.products) {
                setProducts(data.products)
            }else{
                toast.error(data.error)  
            }
        })
        .catch(error=>{
            console.log('Error al enviar los datos a Get Products');
            console.error(error);
            toast.error('Error al enviar los datos')  
        })
   
    }


    const changeCategory = (new_category)=>{
        setCategory(new_category)
        getProducts(new_category)
    }
    

    useEffect(()=>{
        document.title = 'Products'
    },[])

    useEffect(()=>{
        getProfile()
        getProducts(category)
    },[])

    

    const [menu,setMenu] = useState(false)

    
    return (
        <div className='bg-black min-h-screen flex flex-col justify-start items-center px-4 lg:px-16 py-2 gap-6 relative'>
            {/* Menú hamburguesa */}
            <MenuBurguer menu={menu} user={user} logout={<Logout toast={toast} router={router} setUser={setUser}></Logout>}></MenuBurguer>
            
            {/* Menu */}
            <Menu menu={menu} setMenu={setMenu} user={user} logout={<Logout toast={toast} router={router} setUser={setUser}></Logout>}></Menu>

            <div className='flex flex-col justify-center w-full items-center gap-2'>
                {/* Categorias */}
                <div className='flex justify-start items-start flex-col w-full gap-4'>
                    <h1 className='font-bold text-white text-[20px]'>Productos</h1>
                        
                    <div className='flex justify-start items-center gap-2 overflow-x-auto w-full overflow-hidden border-b-yellow-600 border-b-[2px] pb-4'>
                            
                        {categories.map((c,index)=>(
                            <button key={index} onClick={()=>{changeCategory(c)}} className={`cursor-pointer font-semibold rounded-[20px] px-4 py-2 ${category===c ? 'bg-yellow-600 text-black' : 'bg-black text-yellow-600 border-[2px] border-yellow-600'}`}>{c}</button>
                        ))}
                            
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center gap-4'>
                {products.map((product,index)=>(
                    <div onClick={()=>{setShowPopup(true); setSelectedProduct(product)}} key={index} className='flex justify-start items-center gap-4 border-[2px] border-yellow-600 relative rounded-[10px] p-2 h-[8rem]'>
                        <img className='w-[20%]' key={index} src={product.image} alt="" />
                        <div className='flex flex-col justify-center items-start '>
                            <span className='text-yellow-600 font-bold '>{product.name}</span>
                            {product.ingredients && (<><p className='text-white text-sm'>{ingredientsFormalizer(product.ingredients)}</p></>)}
                        </div>
                        <p className='text-yellow-600 font-bold absolute right-1 bottom-0'>{product.price}€</p>
                        
                    </div>
                ))}
            </div>


            {/* Popup de producto */}
            {showPopup && selectedProduct && (
                <div 
                    className='fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50'
                    onClick={() => setShowPopup(false)}
                >
                    <div 
                        className='bg-black border-2 border-yellow-600 rounded-2xl p-6 max-[360px]:w-[90%] md:w-[70%] relative shadow-xl text-center'
                        onClick={(e) => e.stopPropagation()} // evita que se cierre al click dentro
                    >
                        {/* Botón de cerrar */}
                        <button 
                            onClick={() => setShowPopup(false)} 
                            className='cursor-pointer absolute top-2 right-3 text-yellow-600 text-2xl font-bold hover:text-white transition'
                        >
                            ×
                        </button>


                        {/* Cabecera */}
                        <div className='flex items-center gap-3 p-4 border-b-2 border-yellow-600 mb-4'>

                            {/* Imagen */}
                            <img 
                                src={selectedProduct.image} 
                                alt={selectedProduct.name} 
                                className='w-[20%]' 
                            />
                            
                            <div className='flex justify-center items-start flex-col'>
                                <p className='text-white font-semibold text-[20px] sm:text-[22px] md:text-[26px]'>{selectedProduct.name}</p>
                                <p className='text-yellow-600'>{selectedProduct.price}€</p>
                            </div>     
                        </div>


                        {selectedProduct.ingredients && (<>
                            {/* Personalización */}
                            <div className='flex flex-col justify-center items-start gap-4 w-full mt-4'>

                                {/* Título */}
                                <h3 className='text-yellow-600 text-lg font-bold'>
                                    Personaliza tu pedido:
                                </h3>

                                {/* Subtítulo */}
                                <p className='text-white text-sm'>
                                    Quita los ingredientes que no quieres:
                                </p>

                                {/* Botones de acción */}
                                <div className='flex justify-start items-center gap-2'>
                                    <button 
                                    className='cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-4 py-1 transition'
                                    >
                                        Quitar todo
                                    </button>
                                    
                                    <button 
                                    className='cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-4 py-1 transition'
                                    >
                                        Restaurar
                                    </button>
                                </div>

                                {/* Ingredientes */}
                                <div className='flex flex-wrap justify-start items-center gap-2 mt-2 w-full'>
                                    {selectedProduct.ingredients?.map((ingredient, index) => (
                                    <div
                                        key={index}
                                        className='bg-black text-yellow-600 border border-yellow-600 font-semibold text-[11px] rounded-full px-3 py-2 break-words max-w-[140px] text-center hover:bg-yellow-600 hover:text-black cursor-pointer transition'
                                    >
                                        {ingredient.name}
                                    </div>
                                    ))}
                                </div>

                            </div>
                        </>)}


                        {/* Pie */}
                        <div className={`flex justify-center items-center gap-3 py-4 ${selectedProduct.ingredients ? 'border-t-2 border-yellow-600' : ''} mt-4`}>
                            {/* Botones de acción */}
                            <div className='flex justify-between items-center gap-2 w-full'>
                                <button 
                                onClick={()=>{setShowPopup(null)}}
                                className='cursor-pointer text-yellow-600 font-semibold rounded-full px-4 py-1'
                                >
                                    Cancelar
                                </button>
                                
                                <button 
                                className='cursor-pointer bg-yellow-600 text-black font-semibold rounded-full px-4 py-1'
                                >
                                    Guardar
                                </button>
                            </div>
                        </div> 
                    
                    </div>
                </div>
            )}
            
        </div>
    )
}
