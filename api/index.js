const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
const { Temperament, Breed } = require("./src/db.js");
const { PORT } = process.env;
const { BASE_URL } = require("./src/utils/constants");

conn.sync().then(async () => {
  const temperDB = await Temperament.findAll();
  if (temperDB.length === 0) {
    let temps = new Set();
    const apiBreedTemperamentRes = await axios.get(BASE_URL);

    apiBreedTemperamentRes.data?.forEach((breed) => {
      let temperaments = breed.temperament?.split(", ");
      temperaments?.forEach((temperament) => temps.add(temperament));
    });

    Temperament.bulkCreate(
      [...temps].map((temperament) => ({ name: temperament }))
    );
    console.log("Base de datos de temperamentos creada");
  }
  const breedDB = await Breed.findAll();
  if (breedDB.length === 0) {
    let breeds = new Set();
    const apiBreeds = await axios.get(BASE_URL);
    apiBreeds.data.forEach((breed) => {
      breeds.add(breed);
    });
    Breed.bulkCreate(
      [...breeds].map((b) => 
      { 
        let weightB = b.weight.metric.split(" - ").map(Number)
        weightB = [weightB].filter((w) => w[0] !== w[1] && !w.includes(false) && w.length > 1 && !w.includes(NaN))
        let heightB =b.height.metric.split(" - ").map(Number)
        heightB = [heightB].filter((w) => w[0] !== w[1] && !w.includes(false) && w.length > 1 && !w.includes(NaN))
        let lifeSpanB = b.life_span.replace(" years", "").split(" - ").map(Number)
        lifeSpanB = [lifeSpanB].filter((w) => w[0] !== w[1] && !w.includes(false) && w.length > 1 && !w.includes(NaN))
        return {
        name: b.name,
        weight: weightB.flat(),
        height: heightB.flat(),
        life_span: lifeSpanB.flat(),
        image: b.image.url,
        temperaments: b.temperament,
        favourite: b.favourite = false,
        created: b.created = false,
        bred_for: b.bred_for,
        breed_group: b.breed_group,
        origin: b.origin,
      }
      })
    );
    console.log("Base de datos de breeds creada");
  }

  server.listen(PORT, () => {
    console.log("%s listening at 3001");
  });
});
