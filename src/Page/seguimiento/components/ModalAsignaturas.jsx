import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io';
import {AiOutlineEye} from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { helpHttp } from '../../../components/helpHttp';
import { Alerta } from '../../../components/Alerta';
import ReactTooltip from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { cargarDetalleSeguimiento } from "../../../store/slices/usuario";
const ModalAsignaturas = (props) => {
    const navigate = useNavigate();
    const api = helpHttp();
    const Mensajes = Alerta();
    const {datosUsuario} = useSelector(state => state.usuario);
    const dispatch = useDispatch();
    const RegistrarSeguimiento = (e) => {
        Mensajes.fire({ 
         //   title: 'hola', 
            icon: 'question', 
            text: '¿Desea registrar el seguimiento?',
            showCancelButton: true,
        }).then
        (res => {
            if (res.isConfirmed) {
              
                let options = {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                   body: { 
                        est_id: props.estudiante.codigoEst,
                        asi_id: e.asi_id,       
                        usuRegistra: datosUsuario.docNumId,
                        apellidoNombre: '',
                        AnioIngreso: '',
                        PlanEstudios: e.pEs_Id,
                        VDesaprobado: 0,
                        UECCiclo: e.nta_Nivel,
                        Detalle: '',
                        Nta_Seccion: e.nta_Seccion,
                        Per_Id : '',
                        tipoSeguimiento:3
                        },
                }              
                api.post("/Trica/RegistroSeguimiento", options).then(res => {
                   
                    switch (res[0].rpta) {
                        case '1':
                            Mensajes.fire({
                                icon: 'success',
                                title: 'Exito',
                                text: 'El seguimiento se registro correctamente',
                            }).then(res => {
                                if (res.isConfirmed) {
                                    verSeguimiento({asi_id: e.asi_id})
                                }
                            })
                            break;
                        case '2':
                            Mensajes.fire({
                                icon: 'warning',
                                title: 'Oops...',
                                text: 'Ya se inicio el seguimiento de esta asignatura!',
                            })
                            break;
                        case '0':
                            Mensajes.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Ocurrio un error al registrar el seguimiento!',
                            })
                        default:
                            Mensajes.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Ocurrio un error al registrar el seguimiento!',
                            })
                            break;
                        }
                }).catch(res => res);
            }
        })
    }

    const verSeguimiento = (item) => {
        api
          .post("/Trica/buscarSeguimiento", {
            headers: {
              "Content-Type": "application/json",
            },
            body: {
                tipoSeguimiento:2,
              est_id: props.estudiante.codigoEst,
              asi_id: item.asi_id,
              anioPeriodo: props.estudiante.periodoFiltro,
            },
          })
          .then((res) => {
          
            if (res.length > 0) {
           
              dispatch(cargarDetalleSeguimiento(res[0]));
              navigate(`/detalleSeguimiento`);
            } else {
              Mensajes.fire({
                title: "Alerta",
                text: "No existe registro del seguimiento!",
                icon: "warning",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    return (
        <div>
            <div
                modal-backdrop=""
                className="background bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"
            ></div>
            <div
                id="modalEl"
                tabIndex={-1}
                className=" text-sm md:max-w-full  inset-0  flex overflow-y-auto overflow-x-hidden fixed  z-50 w-full md:w-[calc(100%_-_268px)] md:ml-[268px]  h-modal md:h-full justify-center items-center"
            >
                <div className="md:max-w-full flex-wrap break-all">
                    <div className="md:max-h-[600px] mt-5 md:mt-0 max-h-[650px] overflow-auto p-4 md:max-w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className=" flex flex-wrap break-all justify-between items-center mb-4">
                            <h5 className="text-xl m-auto font-bold leading-none text-gray-900 dark:text-white">
                                Datos del Estudiante
                            </h5>
                            <button
                                onClick={() => props.setModal(false)}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="defaultModal"
                            >
                                <svg

                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="max-w-[350px] md:max-w-full flow-root t">
                            <ul
                                role="list"
                                className="divide-y divide-gray-200 dark:divide-gray-700"
                            >
                                <li className="flex py-2 sm:py-2 flex-wrap">
                                    <div className="flex w-28 items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Codigo
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {props.estudiante.codigoEst}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Apellidos y Nombres
                                            </p>
                                            <p className="break-all truncate text-sm text-gray-500  dark:text-gray-400">
                                                {props.estudiante.datosPersonales}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex overflow-hidden md:overflow-visible py-2 sm:py-2">
                                    <div className="flex min-w-[7rem] w-28 items-center space-x-4">
                                        <div className="flex-1  min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Celular
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {props.estudiante.telefono}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Dirección
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {props.estudiante.direccion}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2 sm:py-2">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Correo
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {props.estudiante.correoElectronico.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="pt-3 pb-0 sm:pt-4 ">
                                    <div className="flex items-center space-x-4 shadow-md rounded-lg">
                                        <div className="flex-1 min-w-0 ">
                                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="py-1 px-1 text-center w-16  text-xs">
                                                            Código
                                                        </th>
                                                        <th scope="col" className="py-1 px-2 text-center  text-xs">
                                                            Asignatura
                                                        </th>
                                                        <th scope="col" className="hidden md:table-cell py-1 px-2 text-center  text-xs">
                                                            Plan
                                                        </th>
                                                        <th scope="col" className="hidden md:table-cell py-1 px-2 text-center  text-xs">
                                                            Nivel
                                                        </th>
                                                        <th scope="col" className="hidden md:table-cell py-1 px-2 text-center  text-xs">
                                                            Sección
                                                        </th>
                                                        <th scope="col" className="-cell py-1 px-2 text-center  text-xs">

                                                        </th>
                                                        <th>

                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.data.map((item, index) =>
                                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="py-1 px-1 text-center text-xs">
                                                                {item.asi_id}
                                                            </td>
                                                            <td className="py-1 px-3 text-left text-xs">
                                                                {item.asi_Asignatura}
                                                            </td>
                                                            <td className="hidden md:table-cell py-1 px-3 text-center text-xs">
                                                                {item.pEs_Id}
                                                            </td>
                                                            <td className="hidden md:table-cell py-1 px-3 text-center text-xs">
                                                                {item.nta_Nivel}
                                                            </td>
                                                            <td className="hidden md:table-cell py-1 px-3 text-center text-xs">
                                                                {item.nta_Seccion}
                                                            </td>
                                                            <td className="py-1 px-3 md:pr-3 text-center md:text-lg" data-tip data-for={item.asi_id}>
                                                                       
                                                                {item.estado=='0'?<i className="bi bi-x text-red-500"></i>:<i className="bi bi-check text-green-300"></i>}
                                                                <ReactTooltip
                                                                    id={item.asi_id}
                                                                    place="top"
                                                                    effect="solid"
                                                                >
                                                                    {item.estado=='0'?'Sin Seguimiento':'Iniciado'}
                                                                </ReactTooltip>
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.estado=='0'?
                                                                    <button
                                                                    data-tip 
                                                                    data-for={item.asi_id+"1"}
                                                                    onClick={() => RegistrarSeguimiento(item)}
                                                                    className="my-1 transition  duration-75 hover:scale-110 bg-emerald-500 rounded-xl h-7 text-white px-2 block m-auto hover:bg-emerald-700"
                                                                >
                                                                    <IoMdAddCircleOutline className="text-white" />
                                                                </button>
                                                                :
                                                                <button
                                                                    onClick={()=>verSeguimiento(item)}
                                                                    data-tip 
                                                                    data-for={item.asi_id+"1"}
                                                                    className="my-1 transition  duration-75 hover:scale-110 bg-emerald-500 rounded-xl h-7 text-white px-2 block m-auto hover:bg-emerald-700"
                                                                >
                                                                    <AiOutlineEye className="text-white" />
                                                                </button>
                                                                }  
                                                                 <ReactTooltip
                                                                    id={item.asi_id+"1"}
                                                                    place="top"
                                                                    effect="solid"
                                                                >
                                                                    {item.estado=='0'?'Iniciar':'Ver'}
                                                                </ReactTooltip>                                                                                                                          
                                                            </td>
                                                        </tr>
                                                    )}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAsignaturas