const express = require("express");
const ejs = require ('ejs');
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
app.post("/", async (req, res) => {
  const newMascota = new Mascota({
    nombre: req.body.nombre,
    nacimiento: req.body.nacimiento,
    visitaTipo: req.body.visitaTipo,
    proximaVisita: req.body.proximaVisita,
    controlPienso: req.body.controlPienso
  })
  const savedMascota = await newMascota.save()
  res.status(201).json(savedMascota)
    .catch(error => error.message)
})

/**app.post('/', (req, res)=>{
  //res.send("create user");
  const mascota = mascotaSchema(req.body);
  mascota.save()
  .then((data)=> res.json(data))
  .catch((error)=> res.json({message: error}))
});**/

//get all Mascotas o una mascota con ejs
//set vie engine to ejs
app.set('view engine', 'ejs');
//si no estuviera en la raiz el ejs
//app.set('views', path.join(__dirname, '../mascotas/vews/index.ejs'));
app.set("views", __dirname + "/views");

app.get("/mascotas", (req, res) => {
  //Con el boton lista debe ir a esta ruta
  //console.log(req.params)
  Mascota.find({}, function(err, mascotas) {
    res.render('index.ejs', {
      mascotasList: mascotas
    })
  })
}); 

/**app.get("/mascotas", (req, res) =>  {
  const { id } = req.params;
  mascotaSchema
    .findById(id)
    .res.status(200).sendFile(__dirname,'/mascotas.html')
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
});*/

//update a mascota dentro de la lista
app.put("/mascota", (req, res) => {
  const { id } = req.params;
  const { nombre, nacimiento, visitaTipo, proximaVisita, controlPienso} = req.body;
  mascotaSchema
  .updateOne({_id: id}, {$set:{nombre, nacimiento, visitaTipo, proximaVisita, controlPienso}})
  .then((data) => res.json(data))
  .catch((error) => res.json({message:error}));
});

//module.exports= mongoose.model("Mascota", mascotaSchema);

app.delete("/:id", async (req, res) => {
  const mascota = Mascota.findById(req.params.id)
  await mascota.remove()
  res.status(204).json(mascota)
})

app.put("/:id", async (req, res) => {
  const mascota = Mascota.findById(req.params.id)
  const newMascota = req.body
  const updatedMascota = await mascota.updateOne({
    nombre: newMascota?.nombre,
    nacimiento: newMascota?.nacimiento,
    visitaTipo: newMascota?.visitaTipo,
    proximaVisita: newMascota?.proximaVisita,
    controlPienso: newMascota?.controlPienso
  }, Mascota, { new: true })
  res.status(201).json(updatedMascota.toJSON())
})

app.listen(3000, function(){
  console.log("server is running on 3000");
})
