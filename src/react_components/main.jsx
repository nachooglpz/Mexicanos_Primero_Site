import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

/* import InicioSesion from './InicioSesion_Registro.jsx' */
/* import VistaEscuelas from './VistaEscuelas.jsx'  */
/* import VistaAliados from './VistaAliados.jsx'  */
/* import ModificarPerfil from './ModificarPerfil.jsx'*/
 import PaginaDocumentos from './PaginaDocumentos.jsx'  // este si sobreescribe
/* import ListadoConvenios from './ListadoConvenios.jsx'
import Convenio from './Convenio.jsx'
import VistaEscuelas from './VistaEscuelas.jsx' */
/* import PanelAdmin from './PanelAdmin.jsx' */


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AliadosApp username="usuario25" /> */}
    {/* <VistaAliados username="usuario28" /> */}
  {/*   <PanelAdmin /> */}
  <PaginaDocumentos/>
    {/* <VistaEscuelas username="usuario5" /> */}
  </StrictMode>,
)
