import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "./components/Loading";
import logoUpla from '../src/assets/LogoUpla5.png'


const Login = (props) => {

  const [codigo, setCodigo] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(true);
 
 // const [carga, setCarga] = useState(true);
  // const dispatch = useDispatch();
  useEffect(() => {  setLoading(false)}, [])
  

  const ingresarDatos = async (e) => {
    e.preventDefault();
    let data = {
      codigo: codigo,
      contraseña: clave
     
    };
    setLoading(true);

    await axios
      .post(process.env.URL+"/Login", data)
      .then((res) => {
        window.localStorage.setItem("datosUsuario", JSON.stringify(res.data.token));
        window.location.href = "/Inicio";
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          title: "Alerta!!",
          icon:'warning',
          html:`No se pudo ingresar al sistema:<br>${err.response.data}!`,
          confirmButtonColor: '#007cbc',
        });
        console.log(err);
      });
  };

  return (

    <> 
  
      {loading && <Loading />}
      <div className="flex flex-wrap w-screen h-screen">
        <div id="portadaLogin" className="relative -z-20 hidden w-2/3 bg-cover md:flex">
          <div className="bg-sombra w-full  h-screen absolute -z-10"></div>      
          <div className="m-auto text-white text-center">
            <motion.p 
            className="text-3xl font-mont font-thin"
            initial={{ x:-1000, opacity: 0 }}
            transition={{ duration: 0.8 }}
            animate={{ x:0, opacity: 1 }}
            exit={{ opacity: 0 }}>Bienvenidos al Sistema</motion.p>
            <motion.h1 className="text-6xl font-mont font-bold"
            initial={{ x:-1000, opacity: 0 }}
            animate={{ x:0, opacity: 1  }}
            transition={{ duration: 1 }}
            >SEGUIMIENTO ESTUDIANTIL</motion.h1>
          <motion.p 
            className="text-3xl font-mont font-thin"
            initial={{ x:-1000, opacity: 0 }}
            transition={{ duration: 0.8 }}
            animate={{ x:0, opacity: 1 }}
            exit={{ opacity: 0 }}>(Trica)</motion.p>
          </div>
        </div>
        <div className=" w-full px-16 my-auto md:w-1/3 ">
            <div className="shadow-lg border"
            >
            <motion.img
            className="m-auto w-32 h-40 pt-5"
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],              
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{ duration: 2 }}
            src={logoUpla}
            alt=""
          />
          <h3 className="text-center text-upla-100 font-black text-4xl font-mont">UPLA</h3>
          <p className="font-mont text-center">Por favor ingrese a su cuenta</p>
          <form className="p-9 " onSubmit={ingresarDatos}>
            <div className="mb-6 ">
              <label
                htmlFor="codigo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Codigo
              </label>
              <input
                onChange={(e) => setCodigo(e.target.value)}
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Contraseña
              </label>
              <input
                onChange={(e) => setClave(e.target.value)}
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  defaultValue
                  className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Recordarme
              </label>
            </div>
            <button
              type="submit"
              className="block m-auto md:w-full text-white bg-upla-100 hover:bg-upla-200 hover:transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Ingresar
            </button>
          </form>
            </div>
        </div>
      </div>
     
    </>
  );
};
export default Login;
