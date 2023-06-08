import Router from 'express';
import * as certificadosCtrl from '../controllers/certificados.controllers.js';
const router = Router();

// OBTENER CERTIFICADOS
router.route('/').get(certificadosCtrl.obtenerCertificados);

// OBTENER CERTIFICADO POR DOCUMENTO
router
  .route('/registro/documento/:documento')
  .get(certificadosCtrl.obtenerCertificadoPorDocumento);

// CREAR CERTIFICADO
router.route('/nuevo-registro').post(certificadosCtrl.crearCertificado);

// ACTUALIZAR CERTIFICADO
router
  .route('/actualizar-registro/documento/:documento')
  .post(certificadosCtrl.actualizarCertificado);

// ELIMINAR CERTIFICADO
router
  .route('/eliminar-registro/documento/:documento')
  .post(certificadosCtrl.eliminarCertificado);

export default router;
