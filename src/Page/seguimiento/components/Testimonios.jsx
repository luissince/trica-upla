import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { Alerta } from "../../../components/Alerta";
import { motion } from "framer-motion";
import { helpHttp } from "../../../components/helpHttp";
import { useRef } from "react";
const Testimonios = (props) => {
  const [mensaje, setMensaje] = useState("");

  var token = JSON.parse(localStorage.getItem("datosUsuario"));
  const Mensajes = Alerta();
  const [img, setImg] = useState(null);
  const { datosUsuario, detalleSeguimiento } = useSelector(
    (state) => state.usuario
  );
  const opcionTag = useRef(0);
  const [tag,setTag] = useState();
  const api = helpHttp();
  async function registrarMensaje(event) {
    event.preventDefault();
 
    const formData = new FormData();
    if (mensaje.length > 0) {
      await axios
        .post(
          process.env.URL + "/Trica/registrarMensajeInvolucrado",
          {
            mensaje: mensaje,
            est_id: detalleSeguimiento.codigoEst,
            asi_id: detalleSeguimiento.codUEC,
            anioPeriodo: detalleSeguimiento.periodoFiltro.replace("-", ""),
            per_id: datosUsuario.docNumId,
            tipoSeguimiento:opcionTag.current.value //TAG
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          if (response.data[0].rpta == "0") {
            Mensajes.fire({
              icon: "error",
              title: "No se pudo registrar el mensaje",
            });
          } else if (response.data[0].rpta == "1") {
            Mensajes.fire({
              title: "Mensaje enviado",
              text: "Gracias por tu testimonio",
              icon: "success",
              confirmButtonText: "Aceptar",
            }).then((result) => {
              if (result.isConfirmed) {
                props.data.mutate();
              }
            });
          }
        })
        .catch((error) => {
          Mensajes.fire({
            title: "Error",
            text: "No se pudo registrar el mensaje ",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
          console.log(error);
        });
    } else {
      Mensajes.fire({
        icon: "warning",
        title: "Oops...",
        text: "No puedes enviar un mensaje vacio!",
      });
    }
  }
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 },
  };

  const obtenerTagxDocente = async () => {
    let tipo = {headers: {
      "Content-Type": "application/json",
    }}
   return api.get(
    `/Trica/ListarTagxCargo/${datosUsuario.docNumId}/${detalleSeguimiento.codigoEst}/${detalleSeguimiento.codUEC}/${detalleSeguimiento.periodoFiltro.replace("-", "")}`, tipo);
  }
  useEffect(() => {
    obtenerTagxDocente().then((res) => {res?.length>0?setTag(res):setTag([{id:4,detalle:"OTROS"}]);});
 
  }, []);
  function cargarImagen(contentType, multiple) {
    return new Promise((resolve) => {
      let input = document.createElement("input");
      input.type = "file";
      input.multiple = multiple;
      input.accept = contentType;
      input.onchange = () => {
        let files = Array.from(input.files);
        if (multiple) resolve(files);
        else resolve(files[0]);
      };
      input.click();
    });
  }

  return (
    <div className="block m-auto w-full md:w-full px-2  mb-8 rounded-lg  shadow-sm  md:mb-12 md:grid-cols-2">
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="relative border-l border-gray-200 dark:border-gray-700"
      >
        {props.data.data.data.map((item, index) => (
       
          <motion.li variants={item} key={index} className="mb-10 ml-6">
       
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <img
                className="rounded-full shadow-lg hover:scale-[5] scale transition duration-500 ease-in-out"
                src={`https://academico.upla.edu.pe/PhotD/${item.per_Id.trim()}.jpg`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src=`https://avatars.dicebear.com/api/initials/${item.apellidoNombre}.svg?b=%23007cbc&bold=true`;
            }}
                alt="Thomas Lean image"
              />
            </span>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
              <div className="justify-between items-center mb-3 sm:flex">
                <time
                  className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0 hover:cursor-default"
                  data-tip
                  data-for="hora"
                >
                  {item.fechRegistro.replace("T", " ").substring(0, 10)}
                </time>
                <ReactTooltip id="hora" place="top" effect="solid">
                  {item.fechRegistro.replace("T", " ")}
                </ReactTooltip>
                <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                  {item.apellidoNombre + " "}
                  <a className="font-semibold text-gray-900 dark:text-white hover:underline">
                    {item.cargo}
                  </a>
                </div>
              </div>
              <div className="p-3 text-xs font-normal text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
               
               <strong>{item.tag+ ": "}</strong>
                {item.mensaje}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
      <form
        onSubmit={(e) => {
          registrarMensaje(e);
        }}
      >
        <div>
          
          <label htmlFor="chat" className="sr-only">
            Your message
          </label>
          <div className="flex flex-col md:flex-row items-center mt-10 py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
          
            {/* <button
              onClick={async () => {
                const res = await cargarImagen("image/*", false);
                setImg(res);
              }}
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Upload image</span>
            </button> */}
            <select ref={opcionTag} name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mb-3 md:w-52 p-2.5 md:mb-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {tag?.map((item, index) => (<option key={index}value={item.id} >{item.detalle}</option>))}
            {/* <option value="">Otros</option>
            <option value="">Problema Conducta</option>
            <option value="">Incumplimiento de Tareas Academicas</option>
            <option value="">Inasistencia</option> */}
          </select>
            <div className="flex w-full">
            <textarea
              onChange={(e) => setMensaje(e.target.value)}
              id="chat"
              rows={1}
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tu comentario..."
              defaultValue={""}
            />
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Testimonios;
