var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var MongoClient = require("mongodb").MongoClient;

var port = (process.env.PORT || 1607);

var mdbSpanUnivStatsURL = "mongodb://balramrom:balramrom@ds121309.mlab.com:21309/span-univ-stats-brrdb";


/* NUEVO L07 : crear variable para ejecución de la api */

var spanUnivStatsApi = require("./spanUnivStatsApi");
var spanishUniversitiesApi = require("./spanishUniversitiesApi");
var openSourceContestsApi = require("./openSourceContestsApi/v2");

var secureSpanUnivStatsApi = require("./secureSpanUnivStatsApi");
var secureSpanishUniversitiesApi = require("./secureSpanishUniversitiesApi");
var apikey = require("./apikey");


var app = express();

app.use(bodyParser.json());


app.use("/",express.static(path.join(__dirname,"public")));


/* API SPANISH UNIVERSITIES */

var initialUniversities = [

    {

        "autCommunity": "aragon",
        "yearFund": "1542",
        "headquar": "zaragoza",
        "type": "publica",
        "nameUniversity": "universidad de zaragoza"


    },

    {

        "autCommunity": "catalunya",
        "yearFund": "2003",
        "headquar": "barcelona",
        "type": "privada",
        "nameUniversity": "universidad abad oliva ceu"


    },

    {

        "autCommunity": "andalucia",
        "yearFund": "1505",
        "headquar": "sevilla",
        "type": "publica",
        "nameUniversity": "universidad de sevilla"


    },

    {

        "autCommunity": "andalucia",
        "yearFund": "2011",
        "headquar": "sevilla",
        "type": "privada",
        "nameUniversity": "universidad loyola andalucia"


    },

    {

        "autCommunity": "galicia",
        "yearFund": "1990",
        "headquar": "vigo",
        "type": "publica",
        "nameUniversity": "universidad de vigo"


    }

];


/* SPAN-UNIV-STATS SEPARADA DEL INDEX */

var initialStats = [

    {

        "autCommunity": "aragon",
        "year": 2015,
        "enrolledNumber": 33456,
        "degree": 26900,
        "master": 1348,
        "firstSecondCycle": 5208

    },

    {

        "autCommunity": "andalucia",
        "year": 2015,
        "enrolledNumber": 250785,
        "degree": 182591,
        "master": 14896,
        "firstSecondCycle": 53298

    },
    {
        "autCommunity": "asturias",
        "year": 2015,
        "enrolledNumber": 23074,
        "degree": 16973,
        "master": 1283,
        "firstSecondCycle": 4818

    },
    {
        "autCommunity": "andalucia",
        "year": 2014,
        "enrolledNumber": 249138,
        "degree": 146474,
        "master": 14349,
        "firstSecondCycle": 88315

    },
    {
        "autCommunity": "aragon",
        "year": 2014,
        "enrolledNumber": 33798,
        "degree": 22482,
        "master": 1657,
        "firstSecondCycle": 9659

    }

];

/* Initial projects Open Source Contests */

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
            },
            {
              "university": "Universidad Politécnica de Madrid",
              "year": 2017,
              "aut-community": "Madrid",
              "city": "Madrid",
              "description": "DiedricoApp es una aplicación Android para enseñar diédrico a los alumnos de Bachillerato. El objetivo es potenciar la vista espacial con animaciones interactivas, con material de la asignatura, y con funciones especiales para dispositivos móviles.",
              "project": "DiedricoAPP",
              "team": [
                {
                    "member": "Francisco Jesús Acién Pérez"
                }
              ]
            }
            ]


MongoClient.connect(mdbSpanUnivStatsURL, { native_parser: true }, (err, mlabs) => {

    if (err) {
        console.error("Error accesing DB : " + err);
        process.exit(1);
    }

    console.log("Conected to DB in mlabs");

    var SpanUnivStatsdatabase = mlabs.db("span-univ-stats-brrdb");
    var SpanUNivStatsdb = SpanUnivStatsdatabase.collection("spanUnivStats");

    spanUnivStatsApi.register(app, SpanUNivStatsdb, initialStats);
    secureSpanUnivStatsApi.register(app, SpanUNivStatsdb, initialStats, apikey.checkApiKey);

    console.log("Conected to  spanishUniversities DB");

    var SpanishUniversitiesdatabase = mlabs.db("span-univ-stats-brrdb");
    var univs = SpanishUniversitiesdatabase.collection("spanishUniversities");

    spanishUniversitiesApi.register(app, univs, initialUniversities);
    secureSpanishUniversitiesApi.register(app, univs, initialUniversities, apikey.checkApiKey);

    console.log("Conected to  open-source-contests-db");
    var openSourceContestsdb = mlabs.db("span-univ-stats-brrdb");
    var collection = openSourceContestsdb.collection("openSourceContests");

    openSourceContestsApi.register(app, collection, initialProjects);


    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server not ready " + e);
    });


});
