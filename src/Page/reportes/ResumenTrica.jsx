import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { helpHttp } from '../../components/helpHttp'
import { useSeguridad } from '../../components/useSeguridad';
import Carga from '../../components/Carga';
const ResumenTrica = () => {
    const api = helpHttp();    
    const [filtro,setFiltro] = useState("1");
    const [objeto, setObjeto] = useState(null);
    const {datosUsuario} = useSelector(state=>state.usuario);
    const verificar = useSeguridad();
   
    const obtenerData = async () => {
        return await api.get(`/Trica/TricaJaladosEstadistica/${filtro}`).then(res => res)
    }
    const tricaGeneral = useMutation(obtenerData);
    function uniqueArray4(a) {
        return [...new Set(a)];
    }
    function armarJson(res) {
        let sede = [];
        let obj = [];
    
        if (res != null && res?.err!=true && res != undefined) {
            res.forEach(element => {
                sede.push(element.sede)
            });
            sede = uniqueArray4(sede);
            for (let i = 0; i < sede.length; i++) {
                obj.push(
                    {
                        sede: sede[i],
                        facultades: [],
                        total: res.filter(x => x.sede == sede[i]).map(x => x.total).reduce((a, b) => a + b),
                        desaprobado: res.filter(x => x.sede == sede[i]).map(x => x.desaprobado).reduce((a, b) => a + b),
                        aprobados: res.filter(x => x.sede == sede[i]).map(x => x.aprobado).reduce((a, b) => a + b),
                        impedidos: res.filter(x => x.sede == sede[i]).map(x => x.impedido).reduce((a, b) => a + b),
                        pendiente: res.filter(x => x.sede == sede[i]).map(x => x.pendiente).reduce((a, b) => a + b),
                    })
            }
            for (let i = 0; i < obj.length; i++) {
                for (const a of res) {
                    if (obj[i].sede == a.sede) {
                        if (!validaRepetido(obj[i].facultades, a.facultad))
                            obj[i].facultades.push({
                                facultad: a.facultad,
                                carrera: [],
                                total: res.filter(x => x.sede == obj[i].sede && x.facultad == a.facultad).map(x => x.total).reduce((a, b) => a + b),
                                desaprobado: res.filter(x => x.sede == obj[i].sede && x.facultad == a.facultad).map(x => x.desaprobado).reduce((a, b) => a + b),
                                aprobados: res.filter(x => x.sede == obj[i].sede && x.facultad == a.facultad).map(x => x.aprobado).reduce((a, b) => a + b),
                                impedidos: res.filter(x => x.sede == obj[i].sede && x.facultad == a.facultad).map(x => x.impedido).reduce((a, b) => a + b),
                                pendiente: res.filter(x => x.sede == obj[i].sede && x.facultad == a.facultad).map(x => x.pendiente).reduce((a, b) => a + b),
                            })
                    }
                }
            }
            for (const s of obj) {
                for (const f of s.facultades) {
                    for (const c of res) {
                        if (s.sede == c.sede && c.facultad == f.facultad) {
                            f.carrera.push(
                                {
                                    carrera: c.carrera,
                                    total: c.total,
                                    desaprobado: c.desaprobado,
                                    aprobados: c.aprobado,
                                    impedidos: c.impedido,
                                    pendiente: c.pendiente,
                                })
                        }
                    }
                }
            }
        }
        return obj;
    }
    function validaRepetido(obj, valor) {
        let res = false;
        for (const a of obj) {
            if (a.facultad == valor) {
                res = true;
                break;
            }
        }
        return res;
    }
    useEffect(() => {
        setObjeto(armarJson(tricaGeneral.data));
    }, [tricaGeneral.data])

    useEffect(() => {
        tricaGeneral.mutate();
    }, [])

    const obtenerInformacion = async (e) => {
        e.preventDefault();
        await setFiltro(e.target.value);
      
      tricaGeneral.mutate();
    }
    useEffect(() => {
        verificar    
        }, [])
 
     
    return (
        <div className="content-wrapper dark:text-white">
            <h3 className="text-xl text-center font-medium py-5 md:text-4xl">
                Resumen General Trica {datosUsuario.anio}-{datosUsuario.periodo} 
            </h3>
         <div className='flex flex-col justify-center items-center'>
            <label htmlFor="">Filtro</label>
         <select 
         className="block p-2 mx-3 mb-6 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         onChange={(e)=> obtenerInformacion(e)} name="" id="">
            <option value="1">Primer Parcial</option>
            <option value="2">Segundo Parcial</option>
         </select>
         </div>
            {tricaGeneral.isLoading&&<Carga/>}
            {tricaGeneral.isSuccess&& <div className='w-auto m-auto overflow-scroll'>
                <ul>
                    {objeto != null && objeto.map((item, i) => (
                        <li key={i} className="mt-10">
                            <table className="w-auto text-sm text-left text-gray-500 dark:text-gray-400 m-auto cursor-default">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="py-3 px-6 w-80 max-w-[320px]" ><small className='font-bold block'>Sede</small>{item.sede}</th>
                                        <th className="py-3 px-6 text-center w-36"><small className='font-bold block'>Aprobados</small>{item.aprobados}</th>
                                        <th className="py-3 px-6 text-center w-36"><small className='font-bold block'>Desaprobados</small>{item.desaprobado}</th>
                                        <th className="py-3 px-6 text-center w-36"><small className='font-bold block'>Impedidos</small>{item.impedidos}</th>
                                        <th className="py-3 px-6 text-center w-36"><small className='font-bold block'>Pendientes</small>{item.pendiente}</th>
                                        <th className="py-3 px-6 text-center w-36"><small className='font-bold block'>Total</small>{item.total}</th>
                                    </tr>
                                </thead>
                                <tbody>                                  
                                    <tr>
                                        <td colSpan='6'>
                                            <div className="pt-2 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">                                             
                                                <ul>                                             
                                                    {item.facultades/*.sort((a,b) =>{ if(a.desaprobado >b.desaprobado){return -1}})*/.map((item2, i2) => (
                                                        <div key={i2}>
                                                            <div className="bg-gray-50 border-b dark:bg-gray-700 dark:border-gray-700 flex" >
                                                                <li className='py-1 px-6 w-80 max-w-[320px]'><small className='font-bold block'>Facultad</small> {item2.facultad}</li>
                                                                <li className="w-36 py-3 px-6 text-center font-black text-[10.5px] uppercase"><small className='font-bold block'>Aprobados</small>{item2.aprobados}</li>
                                                                <li className="w-36 py-3 px-6 text-center font-black text-[10.5px] uppercase"><small className='font-bold block'>Desaprobados</small>{item2.desaprobado}</li>
                                                                <li className="w-36 py-3 px-6 text-center font-black text-[10.5px] uppercase"><small className='font-bold block'>Impedidos</small>{item2.impedidos}</li>
                                                                <li className="w-36 py-3 px-6 text-center font-black text-[10.5px] uppercase"><small className='font-bold block'>Pendiente</small>{item2.pendiente}</li>
                                                                <li className="w-36 py-3 px-6 text-center font-black text-[10.5px] uppercase"><small className='font-bold block'>Total</small>{item2.total}</li>
                                                             </div>
                                                        <div>
                                                           
                                                            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400"'>
                                                                <thead className='text-xs text-gray-700 uppercase bg-white dark:bg-gray-800 dark:text-gray-400 w-full'>
                                                                    {item2.carrera.map((item3, i3) => (
                                                                    <tr key={i3}>
                                                                        <th className="py-3 px-6 w-80 max-w-[320px]"><small className='hidden font-bold'>Carrera</small> {item3.carrera}</th>
                                                                        <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Aprobado</small> {item3.aprobados}</th>
                                                                        <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Desaprobados</small> {item3.desaprobado}</th>
                                                                        <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Impedido</small>  {item3.impedidos}</th>
                                                                        <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Pendiente</small> {item3.pendiente}</th>
                                                                        <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Total</small> {item3.total}</th>
                                                                    </tr>
                                                                    ))}
                                                                </thead>
                                                            
                                                            </table>
                                                        </div>
                                                        </div>                                                        
                                                    ))}                                              
                                                </ul>
                                            </div>                                         
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    ))}
                </ul>
            </div>
            }
        </div>
    )
}
export default ResumenTrica
