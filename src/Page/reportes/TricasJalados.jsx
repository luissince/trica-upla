import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { helpHttp } from '../../components/helpHttp';
import ComboBox from '../seguimiento/components/ComboBox';
import { motion } from "framer-motion";
import Carga from '../../components/Carga';
import Estados from '../seguimiento/components/Estados';
import { CSVLink } from 'react-csv';
import { RiFileExcel2Fill } from 'react-icons/ri';
import Tarjeta from '../../components/Tarjeta';
import { Alerta } from '../../components/Alerta';
import ReactPaginate from 'react-paginate';
import { BsPieChartFill } from 'react-icons/bs';
import PieChart, {
    Legend,
    Series,
    Tooltip,
    Format,
    Label,
    Connector,
    Export,
    HoverStyle,
} from 'devextreme-react/pie-chart';
import { useSeguridad } from '../../components/useSeguridad';


const TricasJalados = () => {
    const mensaje = Alerta();
    const api = helpHttp();
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const { datosUsuario } = useSelector(state => state.usuario);
    const [facu, setFacultad] = useState("N");
    const [sede, setSede] = useState("N");
    const [carrera, setCarrera] = useState("N");
    const [tipo, setTipo] = useState("0");
    const [total, setTotal] = useState(0);
    const [desaprobados, setDesaprobados] = useState(0);
    const [impedidos, setImpedidos] = useState(0);
    const [aprobados, setAprobados] = useState(0);
    const [pendiente,setPendiente] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const [dataf, setDataf] = useState(null);
    const [filtro, setFiltro] = useState(null);
    //const pageCount = Math.ceil(desaprobados.length / usersPerPage);
    const verificar = useSeguridad();
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const obtenerTricaJalados = async () => {
        if(tipo == "N"){
            return mensaje.fire({
                title: "Error",
                text: "Debe seleccionar un tipo de reporte",
                icon: "error",
            })
        }else return await api.get(`/Trica/TricaJalados/${sede || "N"}/${facu.trim() || "N"}/${carrera.trim() || "N"}/${tipo || "0"}`).then((res) => res)        
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
    const Jalados = useMutation(obtenerTricaJalados);

    useEffect(() => {
        if(Jalados.isSuccess &&Jalados?.data?.length>0){
            setDesaprobados(Jalados?.data?.filter(x => {
                let res = [{ nota: '0' },{ nota: '00' }, { nota: '01' }, { nota: '02' }, { nota: '03' }, { nota: '04' }, { nota: '05' }, { nota: '06' }, { nota: '07' }, { nota: '08' }, { nota: '09' }, { nota: '10' }].find((a) => {
                    return a.nota == x.nota
                })
                return res
            }).length);
            setImpedidos(Jalados?.data?.filter(x => {
                let res = [{ nota: 'IM' }].find((a) => {
                    return a.nota == x.nota
                })
                return res
            }).length);
            setAprobados(Jalados?.data?.filter(x => {
                let res = [{ nota: '11' }, { nota: '12' }, { nota: '13' }, { nota: '14' }, { nota: '15' }, { nota: '16' }, { nota: '17' }, { nota: '18' }, { nota: '19' }, { nota: '20' }].find((a) => {
                    return a.nota == x.nota
                })
                return res
            }).length);
            setTotal(Jalados?.data?.length);
            setPendiente(Jalados?.data?.filter(x => {
                let res = [{ nota: null }].find((a) => {
                    return a.nota == x.nota
                })
                return res
            }).length)
        }       
    }, [Jalados.data]);
   
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

    const cargarGrafico = () => {
        setData([{ descripcion: "Desaprobados", val: desaprobados }, { descripcion: "Impedidos", val: impedidos }, { descripcion: "Aprobados", val: aprobados },{descripcion:"Pendiente",val:pendiente}]
        )
        setModal(true)
    }
  
    const customizeTooltip = (arg) => {
        return {
            text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
        };
    }
    useEffect(() => {
        verificar    
        }, [])


        const filtroJalados = async () => {
         
            setFiltro(Jalados?.data?.filter(x => {
                let res = [{ nota: '0' },{ nota: '00' }, { nota: '01' }, { nota: '02' }, { nota: '03' }, { nota: '04' }, { nota: '05' }, { nota: '06' }, { nota: '07' }, { nota: '08' }, { nota: '09' }, { nota: '10' }].find((a) => {
                    return a.nota == x.nota
                })
                return res
            }))  
        }
        const filtroAprobados =async () => {
                        setFiltro(Jalados?.data?.filter(x => {
                            let res = [{ nota: '11' }, { nota: '12' }, { nota: '13' }, { nota: '14' }, { nota: '15' }, { nota: '16' }, { nota: '17' }, { nota: '18' }, { nota: '19' }, { nota: '20' }].find((a) => {
                                return a.nota == x.nota
                            })
                            return res
                        }))
        }
        const filtroImpedidos = async () => {
            setFiltro(Jalados?.data?.filter(x => {
                let res = [{ nota: 'IM' }].find((a) => {
                    return a.nota == x.nota
                })
                return res
            }))
        }
        const filtroPendiente =  async() => {
            setFiltro(Jalados?.data?.filter(x => {
                let res = [{ nota: null }].find((a) => {
                    return a.nota == x.nota
                })
                return res
            }))
        }
        const filtroTodos = async () => {
            setFiltro(Jalados?.data)
        }
        useEffect(() => {
            filtroTodos()
        }, [Jalados.data])

    return (
        <>
            <div className='content-wrapper dark:text-white'>
                <h3 className="text-xl text-center font-medium pt-5 pb-7  md:text-4xl">
                    Tricas Desaprobados {datosUsuario?.anio || "0000"}-{datosUsuario?.periodo || "0"}
                </h3>


                {modal && <div className='w-full md:w-1/3 bg-white fixed md:right-1/4 top-28 z-50 flex flex-col'>
                    <PieChart
                        id="pie"
                        type="doughnut"
                        title="Estadisticas Trica"
                        palette="Soft Pastel"
                        dataSource={data}
                        className="w-11/12"
                    >
                        <Series argumentField="descripcion">
                                <HoverStyle color="#007cbc" />
                                <Label visible={true} >
                                <Connector visible={true} />
                            </Label>
                        </Series>
                        <Export enabled={true} />
                        <Legend
                            margin={0}
                            horizontalAlignment="right"
                            verticalAlignment="top"
                        />
                        <Tooltip enabled={true} customizeTooltip={customizeTooltip}>

                        </Tooltip>
                    </PieChart>
              
                    <button className='bg-green-500 rounded m-2 p-2 text-white' onClick={() => setModal(false)}>Cerrar</button>
                </div>}
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
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
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
                {
                    Jalados.isSuccess && Jalados.data.length > 0 && <div className=" bg-white dark:bg-gray-900 flex flex-col">

                        <div className='flex justify-around flex-wrap my-10'>
                           <Tarjeta evento={filtroAprobados} tamaño={{ w: 'w-auto' }} color={{ bg: 'bg-blue-500', texto: 'text-white' }} data={{ cabezera: aprobados, cuerpo: "Aprobados", icono: 'bi bi-app-indicator' }} />
                           
                            <Tarjeta evento={filtroJalados} tamaño={{ w: 'w-auto' }} color={{ bg: 'bg-red-500', texto: 'text-white' }} data={{ cabezera: desaprobados, cuerpo: "Desaprobados", icono: 'bi bi-app-indicator' }} />
                            <Tarjeta evento={filtroImpedidos} tamaño={{ w: 'w-auto' }} color={{ bg: 'bg-yellow-400', texto: 'text-white' }} data={{ cabezera: impedidos, cuerpo: "Impedidos", icono: 'bi bi-app-indicator' }} />
                            <Tarjeta evento={filtroPendiente} tamaño={{ w: 'w-auto' }} color={{ bg: 'bg-orange-400', texto: 'text-white' }} data={{ cabezera: pendiente, cuerpo: "Pendiente", icono: 'bi bi-app-indicator' }} />
                            <Tarjeta evento={filtroTodos} tamaño={{ w: 'w-auto' }} color={{ bg: 'bg-green-500', texto: 'text-white' }} data={{ cabezera: total, cuerpo: "TOTAL", icono: 'bi bi-app-indicator' }} />
                        </div>
                        <div className='flex'>
                            
                            {filtro!=null&& <CSVLink
                            data={filtro}
                            headers={[{ label: "Sede", key: "sede" },
                            { label: "Facultad", key: "facultad" },
                            { label: "Carrera", key: "carrera" },
                            { label: "Codigo Estudiante", key: "codigo" },
                            { label: "Nombre y Apellido", key: "estudiante" },
                            { label: "Codigo Asignatura", key: "asi_Id" },
                            { label: "Asignatura", key: "asignatura" },
                            { label: "Nivel", key: "nivel" },
                            { label: "Seccion", key: "seccion" },
                            { label: "Nota", key: "nota" },
                            { label: "Docente", key: "docente" },
                            { label: "Tipo Seguimiento", key:"tipoTrica"}
                            ]}
                            filename={`TricaDesaprobados-${sede}-${facu.trim()}-${carrera}`}
                            separator={";"}
                            onClick={() => {
                                mensaje.fire({
                                    icon: 'success',
                                    title: 'Excel Generado',
                                })
                            }}
                            className="bg-green-600 text-white w-8 h-8 rounded flex justify-center items-center text-lg"><RiFileExcel2Fill className='' />
                        </CSVLink> }
                            <div className="ml-3 bg-green-600 text-white w-8 h-8 rounded flex justify-center items-center text-lg cursor-pointer" onClick={() => cargarGrafico()}><BsPieChartFill /></div></div>
                    </div>

                }

                <motion.div variants={container}
                    initial="hidden"
                    animate="show" >
                    {
                        Jalados.isLoading && <Carga />}
                    {
                        Jalados.isSuccess&&Jalados?.data?.length>0 && 
                        <>
                            <motion.div
                                variants={item}
                                className='my-5'>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 cursor-default">
                                    <thead className="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="py-3 w-30 px-2 md:px-6">Cod Est</th>
                                            <th scope="col" className="py-3 w-80 px-2 md:px-6">Nombre y Apellido</th>
                                            <th scope="col" className="py-3 w-30 px-2 md:px-6">Cod Asi</th>
                                            <th scope="col" className="py-3 text-center px-2 ">Asignatura</th>
                                            <th scope="col" className="py-3 hidden md:table-cell text-center px-2 ">Nivel</th>
                                            <th scope="col" className="py-3 hidden md:table-cell  text-center px-2 ">Seccion</th>
                                            <th scope="col" className="py-3 text-center px-2 ">Nota</th>
                                            <th scope="col" className="py-3 hidden md:table-cell  text-center px-2 ">Docente</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {/*Jalados.isSuccess &&Jalados?.data?.length>0 && Jalados?.data?*/ filtro!= null&&filtro?.slice(pagesVisited, pagesVisited + usersPerPage)?.map((v, i) => {
                                            return (
                                                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="py-1 w-30 max-w-xs pl-4 text-[11px]">{v.codigo}</td>
                                                    <td className="py-1 w-80 max-w-xs pl-4 text-[11px]">{v.estudiante}</td>
                                                    <td className="py-1 w-30 max-w-xs pl-4 text-[11px]">{v.asi_Id}</td>
                                                    <td className="py-1 text-center text-[12px]">{v.asignatura}</td>
                                                    <td className="py-1 text-center hidden md:table-cell text-[12px]">{v.nivel}</td>
                                                    <td className="py-1 text-center hidden md:table-cell text-[12px]">{v.seccion}</td>
                                                    <td className="py-1 text-center  text-[12px]"><Estados item={v.nota||'SN'} opcion={1} /></td>
                                                    <td className="py-1 text-center hidden md:table-cell  text-[12px]">{v.docente}</td>
                                                </tr>
                                            )
                                        }

                                        )}
                                    </tbody>
                                </table>
                            </motion.div>
                            <div className="flex justify-between mt-1">
                                <p>
                                    Mostrando del {pagesVisited + 1} al{" "}
                                    {pagesVisited + usersPerPage > (filtro?.length)
                                        ? (filtro?.length)
                                        : pagesVisited + usersPerPage}{" "}
                                    de {(filtro?.length)} registros.
                                </p>
                                <ReactPaginate
                                    className="flex justify-end"
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    pageCount={Math.ceil((filtro?.length) / usersPerPage)}
                                    onPageChange={changePage}
                                    containerClassName={""}
                                    disabledClassName={"paginationDisabled"}
                                    previousLinkClassName={
                                        "block py-2 px-3 ml-0 leading-tight text-gray-0 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    }
                                    nextLinkClassName={
                                        "block py-2 px-3 leading-tight text-gray-0 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    }
                                    pageClassName={
                                        "py-2 px-3 leading-tight text-gray-0 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    }
                                    activeClassName={
                                        "z-10 py-2 px-3 leading-tight text-blue-600 bg-gray-100 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-900 dark:bg-gray-900 dark:text-white"
                                    }
                                />
                            </div>
                        </>
                    }
                </motion.div>

            </div>
        </>
    )
}
export default TricasJalados