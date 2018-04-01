var openSourceContestsApi = {};

var BASE_API_PATH = "/api/v2";

module.exports = openSourceContestsApi;

openSourceContestsApi.register = function(app, collection, initialProjects){

    app.get(BASE_API_PATH + "/open-source-contests/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3898307/collection/RVu1HAgU");
    });

    app.get(BASE_API_PATH + "/open-source-contests/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /open-source-contests/loadInitialData")
        
        collection.find({}).toArray((err, projects) => {
            if(err){
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }

            if(projects.length == 0){
                console.log("Empty DB");
                collection.insert(initialProjects);
                res.sendStatus(200);
            }else{
                console.log("Number of projects: " + projects.length);
                res.sendStatus(200);
            }
        });
    
    });

    app.get(BASE_API_PATH + "/open-source-contests", (req,res) =>{
        console.log(Date() + " - GET /open-source-contests/");
        collection.find({}).toArray((err, projects) => {
            if(err){
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            
            res.send(projects);

        });
    });

    app.get(BASE_API_PATH + "/open-source-contests/:year/:university/:project", (req, res) => {
        console.log(Date() + " - GET /open-source-contests/:year/:university/:project");
        let {year, university, project} = req.params;
        collection.find({ "year": parseInt(year), "university": university, "project": project }).toArray((err, projects) => {
            if(err){
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
           
            if (projects.length !== 0){
                res.send(projects[0]);
            }else{
                res.sendStatus(404);
            }
        });

  
    });

    app.get(BASE_API_PATH + "/open-source-contests/:year/:university", (req, res) => {
        console.log(Date() + " - GET /open-source-contests/:year/:university");
        let {year, university} = req.params;
        collection.find({ "year": parseInt(year), "university": university }).toArray((err, projects) => {
            if(err){
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            
            res.send(projects);
        });

    });

    app.get(BASE_API_PATH + "/open-source-contests/:year", (req, res) => {
        console.log(Date() + " - GET /open-source-contests/:year");
        let {year} = req.params;
        collection.find({ "year": parseInt(year) }).toArray((err, projects) => {
            if(err){
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            
            res.send(projects);
        });
    });

    app.post(BASE_API_PATH + "/open-source-contests", (req, res) => {
        console.log(Date() + " - POST /open-source-contests");
        let project = req.body;
        collection.find({ "year": parseInt(project.year), "university": project.university, "project": project.project }).toArray((err, projects) => {
            if(err){
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
           
            if(Object.keys(project).length !== 7){
                console.error("Project need 7 fields");
                res.sendStatus(400);
            }else if(projects.length !== 0){
                res.sendStatus(409);
            }else{
                collection.insert(project);
                res.sendStatus(201);
            }
        });
    });

    app.post(BASE_API_PATH + "/open-source-contests/:year/:university/:project",(req,res)=>{
        console.log(Date() + "POST - /open-source-contests/:year/:university/:project");
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/open-source-contests/:year/:university/:project", (req, res) => {
        console.log(Date() + " - PUT /open-source-contests/:year/:university/:project");
        let {year, university, project} = req.params;
        let obj = req.body;
        if (project != obj.project){
            send.status(400)
            console.warn("url name project != (modify) project");
            return;
        };
        
        collection.update({ "year": parseInt(year), "university": university, "project": project }, obj, (err, n) => console.log("PUT - Update " + err));

        res.sendStatus(200);
    });

    app.put(BASE_API_PATH + "/open-source-contests",(req,res)=>{
        console.log(Date() + "PUT - /open-source-contests");
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/open-source-contests",(req,res)=>{
        console.log(Date() + " - DELETE /open-source-contests");
        collection.find({}).toArray((err, projects) => {
            if(err){
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }

            if(projects.length == 0){
                res.sendStatus(404); 
            }else{
                collection.remove({});
                res.sendStatus(200);
            }
        });
    });

    app.delete(BASE_API_PATH + "/open-source-contests/:year/:university/:project",(req,res)=>{
        let {year, university, project} = req.params;
        console.log(Date() + " - DELETE /open-source-contests/:year/:university/:project");
        collection.find({ "year": parseInt(year), "university": university, "project": project }).toArray((err, projects) => {
            if(err){
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            
            if(projects.length == 0){
                res.sendStatus(404); 
            }else{
                
                collection.remove({ "year": parseInt(year), "university": university, "project": project });
                res.sendStatus(200);
            }

        });
    });

};
