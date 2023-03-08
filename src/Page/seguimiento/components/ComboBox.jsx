 const ComboBox = (props)=>{
  
   const cargarDatos= async (valor)=>{

    await props.setValue(valor);
    props.refe()
   
   }
   
    return(
       
        props.items?.length>0?<div>
            <select 
            className="block p-2 mx-3 mb-6 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(event)=>props.cambios===true?cargarDatos(event.target.value):props.setValue(event.target.value)}>            
                <option value={props.Valor==null?'N':props.Valor}>{props.texto==null?"Seleccione una opción":props.texto}</option>
                 {props.items != null&& props?.items?.map((item,index)=>{
                    return(
                        <option key={index} value={item.id}>{item.detalle}</option>
                    )
                })}  
            </select>
        </div>:<div> <select 
            className="block p-2 mx-3 mb-6 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           >            
                <option value={'N'}>Seleccione una opción</option>
                
            </select></div>
    )
}

export default ComboBox;