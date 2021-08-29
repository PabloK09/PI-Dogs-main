const server = require("./src/app.js");
const { conn } = require("./src/db.js"); //me traigo mi conexion con mi db
const axios = require('axios');
const {Temperament } = require("./src/db.js")
const { PORT } = process.env;
const {BASE_URL} = require('./src/utils/constants')

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {
  //con me devuelve una promesa
  let temp = new Set(); //me paso un set para luego usarlo y evitar repetidos
  const apiBreedTemperamentRes = await axios.get(BASE_URL)
  //agarro el .data de mi api y le hago un forEach a cada raza
  apiBreedTemperamentRes.data?.forEach(breed => {
    //me guardo en una varaiblle los temperamentos de cada raza
    let temperaments = breed.temperament?.split(', '); //compruebo si existe y los separo por ,
    //a lo que me guarde en la variable le hago un forEach y a cada temp le aplico el .add (de sequelize)
    temperaments?.forEach(t => temp.add(t))//temp es el new Set() que me evita guardar repetidos
  }) //ya teniendo mi variable temp con todos los tipos de temperamentos sin repetirse
  //uso el bulkCreate en mi modelo Temperament donde le paso paso el array temp, lo mapeo y le guardo en la columna name, el nombre del temperamento
  Temperament.bulkCreate([...temp].map(t => ({name: t})))
  console.log("Base de datos de temperamentos creada")

  server.listen(PORT, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
