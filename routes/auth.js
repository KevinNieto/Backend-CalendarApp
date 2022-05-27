/*
    RUTAS DE USUARIO
    host + /api/auth

*/ 
//INMPORTACIONES
const {Router} = require('express')
const router = Router()
const  {check}= require('express-validator')
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth')
const  {validarCampos}= require('../middlewares/validar-campos')
const  {validarJWT}= require('../middlewares/validar-jwt')


//REGISTER
router.post(
    '/new',
    [//VALIDACIONES
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres ').isLength({min: 6}),
        //MIDLEWARES
        validarCampos
    ],
    //CONTROLLERS
    crearUsuario )

//LOGIN 
router.post(
    '/',
    [//VALIDACIONES
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres ').isLength({min: 6}),
        //MIDLEWARES
        validarCampos
    ],
    //CONTROLLERS
    loginUsuario )


    // REVALIDADOR DE TOKEN
router.get('/renew',validarJWT, revalidarToken )


 //Exportaciones en node
 module.exports =router;