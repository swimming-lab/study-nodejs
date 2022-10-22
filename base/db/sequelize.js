// const dbConfig = {
// 	HOST: "localhost",
// 	USER: "root",
// 	PASSWORD: "my-secret-pw",
// 	DB: "database_development",
// 	dialect: "mysql",
// 	pool: {
// 		max: 5,
// 		min: 0,
// 		acquire: 30000,
// 		idle: 10000
// 	}
// };
	
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('sqlite::memory:')
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
// 	host: dbConfig.HOST,
// 	dialect: dbConfig.dialect,
// 	operatorsAliases: false,
// 	pool: dbConfig.pool
// });

const User = sequelize.define("user", {
  name: DataTypes.STRING,
  favoriteColor: {
    type: DataTypes.STRING,
    defaultValue: 'green'
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER
});

// Automatically create all tables
await sequelize.sync();

// To drop the table
// await sequelize.drop();	// All tables
// await User.drop();				// a model

// Creating an instance
const user1 = User.build({ name: 'Swimming1'});	// new instance
user1.save();	// saved in database
console.log(user1 instanceof User); // true
console.log(user1.name); // "Swimming1"

const user2 = await User.create({ name: 'Swimming2'}); // Immediately build and save
console.log(user2 instanceof User); // true
console.log(user2.name); // "Swimming2"

// Updateing an instance
const user3 = await User.create({ name: "Swimming3" });
console.log(user3.name); // "Swimming3"
user3.name = "Swimming3-1";
// the name is still "Swimming3" in the database
await user3.save();
// Now the name was updated to "Swimming3-1" in the database!
await user3.update({ name: "Swimming3-2" })
// The database now has "Swimming3-2" for name

// Deleting an instance
const user4 = await User.create({ name: "Swimming4" });
console.log(user4.name); // "Swimming4"
await user4.destroy();
// Now this entry was removed from the database

