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
  const query = `
  UPDATE administrador SET contraseña = $1 WHERE email = $2;
`;
  await db.query(query, [token, email]);
}
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
    const caracteres = 'ABC123';
    let token = '';
    for (let i = 0; i < caracteres.length; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      token += caracteres[randomIndex];
    }
    changePass(email, token)

    res.json({ user: email, token });
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = { mensajeRouter: router };
