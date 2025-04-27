import '../css/modificar_perfil.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Aliado } from '../models/Usuario.js';

function ModificarPerfil() {
    document.title = 'Modificar Perfil';
    const usertype = useSelector((state) => state.usuario.tipo_usuario);


    return (
        <>
            <Link to="/paginaPrincipal">
                <button className="convenio-back-button">Regresar</button>
            </Link>
            {usertype === 'aliado' && <PerfilAliado />}
            {usertype === 'escuela' && <PerfilEscuela />}
            {usertype === 'admin' && <PerfilAdmin />}
        </>
    );
}

function PerfilAliado() {
    const username = useSelector((state) => state.usuario.usuario);
    const [aliado, setAliado] = useState(new Aliado('', '', '', '', '', '', '', true, []));
    const [apoyos, setApoyos] = useState([]);
    const [nuevoApoyo, setNuevoApoyo] = useState('');
    const [cambioApoyo, setCambioApoyo] = useState(false);
    const [cambios, setCambios] = useState({nombre: '', email: '', password: '', confirmpsswd: '', empresa: '', sector: '', direccion: ''});
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch(`/api/aliados/aliado?usuario_aliado=${username}`)
            .then((res) => res.json())
            .then((data) => {
                const aliadoData = data[0];
                setAliado(new Aliado(
                    aliadoData.nombre, aliadoData.usuario_aliado, aliadoData.contrasena, aliadoData.email, aliadoData.empresa, aliadoData.sector, aliadoData.direccion, aliadoData.estatus_activo, []));
            });
    }, [saved]);

    useEffect(() => {
        fetch(`/api/aliados/apoyos?usuario_aliado=${username}`)
            .then((res) => res.json())
            .then((apoyos) => setApoyos(apoyos.map((apoyo) => apoyo.tipo_apoyo)));
    }, [cambioApoyo]);

    const agregarApoyo = () => {
        if (!apoyos.includes(nuevoApoyo)) {
            fetch(`/api/aliados/apoyo?usuario_aliado=${username}&apoyo=${nuevoApoyo}`, {
                method: 'POST',
            })
                .then((res) => {
                    if (res.ok) {
                        setNuevoApoyo('');
                        setCambioApoyo(!cambioApoyo);
                    }
                });
        }
    };

    const eliminarApoyo = (apoyo) => {
        fetch(`/api/aliados/apoyo?usuario_aliado=${username}&apoyo=${apoyo}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (res.ok) {
                    setCambioApoyo(!cambioApoyo);
                }
            });
    };

    const handleGuardarCambios = () => {
        if ((cambios.password || cambios.confirmpsswd) && (cambios.password !== cambios.confirmpsswd)) {
            alert('Las contraseñas no coinciden');
            return;
        }

        fetch(`/api/aliados/edit?usuario_aliado=${username}&nombre=${cambios.nombre || aliado.nombre}&email=${cambios.email || aliado.email}&contrasena=${cambios.password || aliado.contrasena}&empresa=${cambios.empresa || aliado.empresa}&sector=${cambios.sector || aliado.sector}&direccion=${cambios.direccion || aliado.direccion}`, {
            method: 'PUT',
        })
            .then((res) => {
                if (res.ok) {
                    console.log('Cambios guardados: ', res);
                }
            })

        setSaved(!saved);
    };

    return (
        <>
            <div className="modificar-perfil-title">
                <h1>Perfil de Usuario:</h1>
            </div>
            <div className="modificar-perfil-form">
                <form>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" className="modificar-perfil-input" placeholder={aliado.nombre} onChange={(e) => setCambios((prev) => ({...prev, nombre: e.target.value}))}/><br /><br />

                    <label htmlFor="email">Correo:</label>
                    <input type="email" id="email" className="modificar-perfil-input" placeholder={aliado.email} onChange={(e) => setCambios((prev) => ({...prev, email: e.target.value}))}/><br /><br />

                    <label htmlFor="password">Nueva Contraseña:</label>
                    <input type="password" id="password" className="modificar-perfil-input" placeholder="Nueva Contraseña" onChange={(e) => setCambios((prev) => ({...prev, password: e.target.value}))}/><br /><br />

                    <label htmlFor="repeated-password">Repita Nueva Contraseña:</label>
                    <input type="password" id="repeated-password" className="modificar-perfil-input" placeholder="Repita Nueva Contraseña" onChange={(e) => setCambios((prev) => ({...prev, confirmpsswd: e.target.value}))}/><br /><br />

                    <label htmlFor="company">Empresa:</label>
                    <input type="text" id="company" className="modificar-perfil-input" placeholder={aliado.empresa} onChange={(e) => setCambios((prev) => ({...prev, empresa: e.target.value}))}/><br /><br />

                    <label htmlFor="register-sector">Sector</label>
                    <input type="text" className="modificar-perfil-input" id="register-sector" placeholder={aliado.sector} onChange={(e) => setCambios((prev) => ({...prev, sector: e.target.value}))}/><br /><br />

                    <label htmlFor="address">Dirección:</label>
                    <input type="text" id="address" className="modificar-perfil-input" placeholder={aliado.direccion} onChange={(e) => setCambios((prev) => ({...prev, direccion: e.target.value}))}/><br /><br />

                    <label>Apoyos a Brindar:</label><br /><br />
                    <ul className="modificar-perfil-ul">
                        {apoyos.map((apoyo, index) => (
                            <li key={index} className="modificar-perfil-li">
                                <span>{apoyo}</span>
                                <button type="button" onClick={() => eliminarApoyo(apoyo)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                    <input type="text" className="modificar-perfil-input" placeholder="Agregar nuevo apoyo" value={nuevoApoyo} onChange={(e) => setNuevoApoyo(e.target.value)}/>
                    <button type="button" className="modificar-perfil-agregar-button" onClick={agregarApoyo}>Agregar</button><br /><br />

                    <button className="modificar-perfil-button" type="button" onClick={handleGuardarCambios}>Guardar Cambios</button>
                </form>
            </div>
        </>
    );
}

function PerfilEscuela() {
    return(
        <>
            <label htmlFor="register-institution">Institución</label>
            <input type="text" className="modificar-perfil-input" id="register-institution" placeholder="Institución" /><br /><br />

            <label htmlFor="address">Dirección:</label>
            <input type="text" id="address" className="modificar-perfil-input" placeholder="Dirección" /><br /><br />
        </>
    );
}

function PerfilAdmin() {
    return(
        <>

        </>
    );
}

export default ModificarPerfil;