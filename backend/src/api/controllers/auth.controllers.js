import bcrypt from 'bcrypt';
import connection from '../../db/conn.js';

export const registro = (req, res) => {
  try {
    const { usuario, correo, clave } = req.body;

    const saltRounds = 10;

    bcrypt.hash(clave, saltRounds).then((hash) => {
      connection.query(
        'INSERT INTO usuarios (alias, correo, clave) VALUES (?,?,?)',
        [usuario, correo, hash],
        (err, results) => {
          if (err) throw err;

          res.status(200).send({
            message: 'usuario registrado exitosamente',
            resStatus: 'ok',
            results,
          });

          connection.end();
        }
      );
    });
  } catch (e) {
    console.error(e);
  }
};

export const ingreso = (req, res) => {
  try {
    const { usuario, clave } = req.body;

    connection.query(
      'SELECT clave FROM usuarios WHERE alias = ?',
      [usuario],
      (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
          res.send({ message: 'Credenciales incorrectas' });
        } else {
          const hash = results[0].clave;

          bcrypt.compare(clave, hash, (err, isMatch) => {
            if (err) throw err;

            isMatch
              ? res.send({ message: 'Ingresó con éxito' })
              : res.send({ message: 'Credenciales incorrectas' });
          });
          connection.end();
        }
      }
    );
  } catch (e) {
    console.error(e);
  }
};
