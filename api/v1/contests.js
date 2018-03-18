var express = require("express");
var bodyParser = require('body-parser');

var port = (process.env.PORT||1607);
var BASE_API_PATH = "/api/v1";

var app = express()

app.use(bodyParser.json())

initialProjects = [
            {
              "university": "Universidad de Sevilla",
              "year": 2017,
              "aut-community": "Andalucia",
              "city": "Sevilla",
              "description": "Medición de energía de uno o varios dispositivos de una vivienda, en tiempo real, haciendo uso de microcontroladores de bajo coste. Control remoto a través de una app móvil Android. Procesado de datos en tiempo real en una aplicación web",
              "project": "Arducontrol",
              "team": [
                {
                    "member": "Fernando Méndez Requena"
                }
              ]
            },
            {
              "university": "Universidad de Sevilla",
              "year": 2016,
              "aut-community": "Andalucia",
              "city": "Sevilla",
              "description": "Utilidad para hacer una instalación de forma cómoda y rápida (al estilo windows) de programas a partir del código fuente",
              "project": "AutoUPI",
              "team": [
                {
                    "member": "Juan Alcántara Guijarro"
                },
                {
                    "member": "Alejandro Barea Rodríguez"
                }
              ]
            },
            {
              "university": "Universidad de La Laguna",
              "year": 2017,
              "aut-community": "Canarias",
              "city": "Santa Cruz de Tenerife",
              "description": "The main goal of BigHelper is to provide an easy-to-use tool to work in a Big Data environment, in order to give the possibility to perform Business Intelligence matters by non-technical users.",
              "project": "BigHelper",
              "team": [
                {
                    "member": "Adrián Rodríguez Bazaga"
                }
              ]
            },
            {
              "university": "Universidad de La Laguna",
              "year": 2017,
              "aut-community": "Canarias",
              "city": "Santa Cruz de Tenerife",
              "description": "Aplicación de interacción para personas con dificultades que les impidan la comunicación. Servirá como intermediario para comunicarse usando estructuras elementales, así como para transmitir algunas necesidades básicas, emociones, sensaciones,...",
              "project": "Bring it out",
              "team": [
                {
                    "member": "Miguel Jiménez Gomis"
                }
              ]
            }
            ]

app.get(BASE_API_PATH + "/contests", (req,res) =>{
    res.send(initialProjects);
});

app.get(BASE_API_PATH + "/contests/:year/:university/:project", (req, res) => {
    console.log(Date() + " - GET /contests/:year/:university/:project");
    let {year, university, project} = req.params;
    res.send(initialProjects.filter((o) => (o.year == year))
                        .filter((o) => (o.university == university))
                        .filter((o) => (o.project == project))[0]);
});

app.get(BASE_API_PATH + "/contests/:year/:university", (req, res) => {
    console.log(Date() + " - GET /contests/:year/:university");
    let {year, university} = req.params;
    res.send(initialProjects.filter((o) => (o.year == year))
                 .filter((o) => (o.university == university)));
});

app.get(BASE_API_PATH + "/contests/:year", (req, res) => {
    console.log(Date() + " - GET /contests/:year");
    let {year} = req.params;
    res.send(initialProjects.filter((o) => (o.year == year)));
});

app.post(BASE_API_PATH + "/contests", (req, res) => {
    console.log(Date() + " - POST /contests");
    let project = req.body;
    initialProjects.push(project);
    res.sendStatus(201);
});

app.post(BASE_API_PATH + "/contests/:year/:university/:project",(req,res)=>{
    console.log(Date() + "POST - /contests/:year/:university/:project");
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/contests/:year/:university/:project", (req, res) => {
    console.log(Date() + " - PUT /contests/:year/:university/:project");
    let {year, university, project} = req.params;
    let obj = req.body;
    if (project != obj.project){
        send.status(409)
        console.warn("url name project != (modify) project");
        return;
    };
    
    initialProjects = initialProjects.map((o)=>{
        if(o.year == year && o.university == university && o.project == project){
            return obj;
        }else{
            return o;
        };
    });

    res.sendStatus(200);
});

app.put(BASE_API_PATH + "/contests",(req,res)=>{
    console.log(Date() + "PUT - /contests");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/contests",(req,res)=>{
    console.log(Date() + " - DELETE /contests");
    initialProjects = [];
    res.sendStatus(200);
});

app.delete(BASE_API_PATH + "/contests/:year/:university/:project",(req,res)=>{
    let {year, university, project} = req.params;
    console.log(Date() + " - DELETE /contests/:year/:university/:project");

    initialProjects = initialProjects.filter((o)=>{
        return (o.year != year || o.university != university || o.project != project);
    });
    
    res.sendStatus(200);
});

app.listen(port,()=>{
    console.log("Server ready on port "+port+"!");
}).on("error", (e)=>{
    console.log("Server not ready "+ e);
});
