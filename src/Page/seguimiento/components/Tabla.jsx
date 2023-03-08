import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "./Modal";
import { BiDetail } from "react-icons/bi";
import ReactTooltip from "react-tooltip";
import { IoMdAddCircleOutline } from "react-icons/io";
import Estados from "./Estados";
const Tabla = (props) => {
  const [modal, setModal] = useState(false);
  const inputBusqueda = useRef();
  const [pageNumber, setPageNumber] = useState(0);
  const [datos, setDatos] = useState({});
  const [filtro, setFiltro] = useState("");
  const [busqueda, setBusqueda] = useState(true);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(props.items.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const cargarModalEstudiante = (items) => {
    setDatos(items);
    setModal(true);
  };
  const cambioRadio = (e) => {
    if (e.target.value.trim() == "Estudiante") {
      setBusqueda(true);
      inputBusqueda.current.placeholder = "Busqueda por Estudiante";
    } else {
      setBusqueda(false);
      inputBusqueda.current.placeholder = "Busqueda por Docente";
    }
  };


  
 
  return (
    <>
      {modal && <Modal items={datos} btnModal={props.btnModal} setModal={setModal} />}
      {props.tipo == "1" ? (
        <div className="my-5 overflow-x-auto relative shadow-md sm:rounded-lg w-full -z-0">
          <div className="flex-col md:flex-row flex items-center pb-4">
            <div className=" flex" onChange={(e) => cambioRadio(e)}>
              <div className="flex items-center mr-4">
                <input
                  id="inline-radio"
                  type="radio"
                  value="Estudiante"
                  name="filtro-radio"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="inline-radio"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Estudiante
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="inline-2-radio"
                  type="radio"
                  value="Docente"
                  name="filtro-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="inline-2-radio"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  docente
                </label>
              </div>
            </div>

            <div className=" bg-white dark:bg-gray-900 flex justify-center">
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
                  ref={inputBusqueda}
                  type="text"
                  id="table-search"
                  onChange={(e) => setFiltro(e.target.value.toUpperCase())}
                  className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Buscar por Estudiante"
                />
              </div>
            </div>
          </div>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 cursor-default">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                <th scope="col" className="py-3 px-2 md:px-6">
                  Codigo
                </th>
                <th scope="col" className="py-3 px-2 md:px-6">
                  Nombre y Apellido
                </th>
                <th scope="col" className="hidden md:table-cell py-3 px-2">
                  Plan Est.
                </th>
                <th scope="col" className="hidden md:table-cell py-3 px-2">
                  Ciclo Ac.
                </th>
                <th scope="col" className="hidden md:table-cell py-3 px-6">
                  Asignatura
                </th>
                <th scope="col" className="hidden md:table-cell py-3">
                  Tipo
                </th>
                <th scope="col" className="py-3 text-center px-3">
                  Estado
                </th>
                <th scope="col" className="py-3 px-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
     
              {props.items.length>0&&props?.items
                ?.filter((item) =>
                  busqueda
                    ? item.datosPersonales.includes(filtro)
                    : item.docente.includes(filtro)
                )
                ?.slice(pagesVisited, pagesVisited + usersPerPage)
                ?.map((item, index) => {
                  return (
                    <tr
                      className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={index}
                    >
                      <td className="py-2 px-3 md:px-6 text-xs">{item.codigoEst}</td>
                      <td className="py-2 px-3 md:px-6 text-xs">
                        {item.datosPersonales}
                      </td>
                      <td className="hidden md:table-cell py-2 px-6 text-xs">
                        {item.planEstudios}
                      </td>
                      <td className="hidden md:table-cell py-2 px-6 text-xs">
                        {item.uecCiclo}
                      </td>
                      <td className="hidden md:table-cell py-2 px-6 text-xs">
                        <small className="block font-bold">{item.carrera}</small>
                        {item.uec}
                      </td>
                      <td className="hidden md:table-cell py-2  text-xs">
                        {item.descTrica}
                      </td>
                      <td className="text-center text-xs">
                        {" "}
                        <Estados item={item.estado} opcion={0} />
                      </td>
                      <td className="py-2 px-6">
                        <div className="flex justify-center">
                          <button
                            onClick={() => cargarModalEstudiante(item)}
                            type="button"
                            data-modal-toggle="defaultModal"
                            className="bg-emerald-500 rounded-xl  text-white p-1 h-6 m-auto md:mx-1 block hover:bg-emerald-700"
                            data-tip
                            data-for="iniciarSeguimientoTooltip"
                          >
                            <IoMdAddCircleOutline className="text-white" />
                          </button>
                          <ReactTooltip
                            id="iniciarSeguimientoTooltip"
                            place="top"
                            effect="solid"
                          >
                            Iniciar Seguimiento
                          </ReactTooltip>
                          <button
                            onClick={() => cargarModalEstudiante(item)}
                            type="button"
                            data-modal-toggle="defaultModal"
                            className="bg-emerald-500 rounded-xl  text-white p-1 h-6 m-auto md:m-0 block hover:bg-emerald-700"
                            data-tip
                            data-for="seguimientoTooltip"
                          >
                            <BiDetail />
                          </button>
                          <ReactTooltip
                            id="seguimientoTooltip"
                            place="top"
                            effect="solid"
                          >
                            Ver Seguimiento
                          </ReactTooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="flex justify-between mt-1 text-xs">
            <p>
              Mostrando del {pagesVisited + 1} al{" "}
              {pagesVisited + usersPerPage > props.items.length
                ? props.items.length
                : pagesVisited + usersPerPage}{" "}
              de {props.items.length} registros.
            </p>
            <ReactPaginate
              className="flex justify-end"
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={""}
              disabledClassName={"paginationDisabled"}
              previousLinkClassName={
                "block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              nextLinkClassName={
                "block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              pageClassName={
                "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              activeClassName={
                "z-10 py-2 px-3 leading-tight text-blue-600 bg-gray-100 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-900 dark:bg-gray-900 dark:text-white"
              }
            />
          </div>
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto relative shadow-md sm:rounded-lg w-full -z-0">
          <div className="pb-4 bg-white dark:bg-gray-900">
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
                placeholder="Buscar por Nombre"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-3 md:px-6">
                  Codigo
                </th>
                <th scope="col" className="py-3 px-3 md:px-6">
                  Nombre y Apellido
                </th>
                <th scope="col" className="hidden md:table-cell py-3 px-6">
                  Plan Est.
                </th>
                <th scope="col" className="hidden md:table-cell py-3 px-6">
                  Ciclo Ac.
                </th>
                <th scope="col" className="hidden md:table-cell py-3 px-6">
                  Asignatura
                </th>
                <th scope="col" className="py-3 px-6">
                  Tipo
                </th>
                <th scope="col" className="py-3 px-2">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {props.items.length>0&&props?.items
                ?.filter((item) => item.datosPersonales.includes(filtro))
                ?.slice(pagesVisited, pagesVisited + usersPerPage)
                ?.map((item, index) => {
                  return (
                    <tr
                      className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={index}
                    >
                      <td className="py-2 px-4 md:px-6 text-xs">{item.codigoEst}</td>
                      <td className="py-2 px-4 md:px-6 text-xs">
                        {item.datosPersonales}
                      </td>
                      <td className="hidden md:table-cell py-2 px-6 text-xs">
                        {item.planEstudios}
                      </td>
                      <td className="hidden md:table-cell py-2 px-6 text-xs">
                        {item.uecCiclo} 
                      </td> 
                      <td className="hidden md:table-cell py-2 px-6 text-xs">
                        <small className="block font-bold">{item.carrera}</small>
                        {item.uec}
                      </td>
                      <td className="py-2 px-6 text-xs">
                        {" "}
                      {item.descTrica}
                        {/* <Estados item={item.estado} opcion={0}/> */}
                      </td>
                      <td className="py-2 px-6">
                        <div className="flex justify-center">
                          <button
                            onClick={() => cargarModalEstudiante(item)}
                            type="button"
                            data-modal-toggle="defaultModal"
                            className="bg-emerald-500 rounded-xl  text-white p-1 h-6 m-auto md:m-0 block hover:bg-emerald-700"
                            data-tip
                            data-for="seguimientoTooltip"
                          >
                            <BiDetail />
                          </button>
                          <ReactTooltip
                            id="seguimientoTooltip"
                            place="top"
                            effect="solid"
                          >
                            Ver Seguimiento
                          </ReactTooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="flex justify-between mt-1">
            <p>
              Mostrando del {pagesVisited + 1} al{" "}
              {pagesVisited + usersPerPage > props.items.length
                ? props.items.length
                : pagesVisited + usersPerPage}{" "}
              de {props.items.length} registros.
            </p>
            <ReactPaginate
              className="flex justify-end"
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={""}
              disabledClassName={"paginationDisabled"}
              previousLinkClassName={
                "block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              nextLinkClassName={
                "block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              pageClassName={
                "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              activeClassName={
                "z-10 py-2 px-3 leading-tight text-blue-600 bg-gray-100 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-900 dark:bg-gray-900 dark:text-white"
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Tabla;
