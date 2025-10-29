import React from 'react'
import HomeLink from './HomeLink'
import LoginLink from './LoginLink'

export default function Menu({menu,setMenu,user}) {
  return (
    <div className='flex justify-between items-center w-full border-b-yellow-600 border-b-2 md:border-b-4 mx-4'>
        <HomeLink></HomeLink>
        {
            user ? 
            (<>
                <button onClick={()=>{setMenu(!menu)}} className='cursor-pointer'><i className={`fa-solid fa-${menu ? 'x' : 'bars'} text-white text-[25px] md:text-[35px]`}></i></button>
            </>) 
                        
            : 
                        
            (<><LoginLink></LoginLink></>)
        }
    </div>
  )
}
