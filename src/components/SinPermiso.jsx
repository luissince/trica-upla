import React from 'react'
import {GrAlert} from "react-icons/gr";
const SinPermiso=()=> {
  return (
        <div className='flex flex-col justify-center h-[calc(100vh_-_180px)] items-center '>
            <h1 className='font-extrabold  text-4xl md:text-7xl text-center'>Usted no cuenta con los permisos necesarios.!</h1>
           <GrAlert className='text-[11rem] bg-yellow-300 p-3 rounded-md mt-5' />
        </div> 
  )
}
export default SinPermiso
