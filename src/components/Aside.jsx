import logoUpla from "../assets/LogoUpla5.png";
import AsideLink from "./AsideLink";
import { useDispatch, useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import React from "react";
import ReactTooltip from "react-tooltip";
import { helpHttp } from "./helpHttp";
import { useState,useEffect } from "react";

import Carga from "./Carga";
import { cargarMenu } from "../store/slices/usuario";
import { Link } from "react-router-dom";

const Aside = () => {
  const { datosUsuario } = useSelector((state) => state.usuario);
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = helpHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    api.get("/obtenerMenu/2").then((res) => { setMenu(res); dispatch(cargarMenu(res)); setLoading(false); });
  }, [])

  function logout() {
    localStorage.removeItem("datosUsuario");
    window.location.href = "/";
  }
  return (
    <aside
      id="Aside"
      className="z-50 overflow-auto lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-upla scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50  supports-scrollbars:pr-2 fixed  ml-0  hidden md:block w-64 bg-gray-50 h-screen dark:bg-gray-800 font-mont "
      aria-label="Sidebar"
    >
      <div className=" overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <Link to="" className="hidden md:flex items-center pl-2.5 mb-5 ">
          <img src={logoUpla} className="w-[45px] h-[28px] mr-0 sm:h-12" alt="Flowbite Logo" />
          <div className="flex flex-col justify-center text-left mt-2 ml-1">
            <span className="text-xl leading-3 text-upla-100 font-bold whitespace-nowrap dark:text-white">
              UPLA
            </span>
            <small className=" dark:text-white font-bold">Seguimiento Estudiantil</small>
          </div>
        </Link>        
        <div className="mt-6 md:mt-0 py-5 dark:text-white">
          <img          
            className=" p-1 m-auto w-32 h-32 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 hover:scale-110 ease-in duration-300"
            src={`https://academico.upla.edu.pe/PhotD/${datosUsuario.docNumId}.jpg`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src=`https://avatars.dicebear.com/api/initials/${datosUsuario.persNombre}.svg?b=%23007cbc&bold=true`;
            }}           
            alt="Rounded avatar"
          />
          <div className=" pt-3 flex justify-center items-center">
            <h1 className=" text-center font-bold mr-3">
              {datosUsuario.persNombre} {datosUsuario.persPaterno} {datosUsuario.persMaterno}
            </h1>
            <MdLogout onClick={() => logout()}
              data-tip data-for="salir" className="md:hidden text-red-600 bg-blue-50 rounded w-6 h-6 p-1 hover:scale-110 transition-all ease-in-out outline-none cursor-pointer" />
            <ReactTooltip id="salir" place="top" effect="solid">
              Salir
            </ReactTooltip>
          </div>
          <p className="text-center">{datosUsuario.docNumId}</p>
        </div>
        <ul className="space-y-2 ">
          {loading === true ? <Carga /> : menu?.map((a, index) => (
            <AsideLink key={index} menu={a} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
