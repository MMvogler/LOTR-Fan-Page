module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.STRING,
      message: DataTypes.STRING,
      name: DataTypes.STRING
    },
    { timestamps: false }
  );
  return Message;
};
