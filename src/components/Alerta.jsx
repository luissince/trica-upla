import React from 'react'
import Swal from 'sweetalert2'
export const  Alerta=() =>{
    const Mensaje = Swal.mixin({
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#d33',
    })
  return (
    Mensaje
  )
}
