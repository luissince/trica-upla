import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useSeguridad = () => {
    const navigate = useNavigate();
    const estado = useRef(false),
        loading = useRef(false);
    const menu = useSelector(state => state.usuario.menu);

    function buscarMenu(url, data) {

        if (data.url && data.url == url) return data;
        
        if (data.subMenuItems && data.subMenuItems.length) {
            let res;
            data.subMenuItems.find(children => {              
                res = buscarMenu(url, children);
                return res;
            });
            if (res) return res;            
        }
    }


    /* const recorreArbol = async (valor) => {    
         if (menu != null)
             for (const item of valor) {
                 if (item.subMenu == false) {
                     console.log(item.url,location.pathname)
                     if (item.url == location.pathname) {
                         console.log("entro aqui")
                         estado.current = true;
                         break;
                     }
                 } else await recorreArbol(item.subMenuItems);                
             }
     }  */
    useEffect(() => {
        if (menu != null) {
            let itemMatch;

            menu.find((item) => {
                itemMatch = buscarMenu(location.pathname, item);
                return itemMatch;
            })

           if(itemMatch==undefined)
           navigate("/SinPermiso");
         //  <Navigate to="/SinPermiso" replace={true} />
           //return location.href = "/SinPermiso";
            //if (itemMatch?.url != location.pathname)
               // return location.href = "/SinPermiso";
        }

        /* if(menu!=null){ 
             loading.current = true; 
             recorreArbol(menu); }  
                 
         if(loading.current == true)
         if(estado.current == false)               
           return location.href = "/SinPermiso";  */
    }, [menu])
    return (estado);
}