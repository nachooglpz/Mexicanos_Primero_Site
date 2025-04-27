import { createSlice } from '@reduxjs/toolkit';
import { Usuario, Aliado, AdministradorDeEscuela, Administrador } from '../models/Usuario.js';

const userSlice = createSlice({
    name: 'usuario',
    initialState: {
        usuario: localStorage.getItem('usuario') || null,
        tipo_usuario: localStorage.getItem('tipo_usuario') || null,
    },
    reducers: {
        login(state, action) {
            state.usuario = action.payload.usuario;
            state.tipo_usuario = action.payload.tipo_usuario;

            // Guarda los datos en localStorage
            localStorage.setItem('usuario', action.payload.usuario);
            localStorage.setItem('tipo_usuario', action.payload.tipo_usuario);
        },
        logout(state) {
            state.usuario = null;
            state.tipo_usuario = null;

            // Elimina los datos de localStorage
            localStorage.removeItem('usuario');
            localStorage.removeItem('tipo_usuario');
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;