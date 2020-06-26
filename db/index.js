const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: './database.sqlite',
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: 'user'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: Sequelize.STRING,
  token: Sequelize.STRING
});

const Type = sequelize.define('type', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  typeContent: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue:0
  },
  createDate: {
    type: Sequelize.NUMBER,
    allowNull: false,
    defaultValue:new Date().getTime(),
  },
});

const ToDo = sequelize.define('todo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // type: {
  //   type: Sequelize.STRING,
  //   allowNull: true
  // },
  // priority:{
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue:0,
  // },
  // state: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue:0
  // },
  createDate: {
    type: Sequelize.NUMBER,
    allowNull: false,
    defaultValue:new Date().getTime(),
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
});




sequelize.sync();
module.exports = {
  sequelize,
  User,
  ToDo,
  Type
};
