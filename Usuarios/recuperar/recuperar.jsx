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
        const linkDinamico = `http://localhost:5173/auth?user=${data.user}&token=${data.token}`;

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
    <h2 align="center">Ingresa tu correo </h2>

        <input type="email" id='email' />
        <button type="submit" >Enviar Correo</button>
      </form>


    </div>

    </>
  );
}

export default App;