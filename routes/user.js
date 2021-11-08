const {getUser,  getPlace, CreateUser, deleteUser} = require('../db')
const app = require('express').Router()
const {head} = require('../head')
app.use(require('method-override')('_method'))
module.exports = app

app.get('/', async(req, res, next) => {
	try {
		const [user, place] = await Promise.all([
			getUser(),
			getPlace()
		]);
		res.send(`
			<html>
				<head>
				</head>
				<body>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/user">Users</a></li>
					<li><a href="/place">Places</a></li>
				</ul>
					<form method="POST">
						<input name="name" />
						<button>Create</button>
					</form>
					${
						user.map(user => `
							<li>
							${user.name}
							<form method="POST" action="${user.id}?_method=DELETE">
								<button style="border:none; background-color: white;color: red; font-weight: bold;">X</button>  
							</form>
							</li>
							`).join(' ')
					}
				</body>
			</html>
		`);
	}
	catch(ex) {
		next(ex)
	}
})

app.post('/', async(req, res, next)=> {
	try {
		await CreateUser(req.body)
		res.redirect('./user')
	}
	catch(ex) {
		next(ex)
	} 
})

app.delete('/:id', async(req, res, next)=> {
	try {
		await deleteUser(req.params.id)
		res.redirect('/user')
	}
	catch(ex) {
		next(ex)
	} 
})

