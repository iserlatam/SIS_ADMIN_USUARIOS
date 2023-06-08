import connection from '../../db/conn.js';

// OBTENER CERTIFICADOS
export const obtenerCertificados = (req, res) => {
  try {
    connection.query('SELECT * FROM certificados', (err, results) => {
      if (err) throw err;

      res.send({ data: results });
    });
  } catch (e) {
    console.error(e);
  }
};

// OBTENER CERTIFICADO POR DOCUMENTO
export const obtenerCertificadoPorDocumento = (req, res) => {
  try {
    const { documento } = req.params;

    connection.query(
      'SELECT * FROM certificados WHERE documento = ?',
      [documento],
      (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
          res.send({
            message: 'No se encontró el registro con este número de documento',
          });
        } else {
          res.send({
            message: 'Registro/s encontrado con éxito:',
            data: results,
          });
        }
      }
    );
  } catch (e) {
    console.error(e);
  }
};

// CREAR CERTIFICADO
export const crearCertificado = (req, res) => {
  try {

    const {
      nombre_completo,
      tipo_doc,
      documento,
      fecha_creacion,
      departamento,
      ciudad,
      empresa,
      curso,
      codigo_certificado,
    } = req.body;

    connection.query(
      `INSERT INTO certificados (
        nombre_completo,
        tipo_doc,
        documento,
        fecha_creacion,
        departamento,
        ciudad,
        empresa,
        curso,
        codigo_certificado
       ) VALUES (
        ?,?,?,?,?,?,?,?,?
       )`,
      [
        nombre_completo,
        tipo_doc,
        documento,
        fecha_creacion,
        departamento,
        ciudad,
        empresa,
        curso,
        codigo_certificado,
      ],
      (err, results) => {
        if (err) throw err;
        res.send({ message: 'Registro guardado con éxito', data: results });
      }
    );
  } catch (e) {
    console.error(e);
  }
};

// ACTUALIZAR CERTIFICADO
export const actualizarCertificado = (req, res) => {
  try {
    // TAREA PENDIENTE: VERIFICAR EL DOCUMENTO ANTES DE HACER LA ACCION Y
    // ELIMINAR POR ID DEL CURSO, NO POR DOCUMENTO
    connection.query((err, results) => {
      if (err) throw err;
      res.send({ data: results });
    });
  } catch (e) {
    console.error(e);
  }
};

// ELIMINAR CERTIFICADO
export const eliminarCertificado = (req, res) => {
  try {
    const { documento } = req.params;
    // TAREA PENDIENTE: VERIFICAR EL DOCUMENTO ANTES DE HACER LA ACCION
    connection.query(
      'DELETE FROM certificados WHERE documento = ?',
      [documento],
      (err, results) => {
        if (err) throw err;
        res.send({ message: 'Registro eliminado con éxito'});
      }
    );
  } catch (e) {
    console.error(e);
  }
};
