import { useEffect, useRef } from "react";
import { useTitle } from "react-use";
import {BsFillPersonFill} from "react-icons/bs";
import {GrAnalytics} from "react-icons/gr";
import {SiGoogleanalytics} from "react-icons/si";
import {TbDeviceAnalytics} from "react-icons/tb"
import ChartJs from "./../components/ChartJs";
import { helpHttp } from "../components/helpHttp";
import { useSelector } from "react-redux";
import  {useSeguridad} from "../components/useSeguridad";
import { useQuery } from "react-query";
import { addPointerEvent } from "framer-motion";

const Principal = (props) => {
  useTitle("Principal | Upla");
  const barras = useRef(null);
  const pie = useRef(null);
  const api = helpHttp();
  const total = useRef(0), 
        asignado = useRef(0), 
        trica = useRef(0),
        estudiante = useRef(0);
        const verificar = useSeguridad();
  
  const {datosUsuario} = useSelector((state)=>state.usuario)

  

      const obtenerTricas = async () => {  
        return await api.post("/Trica/listarTricaDocente", {body:{codigo: datosUsuario.docNumId}}).then((res)=> res);   
      }




let options = {    
  body: { codigo: datosUsuario.docNumId,opcion:"3" },
};

const obtenerSeguimiento = () => { 
  return api.post("/Trica/listarTricaAsignadoxDocente", options);
};

const { data:dTrica, status:dStatus } = useQuery(["listaSeguimientoEstudiante"], obtenerSeguimiento);


  useEffect(() => {
    verificar
      
    }, [])
    useEffect(() => {
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
      body: { codigo: datosUsuario.docNumId },
    };
    api.post("/Trica/Dashboard", options).then((res) => {
      if (!res.err) {
        total.current.innerHTML = 'Nº '+res[0]?.total;
        trica.current.innerHTML = 'Nº '+res[0]?.trica ;
        asignado.current.innerHTML = 'Nº '+res[0]?.asignado;
        estudiante.current.innerHTML = 'Nº '+res[0]?.segEstudiante;
      }
    });
  }, []);
  
  const {data,status} = useQuery(["listaTrica"], obtenerTricas);

  /** BARRAS **/
  /*
  useEffect(() => {
    const myChart = new ChartJs(barras.current, {
      type: "bar",
      data: {
        labels: ["MH", "IS", "OD", "AQ", "IC", "EF"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        }
      },
    });
    return () => {
      myChart.destroy();
    };
  }, []);*/
  /** PIE **/
/*
  useEffect(() => {
    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const data = {
      labels: ["MH", "IS", "OD", "AQ", "IC"],
      datasets: [
        {
          label: "Dataset 1",
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
        },
      ],
    };

    const config = {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Estadisticas",
          },
        },
      },
    };

    const myPie = new ChartJs(pie.current, config);
    return () => {
      myPie.destroy();
    };
  }, []);
*/



  return (
    <div className="content-wrapper dark:text-white   my-4 flex-wrap">
      <div className="">
        <h1 className="font-mont text-4xl text-center font-medium pt-5">
          Tablero de Control de Estudiantes Trica
        </h1>
        <h5 className="font-mont text-4xl text-center font-medium pb-5">{datosUsuario?.anio || "0000"}-{datosUsuario?.periodo||"0"}</h5>
        <div className=" flex justify-around flex-wrap">
          <a
            href="#"
            className="w-full my-1 md:w-1/5 mx-2 flex flex-col items-center bg-green-500 rounded-lg border border-green-500 shadow-md md:flex-row  hover:bg-green-400"
          >
            <div className="flex justify-between w-full p-4 leading-normal ">
              <div className="w-2/3">
                <h5 ref={trica}
                className="mb-2 text-2xl font-bold tracking-tight text-gray-100">
                  Nº 
                </h5>
                <p className="mb-3 font-normal text-gray-100">Estudiantes Trica</p>
              </div>
              <div className="w-1/3 flex justify-center items-center">
                  <BsFillPersonFill className="text-6xl text-sombra"/>
              </div>
            </div>
          </a>
          <a
            href="#"
            className="w-full my-1 md:w-1/5 mx-2 flex flex-col items-center bg-blue-500 rounded-lg border border-blue-500 shadow-md md:flex-row  hover:bg-blue-400"
          >
            <div className="flex justify-between w-full p-4 leading-normal ">
              <div className="w-2/3">
                <h5 ref={estudiante} className="mb-2 text-2xl font-bold tracking-tight text-gray-100">
                  Nº 
                </h5>
                <p className="mb-3 font-normal text-gray-100">Seg. Estudiante</p>
              </div>
              <div className="w-1/3 flex justify-center items-center">
                  <GrAnalytics className="text-6xl text-sombra"/>
              </div>
            </div>
          </a>
          <a
            href="#"
            className="w-full my-1 md:w-1/5 mx-2 flex flex-col items-center bg-yellow-400 rounded-lg border border-yellow-400 shadow-md md:flex-row  hover:bg-yellow-500"
          >
            <div className="flex justify-between w-full p-4 leading-normal ">
              <div className="w-2/3">
                <h5 ref={asignado} className="mb-2 text-2xl font-bold tracking-tight text-gray-100">
                  Nº
                </h5>
                <p className="mb-3 font-normal text-gray-100">Seg. Asignados</p>
              </div>
              <div className="w-1/3 flex justify-center items-center">
                  <SiGoogleanalytics className="text-6xl text-sombra"/>
              </div>
            </div>
          </a>
          <a
            href="#"
            className="w-full my-1 md:w-1/5 mx-2 flex flex-col items-center bg-red-500 rounded-lg border border-red-500 shadow-md md:flex-row  hover:bg-red-400"
          >
            <div className="flex justify-between w-full p-4 leading-normal ">
              <div className="w-2/3">
                <h5 ref={total} className="mb-2 text-2xl font-bold tracking-tight text-gray-100">
                  Nº
                </h5>
                <p className="mb-3 font-normal text-gray-100">Total</p>
              </div>
              <div className="w-1/3 flex justify-center items-center">
                  <TbDeviceAnalytics className="text-6xl text-sombra"/>
              </div>
            </div>
          </a>
        </div>
        <div>
          
          

          
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h3 className="font-mont text-4xl text-center font-medium pt-10">Mis Estudiantes Tricas </h3>
  <div className="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">
   
  
  </div>
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="py-3 px-6">
          Codigo
        </th>
        <th scope="col" className="py-3 px-6">
          Estudiante
        </th>
        <th scope="col" className="py-3 px-6">
          Asignatura
        </th>
        <th scope="col" className="py-3 px-6 text-center">
          Nivel - Seccion
        </th>
        <th scope="col" className="py-3 px-6 text-center">
          Tipo
        </th>
      </tr>
    </thead>
    <tbody>
      {status == "success" && data.map((item,index) => (
        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="py-4 px-6">
          {item.codigoEst}
        </td>
        <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
          <img className="w-10 h-10 rounded-full hover:scale-[5] scale transition duration-500 ease-in-out" src={`https://academico.upla.edu.pe/FotosAlum/037000${item.codigoEst}.jpg`} alt="Jese image" />
          <div className="pl-3">
            <div className="text-base font-semibold">{item.datosPersonales}</div>

            <div className="font-normal text-gray-500">{item.carrera}</div>
          </div>  
        </th>
        <td className="py-4 px-6">
          {item.uec}
        </td>
        <td className="py-4 px-6 text-center">
          {item.uecCiclo} - {item.nta_Seccion}
        </td>
        <td className="py-4 px-6 text-center">
          {item.descTrica}
        </td>
      </tr>
      ))}
      
     
    </tbody>
  </table>

</div>


{
  true&& <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
  <h3 className="font-mont text-4xl text-center font-medium pt-10">Estudiantes Asignados </h3>
<div className="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">


</div>
<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
<tr>
  <th scope="col" className="py-3 px-6">
    Codigo
  </th>
  <th scope="col" className="py-3 px-6">
    Estudiante
  </th>
  <th scope="col" className="py-3 px-6">
    Asignatura
  </th>
  <th scope="col" className="py-3 px-6 text-center">
    Nivel - Seccion
  </th>
  <th scope="col" className="py-3 px-6 text-center">
    Tipo
  </th>
</tr>
</thead>
<tbody>
{dStatus == "success" && dTrica.map((item,index) => (
  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
  <td className="py-4 px-6">
    {item.codigoEst}
  </td>
  <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
    <img className="w-10 h-10 rounded-full hover:scale-[5] scale transition duration-500 ease-in-out" src={`https://academico.upla.edu.pe/FotosAlum/037000${item.codigoEst}.jpg`} alt="Jese image" />
    <div className="pl-3">
      <div className="text-base font-semibold">{item.datosPersonales}</div>

      <div className="font-normal text-gray-500">{item.carrera}</div>
    </div>  
  </th>
  <td className="py-4 px-6">
    {item.uec}
  </td>
  <td className="py-4 px-6 text-center">
    {item.uecCiclo} - {item.nta_Seccion}
  </td>
  <td className="py-4 px-6 text-center">
    {item.descTrica}
  </td>
</tr>
))}


</tbody>
</table>

</div>
}

        </div>
        {/* <div className="flex justify-around my-5 flex-wrap">
          <div className="w-full md:w-1/4 p-5 mx-2 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <canvas
              ref={barras}
              id="myChart"
              width="100%"
              height="100%">                
              </canvas>
          </div>
          <div className="w-full md:w-1/4 p-5 mx-2 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <canvas 
              ref={pie} 
              id="pie" 
              width="100%" 
              height="200">                
              </canvas>
          </div>
        </div> */}
      </div>
   
      {/* <div className="py-5">
        <div id="accordion-collapse" data-accordion="collapse">
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <span>Texto?</span>
              <svg
                data-accordion-icon
                className="w-6 h-6 rotate-180 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-1"
            className="hidden"
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Flowbite is an open-source library of interactive components
                built on top of Tailwind CSS including buttons, dropdowns,
                modals, navbars, and more.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Check out this guide to learn how to{" "}
                <a
                  href="/docs/getting-started/introduction/"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                >
                  get started
                </a>{" "}
                and start developing websites even faster with components on top
                of Tailwind CSS.
              </p>
            </div>
          </div>
          <h2 id="accordion-collapse-heading-2">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              data-accordion-target="#accordion-collapse-body-2"
              aria-expanded="false"
              aria-controls="accordion-collapse-body-2"
            >
              <span>Texto?</span>
              <svg
                data-accordion-icon
                className="w-6 h-6 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-2"
            className="hidden"
            aria-labelledby="accordion-collapse-heading-2"
          >
            <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Flowbite is first conceptualized and designed using the Figma
                software so everything you see in the library has a design
                equivalent in our Figma file.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Check out the{" "}
                <a
                  href="https://flowbite.com/figma/"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Figma design system
                </a>{" "}
                based on the utility classes from Tailwind CSS and components
                from Flowbite.
              </p>
            </div>
          </div>
          <h2 id="accordion-collapse-heading-3">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              data-accordion-target="#accordion-collapse-body-3"
              aria-expanded="false"
              aria-controls="accordion-collapse-body-3"
            >
              <span>Texto?</span>
              <svg
                data-accordion-icon
                className="w-6 h-6 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-3"
            className="hidden"
            aria-labelledby="accordion-collapse-heading-3"
          >
            <div className="p-5 font-light border border-t-0 border-gray-200 dark:border-gray-700">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                The main difference is that the core components from Flowbite
                are open source under the MIT license, whereas Tailwind UI is a
                paid product. Another difference is that Flowbite relies on
                smaller and standalone components, whereas Tailwind UI offers
                sections of pages.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                However, we actually recommend using both Flowbite, Flowbite
                Pro, and even Tailwind UI as there is no technical reason
                stopping you from using the best of two worlds.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Learn more about these technologies:
              </p>
              <ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
                <li>
                  <a
                    href="https://flowbite.com/pro/"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Flowbite Pro
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindui.com/"
                    rel="nofollow"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Tailwind UI
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Principal;
