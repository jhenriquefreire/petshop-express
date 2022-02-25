module.exports = (connection, DataTypes) => {
    const model = connection.define('Servico',{
      id: {type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},  
      nome: {type: DataTypes.STRING(50)},
      email: {type: DataTypes.STRING(30)},
      Senha: {type: DataTypes.STRING(15)},
    },{
        timestamps: true,
        tableName: 'servicos'
    })
    model.sync({ alter: true })
    return model
  }