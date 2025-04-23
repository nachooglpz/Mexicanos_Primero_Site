import '../css/inicio_sesion.css'

function InicioSesion() {
  return (
    <div className="row">
      <div className="col-md-6">
        <h2>Iniciar Sesión</h2>
        <form>
          <label htmlFor="login-username">Usuario</label>
          <input type="text" className="form-control" id="login-username" placeholder="Usuario" name="username" required />
          <label htmlFor="login-password">Contraseña</label>
          <input type="password" className="form-control" id="login-password" placeholder="Contraseña" name="password" required />

          <button
            type="button"
            onClick={() => (window.location.href = './src/aliados/aliados.html')}
            className="btn btn-primary"
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = './src/recuperar/recuperar.html')}
            className="btn btn-primary"
          >
            Recuperar Contraseña
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <h2>Registrarse</h2>
        <form>
          <label htmlFor="register-name">Nombre</label>
          <input type="text" className="form-control" id="register-name" placeholder="Nombre" />
          
          <label htmlFor="register-username">Usuario</label>
          <input type="text" className="form-control" id="register-username" placeholder="Usuario" />
          
          <label htmlFor="register-password">Contraseña</label>
          <input type="password" className="form-control" id="register-password" placeholder="Contraseña" />
          
          <label htmlFor="register-email">Correo Electrónico</label>
          <input type="email" className="form-control" id="register-email" placeholder="Correo Electrónico" />
          
          <label htmlFor="register-type">Tipo de Usuario</label>
          <select className="form-control" id="register-type">
            <option>Aliado</option>
            <option>Escuela</option>
          </select>
          
          <label htmlFor="register-institution">Institución</label>
          <input type="text" className="form-control" id="register-institution" placeholder="Institución" />
          
          <label htmlFor="register-sector">Sector</label>
          <input type="text" className="form-control" id="register-sector" placeholder="Sector" />
          
          <label htmlFor="register-support">Tipo de Apoyo a brindar</label>
          <input type="text" className="form-control" id="register-support" placeholder="Tipo de apoyo a brindar" />
          
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="privacy-policy" />
            <label className="form-check-label" htmlFor="privacy-policy">Acepto el aviso de privacidad</label>
          </div>
          <button
            type="submit"
            onClick={() => (window.location.href = './aliados.html')}
            className="btn btn-primary"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default InicioSesion;