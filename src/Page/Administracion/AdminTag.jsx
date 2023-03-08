import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Alerta } from '../../components/Alerta'
import { helpHttp } from '../../components/helpHttp'
import { useSeguridad } from '../../components/useSeguridad'
const AdminTag = () => {
    const [modal, setModal] = useState(false)
    const api = helpHttp()
    const verificar = useSeguridad();
   // const rcodigo = useRef(0), rcargo = useRef(), rdescripcion = useRef(), restado = useRef()
    const [codigo,setCodigo] = useState(), [cargo,setCargo] = useState(), [descripcion,setDescripcion] = useState(), [estado,setEstado] = useState()
    const obtenerTag=()=>{
        return api.get(`/Trica/MantenimientoTag/1/asd/Docente/true/1`).then(res=> res)
    }
    const ltag = useMutation(obtenerTag);
    const msj = Alerta()
    //const {data:tag, status:sTag} = useQuery(['tag'],obtenerTag)
    const enviarDatos = async (v)=>{        
        setModal(true);         
        setCodigo(v.idTag);
        setCargo(v.cargo);
        setDescripcion(v.descripcion);
        setEstado(v.idEstado);
        /* cargo.current = v.cargo;
        descripcion.current = v.descripcion;
        estado.current = v.estado;*/      
    }   
    useEffect(() => {
     verificar
    }, [])
    
    useEffect(() => {
        ltag.mutate()
    }, [])
    const nuevoTag = async (e)=>{
        setModal(true);         
        setCodigo(0);
        setCargo("Docente");
        setDescripcion("");
        setEstado(1);
    }
    const guardarTag = async (e)=>{
       e.preventDefault()
       
      api.get(`/Trica/MantenimientoTag/${codigo}/${descripcion}/${cargo}/${estado==1?true:false}/${codigo==0?'2':'3'}`).then(res=> {
        switch (res[0]?.rpta) {
            case '0':
                msj.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar el registro'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setModal(false)
                        ltag.mutate()
                    }
                })
                break;
            case '1':
                msj.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'Se guardo el registro correctamente'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setModal(false)
                        ltag.mutate()
                    }
                })
                break;
            case '2':
                msj.fire({
                    icon: 'success',
                    title: 'Modificado',
                    text: 'Se modifico el registro correctamente'

                }).then((result) => {
                    if (result.isConfirmed) {
                        setModal(false)
                        ltag.mutate()
                    }
                })
                break;
            default:
                console.log(res)
                break;
        }
      })  
       
    }
  
    return (
        <div className="content-wrapper dark:text-white">
            <h3 className="text-xl text-center font-medium py-5 md:text-4xl">
                Administración de etiquetas
            </h3>
            {
                modal&&<div className={`absolute top-0 right-0 z-50 bg-sombra w-full h-screen transition-all ease-in-out duration-200`}>
                <form className="bg-white dark:bg-gray-800 dark:border-gray-800 px-10 relative w-3/4 md:w-1/4 border top-1/4 left-0 right-0  m-auto">
                    <h1 className='mt-5 text-center font-bold text-xl'>Mantenimiento de Etiquetas</h1>
                    <div className="hidden relative z-0 mt-6 mb-6 w-full group">
                        <input  value={codigo} onChange={(e)=> setCodigo(e.target.value) } type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Codigo</label>
                    </div>
                    <div className="relative z-0 mt-5 mb-6 w-full group">
                        <input value={descripcion} onChange={(e)=> setDescripcion(e.target.value) } type="text" name="descripcion" id="descripcion" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="descripcion" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripción</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                    <select value={cargo} onChange={(e)=> setCargo(e.target.value) } name="cargo" id="cargo" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'>
                                <option value="Docente">DOCENTE</option>
                                <option value="Psicologo">PSICOLOGO</option>
                                <option value="Tutor">TUTOR</option>
                                <option value="Director">DIRECTOR</option>
                            </select>
                        <label htmlFor="cargo" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cargo</label>
                    </div>
                    
                        <div className="relative z-0 mb-6 w-full group">
                            <select value={estado} onChange={(e)=> setEstado(e.target.value) } name="estado" id="estado" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'>
                                <option value={1}>ACTIVO</option>
                                <option value={0}>INACTIVO</option>
                            </select>
                            <label htmlFor="estado" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estado</label>
                        </div>
                    
                    <div className='flex justify-around mb-6'>
                    <button type='submit' onClick={(e)=>guardarTag(e)} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Guardar</button>
                    <button onClick={()=>setModal(false)} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Cancelar</button>
                    </div>
                </form>
            </div>
            }
            
            <table className="w-full md:w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 rounded m-auto">
                        <thead className="text-[10px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded">
                            <tr>
                                <th scope="col" className="py-3 px-2 md:px-6">Cargo</th>
                                <th scope="col" className="py-3 text-center px-2 ">Descripcion</th>
                                <th scope="col" className="py-3 text-center px-2 ">Estado</th>
                                <th scope="col" className="py-3 text-center px-2 "> <button onClick={(e)=>nuevoTag(e)} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-normal rounded-lg text-xs w-full sm:w-auto px-3 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Nuevo</button> </th>
                                
                            </tr>
                        </thead>
                        <tbody >
                            {ltag?.data?.map((v, i) => {
                                
                                return (
                                   
                                        <tr key={i} className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="py-1 max-w-xs overflow-hidden px-3 text-[11px]">{v.cargo}</td>
                                            <td className="py-1 text-center text-[11px]">{v.descripcion}</td>
                                            <td className="py-1 text-center text-[11px] font-extrabold">{v.estado}</td>
                                            <td className="py-1 text-center text-[11px] font-extrabold">
                                                <button onClick={()=>enviarDatos(v)} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-normal rounded-lg text-xs w-full sm:w-auto px-3 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Editar</button>
                                            </td>
                                        </tr>
                                      
                                        
                                   




                                )
                            }

                            )}
                        </tbody>
                    </table>
        </div>
    )
}
export default AdminTag