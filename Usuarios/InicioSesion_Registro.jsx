import './inicio_sesion.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './userSlice.js';
import { useState } from 'react';

export function PaginaInicio() {
  return (
      <div className="inicio-sesion-registro">
        <InicioSesion />
      </div>
  );
}

export function PaginaRegistro() {
  return(
      <div className="inicio-sesion-registro">
        <Registro />
      </div>
      );
}

function InicioSesion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch (`/api/sesion/login?usuario=${username}&contrasena=${password}`,)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.usuario === null) {
            alert('Usuario o contraseña incorrectos');
          } else if (!data.usuario_activo && !data.usuario === 'admin') {
            alert('Su cuenta no está activa. Por favor espere a que un administrador valide su cuenta');
          } else {
            dispatch(login({ usuario: data.usuario, tipo_usuario: data.tipo_usuario }));
            navigate('/paginaPrincipal');
          }
        })
  }

  return (
    <div className="row inicio-sesion">
      <div className="col-md-6 inicio-sesion-contenedor">
        <h2 className="inicio-sesion-titulo">Iniciar Sesión</h2>
        <form className="inicio-sesion-formulario">
          <label htmlFor="login-username" className="inicio-sesion-label">Usuario</label>
          <input type="text" className="form-control inicio-sesion-input" id="login-username" placeholder="Usuario" name="username" required />
          <label htmlFor="login-password" className="inicio-sesion-label">Contraseña</label>
          <input type="password" className="form-control inicio-sesion-input" id="login-password" placeholder="Contraseña" name="password" required />

          <button
            type="button"
            onClick={handleLogin}
            className="btn btn-primary inicio-sesion-boton"
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = 'recuperar/recuperar.html')}
            className="btn btn-primary inicio-sesion-boton"
          >
            Recuperar Contraseña
          </button>
          <button
              type="button"
              onClick={() => navigate('/registro')}
              className="btn btn-primary cambiar-pagina-registro-inicio-sesion-boton"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

function Registro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    usuario: '',
    contrasena: '',
    repeated_contrasena: '',
    correo: '',
    direccion: '',
    tipo_usuario: '',
    institucion: '',
    sector: '',
    cct: '',
      checkbox: false,
  });

  const handleSubmit = () => {
      if (!form.checkbox) {
            alert('Por favor acepte el aviso de privacidad');
            return;
      } else if (form.contrasena !== form.repeated_contrasena) {
        alert('Las contraseñas no coinciden');
        return;
    }

    if (form.tipo_usuario === 'Aliado') {
      fetch(`/api/sesion/aliado?nombre=${form.nombre}&usuario=${form.usuario}&contrasena=${form.contrasena}&correo=${form.correo}&empresa=${form.institucion}&sector=${form.sector}&direccion=${form.direccion}`, {
          method: 'POST',
      }).then((res) => {
        if (res.ok) {
          alert('Registro exitoso. Por favor espere a que un administrador valide su cuenta');
          navigate('/');
        } else {
          alert('Error al registrar, vuelva a intentarlo.');
        }
      })
    } else if (form.tipo_usuario === 'Escuela') {
      fetch(`/api/sesion/escuela?nombre=${form.nombre}&usuario=${form.usuario}&contrasena=${form.contrasena}&correo=${form.correo}&escuela=${form.institucion}&cct=${form.cct}&direccion=${form.direccion}`, {
          method: 'POST',
      }).then((res) => {
        if (res.ok) {
          alert('Registro exitoso. Por favor espere a que un administrador valide su cuenta');
          navigate('/');
        } else {
          alert('Error al registrar, vuelva a intentarlo.');
        }
      })
    }
  }

  return (
    <div className="row registro">
      <div className="col-md-6 registro-contenedor">
        <h2 className="registro-titulo">Registrarse</h2>
        <form className="registro-formulario">
          <label htmlFor="register-name" className="registro-label">Nombre</label>
          <input type="text" className="form-control registro-input" id="register-name" placeholder="Nombre" onChange={(e) => setForm((prev) => ({...prev, nombre: e.target.value}))} />

          <label htmlFor="register-username" className="registro-label">Usuario</label>
          <input type="text" className="form-control registro-input" id="register-username" placeholder="Usuario" onChange={(e) => setForm((prev) => ({...prev, usuario: e.target.value}))} />

          <label htmlFor="register-password" className="registro-label">Contraseña</label>
          <input type="password" className="form-control registro-input" id="register-password" placeholder="Contraseña" onChange={(e) => setForm((prev) => ({...prev, contrasena: e.target.value}))} />

          <label htmlFor="register-repeated-password" className="registro-label">Repita la Contraseña</label>
          <input type="password" className="form-control registro-input" id="register-repeated-password" placeholder="Repita la Contraseña" onChange={(e) => setForm((prev) => ({...prev, repeated_contrasena: e.target.value}))} />

          <label htmlFor="register-email" className="registro-label">Correo Electrónico</label>
          <input type="email" className="form-control registro-input" id="register-email" placeholder="Correo Electrónico" onChange={(e) => setForm((prev) => ({...prev, correo: e.target.value}))} />

          <label htmlFor="register-type" className="registro-label">Tipo de Usuario</label>
          <select className="form-control registro-select" id="register-type" onChange={(e) => setForm((prev) => ({ ...prev, tipo_usuario: e.target.value }))}>
            <option value=''>Seleccione una opción</option>
            <option value='Aliado'>Aliado</option>
            <option value='Escuela'>Escuela</option>
          </select>

          {form.tipo_usuario === 'Aliado' && <RegistroAliado setForm={setForm}/>}
          {form.tipo_usuario === 'Escuela' && <RegistroEscuela setForm={setForm}/>}

          <label htmlFor="register-direccion" className="registro-label">Dirección</label>
          <input type="text" className="form-control registro-input" id="register-direccion" placeholder="Dirección" onChange={(e) => setForm((prev) => ({ ...prev, direccion: e.target.value }))} />

          <div className="form-group form-check registro-check">
            <input type="checkbox" className="form-check-input registro-checkbox" id="privacy-policy" checked={form.checkbox}
                   onChange={(e) => setForm((prev) => ({ ...prev, checkbox: e.target.checked }))}  />
            <label className="form-check-label registro-check-label" htmlFor="privacy-policy">Acepto el aviso de privacidad</label>
          </div>
          <button type="button" className="btn btn-primary registro-boton" onClick={handleSubmit}>
            Registrarse
          </button>

          <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-primary cambiar-pagina-registro-inicio-sesion-boton"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

function RegistroAliado({ setForm }) {
  return (
      <>
        <label htmlFor="register-institution" className="registro-label">Empresa/Institución</label>
        <input type="text" className="form-control registro-input" id="register-institution" placeholder="Empresa/Institución" onChange={(e) => setForm((prev) => ({ ...prev, institucion: e.target.value }))} />

        <label htmlFor="register-sector" className="registro-label">Sector</label>
        <input type="text" className="form-control registro-input" id="register-sector" placeholder="Sector" onChange={(e) => setForm((prev) => ({ ...prev, sector: e.target.value }))} />
      </>
  );
}

function RegistroEscuela({ setForm }) {
  return (
      <>
        <label htmlFor="register-escuela" className="registro-label">Escuela</label>
        <input type="text" className="form-control registro-input" id="register-escuela" placeholder="Escuela" onChange={(e) => setForm((prev) => ({ ...prev, institucion: e.target.value }))} />

        <label htmlFor="register-cct" className="registro-label">CCT</label>
        <input type="text" className="form-control registro-input" id="register-cct" placeholder="CCT" onChange={(e) => setForm((prev) => ({ ...prev, cct: e.target.value }))} />
      </>
  )
}