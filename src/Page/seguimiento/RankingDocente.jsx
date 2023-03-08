import React, { useEffect, useState } from 'react'
import { helpHttp } from '../../components/helpHttp'
import { useMutation, useQuery } from 'react-query'
import ComboBox from './components/ComboBox'
import { useSelector } from 'react-redux'
import Carga from '../../components/Carga'
import { motion } from "framer-motion";
import { useSeguridad } from '../../components/useSeguridad'
export const RankingDocente = (props) => {
    const api = helpHttp();
    const [asigna, setAsigna] = useState([]);
    const { datosUsuario } = useSelector(state => state.usuario);
    const [facu, setFacultad] = useState("N");
    const [sede, setSede] = useState("N");
    const [carrera, setCarrera] = useState("N");
    const [filtro, setFiltro] = useState("");
    const [especialidad, setEspecialidad] = useState("SX");
    const [tipo,setTipo] = useState("0");
    const verificar = useSeguridad();
    useEffect(() => {
      verificar
    }, [])
    
    const obtenerRankingDocente = async () => {
        return await api.get(`/Trica/RankingDocentesJalados/${sede||"N"}/${facu||"N"}/${carrera||"N"}/2/${tipo||"0"}`).then((res) => res)
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
    const Ranking  = useMutation(obtenerRankingDocente);
 
    /*const {
        data: Ranking,
        status: rStatus,
    } = useQuery(["Ranking"], obtenerRankingDocente);*/
   
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

    /* const {
         data: dataEspecialidad,
         status: statusEspecialidad,
         refetch: refeEspecialidad,
       } = useQuery(["especialidad"], listarEspecialidad, { enabled: false });
     */
    const convierteDatos = (data, per_Id) => {
        let stado = false;
        for (const item of data) {
            if (item.dni == per_Id) {
                stado = true;
                break;
            }
        }
        return stado;
    }
    let docente = [];
  
    useEffect(() => {

        if (Ranking.isSuccess == true) {
            for (const item of Ranking.data) {
                if (!convierteDatos(docente, item.per_Id||'00000000'))
                    docente.push({ dni: item.per_Id||'00000000', nombre: item.nombre||'SIN DOCENTE', asignaturas: [] });
            }
            for (const item of docente) {
                const n = Ranking.data.filter(x => x.per_Id == item.dni)
                item.asignaturas.push(n);
            }
            for (const doc of docente) {
                let aprobado = 0;
                let desaprobado = 0;
                let impedido = 0;
                for (const asi of doc.asignaturas[0]) {
                    aprobado += parseInt(asi.aprobados);
                    desaprobado += parseInt(asi.desaprobados);
                    impedido += parseInt(asi.impedidos);
                }
                doc.asignaturas[0].push({
                    aprobados: aprobado,
                    asi_Asignatura: '',
                    asi_Id: '',
                    car_Carrera: '',
                    desaprobados: desaprobado,
                    impedidos: impedido,
                    nombre: '',
                    nta_Nivel: '',
                    nta_Seccion: 'TOTAL',
                    pEs_Id: '',
                    per_Id: '',
                    sed_Sede: ''
                });
                doc.desaprobados = desaprobado;
            }
            docente.sort(function(a,b){
                if(a.desaprobados > b.desaprobados){
                    return -1;
                }
            }).map((v,i)=>{
                v.ranking = i+1
            })
           setAsigna(docente)        
        }


    }, [Ranking.data]) 
    const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.01,
          }
        }
      }
      const item = {
        hidden: { opacity: 0, scale: 0 },
        show: { opacity: 1, scale: 1 },
      };
    
    return (
        <>
            <div className='content-wrapper dark:text-white'>
                <h3 className="text-xl text-center font-medium pt-5 pb-7  md:text-4xl">
                    Ranking de Docentes con más desaprobados {datosUsuario?.anio || "0000"}-{datosUsuario?.periodo||"0"}
                </h3>
                <div className="block md:flex md:items-center md:justify-around flex-wrap">
                <div className="flex flex-col items-center justify-center ">
                        <label htmlFor="">Tipo</label>                     
                            <ComboBox items={[{id:0,detalle:'Primer Parcial'},{id:1,detalle:'Final'}]} setValue={setTipo}/>
                        
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
             className="block p-2 mx-3 mb-6 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >         
                 <option value={'N'}>Seleccione una opción</option>                 
             </select>
            ) : statusCarrera === "error" ? (
                <select 
                className="block p-2 mx-3 mb-6 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          {Ranking.isLoading? (
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
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Cargando...
            </button>
          ) : (
            <button
              onClick={() => Ranking.mutate()}
              type="button"
              className="transition delay-150 duration-300 hover:scale-110 bg-emerald-500 rounded-xl h-12 text-white px-5 m-auto md:m-0 block hover:bg-emerald-700"
            >              
              Generar
            </button>            
          )}
          
                </div>
                {
                   !Ranking.isLoading&& asigna.length > 0 && <div className=" bg-white dark:bg-gray-900 flex ">
                    <label htmlFor="table-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative mt-1">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        
                        type="text"
                        id="table-search"
                        onChange={(e) => setFiltro(e.target.value.toUpperCase())}
                        className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar por nombre"
                      />
                    </div>
                  </div>
                }
                <motion.div variants={container}
                    initial="hidden"
                    animate="show" >
                {
                Ranking.isLoading ? <Carga/>:
                asigna.length > 0 && asigna.sort(function (a, b) {
                    if (a.desaprobados > b.desaprobados) return -1;
                }).filter((item)=> item.nombre.includes(filtro)).map((v, i) =>              
        
                (<motion.div 
                    variants={item}
                key={i} className='my-5'>
                    <h1>{v.nombre} <span className='text-4xl'>#{v.ranking}</span></h1>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 w-80 px-2 md:px-6">Asignatura</th>
                                <th scope="col" className="py-3 text-center px-2 ">Nivel</th>
                                <th scope="col" className="py-3 text-center px-2 ">Seccion</th>
                                <th scope="col" className="py-3 hidden md:table-cell  text-center px-2 ">Aprobados</th>
                                <th scope="col" className="py-3 text-center px-2 ">Desaprobados</th>
                                <th scope="col" className="py-3 hidden md:table-cell  text-center px-2 ">Impedidos</th>
                                <th scope="col" className="py-3 hidden md:table-cell  text-center px-2 ">Total</th>
                            </tr>
                        </thead>
                        <tbody >
                            {v.asignaturas[0].map((v, i) => {                                
                                return (
                                    v.nta_Seccion == 'TOTAL' ?
                                        <tr key={i} className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="py-1 max-w-xs overflow-hidden pr-1 text-[12px]">{v.asi_Asignatura}</td>
                                            <td className="py-1 text-center text-[12px]">{v.nta_Nivel}</td>
                                            <td className="py-1 text-center text-[12px] font-extrabold">{v.nta_Seccion}</td>
                                            <td className="py-1 text-center hidden md:table-cell  text-[12px] font-extrabold">{v.aprobados}</td>
                                            <td className="py-1 text-center text-[12px] font-extrabold">{v.desaprobados}</td>
                                            <td className="py-1 text-center text-[12px] hidden md:table-cell  font-extrabold">{v.impedidos}</td>
                                            <td className="py-1 text-center text-[12px] hidden md:table-cell  font-extrabold">{parseInt(v.desaprobados) + parseInt(v.aprobados) + parseInt(v.impedidos)}</td>
                                        </tr>
                                        :                                        
                                        <tr key={i} className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="py-1 w-80 max-w-xs pl-4 text-[11px]">
                                            <small className='block font-bold'>{v.car_Carrera}</small>   
                                                {v.asi_Asignatura}                                                                                 
                                            </td>
                                            <td className="py-1 text-center text-[12px]">{v.nta_Nivel}</td>
                                            <td className="py-1 text-center text-[12px]">{v.nta_Seccion}</td>
                                            <td className="py-1 text-center hidden md:table-cell  text-[12px]">{v.aprobados}</td>
                                            <td className="py-1 text-center text-[12px]">{v.desaprobados}</td>
                                            <td className="py-1 text-center hidden md:table-cell  text-[12px]">{v.impedidos}</td>
                                            <td className="py-1 text-center hidden md:table-cell  text-[12px]">{parseInt(v.desaprobados) + parseInt(v.aprobados) + parseInt(v.impedidos)}</td>
                                            
                                        </tr>
                                        
                                   




                                )
                            }

                            )}
                        </tbody>
                    </table>
                </motion.div>)
                )
                    }
                    </motion.div>
            </div>
        </>
    )
}



export default RankingDocente