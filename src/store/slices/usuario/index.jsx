import { createSlice } from "@reduxjs/toolkit";


export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: {
        datosUsuario: [],
        detalleSeguimiento: null,
        menu:null
    },
    reducers: {
        setUsuario: (state, action) => {
            state.datosUsuario = action.payload;
        },
        setDetalleSeguimiento: (state, action) => {
            state.detalleSeguimiento = action.payload;
        },
        setMenu: (state,action) => {
            state.menu = action.payload;
        }
    }
})
export const { setUsuario, setDetalleSeguimiento,setMenu } = usuarioSlice.actions;
export default usuarioSlice.reducer;

export const  cargarEstudiante =  (datosEstudiantes) => async (dispatch) => {
    dispatch(setUsuario(datosEstudiantes));
}
export const  cargarDetalleSeguimiento =  (detalleSeguimiento) => async (dispatch) => {
    dispatch(setDetalleSeguimiento(detalleSeguimiento));
}
export const cargarMenu =  (menu) => async (dispatch) => {
    dispatch(setMenu(menu));
}