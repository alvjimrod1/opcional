var openSourceContestsApi = {};

var BASE_API_PATH = "/api/v1";

module.exports = openSourceContestsApi;

openSourceContestsApi.register = function(app, collection, initialProjects){

    var projects = initialProjects.slice();

    app.get(BASE_API_PATH + "/open-source-contests", (req,res) =>{
        console.log(Date() + " - GET /open-source-contests/");
        res.send(initialProjects);
    });

    app.get(BASE_API_PATH + "/contests/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /contests/loadInitialData")
        projects = initialProjects.slice();
        res.send(projects);
    });

    app.get(BASE_API_PATH + "/open-source-contests/:year/:university/:project", (req, res) => {
        console.log(Date() + " - GET /open-source-contests/:year/:university/:project");
        let {year, university, project} = req.params;
        res.send(initialProjects.filter((o) => (o.year == year))
                            .filter((o) => (o.university == university))
                            .filter((o) => (o.project == project))[0]);
    });

    app.get(BASE_API_PATH + "/open-source-contests/:year/:university", (req, res) => {
        console.log(Date() + " - GET /open-source-contests/:year/:university");
        let {year, university} = req.params;
        res.send(initialProjects.filter((o) => (o.year == year))
                     .filter((o) => (o.university == university)));
    });

    app.get(BASE_API_PATH + "/open-source-contests/:year", (req, res) => {
        console.log(Date() + " - GET /open-source-contests/:year");
        let {year} = req.params;
        res.send(initialProjects.filter((o) => (o.year == year)));
    });

    app.post(BASE_API_PATH + "/open-source-contests", (req, res) => {
        console.log(Date() + " - POST /open-source-contests");
        let project = req.body;
        initialProjects.push(project);
        res.sendStatus(201);
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

    app.put(BASE_API_PATH + "/open-source-contests",(req,res)=>{
        console.log(Date() + "PUT - /open-source-contests");
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/open-source-contests",(req,res)=>{
        console.log(Date() + " - DELETE /open-source-contests");
        initialProjects = [];
        res.sendStatus(200);
    });

    app.delete(BASE_API_PATH + "/open-source-contests/:year/:university/:project",(req,res)=>{
        let {year, university, project} = req.params;
        console.log(Date() + " - DELETE /open-source-contests/:year/:university/:project");

        initialProjects = initialProjects.filter((o)=>{
            return (o.year != year || o.university != university || o.project != project);
        });
        
        res.sendStatus(200);
    });

};
