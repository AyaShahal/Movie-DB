const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
  const uri= "mongodb+srv://movies:poh1RCroZiCeGhx4@cluster0.evj1aop.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(uri, {useNewUrlParser:true})
  const db = mongoose.connection
  // if error
  db.on("error", (err) => {
    console.error(`err: ${err}`)
  })// if connected
  db.on('connected', (err, res) => {
    console.log('Connected to database')
  })
  const UserSchema = new mongoose.Schema({
    title: {
      type:String,
    },
    year: {
      type:Number,
    },
    rating:{
     type:Number,
     default:4,
    }

})
const movies = mongoose.model("User", UserSchema);


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
            // const movies = [
            //     { title: 'Jaws', year: 1975, rating: 8 },
            //     { title: 'Avatar', year: 2009, rating: 7.8 },
            //     { title: 'Brazil', year: 1985, rating: 8 },
            //     { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
            //     ]
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
              //step8
              app.post("/movies/add",(req, res) => {
               if(!req.query.title || !req.query.year || req.query.year.length<4 || isNaN(req.query.year)){
                res.send({status:403,error:true , message:'you cannot create a movie without providing a title and a year'})
               }
               else if(!req.query.rating){
                req.query.rating = "4";
               }
               else{
               movies.create({ title: req.query.title , year:parseInt(req.query.year),rating: parseInt(req.query.rating)})
               .then((newMovie) => {
                 movies
                   .find()
                   .then((moviesData) => {
                     res.send({ status: 200, data: moviesData });
                   })
                   .catch((err) => {
                     console.log("error, no entry found");
                   });
               })
               .catch((err) => {
                 "error, connot create element";
               });
               }
           })
         
               
                //  step9
                app.delete('/movies/delete/:id',(req,res) => {
                movies.findByIdAndDelete(req.params.id).then(deletedMovie => {
                  movies.find().then(moviesData => {
                      res.send({ status: 200, data: moviesData });
                  }).catch(err => {
                      console.log("error, no entry find")
                  })
              }).catch(err => {
                  res.status(404).send({ status: 404, error: true, message: `the movie '${req.params.id}' does not exist` });
              })
            })
             
                // step10
                app.put('/movies/update/:id',(req,res) => {
                  let ID = req.params.id
                  let title = req.query.title
                  let year = req.query.year
                  let rating = req.query.rating
                  movies.findById(ID).then((updatedMovie) => {
                    const update = () =>{
                      updatedMovie.save()
                      movies.find().then(moviesData => {
                          res.send({ status: 200, data: moviesData });
                      }).catch(err => {
                          console.log("error, no entry find")
                      })
                  }
              
                  if(title && title !== undefined){
                    updatedMovie.title = title
                      update() 
                  }
                  else{
                    updatedMovie.title = updatedMovie.title
                  }
                 if(year && !isNaN(year) && year.length === 4){
                  updatedMovie.year = year
                    update()
                }
                else{
                  updatedMovie.year = updatedMovie.year
                
                }
                if(rating && !isNaN(rating)){
                  updatedMovie.rating = rating
                  update()
              }
                else{
                  updatedMovie.rating = updatedMovie.rating
                }
                })
              })
            
                
               app.listen(port, function () {
            console.log(`Example app listening on port ${port}!`);
           });
    