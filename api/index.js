const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require('axios');
const {Temperament } = require("./src/db.js")
const { PORT } = process.env;
const {BASE_URL} = require('./src/utils/constants')

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {
  if(!Temperament.length) {

    let temp = new Set(); 
    const apiBreedTemperamentRes = await axios.get(BASE_URL)
    
    apiBreedTemperamentRes.data?.forEach(breed => {
      let temperaments = breed.temperament?.split(', '); 
      temperaments?.forEach(t => temp.add(t))
    }) 
    
    Temperament.bulkCreate([...temp].map(t => ({name: t})))
  }
  
  console.log("Base de datos de temperamentos creada")
  server.listen(PORT, () => {
    console.log("%s listening at 3001"); 
  });
});
