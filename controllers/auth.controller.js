const User = require('../models/user.model');

function getSignUp(req, res) {
  res.render('customer/auth/signup');
}

async function signup(req, res) {
	const user = new User(
		req.body.email,
		req.body.password,
		req.body.fullname,
		req.body.street,
		req.body.postal,
		req.body.city
	);

	await user.signup();

	res.redirect('/login');
}

function getLogin(req, res) {
  res.render('customer/auth/login');
}

module.exports = {
	getSignUp: getSignUp,
	signup: signup,
	getLogin: getLogin,
};
