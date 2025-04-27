import React from "react";
// import { useSelector } from "react-redux";

import PaginaInicio from './Usuarios/InicioSesion_Registro.jsx'
import PaginaPrincipal from "./Usuarios/paginaPrincipal.jsx";
import ModificarPerfil from './Usuarios/ModificarPerfil.jsx'
import PaginaDocumentos from './Usuarios/PaginaDocumentos.jsx' // este si sobreescribe
import ListadoConvenios from './Match/Convenio/ListadoConvenios.jsx'
import Convenio from './Match/Convenio/Convenio.jsx' // este también sobreescribe

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

function App() {
    /*const user = useSelector((state) => state.usuario.usuario);
    const username = user ? user.usuario : null;
    const usertype = user ? user.tipo_usuario : null;*/

    const router = createBrowserRouter(createRoutesFromElements(
        <>
            <Route path="/" element={ <PaginaInicio/> } />
            <Route path="/paginaPrincipal" element={ <PaginaPrincipal />} />
            <Route path="/modificarPerfil" element={ <ModificarPerfil /> } />
            <Route path="/documentos" element={ <PaginaDocumentos /> } />
            <Route path="/convenios" element={ <ListadoConvenios />} />
            <Route path="/convenio" element={ <Convenio/> } >
                {/* <Route path="/convenio/:id" element={ <Convenio /> } /> */}
            </Route>
        </>
    ));

    return (
      <>
        <RouterProvider router={router} />
      </>
    );
  }
  
  export default App;