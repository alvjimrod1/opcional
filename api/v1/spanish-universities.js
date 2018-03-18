var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var dbUnivs = __dirname + "/universities.db";

var app = express();

app.use(bodyParser.json());


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

////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server not ready " + e);
});
