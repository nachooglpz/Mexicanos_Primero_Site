import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './Usuarios/Login';
import Registro from './Usuarios/Registro';
import VistaAliados from './Usuarios/VistaAliados';
import VistaEscuelas from './Usuarios/VistaEscuelas';
import VistaAdmin from './Usuarios/VistaAdmin';
import ModificarPerfil from './Usuarios/ModificarPerfil';
import Chat from './Usuarios/Chat';
import PaginaDocumentos from './Usuarios/PaginaDocumentos';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/vistaAliados" element={<VistaAliados />} />
          <Route path="/vistaEscuelas" element={<VistaEscuelas />} />
          <Route path="/vistaAdmin" element={<VistaAdmin />} />
          <Route path="/modificarPerfil" element={<ModificarPerfil />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/documentos" element={<PaginaDocumentos />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;