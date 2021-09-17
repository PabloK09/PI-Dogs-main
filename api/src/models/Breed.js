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
        type: DataTypes.RANGE(DataTypes.DECIMAL),
        allowNull: false,
        validate: {
          min: 1,
          max: 110,
        }
      },
      height: {
        type: DataTypes.RANGE(DataTypes.DECIMAL),
        allowNull: false,
        validate: {
          min: 9,
          max: 130,
        }
        
      },  
      life_span: {
        type: DataTypes.RANGE(DataTypes.DECIMAL),
        allowNull: true,
        validate: {
          min: 1,
          max: 30,
        }
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        }
      },
      created: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    },
  );
};
