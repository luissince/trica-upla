import React from 'react'

const Tarjeta = ({ evento,color, tamaño, data }) => {
  
    return (
        <button onClick={()=> evento != undefined&&evento()} className={`${color?.bg} ${color?.texto || "texto-white"} ${tamaño?.h || "h-28"} ${tamaño?.w || "w-36"} 
         mt-5 min-w-[180px] px-5 min-h-28 rounded-md flex items-center uppercase cursor-pointer justify-center hover:transition-transform hover:scale-110 ease-linear duration-500`}>
           {data?.icono !== undefined&& <i className={`${data?.icono} w-10 mr-3 text-3xl text-sombra text-center`}></i> } 
            <div className='flex flex-col'>
                {data?.cabezera !== undefined && <h1 className='font-bold up'>{data?.cabezera}</h1>}
                {data?.cuerpo !== undefined && <h1>{data?.cuerpo}</h1>}
            </div>
        </button>
    )
}
export default Tarjeta
