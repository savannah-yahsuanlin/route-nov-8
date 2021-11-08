const {Client} = require('pg')
const express =  require('express')
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost/db')

const app = express()
app.use(express.urlencoded({extended: false}))

const getUser = async() =>{
	return  (await client.query('SELECT * FROM "User";')).rows;
}

const getPlace = async() =>{
	return  (await client.query('SELECT * FROM "Place";')).rows;
}

const CreateUser = async({name}) => {
	return (await client.query('INSERT INTO "User"(name) VALUES($1) RETURNING *', [name])).rows[0]
}

const deleteUser = async(id) => {
	return await client.query('DELETE FROM "User" WHERE id=$1', [id])
}
const db = async() => {
	const SQL = `
	DROP TABLE IF EXISTS "User";
	DROP TABLE IF EXISTS "Place";
	CREATE TABLE "User"(
		id SERIAL PRIMARY KEY,
		name VARCHAR(20) NOT NULL
	);
	CREATE TABLE "Place"(
		id SERIAL PRIMARY KEY,
		name VARCHAR(20) NOT NULL
	);

	INSERT INTO "User"(name) VALUES('moe');
	INSERT INTO "User"(name) VALUES('judy');
	INSERT INTO "User"(name) VALUES('jason');
	INSERT INTO "User"(name) VALUES('john');

	INSERT INTO "Place"(name) VALUES('Boston');
	INSERT INTO "Place"(name) VALUES('New York');
	INSERT INTO "Place"(name) VALUES('Chicago');
	`;
	await client.query(SQL)
}


module.exports = {
	client,
	getUser,
	getPlace,
	db,
	deleteUser,
	CreateUser
}