const {response} = require('express')
const Evento = require('../models/Evento');



const getEventos= async(req, res= response)=>{
     const eventos =await Evento.find()
        .populate('user', 'name') //Aqui declaramos los campos que nos interesan de la tabla usuario
    
    return res.status(201).json({
        ok: true,
        eventos
    })
}


const crearEvento=async(req, res= response)=>{
    
    const evento = new Evento(req.body);
    try {
//PARA SOLICITAR EL ID DEL USUARIO QUE ESTA LOGEADO
        evento.user = req.uid;

        const eventoGuardado =await evento.save();
        res.json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}


const actualizarEvento= async(req, res= response)=>{
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'

            });            
        }
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para actualizar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}



const eliminarEvento=async(req, res= response)=>{
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'

            });            
        }
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para actualizar este evento'
            })
        }

        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: 'Evento eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports ={getEventos, crearEvento, actualizarEvento, eliminarEvento};