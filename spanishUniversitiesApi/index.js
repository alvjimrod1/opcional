var spanishUniversitiesApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = spanishUniversitiesApi;

spanishUniversitiesApi.register = function(app, univs, initialUniversities, checkApiKey) {
    console.log("Registering routes for spanishUniversities API");


    app.get(BASE_API_PATH + "/spanish-universities/docs", (req, res) => {

        res.redirect("https://documenter.getpostman.com/view/3897591/collection/RVu1GW2H");


    });


    /////////////   LOADINITIALDATA 

    app.get(BASE_API_PATH + "/spanish-universities/loadInitialData", (req, res) => {

        console.log(Date() + " - GET /spanish-universities/loadInitialData");

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

    ///////////*********************************FUNCION PARA LAS BUSQUEDAS************************************************************////////////////
    var buscador = function(base, conjuntoauxiliar, desde, hasta, comunidadAutonoma, anyoFund) {

        console.log("Búsqueda con parametros: from = " + desde + " ,to = " + hasta + ", autCommunity = " + comunidadAutonoma + ", yearFund = " + anyoFund + ".");

        var from = parseInt(desde);
        var to = parseInt(hasta);
        // var autCommunity = new String(param_autCommunity);

        for (var j = 0; j < base.length; j++) {
            var yearFund = base[j].yearFund;
            var autCommunity = base[j].autCommunity;
            if (to >= yearFund && from <= yearFund) {

                conjuntoauxiliar.push(base[j]);
            }
            else if (comunidadAutonoma == autCommunity) {
                conjuntoauxiliar.push(base[j]);

            }
            else if (anyoFund == yearFund) {
                conjuntoauxiliar.push(base[j]);

            }
            else if (from <= yearFund) {
                conjuntoauxiliar.push(base[j]);
            }
            else if (to >= yearFund) {
                conjuntoauxiliar.push(base[j]);
            }
            /* else if (anyoFund == yearFund && comunidadAutonoma == autCommunity) {

                conjuntoauxiliar.push(base[j]);
             }else if ( && comunidadAutonoma == autCommunity && anyoFund == yearFund) {

                conjuntoauxiliar.push(base[j]);
            */
        }
        return conjuntoauxiliar;

    };



    /*************/ //////////////////////////////////////////////////////////////////////////////////////////////////**********************/


    ///////////*********************************************************************************************////////////////


    //ACCIONES REST

    //RECURSOS SIMPLES//////////////////////////////////////////////////////////////


    app.post(BASE_API_PATH + "/spanish-universities", (req, res) => {
        console.log(Date() + " - POST /spanish-universities");
        var univ = req.body;

        univs.find({ "autCommunity": univ.autCommunity, "yearFund": univ.yearFund }).toArray((err, universities) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (Object.keys(univ).length !== 5) {

                console.warn("Stat does not have the expected fields");
                res.sendStatus(400);

            }
            else if (universities.length !== 0) {

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

            if (universities.length == 0) {

                res.sendStatus(404);

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

            if (universities.length == 0) {

                res.sendStatus(404);

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

            if (universities.length == 0) {

                res.sendStatus(404);

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


    /////******************************************************GET PARA PAGINACION SIN BUSQUEDA**************************************////////////////////

    app.get(BASE_API_PATH + "/spanish-universities/:dato", (req, res) => {
        //if (!checkApiKey(req, res)) return;

        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var from = req.query.yearFund;
        var to = req.query.yearFund;
        var autCommunity = req.query.autCommunity;
        var yearFund = req.query.yearFund;
        // var hit = req.query.hit;
        // var run = req.query.run;
        // var error = req.query.error;

        var aux = [];
        var aux2 = [];
        var dato = req.params.dato;

        if (limit || offset >= 0) {
            univs.find({ $or: [{ "autCommunity": dato }, { "yearFund": dato }] }).skip(offset).limit(limit).toArray(function(err, universities) {

                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500);
                }
                else {
                    if (universities.length === 0) {
                        res.sendStatus(404);
                    }

                    if (from || to || yearFund || autCommunity) {

                        aux = buscador(universities, aux, from, to, autCommunity, yearFund);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);

                        }
                        else {
                            res.sendStatus(404); // No content 
                        }
                    }
                    else {
                        res.send(universities);
                    }
                }
            });

        }
        else {
            //SEGUDA PARTE QUE ES CON OPERADOR OR DE LA BUSQUEDA
            univs.find({ $or: [{ "autCommunity": dato }, { "yearFund": dato }] }).toArray((err, universities) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);

                }
                else {
                    if (universities.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    if (from || to || autCommunity || yearFund) {
                        aux = buscador(universities, aux, from, to, autCommunity, yearFund);
                        if (aux.length > 0) {
                            res.send(aux);
                        }
                        else {
                            res.sendStatus(404); //No content
                        }
                    }
                    else {
                        console.log(Date() + " - GET /baseball-stats/" + dato);
                        res.send(universities);
                    }
                }
            });

        }
    });





    ////*******************************************************************************************************************************////////////////////
    //BUSQUEDA****************************************************************************************
    // GET Collection (WITH SEARCH)
    app.get(BASE_API_PATH + "/spanish-universities", function(request, response) {
        //if (!checkApiKey(request, response)) return;
        console.log("INFO: New GET request to /spanish-universities ");

        /*PRUEBA DE BUSQUEDA */
        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var from = request.query.from;
        var to = request.query.to;
        var autCommunity = request.query.autCommunity;
        var yearFund = request.query.yearFund;

        var aux = [];
        var aux2 = [];
        var aux3 = [];


        if (limit || offset >= 0) {
            univs.find({}).skip(offset).limit(limit).toArray(function(err, universities) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                    return;
                }
                else {
                    if (universities.length === 0) {
                        response.sendStatus(404); //No content
                        return;
                    }
                    console.log("INFO: Sending autCommunities:: " + JSON.stringify(universities, 2, null));
                    if (from || to || autCommunity || yearFund) {

                        aux = buscador(universities, aux, from, to, autCommunity, yearFund);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux, 2, null));
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(universities, 2, null));
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux2, 2, null));
                            response.send(aux2);
                        }
                        else {

                            response.send(aux3); // No content 
                            return;
                        }
                    }
                    else {
                        response.send(universities);
                    }
                }
            });

        }
        else {

            univs.find({}).toArray(function(err, universities) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (universities.length === 0) {

                        response.send(universities);
                        return;
                    }
                    //console.log("INFO: Sending baseball-stats: " + JSON.stringify(universities, 2, null));
                    if (from || to || autCommunity || yearFund) {
                        aux = buscador(universities, aux, from, to, autCommunity, yearFund);
                        if (aux.length > 0) {
                            response.send(aux);
                        }
                        else {
                            response.sendStatus(404); //No content
                            return;
                        }
                    }
                    else {
                        response.send(universities);
                    }
                }
            });
        }

    });










};
