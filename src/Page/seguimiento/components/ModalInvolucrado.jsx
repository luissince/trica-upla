import { useState } from "react";
import { Alerta } from "../../../components/Alerta";
import {  useSelector } from "react-redux";
import { IoMdAddCircleOutline } from "react-icons/io";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import {useMutation } from "react-query";
import Carga from "../../../components/Carga";
const ModalInvolucrado = ( props) => {
 
  const [dato, setDato] = useState("");
  const {datosUsuario} =useSelector(state=>state.usuario)
  const token = JSON.parse(localStorage.getItem("datosUsuario"));
  const Mensajes = Alerta();
  const listarDocente = async () => {
    return await axios.post(
      `${process.env.URL}/Trica/listarDocente`,
      { codigo: dato },
      {
        headers: { Authorization: `Bearer ${token}`},
      }
    );
  };
  async function regInvolucrado(valor){
    let dato= document.querySelector("#"+props.id+" p");
    await axios.post(process.env.URL+"/Trica/registroInvolucrado",{
      anioPeriodo:props.items.periodoFiltro.replace('-',''),
      est_id:props.items.codigoEst,
      asi_id:props.items.codUEC,
      usuRegistra:valor.per_Id,
      cargo:props.Tipo,
      usuModifica : datosUsuario.docNumId
      },{
        headers: { Authorization: `Bearer ${token}`},
        })
        .then((res)=>{
          if(res.data[0].rpta=='2'){
           // dato.innerHTML=valor;
           dato.innerText =valor.per_Materno+" "+valor.per_Paterno+" "+valor.per_Nombre;
            Mensajes.fire({
              icon: "success",
              title: "Correcto!",
              text: "Se registro correctamente al "+props.Tipo,
              showConfirmButton: true,             
              }).then((result) => {
                if (result.isConfirmed) {
                  props.setModal(false);
                }
            });}
            else if(res.data[0].rpta=='1'){
              dato.innerText =valor.per_Materno+" "+valor.per_Paterno+" "+valor.per_Nombre;
              Mensajes.fire({
                icon: "success",
                title: "Correcto!",
                text: "El "+props.Tipo+" se actualizo correctamente",
                showConfirmButton: true,               
                }).then((result) => {
                  if (result.isConfirmed) {
                    props.setModal(false);
                  }});
            }else{
              Mensajes.fire({
                icon: "error",
                title: "Oops!",
                text: "Algo sucedio mal, comuniquese con la oficina de informatica",
                showConfirmButton: true,
                
                });
            }
        })
        .catch((err)=>{
          Mensajes.fire({
            icon: "error",
            title: "Oops!",
            text: "Algo sucedio mal, comuniquese con la oficina de informatica "+err,
            showConfirmButton: true,           
            });
        })
  


  /*  await axios.post(`${process.env.URL}/Trica/regInvolucrado`,
    { anioPeriodo: props.periodoFiltro.replace("-",""), est_id: props.codigoEst, asi_id: props.codUEC, usuRegistra: valor.per_id, cargoDocente: props.tipo }, }, 
    { headers: { Authorization: `Bearer ${token}` } });*/
  }
   
  const mutation = useMutation(listarDocente);
  const handleBuscar = async (event) => {
    event.preventDefault();
    mutation.mutate();
  };
  return (
    <>
      <div>
        <div
          modal-backdrop=""
          className="background bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"
        ></div>
        <div
          id="modalEl"
          tabIndex={-1}
          className="flex overflow-y-auto overflow-x-hidden fixed top-[5%] right-0 left-0 z-50 w-full md:w-[calc(100%_-_268px)] md:ml-[268px] md:inset-0 h-modal md:h-full justify-center items-center"
        >
          <div>
            <div className="p-4 w-full md:min-w-[550px] max-w-md md:max-w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Asignar {props.Tipo}
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
                <form>
                  <div className="flex">
                    <div className="relative w-full">
                      <input
                        type="search"
                        id='location-search"'
                        onChange={(e) => setDato(e.target.value)}
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border-l-2 border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-emerald-500"
                        placeholder="Buscar por nombre"
                        required
                      />
                      <button
                        onClick={handleBuscar}
                        type="submit"
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-emerald-700 rounded-r-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <span className="sr-only">Search</span>
                      </button>
                    </div>
                  </div>
                </form>
                {mutation.isLoading && <Carga/>}
                {mutation.isSuccess && (
                  <div className=" overflow-x-auto mt-5 relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="py-3 px-6">
                            DNI
                           
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Apellido y Nombres
                          </th>
                          <th scope="col" className="py-3 px-6 text-center">
                            -
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {mutation.data.data.map((item,index) => (
                          <tr key={index} className="transition-opacity delay-1000 ease-in-out bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                              scope="row"
                              className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {item.per_Id}
                            </th>
                            <td className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {item.per_Paterno} {item.per_Materno}{" "}
                              {item.per_Nombre}
                            </td>
                            <td className="py-1 px-6 text-right">
                              <IoMdAddCircleOutline
                              onClick={() => regInvolucrado(item)}
                                data-tip
                                data-for="Asignar"
                                className="outline-none text-white bg-emerald-500 rounded cursor-pointer w-7 h-7 p-1"
                              />
                              <ReactTooltip
                                id="Asignar"
                                place="top"
                                effect="solid"
                              >
                                Asignar
                              </ReactTooltip>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {mutation.isError && <h1>Error</h1>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalInvolucrado;
