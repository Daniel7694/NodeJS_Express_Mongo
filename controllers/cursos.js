const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router()
const Joi = require('@hapi/joi');

// Validaciones para el objeto usuario 
const schema = Joi.object({
    titulo: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíúó ]{3,30}$/),
    descripcion: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^[a-zA-Z0-9]{3,100}$/),
    alumnos: Joi.string()
    .required()
    .pattern(/^[0-9]{3,30}$/),
    calificacion: Joi.string()
    .required()
    .pattern(/^[0-9]{3,30}$/)
});

ruta.get('/', (req,res)=>{
    let resultado = listarCursosActivos();
    resultado.then(cursos => {
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
});

//Endpoint de tipo POST para el recurso CURSOS
ruta.post('/', (req, res) => {
    let resultado = crearCurso(req.body);

    resultado.then(curso => {
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

//Endpoint de tipo PUT para el recurso CURSOS
ruta.put('/:id', (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.params.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
})

//Endpoint de tipo PUT para el recurso CURSOS
ruta.delete('/:id', (req, res) => {
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err)
    })
})


//Funcion asincronica para crear cursos 
async function crearCurso(body){
    let curso = new Curso({
        titulo      : body.titulo,
        descripcion : body.descripcion,
        alumnos     : body.alumnos,
        calificacion : body.calificacion
    });
    return await curso.save();
}

//Funcion asincronica para actualizar cursos 
async function actualizarCurso(id,body){
    let curso = await Curso.findOneAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion      
        }
    },{new: true});
    return curso;
}
//Funcion asincronica para inhabilitar cursos
async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, {new: true});
    return curso;
} 



//Funcion asincronica para listar a los cursos activos 
async function listarCursosActivos(){
    let cursos = await Curso.find({"estado": true});
    return cursos
}
module.exports = ruta;