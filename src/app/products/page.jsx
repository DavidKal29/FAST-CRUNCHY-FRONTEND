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
        <div className='bg-black min-h-screen flex flex-col justify-start items-center px-4 lg:px-16 py-2 gap-6'>
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
                    <div key={index} className='flex justify-start items-center gap-4 border-[2px] border-yellow-600 relative rounded-[10px] p-2 h-[8rem]'>
                        <img className='w-[20%]' key={index} src={product.image} alt="" />
                        <div className='flex flex-col justify-center items-start '>
                            <span className='text-yellow-600 font-bold '>{product.name}</span>
                            {product.ingredients && (<><p className='text-white text-sm'>{ingredientsFormalizer(product.ingredients)}</p></>)}
                        </div>
                        <p className='text-yellow-600 font-bold absolute right-1 bottom-0'>{product.price}€</p>
                        
                    </div>
                ))}
            </div>
            
        </div>
    )
}
