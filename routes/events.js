/*
    RUTAS DE USUARIO
    host + /api/events

*/ 
//IMPORTACIONES
const {Router} = require('express')
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events')
const  {validarJWT}= require('../middlewares/validar-jwt')
const  {validarCampos}= require('../middlewares/validar-campos')
const  {check}= require('express-validator')
const {isDate} = require('../helpers/isDate')

const router = Router()



router.use(validarJWT)
//Obtener eventos
router.get(
    '/', getEventos )

//Crear eventos    
router.post(
    '/', 
    [//VALIDACIONES
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatorio').custom(isDate),
    check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
    ]
    ,crearEvento )

//Actualizar eventos
router.put(
    '/:id', actualizarEvento )

//Borrar eventos
router.delete(
    '/:id', eliminarEvento )
    
module.exports =router;    

