const express = require('express')
require('dotenv').config(); 
const {dbConection} = require('./database/config')
const cors = require('cors')


//CREAMOS EL SERVIDOR DE EXPRESS
const app = express(); 


//Base de datos
dbConection()

//Cors
app.use(cors())

//Directorio Publico
app.use( express.static('public')); 

//Lectura y parseo del body
app.use(express.json());


//RUTAS
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//ESCUCHAR PETICIONES
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
})