import { useSelector } from "react-redux";
import PanelAdmin from "./PanelAdmin.jsx";
import VistaEscuelas from "./VistaEscuelas.jsx";
import VistaAliados from "./VistaAliados.jsx";

function PaginaPrincipal() {
    const usertype = useSelector((state) => state.usuario.tipo_usuario);

    return (
        <>
            {usertype === 'admin' ? <PanelAdmin /> :
                usertype === 'escuela' ? <VistaEscuelas /> :
                    usertype === 'aliado' ? <VistaAliados /> :
                        <p>Usuario no ha iniciado sesión</p>
            }
        </>
    );
}

export default PaginaPrincipal;