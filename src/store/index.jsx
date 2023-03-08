import { configureStore } from "@reduxjs/toolkit";
import usuario  from './slices/usuario'

export default configureStore({
    reducer:{
        usuario
    },
    devTools: process.env.NODE_ENV !== 'production',
});