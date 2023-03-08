import React from 'react';
import {helpHttp} from '../../components/helpHttp';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import Tabla from './components/Tabla';

import { useTitle } from 'react-use';
import Carga from '../../components/Carga';
import { useSeguridad } from '../../components/useSeguridad';
import { useEffect } from 'react';

 const  ListaTricaDocente =()=>{
     useTitle("Lista de Tricas | Upla");
      const {datosUsuario} = useSelector((state) => state.usuario);
      const api = helpHttp();    
      let options = {
          headers: {
              'Content-Type': 'application/json'},
          body:{codigo: datosUsuario.docNumId},
      }
      const verificar = useSeguridad();
      useEffect(() => {
        verificar
      }, [])
    
      const obtenerTrica = () => {        
        return api.post("/Trica/listarTricaDocente",
          options
        );      
      }
      
      const {data, status} = useQuery(["listaTricaa"], obtenerTrica);   



    
      
 
  return (
    <div className="content-wrapper dark:text-white">
      <h3 className="text-xl text-center font-medium py-5 md:text-4xl">
        Lista Trica por Docente {datosUsuario?.anio || "0000"}-{datosUsuario?.periodo||"0"}
      </h3>
      <div className="flex flex-col md:flex-row">
        {status === "loading" ? (
          <Carga />
        ) : status === "error" ? (
          <p>Error</p>
        ) : status === "success" && data.err != true ? (
          <Tabla tipo={"2"} items={data} btnModal={false} />
        ) : (
          <p className="m-auto text-center font-medium">
            No se pudo obtener los registros
          </p>
        )}
      </div>
    </div>
  )
}
export default ListaTricaDocente;
