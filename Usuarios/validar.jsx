//validar que el token y usuario sean correctos para restablecer contraseña
import { useState } from 'react';
//import "./validar.css";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function Validar(){
    const [SearchParams] = useSearchParams();
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = SearchParams.get("token");
        const user = SearchParams.get("user");
        let newPass = document.getElementById("newPass").value;
        
        fetch(`/api/recuperar/validar?user=${user}&token=${token}&newPass=${newPass}`)
        .then((res) => res.json())
        .then((data) => {
            setMensaje(data.mensaje);
            setError(data.error);
          
        })
        .catch((err) => console.log(err));

        console.log(mensaje);

    }

    let text;

    if(mensaje){
        text = "Contraseña cambió exitosamente, vuelve a iniciar sesión ";
        
    }else if(error == true){
        text = "hubo un error en el cambio"
    }

  
  
  return (
    <>
        <form action="" onSubmit={handleSubmit}>
            <h2>Ingresa nueva contraseña</h2>
            <input type="text" name="" id="newPass" />
            <button type="submit" value="Enviar">Enviar</button>
        </form>
        
        <p>{text}</p>
    </>
   )
}

export default Validar;