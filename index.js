const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.get("/", function (req, res) {
res.send("ok");
});
app.get("/test",(req, res)=>{
    res.send({status:200, message:"ok"})
    });
    app.get("/:time",(req, res) => {
    res.send({status:200,message:req.params.time})
    });

    app.get("/hello/:id",(req,res) => {
        res.send({status:200,message:req.params.id})
        });
        app.get("/search",(req,res) => {
            const search = req.query.s;
            
            if (typeof search != 'undefined') {
            const response = {
            status:200, message:"ok", data: search
            };
            
            res.send(response);
            }
            else {
            const response = {
            status:500, error:true, message: "you have to provide a search"
            };
            res.status(500);
            res.send(response);
            }
            });
            const movies = [
                { title: 'Jaws', year: 1975, rating: 8 },
                { title: 'Avatar', year: 2009, rating: 7.8 },
                { title: 'Brazil', year: 1985, rating: 8 },
                { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
                ]
                app.get("/movies/read",(req, res) => {
                res.send({status:200,data:movies,})
                });
                app.get('/movies/read/by-date', (req,res)=>{
                  res.send( {status:200, data:movies.sort((a,b)=> a.year-b.year)});
              });
              app.get("/movies/read/by-rating",(req,res)=>{
                res.send({status:200, data:movies.sort((a,b)=>b.rating-a.rating)})
            })
          
            app.get("/movies/read/by-title", (req, res) => {
                res.send(
                    {status:200,data:movies.sort((a,b)=>(a.title).localeCompare(b.title))})
               
            });
            app.get('/movies/read/id/:id',(req,res) => {
              const id = parseInt(req.params.id);
              const movie = movies[id-1];
              if (movie){
                res.status(200).send({ status: 200, data: movie });
              } else {
                res.status(404).send({ status: 404, error: true, message: `the movie ${id} does not exist` });
              }
            });

            app.get("/movies/create",(req, res) => {
              res.send(hi);
              });
              app.get("/movies/update",(req, res) => {
                res.send(hi); });
                app.get("/movies/delete",(req, res) => {
                res.send(hi);
                });
              //step8
              app.post("/movies/add",(req, res) => {
               if(!req.body.title || !req.body.year || req.body.year.length<4 || isNaN(req.body.year)){
                res.send({status:403,error:true , message:'you cannot create a movie without providing a title and a year'})
               }
               else if(!req.body.rating){
                req.body.rating = "4";
               }
                 
                const movie1 = { title: req.body.title , year:parseInt(req.body.year),rating: parseInt(req.body.rating)};
                movies.push(movie1);
                res.send(movie1);
                 });
                //  step9
                app.delete('/movies/delete/:id',(req,res) => {
                let ID = req.params.id
                if (ID >=0 && ID < movies.length){
                  movies.splice(ID,1);
                  res.send({status:200,data:movies})
                }
              else {
                res.send({status:404, error:true, message:"the movie ${ID} does not exist" })
              }
                })
                // step10
                app.put('/movies/update/:id',(req,res) => {
                  let ID = req.params.id
                  let title = req.query.title
                  let year = req.query.year
                  let rating = req.query.rating
                if(ID >=0 && ID < movies.length){
                  if(title && title !== undefined){
                      movies[ID].title = title;
                  }
                  if(rating && !isNaN(rating)){
                    movies[ID].rating = rating;
                }
                if(year && !isNaN(year) && year.length === 4){
                    movies[ID].year = year;
                }
                  res.send({status:200, data:movies})
                 
                }
                else{
                  res.send({status:404, error:true, message:`The movie ${ID} does not exist`})
              }
          })
               
                
               app.listen(port, function () {
            console.log(`Example app listening on port ${port}!`);
           });
    