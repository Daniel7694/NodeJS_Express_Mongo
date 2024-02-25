const usuariosD = require ('./usuarios/DELETE');
const usuariosG = require ('./usuarios/GET');
const usuariosP = require ('./usuarios/POST');
const usuariosPU = require ('./usuarios/PUT');


const cursosD = require ('./cursos/DELETE');
const cursosG = require ('./cursos/GET');
const cursosP = require ('./cursos/POST');
const cursosPU = require ('./cursos/PUT');


const express = require('express');
const mongoose = require ('mongoose');

//Conexión a la base de daos mongodb
mongoose.connect('mongodb://localhost:27017/usercoursesdb', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Conectando a MongoDB...'))
.catch(err => console.log('No se pudo conectar con MongoDB..', err));



//middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//end points (recursos)

app.use('/api/usuarios/DELETE', usuariosD);
app.use('/api/usuarios/GET', usuariosG);
app.use('/api/usuarios/POST', usuariosP);
app.use('/api/usuarios/PUT', usuariosPU);


app.use('/api/cursos/DELETE', cursosD);
app.use('/api/cursos/GET', cursosG);
app.use('/api/cursos/POST', cursosP);
app.use('/api/cursos/PUT', cursosPU);


const port = process.env.PORT || 96;
app.listen(port, () => {
    console.log('Api REST Ok, y ejecutándose...');
})