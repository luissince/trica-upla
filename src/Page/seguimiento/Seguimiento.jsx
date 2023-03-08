import ComboBox from "./components/ComboBox";
import Tabla from "./components/Tabla";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTitle } from "react-use";
import { useSeguridad } from "../../components/useSeguridad";
import { useEffect } from "react";

const Seguimiento = () => {
  useTitle("Seguimiento de Rendimiento del Estudiante | Upla");
  const verificar = useSeguridad();
  
  useEffect(() => {
    verificar      
    }, [])
  const [facu, setFacultad] = useState("N");
  const [sede, setSede] = useState("N");
  const { datosUsuario } = useSelector((state) => state.usuario);
  const [carrera, setCarrera] = useState("N");
  const [especialidad, setEspecialidad] = useState("SX");
  const [modalidad, setModalidad] = useState("N");
  const token = JSON.parse(localStorage.getItem("datosUsuario"));

  const listarSede = async () => {
    return await axios.post(
      process.env.URL + "/General/listarSede",
      { codigo: datosUsuario.docNumId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };
  const listarFacultad = async () => {
    return await axios.post(
      process.env.URL + "/General/listarFacultades",
      { codigo: datosUsuario.docNumId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };
  const listarCarrera = async () => {
    return await axios.post(
      process.env.URL + "/General/listarCarrera",
      { codigo: facu },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const listarModalidad = async () => {
    return await axios.post(
      process.env.URL + "/General/listarModalidad",
      { codigo: datosUsuario.docNumId, sede: sede },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const listarEspecialidad = async () => {
    return await axios.post(
      process.env.URL + "/General/listarEspecialidad",
      { carrera: carrera },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
  
  const listarEstudianteTrica = async () => {  
    return await axios.get(
      process.env.URL + `/Trica/ListarTrica/${facu.trim()}/${sede}/${carrera}/${modalidad}/${especialidad}`,      
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  /* DESDE AQUI USAMOS REACT QUERY*/
  const { data, status 
  } = useQuery(["sede"], listarSede);

  const { data: facultad, status: statusFacultad } = useQuery(
    ["facultad"],
    listarFacultad
  );
  
  const {
    data: carreras,
    status: stCarrera,
    refetch,
  } = useQuery(["carrera"], listarCarrera, { enabled: false });

  const {
    data: dataModalidad,
    status: statusModalidad,
    refetch: refeModalidad,
  } = useQuery(["modalidades"], listarModalidad, { enabled: false });

  const {
    data: dataEspecialidad,
    status: statusEspecialidad,
    refetch: refeEspecialidad,
  } = useQuery(["especialidad"], listarEspecialidad, { enabled: false });


  const mutation = useMutation(listarEstudianteTrica);


  return (
    <>   
      <div className="content-wrapper dark:text-white">
        <h3 className="text-xl text-center font-medium pt-5 md:text-4xl">
          Seguimiento de Rendimiento del Estudiante {datosUsuario?.anio || "0000"}-{datosUsuario?.periodo||"0"}
        </h3>     
        <div className="block mt-5 md:flex md:items-center md:justify-around flex-wrap">
          <div className="flex flex-col items-center justify-center ">
            <label htmlFor="">Sede</label>
            {status === "loading" ? (
              <ComboBox items={[]} />
            ) : status === "error" ? (
              <ComboBox items={[]} />
            ) : (
              status === "success" && <ComboBox id="sede" 
              cambios={true}
              refe={refeModalidad}
              setValue={setSede}
              items={data.data} />
            )}
          </div>

          <div className="flex flex-col items-center justify-center ">
            <label htmlFor="">Modalidad</label>
            {statusModalidad === "loading" ? (
              <ComboBox items={[]} />
            ) : status === "error" ? (
              <ComboBox items={[]} />
            ) : (
              statusModalidad === "success" ? 
              <>              
              <ComboBox id="modalidad" 
           
              setValue={setModalidad}
              items={dataModalidad.data} />
              </>: statusModalidad === 'idle' && <ComboBox id="modalidad" items={[]} />
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
                  refe={refetch}
                  setValue={setFacultad}
                  items={facultad.data}
                />
              )
            )}
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="">Carrera</label>
            {stCarrera === "loading" ? (
             <ComboBox items={[]} />
            ) : stCarrera === "error" ? (
              <ComboBox items={[]} />
            ) : stCarrera === "success" ? (
              <ComboBox
              cambios={true}
                  refe={refeEspecialidad}
                  setValue={setCarrera}
              items={carreras.data} />
            ) : (
              stCarrera === "idle" && <ComboBox items={[]} />
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            <label htmlFor="">Especialidad</label>
            {statusEspecialidad === "loading" ? (
             <ComboBox items={[]} />
            ) : statusEspecialidad === "error" ? (
              <ComboBox items={[]} />
            ) : statusEspecialidad === "success" ? (
              <>
              <ComboBox Valor={"SX"} 
                        texto="SIN ESPECIALIDAD"
                        setValue={setEspecialidad}
                        items={dataEspecialidad.data==''?[{}]:dataEspecialidad.data} /></>
            ) : (
              statusEspecialidad === "idle" && <ComboBox items={[]} />
            )}
          </div>

          {mutation.isLoading? (
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
              onClick={() => mutation.mutate()}
              type="button"
              className="transition delay-150 duration-300 hover:scale-110 bg-emerald-500 rounded-xl h-12 text-white px-5 m-auto md:m-0 block hover:bg-emerald-700"
            >              
              Generar
            </button>            
          )}
        </div>
        <div className="block md:flex md:items-center md:justify-around flex-wrap">
       
        {mutation.isSuccess? <Tabla tipo={'1'} btnModal={true} items={mutation.data.data}/> : null}
          </div>
      </div>
    </>
  );
};
export default Seguimiento;
