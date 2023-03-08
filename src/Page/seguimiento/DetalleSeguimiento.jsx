import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Testimonios from "./components/Testimonios";
import { TbEditCircle } from "react-icons/tb";
import { VscFilePdf } from "react-icons/vsc";
import ReactTooltip from "react-tooltip";
import ModalInvolucrado from "./components/ModalInvolucrado";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { reportes } from "../../components/reportes";
import Carga from "../../components/Carga";
import { useTitle } from "react-use";
import Estados from "./components/Estados";

const DetalleSeguimiento = () => {
  useTitle("Detalle de Seguimiento del Estudiante | Upla");
  const [modal, setModal] = useState(false);
  const [datos, setDatos] = useState({});
  const [tipo, setTipo] = useState("");
  const [reporte, setReporte] = useState(0);
  const [testimonio, setTestimonio] = useState({});
  const { detalleSeguimiento } = useSelector((state) => state.usuario);
  const { datosUsuario } = useSelector((state) => state.usuario);

  let nDatos = null;
  if (detalleSeguimiento === null) return <Navigate to={"/"} />;


  if (detalleSeguimiento.detalle === null || detalleSeguimiento.detalle.trim() == "") nDatos = "? ?,? ?".split(",");
  else nDatos = detalleSeguimiento?.detalle?.split(",");
  var nota1 = nDatos[0].split(" ");
  var nota2 = nDatos[1].split(" ");
  var token = JSON.parse(localStorage.getItem("datosUsuario"));
  const llamarModal = (tipo) => {
    setModal(true);
    setTipo(tipo);
    setDatos(detalleSeguimiento);
  };

  const obtenerInvolucrados = async () => {
    const { data } = await axios.post(
      process.env.URL + "/Trica/listarInvolucrado",
      {
        est_id: detalleSeguimiento.codigoEst,
        asi_id: detalleSeguimiento.codUEC,
        anioPeriodo: detalleSeguimiento.periodoFiltro.replace("-", ""),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.length !== 0) {
      data.map((item) => {
        document.querySelector("#" + item.cargo + "Detalle p").innerHTML = item.apellidoNombre;

      });
    }
    if (data.filter((item) => item.per_Id == datosUsuario.docNumId).length === 0) setReporte(1)
    else setReporte(0);
  };
  const obtenerMensajes = async () => {
    return await axios
      .post(
        process.env.URL + "/Trica/listarMensajeInvolucrado",
        {
          est_id: detalleSeguimiento.codigoEst,
          asi_id: detalleSeguimiento.codUEC,
          anioPeriodo: detalleSeguimiento.periodoFiltro.replace("-", ""),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  }



  useEffect(() => {
    obtenerInvolucrados();
  }, [])
 
  const mutation = useMutation(obtenerMensajes)
  useEffect(() => {
    mutation.mutate();
  }, [])

  let generar = reportes();

  return (
    <>
      {modal && (
        <ModalInvolucrado
          id={tipo + "Detalle"}
          items={datos}
          setModal={setModal}
          Tipo={tipo}
        />
      )}
      <div className="content-wrapper dark:text-white">
        <h3 className="text-xl text-center font-medium py-5 md:text-4xl">
          Detalle de Seguimiento {datosUsuario.anio}-{datosUsuario.periodo}
        </h3>
        {/* CONTENEDOR DE PERFIL Y MENSAJES */}
        <div className="flex flex-col md:flex-row">
          {/* PERFIL */}
          <div className="flex flex-col w-full items-center mb-5 md:w-[30%] mr-3">
            <div className="w-full max-w-sm bg-gray-50 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center py-10">
                <img
                  className="p-1 m-auto w-32 h-32 rounded-full ring-2 transition-all ring-gray-300 dark:ring-gray-500 hover:scale-105 ease-in duration-30"
                  src={`https://academico.upla.edu.pe/FotosAlum/037000${detalleSeguimiento.codigoEst}.jpg`}
                  alt="Bonnie image"
                />
                <h5 className="text-center mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {detalleSeguimiento.datosPersonales}
                </h5>
                <span className="text-lg text-gray-500 dark:text-gray-400">
                  {detalleSeguimiento.codigoEst}
                </span>

                {/* aqui empieza los detalles del perfil */}
                <div className="flex items-center justify-start mt-5">
                  <ul className=" flex flex-col items-start justify-center flex-wrap text-left text-gray-500 dark:text-gray-400">
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Sede:
                        </span>
                        {" " + detalleSeguimiento.sede}
                      </span>
                    </li>
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Facultad:
                        </span>
                        {" " + detalleSeguimiento.facultad}
                      </span>
                    </li>
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Carrera:
                        </span>
                        {" " + detalleSeguimiento.carrera}
                      </span>
                    </li>
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Modalidad:
                        </span>
                        {" " + detalleSeguimiento.modalidad}
                      </span>
                    </li>
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Celular:
                        </span>
                        {" " + detalleSeguimiento.telefono}
                      </span>
                    </li>
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Direccion:
                        </span>
                        {" " + detalleSeguimiento.direccion}
                      </span>
                    </li>
                    <br />
                    <li className="flex items-center space-x-1 mx-5">
                      <span className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Datos del Familiar:
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Nombre:
                        </span>
                        {" " + (detalleSeguimiento.contactoEmergencia !== null ? detalleSeguimiento.contactoEmergencia.toUpperCase() : '')}
                      </span>
                    </li>
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Celular:
                        </span>
                        {" " + detalleSeguimiento.telEmergencia}
                      </span>
                    </li>
                  </ul>
                </div>
                {/* aqui termina los detalles del perfil*/}
              </div>
            </div>
            {/* DETALLE DEL PERSONAL INVOLUCRADO */}
            <div className="w-full max-w-sm bg-gray-50 rounded-lg border py-4  border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 my-3">
              <div className="flex flex-col ">
                <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white pl-4">
                  Involucrados
                </span>
                <div className="flex items-start justify-start mt-5">
                  <ul className=" flex flex-col items-start justify-start flex-wrap text-left text-gray-500 dark:text-gray-400">
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span id="DocenteDetalle" className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Docente:
                        </span>
                        <p>{" ?"}</p>
                      </span>
                      <TbEditCircle
                        onClick={() => llamarModal("Docente")}
                        data-tip
                        data-for="Editar"
                        className="outline-none flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400 cursor-pointer hover:scale-110 transition-all ease-in-out"
                      />
                      <ReactTooltip id="Editar" place="top" effect="solid">
                        Editar
                      </ReactTooltip>
                    </li>
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span id="TutorDetalle" className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Tutor:
                        </span>
                        <p>{" ?"} </p>
                      </span>
                      <TbEditCircle
                        onClick={() => llamarModal("Tutor")}
                        data-tip
                        data-for="Editar"
                        className="outline-none flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400 cursor-pointer hover:scale-110 transition-all ease-in-out"
                      />
                      <ReactTooltip id="Editar" place="top" effect="solid">
                        Editar
                      </ReactTooltip>
                    </li>
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span id="PsicologoDetalle" className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Psicologo:
                        </span>
                        <p>{" ?"}</p>
                      </span>
                      <TbEditCircle
                        onClick={() => llamarModal("Psicologo")}
                        data-tip
                        data-for="Editar"
                        className="outline-none flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400 cursor-pointer hover:scale-110 transition-all ease-in-out"
                      />
                      <ReactTooltip id="Editar" place="top" effect="solid">
                        Editar
                      </ReactTooltip>
                    </li>
                    <li className="flex items-center space-x-1 mx-5">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span id="DirectorDetalle" className="ml-0">
                        <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                          Director:
                        </span>
                        <p>{" ?"}</p>
                      </span>
                      <TbEditCircle
                        onClick={() => llamarModal("Director")}
                        data-tip
                        data-for="Editar"
                        className="outline-none flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400 cursor-pointer hover:scale-110 transition-all ease-in-out"
                      />
                      <ReactTooltip id="Editar" place="top" effect="solid">
                        Editar
                      </ReactTooltip>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Detalle de asignatura y comentarios */}
          <div className="w-full px-5 md:px-0">
            <div
              className="p-4 w-full mb-5 text-gray-900 bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:text-gray-300"
              role="alert"
            >
              <i className="z-40 right-2 bottom-5 fixed flex justify-center items-center space-x-1 mx-5 bg-red-600 w-8 h-8 rounded cursor-pointer"
                data-tip
                data-for="pdf"
                onClick={() => { generar.pdf("/Reportes/fichaTrica", "Ficha Trica", { est_id: detalleSeguimiento.codigoEst, asi_id: detalleSeguimiento.codUEC, anioPeriodo: detalleSeguimiento.periodoFiltro, per_Id: datosUsuario.docNumId, tipoSeguimiento: reporte }); }}
              >
                <VscFilePdf className="text-white text-2xl" />
                <ReactTooltip id="pdf" place="top" effect="solid">
                  Reporte PDF
                </ReactTooltip>
              </i>
              <div className="flex items-center mb-3">
                <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  Datos de la Asignatura
                </span>
              </div>
              
              <div className="flex flex-col items-center justify-start sm:justify-start md:justify-center">
                <ul className=" flex flex-col md:flex-row flex-wrap items-start sm:justify-start md:items-center justify-center text-left text-gray-500 dark:text-gray-400">
                  <li className="flex items-center space-x-1 mx-5">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-0">
                      <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                        Cod. Asignatura:
                      </span>
                      {" " + detalleSeguimiento.codUEC}
                    </span>
                  </li>
                  <li className="flex items-center space-x-1 mx-5">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-0">
                      <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                        Asignatura:
                      </span>
                      {" " + detalleSeguimiento.uec}
                    </span>
                  </li>
                  <li className="flex items-center space-x-1 mx-5">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-0">
                      <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                        Nivel:
                      </span>
                      {" " + detalleSeguimiento.uecCiclo}
                    </span>
                  </li>
                  <li className="flex items-center space-x-1 mx-5">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-0">
                      <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                        Sección:
                      </span>
                      {" " + detalleSeguimiento.nta_Seccion}
                    </span>
                  </li>
                  <li className="flex items-center space-x-1 mx-5">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-0">
                      <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                        Docente:
                      </span>
                      {detalleSeguimiento.docente === "  "
                        ? " NO TIENE DOCENTE ASIGNADO"
                        : " " + detalleSeguimiento.docente}
                    </span>
                  </li>
                  <li className={`${detalleSeguimiento.tipoSeguimiento == 3 && 'hidden'} flex items-center space-x-1 mx-5`}>
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-0">
                      <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                        Notas:
                      </span>
                      {" " + nota1[0]}{" "}
                      <Estados item={nota1[1].replace(/\((\w+)\)/g, "$1")||"?"} opcion={1} />                    
                      {" |  " + nota2[0]}{"  "}
                      <Estados item={nota2[1].replace(/\((\w+)\)/g, "$1")||"?"} opcion={1} />                 
                    </span>
                  </li>

                  <li className={`${detalleSeguimiento.tipoSeguimiento == 3 && 'hidden'} flex items-center space-x-1 mx-5`}>
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-0">
                      <span className="ml-0 font-semibold text-gray-900 dark:text-white">
                        Asistencia:
                      </span>
                     
                      {" " + nota1[0]}{" "}
                      {nota1[2] != null ? <Estados item={parseInt(nota1[2].replace(/\((\w+)\)/g, "$1"))||"?"} opcion={2} /> : <Estados item={'?'} opcion={2} />}

                      {" |  " + nota2[0]}{" "}
                      {nota2[2] != null ? <Estados item={parseInt(nota2[2].replace(/\((\w+)\)/g, "$1"))||"?"} opcion={2} /> : <Estados item={'?'} opcion={2} />}
                    </span>
                  </li>
                  
                  
                </ul>
                      <ul className="text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-white p-2 mt-2 rounded-md">
                      <li className="flex flex-wrap">
                    <div className="flex">
                      <span className="mx-2 font-semibold">
                        Primer Parcial {detalleSeguimiento.periodoFiltro.substring(0,4)}-{detalleSeguimiento.periodoFiltro.substring(4,5)}:
                      </span>                                      
                        <div className="mr-2">Nota <Estados item={detalleSeguimiento.notapp||"?"} opcion={detalleSeguimiento.uec.substring(0, 6)=='TALLER'?3:1} /></div>
                        <div className="mr-2">Asistencia <Estados item={detalleSeguimiento.asistenciapp||"?"} opcion={2} /></div>
                      
                    </div>
                    <div className="flex">
                      <span className="mx-2 font-semibold">
                      Final:
                    </span>
                      
                        <div className="mr-2">Nota <Estados item={detalleSeguimiento.nota||'?'} opcion={detalleSeguimiento.uec.substring(0, 6)=='TALLER'?3:1} /></div>
                        <div className="mr2">Asistencia <Estados item={detalleSeguimiento.asistencia||"?"} opcion={2} /></div>
                      </div>
                  </li>
                      </ul>
              </div>
              
            </div>
            {mutation.isLoading ? <Carga /> :
              mutation.isError ? <h2>No se pudo cargar los mensajes, intente nuevamente</h2> :
                mutation.isSuccess && <Testimonios data={mutation} />
            }


          </div>
        </div>
      </div>
    </>
  );
};
export default DetalleSeguimiento;
