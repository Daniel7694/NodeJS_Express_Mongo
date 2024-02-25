const express = require('express');
const logic = require('../logic/usuario_logic')
const ruta = express.Router()


//Endpoint de tipo GET para el recurso usuarios. Listar todos los usuarios 
ruta.get('/', (req,res)=>{
    let resultado = listarUsuariosActivos();
    resultado.then(usuarios => {
        res.json(usuarios)
    }).catch(err => {
        res.status(400).json(
            {
                err
            }
        )
    })
});
//Endpoint de tipo POST para el recurso usuarios 
ruta.post('/',(req, res) => {
    let body = req.body;

    const {error, value} = schema.validate({nombre: nombre.body, email: email.body});
    if(!error){
        let resultado = crearUsuario(body);
        
        resultado.then( user => {
            res.json({
                valor: user
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
})

//Endpointde tipo DELETE para el recurso USUARIOS
ruta.delete('/:email', (req, res) => {
    let resultado = desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});
//Endpoint de tipo PUT para el recurso usuarios
ruta.put('/:email', (req, res) => {
    const{error, value} = schema.validate({nombre: req.body.nombre});
    if(!error){
        let resultado = actualizarUsuario(req.params.email, req.body)
        resultado.then(valor => {
            res.json({
                valor
            })
        }).catch(err => {
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});
module.exports = ruta;