const express = require('express');
const router = express.Router();
const db = require('../db.cjs');

// Función para buscar el email en las tres tablas
const getUser = async (email) => {
  const query = `
    SELECT email, contrasena FROM aliados WHERE email = $1
    UNION ALL
    SELECT email, contrasena FROM administradores_de_escuela WHERE email = $1
    UNION ALL
    SELECT email, contraseña AS contrasena FROM administrador WHERE email = $1
  `;
  const res = await db.query(query, [email]);
  return res.rows;
};

const changePass = async (email, token) => {
  const queryAliados = `UPDATE aliados SET contrasena = $2 WHERE email = $1 RETURNING email;`;
  const queryAdminsEscuela = `UPDATE administradores_de_escuela SET contrasena = $2 WHERE email = $1 RETURNING email;`;
  const queryAdmin = `UPDATE administrador SET contraseña = $2 WHERE email = $1 RETURNING email;`;

  let result;

  // Intentamos cada tabla en orden
  try {
    result = await db.query(queryAliados, [email, token]);
    if (result.rowCount > 0) {
      return result.rows[0];  // Si se actualizó en 'aliados', retornamos el usuario actualizado
    }

    result = await db.query(queryAdminsEscuela, [email, token]);
    if (result.rowCount > 0) {
      return result.rows[0];  // Si se actualizó en 'administradores_de_escuela', retornamos el usuario actualizado
    }

    result = await db.query(queryAdmin, [email, token]);
    if (result.rowCount > 0) {
      return result.rows[0];  // Si se actualizó en 'administrador', retornamos el usuario actualizado
    }

    return null;  // Si no se encontró el email en ninguna tabla
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    throw error;
  }
};

// Ruta GET /mensaje
router.get('/mensaje', async (req, res) => {
  const email = req.query.user;

  if (!email) {
    return res.status(400).json({ error: 'Falta el parámetro user' });
  }

  try {
    const user = await getUser(email);
  

    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Generar token aleatorio
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let token = '';
    for (let i = 0; i < caracteres.length; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      token += caracteres[randomIndex];
    }
     await changePass(email, token)

    res.json({ user: email, token });
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = { mensajeRouter: router };
