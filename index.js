var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";                    /////////////////////////////////// HAY QUE BORRARLO CUANDO LO METAIS EN VUESTRAS APIS POR SEPARADO
var dbSpanUnivStats = __dirname + "/stats.db";
var dbUnivs = __dirname + "/universities.db";



//////////////////////////////////////////////////////// NUEVO L07

var spanUnivStatsApi = require("./spanUnivStatsApi");

////////////////////////////////////////////////////////


var app = express();

app.use(bodyParser.json());


app.use("/",express.static(__dirname +"/public"));

app.get("/hello", (req,res) =>{
    res.send("Hello World")
});





///////APIS
////////API SPANISH UNIVERSITIES/////////////////////////////////////////////////
var initialUniversities = [

    {

        "autCommunity": "aragon",
        "yearFund": "1542",
        "headquar": "zaragoza",
        "type": "publica",
        "nameUniversity": "universidad de zaragoza",


    },

    {

        "autCommunity": "com-madrid",
        "yearFund": "2006",
        "headquar": "madrid",
        "type": "privada-np",
        "nameUniversity": "universidad abad oliva ceu",


    }

];


var univs = new DataStore({

    filename: dbUnivs,
    autoload: true
});


/////////////   LOADINITIALDATA 

app.get(BASE_API_PATH + "/spanish-universities/loadInitialData", (req, res) => {

    console.log(Date() + " - GET /spanish-universities/loadInitialData");

    univs.find({}, (err, universities) => {

        if (err) {
            console.error(" Error accesing DB");
            res.sendStatus(500);
            return;
        }

        if (universities.length == 0) {
            console.log(" Empty DB");
            univs.insert(initialUniversities);

        }
        else {
            console.log("DB initialized with " + universities.length + " universities");
        }

    });
});



//ACCIONES REST

//RECURSOS SIMPLES//////////////////////////////////////////////////////////////
app.get(BASE_API_PATH + "/spanish-universities", (req, res) => {
    console.log(Date() + " - GET /spanish-universities");
    univs.find({}, (error, universities) => {

        if (error) {
            console.error(" Error accesing DB");
            res.sendStatus(500);
            return;
        }


        res.send(universities);
    });

});

app.post(BASE_API_PATH + "/spanish-universities", (req, res) => {
    console.log(Date() + " - POST /spanish-universities");
    var univ = req.body;


    univs.insert(univ);
    res.sendStatus(201);
});



app.put(BASE_API_PATH + "/spanish-universities", (req, res) => {
    console.log(Date() + " - PUT /spanish-universities");
    res.sendStatus(405);

});

app.delete(BASE_API_PATH + "/spanish-universities", (req, res) => {
    console.log(Date() + " - DELETE /spanish-universities");
    univs.find({}, (err, universities) => {
        for (var i = 0; i < universities.length; i++) {
            univs.remove({});
        }
    });

    res.sendStatus(200);

});
//RECURSO ESPECIFICO PARA 2 PROPIEDADES (EL REAL)///////////////////////////////
app.get(BASE_API_PATH + "/spanish-universities/:autCommunity/:yearFund", (req, res) => {

    var autCommunity = req.params.autCommunity;
    var yearFund = req.params.yearFund;

    console.log(Date() + " - GET /spanish-universities/" + autCommunity + "/" + yearFund);

    univs.find({}, (err, universities) => {

        var filteredUnivs = universities.filter((s) => {
            return (s.autCommunity == autCommunity && s.yearFund == yearFund);
        });

        if (err) {
            console.error(" Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.send(filteredUnivs);

    });
});

app.delete(BASE_API_PATH + "/spanish-universities/:autCommunity/:yearFund", (req, res) => {
    var autCommunity = req.params.autCommunity;
    var yearFund = req.params.yearFund;

    console.log(Date() + " - DELETE /spanish-universities" + autCommunity + "/" + yearFund);

    univs.remove({ autCommunity: autCommunity, yearFund: yearFund });

    res.sendStatus(200);

});


app.post(BASE_API_PATH + "/spanish-universities/:autCommunity/:yearFund", (req, res) => {
    var autCommunity = req.params.autCommunity;
    var yearFund = req.params.yearFund;
    console.log(Date() + " - POST /spanish-universities" + autCommunity + "/" + yearFund);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/spanish-universities/:autCommunity/:yearFund", (req, res) => {
    var autCommunity = req.params.autCommunity;
    var yearFund = req.params.yearFund;
    var university = req.body;



    if (autCommunity != university.autCommunity || yearFund != university.yearFund) {
        res.sendStatus(409);
        console.warn(Date() + "  - Hacking attemp!");
        return;
    }

    univs.update({ "autCommunity": autCommunity, "yearFund": yearFund }, university, (err, numUpdated) => {
        console.log(" - Updated" + numUpdated);
    });
    res.sendStatus(200);

});





////////////////////////////////////////////////////////////////// SPAN-UNIV-STATS SEPARADA DEL INDEX



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

var SpanUNivStatsdb = new DataStore({
    
    filename: dbSpanUnivStats,
    autoload: true
});



///////////////////////////////// NUEVO L07 : pasar todo lo necesario
spanUnivStatsApi.register(app,SpanUNivStatsdb,initialStats);

//////////////////////////////////











// API open-source-contests

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

var projects = initialProjects.slice();

app.get(BASE_API_PATH + "/contests/loadInitialData", (req, res) => {

    console.log(Date() + " - GET /contests/loadInitialData")
    
    projects = initialProjects.slice();
    res.send(projects);

});

app.get(BASE_API_PATH + "/contests", (req,res) =>{
    res.send(projects);
});

app.get(BASE_API_PATH + "/contests/:year/:university/:project", (req, res) => {
    console.log(Date() + " - GET /contests/:year/:university/:project");
    let {year, university, project} = req.params;
    res.send(projects.filter((o) => (o.year == year))
                        .filter((o) => (o.university == university))
                        .filter((o) => (o.project == project))[0]);
});

app.get(BASE_API_PATH + "/contests/:year/:university", (req, res) => {
    console.log(Date() + " - GET /contests/:year/:university");
    let {year, university} = req.params;
    res.send(projects.filter((o) => (o.year == year))
                 .filter((o) => (o.university == university)));
});

app.get(BASE_API_PATH + "/contests/:year", (req, res) => {
    console.log(Date() + " - GET /contests/:year");
    let {year} = req.params;
    res.send(projects.filter((o) => (o.year == year)));
});

app.post(BASE_API_PATH + "/contests", (req, res) => {
    console.log(Date() + " - POST /contests");
    let project = req.body;
    projects.push(project);
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
        res.sendStatus(409)
        console.warn("url name project != (modify) project");
        return;
    };
    
    projects = projects.map((o)=>{
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
    projects = [];
    res.sendStatus(200);
});

app.delete(BASE_API_PATH + "/contests/:year/:university/:project",(req,res)=>{
    let {year, university, project} = req.params;
    console.log(Date() + " - DELETE /contests/:year/:university/:project");

    projects = projects.filter((o)=>{
        return (o.year != year || o.university != university || o.project != project);
    });
    
    res.sendStatus(200);
});



app.listen(port,()=>{
    console.log("Server ready on port "+port+"!");
}).on("error", (e)=>{
    console.log("Server not ready "+ e);
});
