const {getUser,  getPlace} = require('../db')
const app = require('express').Router()
const {head} = require('../head')

app.get('/', async(req, res, next) => {
	try {
		const [user, place] = await Promise.all([
			getUser(),
			getPlace()
		]);
		res.send(`
			<html>
				<body>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/user">Users</a></li>
					<li><a href="/place">Places</a></li>
				</ul>
					${
						place.map(place => `
							<li>
							${place.name}
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


module.exports = app