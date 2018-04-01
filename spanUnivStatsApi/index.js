var spanUnivStatsApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = spanUnivStatsApi;


spanUnivStatsApi.register = function(app, SpanUNivStatsdb, initialStats) {

    console.log("Registering routes for span-univ-stats API...");


    ///////////// SEARCHING FUNCTION

    var find = function(stats, res_stats, _from, _to, _autCommunity, _year, _enrolledNumber, _degree, _master, _firstSecondCycle) {


        var f = _from;
        var t = _to;

        if (_from != undefined || _to != undefined || _autCommunity != undefined || _year != undefined || _enrolledNumber != undefined || _degree != undefined || _master != undefined || _firstSecondCycle != undefined) {

            for (var j = 0; j < stats.length; j++) {

                var year = stats[j].year;
                var autCommunity = stats[j].autCommunity;
                var enrolledNumber = stats[j].enrolledNumber;
                var degree = stats[j].degree;
                var master = stats[j].master;
                var firstSecondCycle = stats[j].firstSecondCycle;

                if (_from != undefined && _to != undefined && _autCommunity == undefined && _year == undefined && _enrolledNumber == undefined && _degree == undefined && _master == undefined && _firstSecondCycle == undefined) {

                    if (f <= year && t >= year) {
                        res_stats.push(stats[j]);
                    }

                    // FROM
                }
                else if (_from != undefined && _to == undefined && _autCommunity == undefined && _year == undefined && _enrolledNumber == undefined && _degree == undefined && _master == undefined && _firstSecondCycle == undefined) {

                    if (f <= year) {
                        res_stats.push(stats[j]);
                    }

                    // TO
                }
                else if (_from == undefined && _to != undefined && _autCommunity == undefined && _year == undefined && _enrolledNumber == undefined && _degree == undefined && _master == undefined && _firstSecondCycle == undefined) {

                    if (year <= f) {
                        res_stats.push(stats[j]);
                    }

                    // autCom  
                }
                else if (_from == undefined && _to == undefined && _autCommunity != undefined && _year == undefined && _enrolledNumber == undefined && _degree == undefined && _master == undefined && _firstSecondCycle == undefined) {

                    if (autCommunity == _autCommunity) {
                        res_stats.push(stats[j]);
                    }

                    // year    
                }
                else if (_from == undefined && _to == undefined && _autCommunity == undefined && _year != undefined && _enrolledNumber == undefined && _degree == undefined && _master == undefined && _firstSecondCycle == undefined) {

                    if (year == _year) {
                        res_stats.push(stats[j]);
                    }

                    // enrolledNumber
                }

                else if (_from == undefined && _to == undefined && _autCommunity == undefined && _year == undefined && _enrolledNumber != undefined && _degree == undefined && _master == undefined && _firstSecondCycle == undefined) {

                    if (enrolledNumber == _enrolledNumber) {
                        res_stats.push(stats[j]);
                    }

                    //degree    
                }
                else if (_from == undefined && _to == undefined && _autCommunity == undefined && _year == undefined && _enrolledNumber == undefined && _degree != undefined && _master == undefined && _firstSecondCycle == undefined) {

                    if (degree == _degree) {
                        res_stats.push(stats[j]);
                    }

                    //master    
                }
                else if (_from == undefined && _to == undefined && _autCommunity == undefined && _year == undefined && _enrolledNumber == undefined && _degree == undefined && _master != undefined && _firstSecondCycle == undefined) {

                    if (master == _master) {
                        res_stats.push(stats[j]);
                    }

                    //firstSecondCycle
                }
                else if (_from == undefined && _to == undefined && _autCommunity == undefined && _year == undefined && _enrolledNumber == undefined && _degree == undefined && _master == undefined && _firstSecondCycle != undefined) {

                    if (firstSecondCycle == _firstSecondCycle) {
                        res_stats.push(stats[j]);
                    }
                }

            }

        }


        return res_stats;

    };



    ///////////// REDIRECT

    app.get(BASE_API_PATH + "/span-univ-stats/docs", (req, res) => {

        res.redirect("https://documenter.getpostman.com/view/3889824/collection/RVtxKY8Y");

    });

    /////////////   LOADINITIALDATA 

    app.get(BASE_API_PATH + "/span-univ-stats/loadInitialData", (req, res) => {

        console.log(Date() + " - GET /span-univ-stats/loadInitialData")

        SpanUNivStatsdb.find({}).toArray((err, stats) => {

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
        SpanUNivStatsdb.find({}).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(stats.map((s) => {
                delete s._id;
                return s;
            }));

        });

    });

    app.post(BASE_API_PATH + "/span-univ-stats", (req, res) => {

        console.log(Date() + " - POST /span-univ-stats");
        var stat = req.body;

        SpanUNivStatsdb.find({ "autCommunity": stat.autCommunity, "year": stat.year }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (Object.keys(stat).length !== 6) {

                console.warn("Stat does not have the expected fields");
                res.sendStatus(400);

            }
            else if (stats.length !== 0) {

                res.sendStatus(409);

            }
            else {

                SpanUNivStatsdb.insert(stat);
                res.sendStatus(201);
            }

        });

    });





    app.put(BASE_API_PATH + "/span-univ-stats", (req, res) => {

        console.log(Date() + " - PUT /span-univ-stats");
        res.sendStatus(405);
    });





    app.delete(BASE_API_PATH + "/span-univ-stats", (req, res) => {


        console.log(Date() + " - DELETE /span-univ-stats");

        SpanUNivStatsdb.find({}).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {

                res.sendStatus(404);

            }
            else {

                SpanUNivStatsdb.remove({});
                res.sendStatus(200);
            }

        });

    });






    ////// ACCIONES PARA RECURSO CON UNA INSTANCIA (COMUNIDAD AUTONOMA)

    app.get(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {

        var autComm = req.params.autCommunity;
        console.log(Date() + " - GET /span-univ-stats/" + autComm);

        SpanUNivStatsdb.find({ "autCommunity": autComm }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {

                res.sendStatus(404);

            }
            else {

                res.send(stats.map((s) => {
                    delete s._id;
                    return s;
                }));

            }

        });
    });




    app.delete(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {

        var autComm = req.params.autCommunity;

        console.log(Date() + " - DELETE /span-univ-stats/" + autComm);

        SpanUNivStatsdb.find({ "autCommunity": autComm }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {

                res.sendStatus(404);

            }
            else {

                SpanUNivStatsdb.remove({ "autCommunity": autComm });
                res.sendStatus(200);

            }

        });


    });



    app.post(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {


        var autComm = req.params.autCommunity;
        console.log(Date() + " - POST /span-univ-stats/" + autComm);
        res.sendStatus(405);
    });




    app.put(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {


        var autComm = req.params.autCommunity;
        console.log(Date() + " - PUT /span-univ-stats/" + autComm);
        res.sendStatus(405);
    });


    ////// ACCIONES PARA UN RECURSO CONCRETO CON DOS INSTANCIAS


    app.get(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {


        var ac = req.params.autCommunity;
        var y = req.params.year;
        console.log(Date() + " - GET /span-univ-stats/" + ac + "/" + y);

        SpanUNivStatsdb.find({ "autCommunity": ac, "year": parseInt(y) }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {

                res.sendStatus(404);

            }
            else {

                res.send(stats.map((s) => {
                    delete s._id;
                    return s;
                })[0]);

            }

        });
    });


    app.delete(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {



        var autComm = req.params.autCommunity;
        var year1 = req.params.year;
        console.log(Date() + " - DELETE /span-univ-stats/" + autComm + "/" + year1);

        SpanUNivStatsdb.find({ "autCommunity": autComm, "year": parseInt(year1) }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {

                res.sendStatus(404);

            }
            else {

                SpanUNivStatsdb.remove({ "autCommunity": autComm, "year": parseInt(year1) });
                res.sendStatus(200);

            }

        });

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

        if (autComm != stat.autCommunity || year != stat.year || Object.keys(stat).length !== 6) {
            res.sendStatus(400);
            console.warn(Date() + "  - Hacking attemp!");
            return;
        }

        SpanUNivStatsdb.update({ "autCommunity": autComm, "year": parseInt(year) }, stat, (err, numUpdated) => {
            console.log(" - Updated" + numUpdated);
        });

        res.sendStatus(200);


    });




    ////*******************************************************************************************************************************////////////////////
    //BUSQUEDA****************************************************************************************
    // GET (WITH SEARCH)
    app.get(BASE_API_PATH + "/span-univ-stats", function(request, response) {

        console.log("INFO: New GET request to /span-univ-stats");

        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var from = request.query.from;
        var to = request.query.to;
        var autCommunity = request.query.autCommunity;
        var year = request.query.year;
        var enrolledNumber = request.query.enrolledNumber;
        var degree = request.query.degree;
        var master = request.query.master;
        var firstSecondCycle = request.query.firstSecondCycle;

        var aux = [];
        var aux2 = [];
        var aux_empty = [];


        if (limit || offset >= 0) {
            SpanUNivStatsdb.find({}).skip(offset).limit(limit).toArray(function(err, stats) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500);
                    return;
                }
                else {
                    if (stats.length === 0) {
                        response.sendStatus(404);
                        return;
                    }

                    if (from || to || autCommunity || year || enrolledNumber || degree || master || firstSecondCycle) {

                        aux = find(stats, aux, from, to, autCommunity, year, enrolledNumber, degree, master, firstSecondCycle);
                        
                        if (aux.length > 0) {
                            
                            aux2 = aux.slice(offset, offset + limit);
                            response.send(aux2);
                        }
                        else {

                            response.send(aux_empty); 
                            return;
                        }
                    }
                    else {
                        response.send(stats);
                    }
                }
            });

        }
        else {

            SpanUNivStatsdb.find({}).toArray(function(err, stats) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500); 
                }
                else {
                    if (stats.length === 0) {

                        response.send(stats);
                        return;
                    }

                    if (from || to || autCommunity || year || enrolledNumber || degree || master || firstSecondCycle) {
                        aux = find(stats, aux, from, to, autCommunity, year, enrolledNumber, degree, master, firstSecondCycle);
                        if (aux.length > 0) {
                            response.send(aux);
                        }
                        else {
                            response.sendStatus(404); 
                            return;
                        }
                    }
                    else {
                        response.send(stats);
                    }
                }
            });
        }

    });



};
