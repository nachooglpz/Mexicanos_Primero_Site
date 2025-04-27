import './inicio_sesion.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './userSlice.js';

function PaginaInicio() {
  return (
      <div className="inicio-sesion-registro">
        <InicioSesion />
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

    fetch (`/api/login?usuario=${username}&contrasena=${password}`,)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.usuario === null) {
            alert('Usuario o contraseña incorrectos');
          }
          else {
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
        </form>
      </div>
    </div>
  );
}

function Registro() {
  return (
    <div className="row registro">
      <div className="col-md-6 registro-contenedor">
        <h2 className="registro-titulo">Registrarse</h2>
        <form className="registro-formulario">
          <label htmlFor="register-name" className="registro-label">Nombre</label>
          <input type="text" className="form-control registro-input" id="register-name" placeholder="Nombre" />

          <label htmlFor="register-username" className="registro-label">Usuario</label>
          <input type="text" className="form-control registro-input" id="register-username" placeholder="Usuario" />

          <label htmlFor="register-password" className="registro-label">Contraseña</label>
          <input type="password" className="form-control registro-input" id="register-password" placeholder="Contraseña" />

          <label htmlFor="register-email" className="registro-label">Correo Electrónico</label>
          <input type="email" className="form-control registro-input" id="register-email" placeholder="Correo Electrónico" />

          <label htmlFor="register-type" className="registro-label">Tipo de Usuario</label>
          <select className="form-control registro-select" id="register-type">
            <option>Aliado</option>
            <option>Escuela</option>
          </select>

          <label htmlFor="register-institution" className="registro-label">Institución</label>
          <input type="text" className="form-control registro-input" id="register-institution" placeholder="Institución" />

          <label htmlFor="register-sector" className="registro-label">Sector</label>
          <input type="text" className="form-control registro-input" id="register-sector" placeholder="Sector" />

          <label htmlFor="register-support" className="registro-label">Tipo de Apoyo a brindar</label>
          <input type="text" className="form-control registro-input" id="register-support" placeholder="Tipo de apoyo a brindar" />

          <div className="form-group form-check registro-check">
            <input type="checkbox" className="form-check-input registro-checkbox" id="privacy-policy" />
            <label className="form-check-label registro-check-label" htmlFor="privacy-policy">Acepto el aviso de privacidad</label>
          </div>
          <button
            type="submit"
            onClick={() => (window.location.href = './aliados.html')}
            className="btn btn-primary registro-boton"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaginaInicio;