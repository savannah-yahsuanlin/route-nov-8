const {client, getUser,  getPlace, CreateUser, deleteUser, db} = require('./db')
const express = require('express')
const {head} = require('./head')

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(require('method-override')('_method'))

app.get('/', async(req, res, next) => {
	try {
		const [user, place] = await Promise.all([
			getUser(),
			getPlace()
		]);
		res.send(`
			<html>
				${head({title:  'hello world'})}
				<body>
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href="/user">Users</a></li>
						<li><a href="/place">Places</a></li>
					</ul>
					hello world
				</body>
			</html>
		`);
	}
	catch(ex) {
		next(ex)
	}
})

app.use('/user', require('./routes/user'))
app.use('/place', require('./routes/place'))

const init = async() => {
	try {
		await client.connect()
		await db()
		const createName = await CreateUser({name: 'Victor'})
		await getUser()
		await getPlace()
		await deleteUser(createName.id)
		const port = process.env.PORT || 3000
		app.listen(port, () => console.log(`listening on port ${port} `))
	} 
	catch(ex) {
	console.log(ex)
		res.status(err.status || 500).send(err.message || 'server not connect')
	} 
};

init();

