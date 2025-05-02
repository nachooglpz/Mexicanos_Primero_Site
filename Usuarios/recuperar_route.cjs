const express = require('express');
const router = express.Router();
const db = require('../db.cjs');

const validate = async (email, password) => {
    const query = `
      SELECT 'aliados' AS tabla FROM aliados WHERE email = $1 AND contrasena = $2
      UNION ALL
      SELECT 'administradores_de_escuela' AS tabla FROM administradores_de_escuela WHERE email = $1 AND contrasena = $2
      UNION ALL
      SELECT 'administrador' AS tabla FROM administrador WHERE email = $1 AND contraseña = $2
    `;
  
    const res = await db.query(query, [email, password]);
    return res.rows.length > 0; // Devuelve true si encontró coincidencia
  };
  const changePass = async (email, newPass) => {
    // Detectar en qué tabla está el usuario
    const findQuery = `
      SELECT 'aliados' AS tabla FROM aliados WHERE email = $1
      UNION ALL
      SELECT 'administradores_de_escuela' FROM administradores_de_escuela WHERE email = $1
      UNION ALL
      SELECT 'administrador' FROM administrador WHERE email = $1;
    `;
    
    const result = await db.query(findQuery, [email]);
  
    if (result.rows.length === 0) {
      throw new Error('Usuario no encontrado en ninguna tabla');
    }
  
    const tabla = result.rows[0].tabla;
    let updateQuery = '';
  
    if (tabla === 'aliados' || tabla === 'administradores_de_escuela') {
      updateQuery = `UPDATE ${tabla} SET contrasena = $2 WHERE email = $1`;
    } else if (tabla === 'administrador') {
      updateQuery = `UPDATE administrador SET contraseña = $2 WHERE email = $1`;
    }
  
    await db.query(updateQuery, [email, newPass]);
  };


router.get('/validar', async (req, res) => {
    const user = req.query.user;
    const token = req.query.token;
    const newPass = req.query.newPass;

    const result = await validate(user,token);

    if(result == false){
        res.json({mensaje: false, error: true});
    }else{
        res.json({mensaje: true, error: false})
        await changePass(user,newPass);
    }
})

module.exports = { recuperarRouter: router };