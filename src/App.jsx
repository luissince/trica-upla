import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Login";
import Principal from "./Page/Principal";
import Error404 from "./components/Error404";
import { useDispatch } from "react-redux";
import Aside from "./components/Aside";
import { useState } from "react";
import { cargarEstudiante } from "./store/slices/usuario";
import { QueryClientProvider, QueryClient } from "react-query";
import Seguimiento from "./Page/seguimiento/Seguimiento";
import axios from "axios";
import Loading from "./components/Loading";
import DetalleSeguimiento from "./Page/seguimiento/DetalleSeguimiento";
import ListaSeguimiento from "./Page/seguimiento/ListaSeguimiento";
import ListaTricaDocente from "./Page/seguimiento/ListaTricaDocente";
import SeguimientoEstudiante from "./Page/seguimiento/SeguimientoEstudiante";
import ListaSeguimientoEstudiante from "./Page/seguimiento/ListaSeguimientoEstudiante";
import TricaFacultad from "./Page/reportes/TricaFacultad";
import SinPermiso from "./components/SinPermiso";
import RankingDocente from "./Page/seguimiento/RankingDocente";
import AdminTag from "./Page/Administracion/AdminTag";
import SeguimientoDiscapacitado from "./Page/seguimiento/SeguimientoDiscapacitado";
import TricasJalados from "./Page/reportes/TricasJalados";
import ResumenTrica from "./Page/reportes/ResumenTrica";
import TricaxSeccion from "./Page/reportes/TricaxSeccion";


const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const [token, SetToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();



  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("datosUsuario"));
    SetToken(token);

    const LlenarDatosEstudiante = async () => {
      try {
        const response = await axios.get(process.env.URL + "/Estudiante", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(cargarEstudiante(response.data))

      } catch (e) {
        if (localStorage.getItem("datosUsuario") != null) {
          localStorage.removeItem("datosUsuario")
          window.location.href = "/";
        }
      } finally {
        setIsLoading(false);
      }
    };
    LlenarDatosEstudiante()
  }, [token]);

  useEffect(() => {
    const onEventClick = () => {
     /* if (localStorage.getItem("datosUsuario") == null && window.location.pathname != "/") {
        window.location.href = "/";
      }*/
    }

    window.addEventListener('focus', onEventClick);

    return () => {
      window.removeEventListener('focus', onEventClick);
    }
  }, [])


  return (
    <QueryClientProvider client={queryClient}>
      <>
        <BrowserRouter>
          {isLoading ? (
            <Loading />
          ) : token === null ? (
            <>
              <Routes>
                <Route path="*" element={<Error404 />} />
                <Route path="/" exact element={<Login />} />
              </Routes>
            </>
          ) : (
            <div className="flex w-full ">
              <Aside />
              <div className="flex flex-col w-full dark:text-white items-center mx-0  md:w-[calc(100%_-_256px)] md:ml-[256px] break-words flex-wrap">
                <Navbar />
                <div className="mt-8 md:mt-20 w-full px-2 font-mont">
                  <Routes>
                    <Route
                      path={"/"}
                      exact={true}
                      element={<Navigate to={"/Inicio"} />}
                    />
                    <Route
                      path={"/Inicio"}
                      exact={true}
                      element={<Principal />}
                    />
                    <Route
                      path="/Control-Seguimiento"
                      exact={true}
                      element={<Seguimiento />}
                    />
                    <Route
                      path="/detalleSeguimiento/"
                      exact={true}
                      element={<DetalleSeguimiento />}
                    />
                    <Route
                      path="/Lista-Seguimiento"
                      exact={true}
                      element={<ListaSeguimiento />}
                    />
                    <Route
                      path="/Lista-Trica-Docente"
                      exact={true}
                      element={<ListaTricaDocente />}
                    />
                    <Route
                      exact={true}
                      path="/Seguimiento-Estudiante"
                      element={<SeguimientoEstudiante />}
                    />
                    <Route
                      exact={true}
                      path="/Lista-Seguimiento-Estudiante"
                      element={<ListaSeguimientoEstudiante />}
                    />
                    <Route
                      exact={true}
                      path="/Reporte-Trica-Facultad"
                      element={<TricaFacultad />}
                    />
                    <Route
                      exact={true}
                      path="/Ranking-Docente"
                      element={<RankingDocente />}
                    />
                    <Route
                    exact={true}
                    path="/Seguimiento-Discapacitado"
                    element={<SeguimientoDiscapacitado />}
                  />
                    <Route
                      exact={true}
                      path="/AdminEtiquetas"
                      element={<AdminTag />}
                    />
                    <Route
                      exact={true}
                      path="/Reporte-Trica-Desaprobado"
                      element={<TricasJalados />}
                    />
                    <Route
                      exact={true}
                      path="/Resumen-GeneralTrica"
                      element={<ResumenTrica />}
                    /><Route
                    exact={true}
                    path="/Resumen-GeneralxSeccion"
                    element={<TricaxSeccion />}
                  />
                    <Route path="/SinPermiso" element={<SinPermiso />} />
                    <Route path="*" component={<Error404 />} />
                  </Routes>
                </div>
              </div>
            </div>
          )}
        </BrowserRouter>
      </>
    </QueryClientProvider>
  );
};

export default App;
