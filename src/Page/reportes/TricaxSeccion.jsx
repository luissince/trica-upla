import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useSeguridad } from '../../components/useSeguridad';
import { helpHttp } from '../../components/helpHttp';
import { useMutation, useQuery } from 'react-query';
import ComboBox from '../seguimiento/components/ComboBox';
import { Alerta } from '../../components/Alerta';
import { useEffect } from 'react';
import Carga from '../../components/Carga';
const TricaxSeccion = () => {
  const api = helpHttp();
  const [facu, setFacultad] = useState("N");
  const [sede, setSede] = useState("N");
  const [carrera, setCarrera] = useState("N");
  const [tipo, setTipo] = useState("0");
  const [objeto, setObjeto] = useState(null);
  const { datosUsuario } = useSelector(state => state.usuario);
  const mensaje = Alerta();

  const verificar = useSeguridad();
 useEffect(() => {
  verificar
 }, [])
 
  function uniqueArray4(a) {
    return [...new Set(a)];
  }

  const listarSede = async () => {
    return await api.post("/General/listarSede", { body: { codigo: datosUsuario.docNumId } }).then((res) => res)
  }
  const listarFacultad = async () => {
    return await api.post("/General/listarFacultades", { body: { codigo: datosUsuario.docNumId } }).then((res) => res)
  }
  const listarCarrera = async () => {
    return await api.post("/General/listarCarrera", { body: { codigo: facu }, })
  }

  const {
    data: SedeData,
    status: sedeStatus
  } = useQuery(["sede"], listarSede);

  const { data: FacultadData,
    status: statusFacultad } = useQuery(
      ["facultad"],
      listarFacultad
    );
  const {
    data: CarreraData,
    status: statusCarrera,
    refetch: refeCarrera,
  } = useQuery(["carrera"], listarCarrera, { enabled: false });


  const obtenerTricaJalados = async () => {
    if (tipo == "N") {
      return mensaje.fire({
        title: "Error",
        text: "Debe seleccionar un tipo de reporte",
        icon: "error",
      })
    } else return await api.get(`/Trica/TricaJaladosxSeccion/${sede || "N"}/${facu.trim() || "N"}/${carrera.trim() || "N"}/${tipo || "0"}`).then((res) => res)
  }
  const Jalados = useMutation(obtenerTricaJalados);

  const GenerarJson = async (res) => {
    let sede = [];
    let obj = [];
    //json = uniqueArray4(data.sede)
    res.forEach(a => {
      sede.push(a.sede)
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
    for (let i = 0; i < obj.length; i++) {
      for (let j = 0; j < obj[i].facultades.length; j++) {
        for (const a of res) {
          if (obj[i].sede == a.sede && obj[i].facultades[j].facultad == a.facultad) {
            if (!validaRepetidoCa(obj[i].facultades[j].carrera, a.carrera)) {
              obj[i].facultades[j].carrera.push({
                carrera: a.carrera,
                nivel: [],
                total: res.filter(x => x.sede == obj[i].sede && x.facultad == obj[i].facultades[j].facultad && x.carrera == a.carrera).map(x => x.total).reduce((a, b) => a + b),
                desaprobado: res.filter(x => x.sede == obj[i].sede && x.facultad == obj[i].facultades[j].facultad && x.carrera == a.carrera).map(x => x.desaprobado).reduce((a, b) => a + b),
                aprobados: res.filter(x => x.sede == obj[i].sede && x.facultad == obj[i].facultades[j].facultad && x.carrera == a.carrera).map(x => x.aprobado).reduce((a, b) => a + b),
                impedidos: res.filter(x => x.sede == obj[i].sede && x.facultad == obj[i].facultades[j].facultad && x.carrera == a.carrera).map(x => x.impedido).reduce((a, b) => a + b),
                pendiente: res.filter(x => x.sede == obj[i].sede && x.facultad == obj[i].facultades[j].facultad && x.carrera == a.carrera).map(x => x.pendiente).reduce((a, b) => a + b),
              })
            }
          }
        }
      }
    }
    for (let c = 0; c < obj.length; c++) {
      for (let h = 0; h < obj[c].facultades.length; h++) {
        for (let v = 0; v < obj[c].facultades[h].carrera.length; v++) {

          for (const a of res) {
            if (obj[c].sede == a.sede && obj[c].facultades[h].carrera[v].carrera == a.carrera && obj[c].facultades[h].carrera[v].carrera == a.carrera) {
              if (!validaRepetidoNi(obj[c].facultades[h].carrera[v].nivel, a.nivel))
                obj[c].facultades[h].carrera[v].nivel.push({
                  nivel: a.nivel,
                  total: res.filter(x => x.sede == obj[c].sede && x.facultad == obj[c].facultades[h].facultad && x.carrera == obj[c].facultades[h].carrera[v].carrera && x.nivel == a.nivel).map(x => x.total).reduce((a, b) => a + b),
                  desaprobado: res.filter(x => x.sede == obj[c].sede && x.facultad == obj[c].facultades[h].facultad && x.carrera == obj[c].facultades[h].carrera[v].carrera && x.nivel == a.nivel).map(x => x.desaprobado).reduce((a, b) => a + b),
                  aprobados: res.filter(x => x.sede == obj[c].sede && x.facultad == obj[c].facultades[h].facultad && x.carrera == obj[c].facultades[h].carrera[v].carrera && x.nivel == a.nivel).map(x => x.aprobado).reduce((a, b) => a + b),
                  impedidos: res.filter(x => x.sede == obj[c].sede && x.facultad == obj[c].facultades[h].facultad && x.carrera == obj[c].facultades[h].carrera[v].carrera && x.nivel == a.nivel).map(x => x.impedido).reduce((a, b) => a + b),
                  pendiente: res.filter(x => x.sede == obj[c].sede && x.facultad == obj[c].facultades[h].facultad && x.carrera == obj[c].facultades[h].carrera[v].carrera && x.nivel == a.nivel).map(x => x.pendiente).reduce((a, b) => a + b),

                })
            }
          }
        }
      }
    }

    setObjeto(obj);

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
  function validaRepetidoCa(obj, valor) {
    let res = false;
    for (const a of obj) {

      if (a.carrera == valor) {
        res = true;
        break;
      }
    }
    return res;
  }
  function validaRepetidoNi(obj, valor) {
    let res = false;

    for (const a of obj) {

      if (a.nivel == valor) {
        res = true;
        break;
      }
    }
    return res;
  }
  useEffect(() => {
    Jalados.data != undefined && GenerarJson(Jalados.data)

  }, [Jalados.data])
console.log(objeto)
  return (
    <div className="content-wrapper dark:text-white">
      <h3 className="text-xl text-center font-medium py-5 md:text-4xl">
        Resumen General Trica por Nivel {datosUsuario.anio}-{datosUsuario.periodo}
      </h3>
      <div className="block md:flex md:items-center md:justify-around flex-wrap">
        <div className="flex flex-col items-center justify-center ">
          <label htmlFor="">Tipo</label>
          <ComboBox items={[{ id: "1", detalle: 'Primer Parcial' }, { id: "2", detalle: 'Final' }]} setValue={setTipo} />
        </div>
        <div className="flex flex-col items-center justify-center ">
          <label htmlFor="">Sede</label>
          {sedeStatus === "loading" ? (
            <ComboBox items={[]} />
          ) : sedeStatus === "error" ? (
            <ComboBox items={[]} />
          ) : (
            sedeStatus === "success" && <ComboBox id="sede"
              cambios={false}
              setValue={setSede}
              items={SedeData} />
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="">Facultad</label>
          {statusFacultad === "loading" ? (
            <ComboBox items={[]} />
          ) : statusFacultad === "error" ? (
            <ComboBox items={[]} />
          ) : (
            statusFacultad === "success" && (
              <ComboBox
                id="facu"
                cambios={true}
                refe={refeCarrera}
                setValue={setFacultad}
                items={FacultadData}
              />
            )
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="">Carrera</label>
          {statusCarrera === "loading" ? (
            <select
              className="block p-2 mx-3 mb-6 w-80 text-sm text-gray-900 bg-gray- rounded-lg border border-gray-300 focus:ring-blue-0 focus:border-blue-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-0 dark:focus:border-blue-0"
            >
              <option value={'N'}>Seleccione una opción</option>
            </select>
          ) : statusCarrera === "error" ? (
            <select
              className="block p-2 mx-3 mb-6 w-80 text-sm text-gray-900 bg-gray- rounded-lg border border-gray-300 focus:ring-blue-0 focus:border-blue-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-0 dark:focus:border-blue-0"
            >
              <option value={'N'}>Seleccione una opción</option>
            </select>
          ) : statusCarrera === "success" ? (
            <ComboBox
              cambios={false}
              setValue={setCarrera}
              items={CarreraData} />
          ) : (
            statusCarrera === "idle" && <ComboBox items={[]} />
          )}
        </div>
        {Jalados.isLoading ? (
          <button
            disabled
            type="button"
            className="block m-auto md:m-0 text-white bg-emerald-500 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 h-12 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emeral-800 items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
            </svg>
            Cargando...
          </button>
        ) : (
          <button
            onClick={() => Jalados.mutate()}
            type="button"
            className="transition delay-1 duration-300 hover:scale-110 bg-emerald-500 rounded-xl h-12 text-white px-5 m-auto md:m-0 block hover:bg-emerald-700"
          >
            Generar
          </button>
        )}

      </div>
      {Jalados.isLoading && <Carga />}
      {Jalados.isSuccess && <div className='w-auto m-auto overflow-scroll'>
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
                                            {item.facultades.map((item2, i2) => (
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
                                                        <ul>  {item2.carrera.map((item3, i3) => (
                                                            
                                                             <div>
                                                               <ul key={i3} className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                              <th className="py-3 px-6 w-80 max-w-[320px]"><small className='hidden font-bold'>Carrera</small> {item3.carrera}</th>
                                                                <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Aprobado</small> {item3.aprobados}</th>
                                                                <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Desaprobados</small> {item3.desaprobado}</th>
                                                                <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Impedido</small>  {item3.impedidos}</th>
                                                                <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Pendiente</small> {item3.pendiente}</th>
                                                                <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Total</small> {item3.total}</th>
                                                              </ul>
                                                               <ul>
                                                                {
                                                                  item3.nivel.map((it4,i4)=>(
                                                                    <ul key={i3} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                    <th className="py-3 px-6 w-80 max-w-[320px]"><small className=' font-bold'>Nivel</small> {it4.nivel}</th>
                                                                      <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Aprobado</small> {it4.aprobados}</th>
                                                                      <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Desaprobados</small> {it4.desaprobado}</th>
                                                                      <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Impedido</small>  {it4.impedidos}</th>
                                                                      <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Pendiente</small> {it4.pendiente}</th>
                                                                      <th className="w-36 py-3 px-6 text-center"> <small className='hidden font-bold'>Total</small> {it4.total}</th>
                                                                    </ul>
                                                                  ))
                                                                }
                                                               </ul>
                                                             </div>
                                                            
                                                            
                                                            ))}</ul>
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
            ))
            } 
        </ul>
      </div>
      }
    </div>
  )
}

export default TricaxSeccion