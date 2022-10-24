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
	
const { Sequelize, DataTypes, Op, or } = require("sequelize");
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

(async () => {
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

	// SELECT
	const users5 = await User.findAll();
	console.log("All users:", JSON.stringify(users5, null, 2));
	await User.findAll({
		attributes: ['id', ['name', 'username']]
	});

	// count as count(using functuin)
	await User.findAll({
		attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]
	});
	// add count
	await User.findAll({
		attributes: {
			include: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]
		}
	});

	// where
	await User.findAll({
		where: {
			id: 1,
			favoriteColor: 'green'
		}
	});

	const count = await User.count({
		where: {
			[Op.not]: [
				{ favoriteColor: 'red' }
			],
			[Op.and]: [
				{
					name: {
						[Op.like]: 'Swimming%'
					}
				},
				{
					id: {
						[Op.gt]: 1
					}
				},
				{
					createdAt: {
						[Op.lt]: new Date(),
						[Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
					}
				}
			]
		},
	});
	console.log(count);

	// order
	await User.findAll({ 
		order: [
			['createdAt', 'DESC'],
			['name', 'DESC']
		]
	});

	// group
	User.findAll({ group: 'name' });
	// yields 'GROUP BY name'

	// paging
	User.findAll({ offset: 5, limit: 5 });

	// Associations
	const Post = sequelize.define("Posts", {
		title: DataTypes.STRING,
		body: DataTypes.STRING
	});
	const Comment = sequelize.define("Comments", {
		content: DataTypes.STRING,
	});
	Post.hasMany(Comment);
	Comment.belongsTo(Post);
	await sequelize.sync();

	const post = await Post.create({ title: "News", body: "blaalalalalal" });
	for (let i=0; i<10; i++) {
    await Comment.create({ PostId: post.id, title: "News", content: "contents " + i });
	}
	const post1 = await Post.findAll({ include: Comment });
	console.log(JSON.stringify(post1, null, 2));

	const columns1 = await Comment.findAll({ include: Post });
	console.log(JSON.stringify(columns1, null, 2));
})();
