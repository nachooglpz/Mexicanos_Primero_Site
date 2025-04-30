/*import { useState } from "react";
import emailjs from 'emailjs-com'
import "./recuperar.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Recuperar(){
    const [form, setForm] = useState({ name: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/sesion/recuperar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Error en la recuperación');
            }

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            // Aquí podrías manejar la respuesta según sea necesario

        } catch (err) {
            console.error(err);
            setError('Hubo un problema al intentar recuperar la contraseña');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    return (
        <div>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user-info">Correo o nombre de usuario:</label>
                <input
                    type="email"
                    id="user-info"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Recuperar;
*/
// export default App
import { useState } from 'react';
import emailjs from 'emailjs-com';
import "./recuperar.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(document.getElementById("email").value);
  }

  const handleClick = (email) => {
    fetch(`/api/mensaje?user=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setToken(data.token);
        
        // Ahora que user y token están definidos, construimos el link
        const linkDinamico = `http://localhost:3000/api/mensaje?user=${data.user}&token=${data.token}`;

        // Enviar el correo con el link dinámico
        emailjs.send('service_tabvsi6', 'template_ply5545', { link: linkDinamico }, 'ZIMDtQToP2cKeF3nD')
          .then((result) => {
            console.log('Correo enviado:', result.text);
            alert('¡Correo enviado exitosamente!');
          })
          .catch((error) => {
            console.error('Error al enviar correo:', error.text);
            alert('Hubo un error al enviar el correo.');
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <div>
    <form onSubmit={handleSubmit}>
        <input type="email" id='email' />
        <button type="submit" >Enviar Correo</button>
      </form>

      <p>{user}</p>
      <p>{token}</p>
    </div>

    </>
  );
}

export default App;