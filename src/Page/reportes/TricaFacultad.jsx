import React from 'react'
import Paper from '@mui/material/Paper';
import {Chart, ArgumentAxis, ValueAxis, BarSeries, Title, Legend, Tooltip} from '@devexpress/dx-react-chart-material-ui';

import { Stack, Animation,EventTracker } from '@devexpress/dx-react-chart';
import { helpHttp } from '../../components/helpHttp';
import { useState ,useEffect} from 'react';
import Carga from '../../components/Carga'
import ComboBox from '../seguimiento/components/ComboBox';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { useRef } from 'react';
import { useSeguridad } from '../../components/useSeguridad';
const TricaFacultad = () => {
  const api = helpHttp(); 
  const {datosUsuario } = useSelector((state) => state.usuario);
  const verificar = useSeguridad();
  const [facu, setFacultad] = useState("");
  const [sede, setSede] = useState("");
  const [carrera, setCarrera] = useState("");

  const [sedecbo, setSedeCbo] = useState([]);
  const [carreracbo, setCarreracbo] = useState([]);
  const facul = useRef(null)
  function uniqueArray4(a) {
    return [...new Set(a)];
  }
  
  useEffect(() => { 
    verificar
    
  }, [])

  function generarNuevoColor() {
    var simbolos, color;
    simbolos = "0123456789ABCDEF";
    color = "#";

    for (var i = 0; i < 6; i++) {
      color = color + simbolos[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function armarJson(res){
    let sede = [];
    let car = [];

    if (res != null) {
      res.forEach(element => {
        sede.push(element.sede)
      });
      //setFacultad(uniqueArray4(facu))
      for (let ind = 0; ind < sede.length; ind++) {
        res.map((v) => {
          if (sede[ind] == v.sede)
            car.push(JSON.parse(JSON.parse(JSON.stringify(`{ "state" : "${v.carrera}", "${v.sede}": ${v.total}}`))));
        })
      }
      setSedeCbo(uniqueArray4(sede))
      setCarreracbo(car)
      
     
  }}
  const Root = props => (
    <Legend.Root {...props}  sx={{ display: 'flex', margin: 'auto', flexDirection: 'row', flexWrap:'non-wrap'}} />
  );
  const Label = props => (
    <Legend.Label {...props}  sx={{ whiteSpace: 'nowrap' }} />
  );
  /* DESDE AQUI USAMOS REACT QUERY*/
  const listarSede = () => {return api.post("/General/listarSede",{ body:{codigo: datosUsuario.docNumId,}})}
  const listarFacultad = () => {return api.post("/General/listarFacultades",{ body:{codigo: datosUsuario.docNumId}})}
  const listarCarrera = () => {return api.post("/General/listarCarrera", { body:{codigo: facu} })}
  const listarModalidad = () => {return api.post("/General/listarModalidad",{ body:{codigo: datosUsuario.docNumId, sede: sede}})}
  const listarEspecialidad =  () => {return  api.post("/General/listarEspecialidad",{ body:{carrera: carrera}})}

  const {data, status} = useQuery(["sedeR"], listarSede);
  const {data: facultad, status: statusFacultad } = useQuery(["facultadR"],listarFacultad);
 // const {data: resultado, status: statusResultado} = useQuery(["resultado"], listarDatos);
  const {data: carreras,status: stCarrera,refetch,} = useQuery(["carreraR"], listarCarrera, { enabled: false });
 // const {data: dataModalidad,status: statusModalidad,refetch: refeModalidad,} = useQuery(["modalidadesR"], listarModalidad, { enabled: false });
  //const {data: dataEspecialidad,status: statusEspecialidad,refetch: refeEspecialidad,} = useQuery(["especialidadR"], listarEspecialidad, { enabled: false });
  let aFacu = []
  aFacu['01'] = "INGENIERÍA";
  aFacu['02'] = "CIENCIAS ADMINISTRATIVAS Y CONTABLES";
  aFacu['03'] = "DERECHO Y CIENCIAS POLÍTICAS";
  aFacu['04'] = "EDUCACIÓN Y CIENCIAS HUMANAS";
  aFacu['05'] = "CIENCIAS DE LA SALUD";
  aFacu['11'] = "MEDICINA HUMANA";
  const ANIMATIONS = Symbol('animation');
  const listarDatos= () => {return api.get(`/Trica/ReporteTricaFacultad/${facu}`).then(res => armarJson(res));}
  const mutation = useMutation(listarDatos);
  const PREFIX = 'Export';
  const classes = {
    label: `${PREFIX}-label`,
    title: `${PREFIX}-title`,
  };
  const getLabelAnimationName = () => {
    const name = 'animation_label_opacity';
    addKeyframe(name, '{ 0% { opacity: 0; } 99% { opacity: 0; } 100% { opacity: 1; } }');
    return name;
  };
  const addKeyframe = (name, def) => {
    if (typeof document === 'undefined') {
      return;
    }
    const head = document.getElementsByTagName('head')[0];
    let style = Array.from(head.getElementsByTagName('style'))
      .find(node => node.dataset[ANIMATIONS]);
    if (!style) {
      style = document.createElement('style');
      style.type = 'text/css';
      style.dataset[ANIMATIONS] = true;
      head.appendChild(style);
    }
    const content = style.textContent;
    if (!content.includes(name)) {
      style.textContent += `\n@keyframes ${name} ${def}\n`;
    }
  };
  const StyledChartLabel = styled(Chart.Label)(() => ({
    [`&.${classes.label}`]: {
      fill: '#818080',
      fontSize: '14px',
      fontWeight: 'lighter',    
      animation: `${getLabelAnimationName()} 1s`,
    },
  }));
  const BarWithLabel = ({ value, ...restProps }) => (
    <React.Fragment>
      <BarSeries.Point {...restProps} />
      <StyledChartLabel 
        x={restProps.arg}
        y={restProps.val-10}       
        dominantBaseline="middle"
        textAnchor="middle"
       className={classes.label}
      >
        {`${value}`}
      </StyledChartLabel>
    </React.Fragment>
  );

  return (
<div className="content-wrapper dark:text-white">
        <h3 className="text-2xl text-center font-medium py-5 md:text-4xl">
          Reporte Trica Por Facultad {datosUsuario?.anio || "0000"}-{datosUsuario?.periodo||"0"}
        </h3>
      <div className="flex flex-col items-center">
  
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
                  items={facultad}
                />
              )
              )}
          </div>
         
          {mutation.isLoading? (
            <button
              disabled
              type="button"
              className="block w-45 m-auto md:m-0 text-white bg-emerald-500 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 h-12 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emeral-800 items-center"
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
              className="transition w-45 mb-10 md:mb-10 delay-150 duration-300 hover:scale-110 bg-emerald-500 rounded-xl h-12 text-white px-5 m-auto md:m-0 block hover:bg-emerald-700"
            >              
              Generar
            </button>            
          )}
        {mutation.isLoading ? <Carga/>: mutation.isSuccess && 
        <Paper sx={{ width: '98%', background: '#ffffff' }}> 
          <Chart
            data={carreracbo}
            className=" m-auto"
          >
            
            <ArgumentAxis className="text-white bg-blue-400"/>
            <ValueAxis/>
            
            {sedecbo?.map((sede, i) => {
              return <BarSeries
                key={i}
                valueField={sede} name={sede}
                argumentField="state"
                color={generarNuevoColor()}
                pointComponent={BarWithLabel}
              />
            })}
        
            <Animation />
            <Legend position="bottom" rootComponent={Root} labelComponent={Label}/>
          
            <Title text={`ESTADISTICAS TRICA - ${aFacu[facu.trim()]}`} />
            <Stack/>       
            <EventTracker />
          <Tooltip />   
          </Chart>
        </Paper>}</div></div>
  )
}

export default TricaFacultad