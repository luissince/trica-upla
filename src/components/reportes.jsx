import axios from "axios";
import Swal from "sweetalert2";

export const reportes = () => {
  function _base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}
 const pdf =(endpoint, nombre,data) =>
  {
    var token = JSON.parse(localStorage.getItem("datosUsuario"));
  axios
  .post(process.env.URL + endpoint, data, {headers: { Authorization: `Bearer ${token}` } }, {
    type: "application/pdf",
  })
  .then((res) => {
    
    var arrBuffer = _base64ToArrayBuffer(res.data.fileContents);
    let blob = new Blob([arrBuffer], { type: "application/pdf" });
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    var fecha = new Date();
    link.download =  nombre +" "+ fecha.getHours()+fecha.getMinutes()+fecha.getMinutes()+ ".pdf";
    link.click();
  }).catch(()=>Swal.fire("Error", "No se pudo generar el reporte", "error"));
 }

  return {pdf}
};
