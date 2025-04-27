import '../css/modificar_perfil.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Aliado, AdministradorDeEscuela, Administrador } from '../models/Usuario.js';

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
        setCambios({nombre: '', email: '', password: '', confirmpsswd: '', empresa: '', sector: '', direccion: ''});
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

                    <button className="modificar-perfil-button" type="submit" onClick={handleGuardarCambios}>Guardar Cambios</button>
                </form>
            </div>
        </>
    );
}

function PerfilEscuela() {
    const username = useSelector((state) => state.usuario.usuario);
    const [escuela, setEscuela] = useState(new AdministradorDeEscuela('', '', '', '', '', '', '', '', true, []));
    const [necesidades, setNecesidades] = useState([]);
    const [nuevaNecesidad, setNuevaNecesidad] = useState('');
    const [cambioNecesidad, setCambioNecesidad] = useState(false);
    const [cambios, setCambios] = useState({nombre: '', email: '', password: '', confirmpsswd: '', escuela: '', direccion: '', cct: ''});
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch(`/api/escuelas/escuela?usuario=${username}`)
            .then((res) => res.json())
            .then((data) => {
                const escuelaData = data[0];
                setEscuela(new AdministradorDeEscuela(
                    escuelaData.nombre, escuelaData.usuario_escuela, escuelaData.contrasena, escuelaData.email, escuelaData.escuela, escuelaData.direccion, escuelaData.cct, escuelaData.nivel_educativo, escuelaData.estatus_activo, []
                ));
            });
    }, [saved]);

    useEffect(() => {
        fetch(`/api/escuelas/necesidades?usuario=${username}`)
            .then((res) => res.json())
            .then((necesidades) => setNecesidades(necesidades.map((necesidad) => necesidad.necesidad)));
    }, [cambioNecesidad]);

    const agregarNecesidad = () => {
        if (!necesidades.includes(nuevaNecesidad)) {
            fetch(`/api/escuelas/necesidad?usuario_escuela=${username}&necesidad=${nuevaNecesidad}`, {
                method: 'POST',
            })
                .then((res) => {
                    if (res.ok) {
                        setNuevaNecesidad('');
                        setCambioNecesidad(!cambioNecesidad);
                    }
                });
        }
    };

    const eliminarNecesidad = (necesidad) => {
        fetch(`/api/escuelas/necesidad?usuario_escuela=${username}&necesidad=${necesidad}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (res.ok) {
                    setCambioNecesidad(!cambioNecesidad);
                }
            });
    };

    const handleGuardarCambios = () => {
        if ((cambios.password || cambios.confirmpsswd) && (cambios.password !== cambios.confirmpsswd)) {
            alert('Las contraseñas no coinciden');
            return;
        }

        fetch(`/api/escuelas/edit?usuario_escuela=${username}&nombre=${cambios.nombre || escuela.nombre}&email=${cambios.email || escuela.email}&contrasena=${cambios.password || escuela.contrasena}&escuela=${cambios.escuela || escuela.escuela}&direccion=${cambios.direccion || escuela.direccion}&cct=${cambios.cct || escuela.cct}`, {
            method: 'PUT',
        })
            .then((res) => {
                if (res.ok) {
                    console.log('Cambios guardados: ', res);
                }
            });
        setCambios({nombre: '', email: '', password: '', confirmpsswd: '', escuela: '', direccion: '', cct: ''});
        setSaved(!saved);
    };

    return (
        <>
            <div className="modificar-perfil-title">
                <h1>Perfil de Escuela:</h1>
            </div>
            <div className="modificar-perfil-form">
                <form>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" className="modificar-perfil-input" placeholder={escuela.nombre} onChange={(e) => setCambios((prev) => ({...prev, nombre: e.target.value}))}/><br /><br />

                    <label htmlFor="email">Correo:</label>
                    <input type="email" id="email" className="modificar-perfil-input" placeholder={escuela.email} onChange={(e) => setCambios((prev) => ({...prev, email: e.target.value}))}/><br /><br />

                    <label htmlFor="password">Nueva Contraseña:</label>
                    <input type="password" id="password" className="modificar-perfil-input" placeholder="Nueva Contraseña" onChange={(e) => setCambios((prev) => ({...prev, password: e.target.value}))}/><br /><br />

                    <label htmlFor="repeated-password">Repita Nueva Contraseña:</label>
                    <input type="password" id="repeated-password" className="modificar-perfil-input" placeholder="Repita Nueva Contraseña" onChange={(e) => setCambios((prev) => ({...prev, confirmpsswd: e.target.value}))}/><br /><br />

                    <label htmlFor="school">Escuela:</label>
                    <input type="text" id="school" className="modificar-perfil-input" placeholder={escuela.escuela} onChange={(e) => setCambios((prev) => ({...prev, escuela: e.target.value}))}/><br /><br />

                    <label htmlFor="address">Dirección:</label>
                    <input type="text" id="address" className="modificar-perfil-input" placeholder={escuela.direccion} onChange={(e) => setCambios((prev) => ({...prev, direccion: e.target.value}))}/><br /><br />

                    <label htmlFor="cct">CCT:</label>
                    <input type="text" id="cct" className="modificar-perfil-input" placeholder={escuela.cct} onChange={(e) => setCambios((prev) => ({...prev, cct: e.target.value}))}/><br /><br />

                    <label>Necesidades:</label><br /><br />
                    <ul className="modificar-perfil-ul">
                        {necesidades.map((necesidad, index) => (
                            <li key={index} className="modificar-perfil-li">
                                <span>{necesidad}</span>
                                <button type="button" onClick={() => eliminarNecesidad(necesidad)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                    <input type="text" className="modificar-perfil-input" placeholder="Agregar nueva necesidad" value={nuevaNecesidad} onChange={(e) => setNuevaNecesidad(e.target.value)}/>
                    <button type="button" className="modificar-perfil-agregar-button" onClick={agregarNecesidad}>Agregar</button><br /><br />

                    <button className="modificar-perfil-button" type="submit" onClick={handleGuardarCambios}>Guardar Cambios</button>
                </form>
            </div>
        </>
    );
}

function PerfilAdmin() {
    const username = useSelector((state) => state.usuario.usuario);
    const [admin, setAdmin] = useState(new Administrador('', '', '', ''));
    const [cambios, setCambios] = useState({ nombre: '', email: '', password: '', confirmpsswd: '' });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch(`/api/admin/admin?usuario_admin=${username}`)
            .then((res) => res.json())
            .then((data) => {
                const adminData = data[0];
                setAdmin(new Administrador(adminData.nombre, adminData.usuario_admin, adminData.contrasena, adminData.email));
            });
    }, [saved]);

    const handleGuardarCambios = () => {
        if ((cambios.password || cambios.confirmpsswd) && (cambios.password !== cambios.confirmpsswd)) {
            alert('Las contraseñas no coinciden');
            return;
        }

        fetch(`/api/admin/edit?usuario_admin=${username}&nombre=${cambios.nombre || admin.nombre}&email=${cambios.email || admin.email}&contrasena=${cambios.password || admin.contrasena}`, {
            method: 'PUT',
        })
            .then((res) => {
                if (res.ok) {
                    console.log('Cambios guardados: ', res);
                }
            });
        setCambios({ nombre: '', email: '', password: '', confirmpsswd: '' });
        setSaved(!saved);
    };

    return (
        <>
            <div className="modificar-perfil-title">
                <h1>Perfil de Administrador:</h1>
            </div>
            <div className="modificar-perfil-form">
                <form>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        className="modificar-perfil-input"
                        placeholder={admin.nombre}
                        onChange={(e) => setCambios((prev) => ({ ...prev, nombre: e.target.value }))}
                    /><br /><br />

                    <label htmlFor="email">Correo:</label>
                    <input
                        type="email"
                        id="email"
                        className="modificar-perfil-input"
                        placeholder={admin.email}
                        onChange={(e) => setCambios((prev) => ({ ...prev, email: e.target.value }))}
                    /><br /><br />

                    <label htmlFor="password">Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        className="modificar-perfil-input"
                        placeholder="Nueva Contraseña"
                        onChange={(e) => setCambios((prev) => ({ ...prev, password: e.target.value }))}
                    /><br /><br />

                    <label htmlFor="repeated-password">Repita Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="repeated-password"
                        className="modificar-perfil-input"
                        placeholder="Repita Nueva Contraseña"
                        onChange={(e) => setCambios((prev) => ({ ...prev, confirmpsswd: e.target.value }))}
                    /><br /><br />

                    <button
                        className="modificar-perfil-button"
                        type="button"
                        onClick={handleGuardarCambios}
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </>
    );
}

export default ModificarPerfil;