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
        
      },
      height: {
        type: DataTypes.RANGE(DataTypes.DECIMAL),
        allowNull: false,
        
      },  
      life_span: {
        type: DataTypes.RANGE(DataTypes.DECIMAL),
        
      },
      //DataTypes.ARRAY(TEXT) ["ps2","ps3"]

      image: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        }
      },
    },
  );
};
