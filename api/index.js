const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;
const axios = require('axios');
const { Breed, Temperament} = require("./src/db.js")



// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  //con me devuelve una promesa
















  server.listen(PORT, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
