const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //sino funca tirar un return adelante del sequelize.define
  sequelize.define(
    "breed",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.FLOAT, //VER BIEN SI HAY ALGUNO QUE SEA DECIMAL O SON TODOS ENTEROS
        allowNull: false,
        get() {
          return this.getDataValue("height") + " cm";
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
          return this.getDataValue("weight") + " kg";
        },
      },
      lifeSpan: {
        type: DataTypes.INTEGER,
        get() {
          return this.getDataValue("lifeSpan") + " years";
        },
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
