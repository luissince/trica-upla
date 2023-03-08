import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useTitle } from "react-use";
import Carga from "../../components/Carga";
import { helpHttp } from "../../components/helpHttp";
import { useSeguridad } from "../../components/useSeguridad";
import Tabla from "./components/Tabla";

const ListaSeguimientoEstudiante = () => {
    useTitle("Lista de seguimientos | Upla");
    const { datosUsuario } = useSelector((state) => state.usuario);
    const verificar = useSeguridad();
    useEffect(() => {
      verificar
    }, [])
    
    const api = helpHttp();
    let options = {    
      body: { codigo: datosUsuario.docNumId,opcion:"3" },
    };
    
    const obtenerTrica = () => { 
      return api.post("/Trica/listarTricaAsignadoxDocente", options);
    };
  
    const { data, status } = useQuery(["listaSeguimientoEstudiante"], obtenerTrica);
    
    return (
      <div className="content-wrapper dark:text-white">
        <h3 className="text-xl text-center font-medium py-5 md:text-4xl">
          Lista de seguimientos por Estudiante {datosUsuario?.anio || "0000"}-{datosUsuario?.periodo||"0"}
        </h3>
        <div className="flex flex-col md:flex-row"> 
        {status === "loading" ? (
          <Carga />
          ) : status === "error" ? (
            <p>Error</p>
          ) : status === "success" && data.err != true&&
           data !=null? (
            <Tabla tipo={"2"} items={data} btnModal={true} />
          ) : (
            <p className="m-auto text-center font-medium">
              No se pudo obtener los registros
            </p>
          )}
        </div>
      </div>
    );
}

export default ListaSeguimientoEstudiante;
