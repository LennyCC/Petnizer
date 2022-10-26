const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const cors = require('cors');
const path = require ("path")

//const mascotaRouters= require('./app/routes/mascota')
//app.use(cors);

//const mascota = require("./app/models/mascota");

const Schema = mongoose.Schema;

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended: true, limit: '20mb'}));
//app.use(mascotaRouters)  

app.get("/", function (req, res){
  res.sendFile(__dirname + "/index.html")
}); 

//middleware
//app.use('/api', userRouters )
app.use(express.json())

mongoose.connect("mongodb+srv://lenny-admin:Yoko112233@cluster0.kgimz4n.mongodb.net/Mascotas", {useNewUrlParser: true},{useUnifiedTipology: true})
.then(()=> console.log("Connected to MongoDB Atlas"))
.catch((error)=> console.log("error"))



// create a data schema
const mascotaSchema = {
  nombre: String,
  nacimiento: Date,
  visitaTipo: String,
  proximaVisita: Date,
  controlPienso: String,
 

}; 

const Mascota = mongoose.model("Mascota", mascotaSchema);

//module.exports = mongoose.model('Mascota', mascotaSchema)

//Guardo Mascota
app.post("/", function (req, res){
  let newMascota = new Mascota({
    nombre: req.body.nombre,
    nacimiento: req.body.nacimiento,
    visitaTipo: req.body.visitaTipo,
    proximaVisita: req.body.proximaVisita,
    controlPienso: req.body.controlPienso
  })
  console.log({body: req.body})
  newMascota.save()
  .then(()=> res.json())
  .catch((error)=> res.status(201).json({message: error}));
  res.redirect("/");
}); 

/**app.post('/', (req, res)=>{
  //res.send("create user");
  const mascota = mascotaSchema(req.body);
  mascota.save()
  .then((data)=> res.json(data))
  .catch((error)=> res.json({message: error}))
});**/

//get all Mascotas o una mascota

app.get("/mascota/:id", function (req, res){
  console.log(req.params)
  mascotaSchema
  .drop()

  res.send(__dirname + "/mascotas.html")
}); 

app.get("", (req, res) =>  {
  const { id } = req.params;
  mascotaSchema
    .findById(id)
    .res.status(200).sendFile(__dirname,'/mascotas.html')
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
});

//update a mascota
app.put("/mascota/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, nacimiento, visitaTipo, proximaVisita, controlPienso} = req.body;
  mascotaSchema
  .updateOne({_id: id}, {$set:{nombre, nacimiento, visitaTipo, proximaVisita, controlPienso}})
  .then((data) => res.json(data))
  .catch((error) => res.json({message:error}));
});


//module.exports= mongoose.model("Mascota", mascotaSchema);


app.listen(3000, function(){
  console.log("server is running on 3000");
})