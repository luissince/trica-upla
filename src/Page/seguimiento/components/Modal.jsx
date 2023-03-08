import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Alerta } from "../../../components/Alerta";
import { useDispatch, useSelector } from "react-redux";
import { cargarDetalleSeguimiento } from "../../../store/slices/usuario";
import axios from "axios";
import { helpHttp } from "../../../components/helpHttp";
const Modal = (props) => {
 
  const { datosUsuario } = useSelector((state) => state.usuario);
  const [botones, setBotones] = useState(true);
  const token = JSON.parse(localStorage.getItem("datosUsuario"));
  const navigate = useNavigate();
  const api = helpHttp();
 
  var nDatos = props.items.detalle!=null&&props.items.detalle!=""&&props.items.detalle.split(",");
  
  var nota1 = nDatos&&nDatos[0]?.split(" ");
  var nota2 = nDatos&&nDatos[1]?.split(" ");
  const dispatch = useDispatch();
  const Mensajes = Alerta();
  useEffect(() => {
    
    if(props.btnModal !== null)
      setBotones(props.btnModal);
    
  }, [botones]);
  const verSeguimiento = () => {
    api
      .post("/Trica/buscarSeguimiento", {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          tipoSeguimiento:2,
          est_id: props.items.codigoEst,
          asi_id: props.items.codUEC,
          anioPeriodo: props.items.periodoFiltro?.replace("-", ""),
        },
      })
      .then((res) => {
        console.log(res);
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

  const registrarSeguimineto = async (data) => {
    await axios
      .post(
        process.env.URL + "/Trica/registroSeguimiento",
        {
          est_id: data.codigoEst,
          asi_id: data.codUEC,       
          usuRegistra: datosUsuario.docNumId,
          apellidoNombre: data.docente,
          AnioIngreso: data.anioIngreso,
          PlanEstudios: data.planEstudios,
          VDesaprobado: data.vDesaprobado,
          UECCiclo: data.uecCiclo,
          Detalle: data.detalle,
          Nta_Seccion: data.nta_Seccion||"",
          Per_Id : data.per_Id||"",
          tipoSeguimiento:data.tipoSegId
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((res) => {
        if (res.data[0].rpta == "0") {
          Mensajes.fire({
            title: "Alerta",
            text: "No pudo iniciar el seguimiento, contactese con la oficina de informatica!",
            icon: "error",
          });
        } else if (res.data[0].rpta == "1") {
          Mensajes.fire({
            title: "Correcto!",
            text: "Se inicio el seguimiento con exito!",
            icon: "success",
          });
        } else if (res.data[0].rpta == "2") {
          Mensajes.fire({
            title: "Alerta",
            text: "Ya existe registro del seguimiento!",
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
          className="text-sm md:max-w-full flex overflow-y-auto overflow-x-hidden fixed top-[5%] right-0 left-0 z-50 w-full md:w-[calc(100%_-_268px)] md:ml-[268px] md:inset-0 h-modal md:h-full justify-center items-center"
        >
          <div className="max-w-[380px] md:max-w-full flex-wrap break-all">
            <div className=" p-4 w-full max-w-md md:max-w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-wrap break-all justify-between items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Datos del Estudiante 
                </h5>
                <button
                  onClick={() => props.setModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                >
                  <svg
                    aria-hidden="true"
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
              <div className="flow-root">
                <h3 className="text-center font-bold mb-3">{props.items.descTrica}</h3>
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
                          {props.items.codigoEst}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Apellidos y Nombres
                        </p>
                        <p className="break-all truncate text-sm text-gray-500  dark:text-gray-400">
                          {props.items.datosPersonales}
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
                          {props.items.telefono}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Dirección
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {props.items.direccion}
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
                          {props.items.correoElectronico?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-2 sm:py-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Asignatura
                        </p>
                        <p className="break-all text-sm text-gray-500 truncate dark:text-gray-400 ">
                          {props.items.codUEC} 
                        </p>
                        <p className="break-all text-sm text-gray-500 truncate dark:text-gray-400">
                        {props.items.uec}
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="py-2 sm:py-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Docente
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {props.items.per_Id}                
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {props.items.docente === "  "
                            ? "NO TIENE DOCENTE ASIGNADO"
                            : props.items.docente}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className={`${props.items.primeraParcial == null&&'hidden'} py-2 sm:py-2`}>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Primer Parcial
                        </p>
                        <p className="text-sm text-gray-500 truncate ml-4 dark:text-gray-400">
                          {props.items.primeraParcial == null
                            ? "?"
                            : props.items.primeraParcial}
                        </p>
                      </div>
                      <div className="flex min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Asistencia
                        </p>
                        <p className="text-sm text-gray-500 truncate ml-4 dark:text-gray-400">
                          {props.items.primeraParcial == null
                            ? "?"
                            : props.items.primeraParcial}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className={`${nota1[1]== null &&'hidden'} pt-3 pb-0 sm:pt-4`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="py-1 px-6 text-center">
                                Periodo
                              </th>
                              <th scope="col" className="py-1 px-6 text-center">
                                Nota
                              </th>
                              <th scope="col" className="py-1 px-6 text-center">
                                Asistencia
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="py-1 px-6 text-center">
                                {nota1[0]}
                               
                              </td>
                              <td className="py-1 px-6 text-center">
                                {nota1[1]?.replace(/\((\w+)\)/g, "$1")}
                              </td>
                              <td className="py-1 px-6 text-center">
                                {(nota1[2] == null)? "?" : parseInt(nota1[2].replace(/\((\w+)\)/g, "$1")) + " %"}
                              </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="py-1 px-6 text-center">
                                {nota2[0]}
                              </td>
                              <td className="py-1 px-6 text-center">
                                {nota2[1]?.replace(/\((\w+)\)/g, "$1")}
                              </td>
                              <td className="py-1 px-6 text-center">
                                {(nota2[2] == null)? "?" : parseInt(nota2[2].replace(/\((\w+)\)/g, "$1")) + ' %'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className={botones ? 'flex': 'hidden'}>
                  <button
                    onClick={() => registrarSeguimineto(props.items)}
                    className="mt-5 transition  duration-75 hover:scale-110 bg-emerald-500 rounded-xl h-10 text-white px-3 block m-auto hover:bg-emerald-700"
                  >
                    Iniciar Seguimiento
                  </button>
                  <button
                    onClick={() => verSeguimiento()}
                    className="mt-5 transition duration-75 hover:scale-110 bg-emerald-500 rounded-xl h-10 text-white px-3 block m-auto hover:bg-emerald-700"
                  >
                    Ver Detalle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};
export default Modal;
