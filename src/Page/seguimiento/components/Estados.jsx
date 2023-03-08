import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactTooltip from 'react-tooltip';

export default function Estados(props) {
  const [color, setColor] = useState('');
  const [riego,setRiego] = useState('');
  const [estado, setEstado] = useState(false);

  switch (props.opcion) {    
    case 0:
      useEffect(() => {
        switch (props.item) {
          case 'Sin Seguimiento': setColor('bg-red-500'); setEstado(true); break;
          case 'En Proceso': setColor('bg-yellow-500'); setEstado(true); break;
          case 'Culminado': setColor('bg-green-500'); setEstado(true); break;
          default: setColor('bg-gray-500'); setEstado(true); break;
        }
      }, [props.item])
      break;
    case 1:
      useEffect(() => {      

        if(props.item >= 0 && props.item <= 7) //muy alto
        {setColor('bg-red-500'); setEstado(true); 
         setRiego('Riego: Muy Alto');
          }
        
        if(props.item > 7 && props.item <= 10) //alto
          {
            setColor('bg-red-400'); setEstado(true);
            setRiego('Riego: Alto');
          }
        
        if(props.item > 10 && props.item <= 15) //medio
          {
            setColor('bg-yellow-500'); setEstado(true);
            setRiego('Riego: Medio');
          }
        
        if(props.item > 15 && props.item <= 20) //bajo
          {
            setColor('bg-green-500'); setEstado(true);  
            setRiego('Riego: Bajo');
          }
          if(props.item == 'IM'){
            setColor('bg-yellow-400'); setEstado(true); 
         setRiego('Riego: Muy Alto');
          }  
          if(props.item == 'SN'){
            setColor('bg-orange-400'); setEstado(true); 
         setRiego('Riego: Muy Alto');
          }         
      }, [props.item])
      break;
    case 2:
      useEffect(() => {
        if(props.item >= 0 && props.item <= 24)  //muy alto
          {
            setColor('bg-red-500'); setEstado(true); 
            setRiego('Riego: Muy Alto');
          }
        
        if(props.item >24  && props.item <= 49)  //alto
          {
            setColor('bg-red-400'); setEstado(true); 
            setRiego('Riego: Alto');
          }

        if(props.item >49  && props.item <= 74)  //medio
          {
            setColor('bg-yellow-500'); setEstado(true); 
            setRiego('Riego: Medio');
          }

        if(props.item >74  && props.item <= 100)  //bajo
          {
            setColor('bg-green-500'); setEstado(true); 
            setRiego('Riego: Bajo');
          }          
          if(props.item == '?')
          {
            setColor('bg-gray-500'); setEstado(true); 
            setRiego('Sin Datos');
          }
      }, [props.item])
      break;
    case 3:
      useEffect(() => {
        if(props.item >= 0 && props.item <= 24)  //muy alto
          {
            setColor('bg-red-500'); setEstado(true); 
            setRiego('Riego: Muy Alto');
          }
        
        if(props.item >24  && props.item <= 49)  //alto
          {
            setColor('bg-red-400'); setEstado(true); 
            setRiego('Riego: Alto');
          }

        if(props.item >49  && props.item <= 74)  //medio
          {
            setColor('bg-yellow-500'); setEstado(true); 
            setRiego('Riego: Medio');
          }

        if(props.item >74  && props.item <= 100)  //bajo
          {
            setColor('bg-green-500'); setEstado(true); 
            setRiego('Riego: Bajo');
          }          
          if(props.item == '?')
          {
            setColor('bg-gray-500'); setEstado(true); 
            setRiego('Sin Datos');
          }
      }, [props.item])
      break;
    default:
      break;
  }


  return (<>    
    {props.opcion == 0 && estado && <span className={`${color} p-[2px] rounded text-white text-xs`}>{props.item}</span>}     
    {props.opcion == 1 && estado && <><span data-tip data-for={props.item.toString()} className={`${color} px-2 rounded text-white text-xs`}>{props.item}</span><ReactTooltip id={props.item.toString()} place="top" effect="solid">{riego}</ReactTooltip></>}    
    {props.opcion == 3 && estado && <><span data-tip data-for={props.item.toString()} className={`${color} px-2 rounded text-white text-xs`}>{props.item}</span><ReactTooltip id={props.item.toString()} place="top" effect="solid">{riego}</ReactTooltip></>}   
    {props.opcion == 2 && estado && <><span data-tip data-for={props.item.toString()} className={`${color} px-1 rounded text-white text-xs`}>{props.item}%</span><ReactTooltip id={props.item.toString()} place="top" effect="solid">{riego}</ReactTooltip></>}    
    </>
  )
}