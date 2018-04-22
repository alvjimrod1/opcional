var spanishUniversitiesApi = {};
var BASE_API_PATH = "/api/v2";

module.exports = spanishUniversitiesApi;

spanishUniversitiesApi.register = function(app, univs, initialUniversities, checkApiKey) {
    console.log("Registering routes for spanishUniversities API");


    app.get(BASE_API_PATH + "/spanish-universities/docs", (req, res) => {

        res.redirect("https://documenter.getpostman.com/view/3897591/collection/RVu1GW2H");


    });


    /////////////   LOADINITIALDATA 

    app.get(BASE_API_PATH + "/spanish-universities/loadInitialData", (req, res) => {

        console.log(Date() + " - GET /spanish-universities/loadInitialData");
        res.sendStatus(200);
        univs.find({}).toArray((err, universities) => {

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
    /////////// GET A RECURSO BASE CON BUSQUEDAS Y PAGINACIÓN IPLEMENTADO

    app.get(BASE_API_PATH + "/spanish-universities", function(req, res) {

        var dbquery = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        Object.keys(req.query).forEach((at) => {


            dbquery[at] = req.query[at];


        });

        if (Object.keys(req.query).includes('from') && Object.keys(req.query).includes('to')) {

            delete dbquery.from;
            delete dbquery.to;
            dbquery['yearFund'] = { "$lte": (req.query['to']), "$gte": (req.query['from']) };

        }
        else if (Object.keys(req.query).includes('from')) {

            delete dbquery.from;
            dbquery['yearFund'] = { "$gte": (req.query['from']) };

        }
        else if (Object.keys(req.query).includes('to')) {

            delete dbquery.to;
            dbquery['yearFund'] = { "$lte": (req.query['to']) };

        }

        univs.find(dbquery).skip(offset).limit(limit).toArray((err, universities) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }


            else {

                res.send(universities.map((s) => {
                    delete s._id;
                    return s;
                }));

            }

        });

    });


    //RECURSOS SIMPLES//////////////////////////////////////////////////////////////


    app.post(BASE_API_PATH + "/spanish-universities", (req, res) => {
        console.log(Date() + " - POST /spanish-universities");
        var univ = req.body;
        var camposVacios = req.body.headquar == "" || req.body.type == "" || req.body.nameUniversity == "";

        univs.find({ "autCommunity": univ.autCommunity, "yearFund": univ.yearFund }).toArray((err, universities) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }


            if (Object.keys(univ).length !== 5 || camposVacios) {
                console.warn("University do not have the expected fields");
                res.sendStatus(400);


            }

            else if (universities.length !== 0) {
                console.warn("University already exists!!!");
                res.sendStatus(409);

            }
            else {


                univs.insert(univ);
                res.sendStatus(201);
            }


        });

    });



    app.put(BASE_API_PATH + "/spanish-universities", (req, res) => {
        console.log(Date() + " - PUT /spanish-universities");
        res.sendStatus(405);

    });

    app.delete(BASE_API_PATH + "/spanish-universities", (req, res) => {
        console.log(Date() + " - DELETE /spanish-universities");
        univs.find({}).toArray((err, universities) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }


            else {

                univs.remove({});
                res.sendStatus(200);
            }

        });

    });
    //RECURSO ESPECIFICO PARA 2 PROPIEDADES //////////////////////////////
    app.get(BASE_API_PATH + "/spanish-universities/:autCommunity/:yearFund", (req, res) => {

        var autCommunity = req.params.autCommunity;
        var yearFund = req.params.yearFund;

        console.log(Date() + " - GET /spanish-universities/" + autCommunity + "/" + yearFund);

        univs.find({ "autCommunity": autCommunity, "yearFund": yearFund }).toArray((err, universities) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }


            else {

                res.send(universities.map((s) => {
                    delete s._id;
                    return s;
                })[0]);

            }

        });
    });

    app.delete(BASE_API_PATH + "/spanish-universities/:autCommunity/:yearFund", (req, res) => {
        var autCommunity = req.params.autCommunity;
        var yearFund = req.params.yearFund;

        console.log(Date() + " - DELETE /spanish-universities" + autCommunity + "/" + yearFund);



        univs.find({ "autCommunity": autCommunity, "yearFund": yearFund }).toArray((err, universities) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }


            else {

                univs.remove({ "autCommunity": autCommunity, "yearFund": yearFund });
                res.sendStatus(200);

            }

        });

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



        if (autCommunity != university.autCommunity || yearFund != university.yearFund || Object.keys(university).length !== 5) {
            res.sendStatus(400);
            console.warn(Date() + "  - Hacking attemp!");
            return;
        }

        univs.update({ "autCommunity": autCommunity, "yearFund": yearFund }, university, (err, numUpdated) => {
            console.log(" - Updated" + numUpdated);
        });
        res.sendStatus(200);

    });


};
