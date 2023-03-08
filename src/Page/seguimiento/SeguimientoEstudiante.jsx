import React, { useRef, useState } from "react";
import { helpHttp } from "../../components/helpHttp";
import { useMutation } from "react-query";
import Carga from "../../components/Carga";
import ModalAsignaturas from "./components/ModalAsignaturas";
import { Alerta } from "../../components/Alerta";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { useSeguridad } from "../../components/useSeguridad";
import { useEffect } from "react";
const SeguimientoEstudiante = () => {
  const api = helpHttp();
  const input = useRef();
  const [opcion, setOpcion] = useState(0);
  const [modal, setModal] = useState(false);
  const [estudiante, setEstudiante] = useState(null);
  const Mensajes=Alerta();
  const {datosUsuario} = useSelector((state) => state.usuario);
  const verificar = useSeguridad();
  useEffect(() => {
    verificar
  }, []);
  const BuscarEstudiante = () => {
    let options = {
      headers: {
        'Content-Type': 'application/json'
      },

      body: { codigo: input.current.value, opcion: String(opcion) },
    }
    return api.post("/Trica/buscarEstudiante", options).then(res => { return res }).catch(res => res);
  }
 
  const CursosMatriculados = async (dato) => {
    let options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: { codigo: dato.codigoEst },
    }
    return await api.post("/Trica/CursosMatriculadosxEstudiante", options).then(res => {
     
      if(res.length === 0){       
       return Mensajes.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'No se encontro la matricula del estudiante',

        })
      } else{     
      setModal(true);
      setEstudiante(dato);
      return res 
    }
    }).catch(res => res);
  }
  const cursos = useMutation(CursosMatriculados);
  const mutation = useMutation(BuscarEstudiante);
  
  return (
    <>    
      {modal && <ModalAsignaturas setModal={setModal} data={cursos.data} estudiante={estudiante}/>}
      <div className="content-wrapper">
        <h1 className="text-xl text-center font-medium py-5 md:text-4xl">
          Seguimiento del Estudiante {datosUsuario?.anio || "0000"}-{datosUsuario?.periodo||"0"}
        </h1>

        {/* FILTRO DE BUSQUEDA */}
        <div className=" md:w-full flex justify-center">
          <div className="flex-col md:flex-row flex items-center pb-4">
            <div className=" flex" onChange={(e) => setOpcion(e.target.value)}>
              <div className="flex items-center mr-4">
                <input
                  id="inline-radio"
                  type="radio"
                  value="0"
                  name="filtro-radio"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="inline-radio"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Apellido y Nombre
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="inline-2-radio"
                  type="radio"
                  value="1"
                  name="filtro-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="inline-2-radio"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Código
                </label>
              </div>
            </div>

            <div className=" bg-white dark:bg-gray-900 flex justify-center items-center">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    
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
                  ref={input}
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Buscar por Estudiante"
                />
              </div>
              <button onClick={() => mutation.mutate()} type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <span className="sr-only">Search</span>
              </button>

            </div>
          </div>
        </div>
        {/* FIN DE FILTRO DE BUSQUEDA */}
        {/* TABLA DE SEGUIMIENTO */}
        <div className="w-fit m-auto overflow-x-auto relative shadow-md rounded-lg">
          <table className=" text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-3 md:px-6">
                  Codigo
                </th>
                <th scope="col" className="py-3 px-3 md:px-6">
                  Apellido y Nombre
                </th>
                <th scope="col" className="py-3 px-3 md:px-6">
                  Carrera
                </th>
                <th scope="col" className="py-3 px-3 md:px-6">
                  -
                </th>
              </tr>
            </thead>
            <tbody>
              {mutation.isLoading && <tr><td colSpan="4" className="text-center py-5"><Carga /></td></tr>}
              {mutation.isError && <tr><td colSpan="4" className="text-center">Error al cargar los datos</td></tr>}
              {mutation.isSuccess && mutation.data.length === 0 && <tr><td colSpan="4" className="text-center">No se encontraron resultados</td></tr>}
              {mutation.isSuccess && mutation.data.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="py-2 px-4 md:px-6 text-xs">{item.codigoEst}</td>
                  <td className="py-2 px-4 md:px-6 text-xs">{item.datosPersonales}</td>
                  <td className="py-2 px-4 md:px-6 text-xs">{item.carrera}</td>
                  <td className="py-2 px-4 md:px-6 text-xs">
                  <button
                  onClick={() => { cursos.mutate(item) }}
                  data-tip
                  data-for="iniciarSeguimientoTooltip"
                                    className=" transition  duration-75 hover:scale-110 bg-emerald-500 rounded-xl h-7 text-white px-2 block m-auto hover:bg-emerald-700"
                                >
                                    <IoMdAddCircleOutline className="text-white" />
                                </button>
                    

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </>
  );
};

export default SeguimientoEstudiante;
