var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var dbSpanUnivStats = __dirname + "/stats.db";
var dbUnivs = __dirname + "/universities.db";


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

    }

];

var SpanUNivStatsdb = new DataStore({
    
    filename: dbSpanUnivStats,
    autoload: true
});


/////////////   LOADINITIALDATA 

app.get(BASE_API_PATH + "/span-univ-stats/loadInitialData", (req, res) => {

    console.log(Date() + " - GET /span-univ-stats/loadInitialData")

    SpanUNivStatsdb.find({}, (err, stats) => {

        if (err) {
            console.error(" Error accesing DB");
            res.sendStatus(500);
            return;
        }

        if (stats.length == 0) {
            console.log(" Empty DB");
            SpanUNivStatsdb.insert(initialStats);

        }
        else {
            console.log("DB initialized with " + stats.length + " stats")
        }

    });
});



//////ACCIONES PARA /span-univ-stats

app.get(BASE_API_PATH + "/span-univ-stats", (req, res) => {
    console.log(Date() + " - GET /span-univ-stats");
    SpanUNivStatsdb.find({}, (err, stats) => {

        if (err) {
            console.error(" Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.send(stats);

    });

});

app.post(BASE_API_PATH + "/span-univ-stats", (req, res) => {
    console.log(Date() + " - POST /span-univ-stats");
    var stat = req.body;
    
    SpanUNivStatsdb.insert(stat);
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/span-univ-stats", (req, res) => {
    console.log(Date() + " - PUT /span-univ-stats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/span-univ-stats", (req, res) => {
    console.log(Date() + " - DELETE /span-univ-stats");
    SpanUNivStatsdb.find({}, (err, stats) => {
        for(var i = 0;i<stats.length;i++){
        SpanUNivStatsdb.remove({});
        }
    });
    
    res.sendStatus(200);
});

////// ACCIONES PARA RECURSO CON UNA INSTANCIA (COMUNIDAD AUTONOMA)

app.get(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {
    var autComm = req.params.autCommunity;
    console.log(Date() + " - GET /span-univ-stats/" + autComm);
    
    SpanUNivStatsdb.find({autCommunity : autComm}, (err, stats) => {

        if (err) {
            console.error(" Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.send(stats);

    });
});


app.delete(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {

    var autComm = req.params.autCommunity;

    console.log(Date() + " - DELETE /span-univ-stats/" + autComm);
    
    SpanUNivStatsdb.find({autCommunity : autComm}, (err, stats) => {
        for(var i=0;i<stats.length;i++){
            SpanUNivStatsdb.remove({autCommunity : autComm});
        }
        
    });
    
    
    res.sendStatus(200);

});



app.post(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {
    var autComm = req.params.autCommunity;
    console.log(Date() + " - POST /span-univ-stats/" + autComm);
    res.sendStatus(405);
});




app.put(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {
    var autComm = req.params.autCommunity;
    var stat = req.body;
    console.log(Date() + " - PUT /span-univ-stats/" + autComm);


    if (autComm !== stat.autCommunity) {
        res.sendStatus(409);
        console.warn(Date() + "  - Hacking attemp!")
        return;
    }
    
    SpanUNivStatsdb.update({autCommunity : autComm},stat,(err,numUpdated)=>{
        console.log(" - Updated"+ numUpdated);
    });
    
    res.sendStatus(200);
  
});


////// ACCIONES PARA UN RECURSO CONCRETO CON DOS INSTANCIAS


app.get(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {
    var ac = req.params.autCommunity;
    var y = req.params.year;
    console.log(Date() + " - GET /span-univ-stats/" + ac + "/"+ y);
    
    SpanUNivStatsdb.find({"autCommunity":ac, "year": parseInt(y)}, (err, stats) => {
        
        if (err) {
            console.error(" Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.send(stats);

    });
});


app.delete(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {

    var autComm = req.params.autCommunity;
    var year1 = req.params.year;
    console.log(Date() + " - DELETE /span-univ-stats/" + autComm + "/" + year1);
    
    SpanUNivStatsdb.remove({autCommunity: autComm, year: parseInt(year1)});
    
    res.sendStatus(200);



});


app.post(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {
    var autComm = req.params.autCommunity;
    var year = req.params.year;
    console.log(Date() + " - POST /span-univ-stats" + autComm + "/" + year);
    res.sendStatus(405);
});


app.put(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {
    var autComm = req.params.autCommunity;
    var year = req.params.year;
    var stat = req.body;

    if (autComm != stat.autCommunity || year != stat.year) {
        res.sendStatus(409);
        console.warn(Date() + "  - Hacking attemp!");
        return;
    }
    
    SpanUNivStatsdb.update({"autCommunity": autComm, "year": parseInt(year)},stat,(err,numUpdated)=>{
        console.log(" - Updated"+ numUpdated);
    });
    
    res.sendStatus(200);    


});



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
        res.sendStatus(409)
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
