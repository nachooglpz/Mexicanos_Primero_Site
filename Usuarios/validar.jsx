//validar que el token y usuario sean correctos para restablecer contraseña
import { useState } from 'react';
import "./validar.css";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function Validar(){
    const [SearchParams] = useSearchParams();
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = SearchParams.get("token");
        const user = SearchParams.get("user");
        let newPass = document.getElementById("newPass").value;
        
        fetch(`/api/recuperar/validar?user=${user}&token=${token}&newPass=${newPass}`)
        .then((res) => res.json())
        .then((data) => {
            setMensaje(data.mensaje);
          
        })
        .catch((err) => console.log(err));

        console.log(mensaje);

    }
  
  
  return (
    <>
        <h1>Cambiar contraseña</h1>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name="" id="newPass" />
            <input type="submit" value="Enviar"/>
        </form>
    </>
   )
}

export default Validar;