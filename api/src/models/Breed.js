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
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          max: 160,
          min: 1,
        }
        
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          max: 230,
          min: 1,
        }
      },  
      life_span: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          max: 25
        }
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        }
      },
    },
  );
};
