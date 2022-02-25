module.exports = (connection, DataTypes) => {
    const model = connection.define('Servico',{
      id: {type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},  
      imagem: {type: DataTypes.STRING(50)},
      nome: {type: DataTypes.STRING(50)},
      descricao: {type: DataTypes.TEXT},
      preco: {type: DataTypes.DOUBLE},
    },{
        timestamps: true,
        tableName: 'servicos'
    })
    model.sync({ alter: true })
    return model
  }