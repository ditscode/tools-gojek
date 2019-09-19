const fetch = require('node-fetch');

const functionGojekVerify = (otpToken, otpLogin, uuid, uniqid) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/v4/customers/login/verify'

	boday = {
		"client_name":"gojek:cons:android",
		"client_secret":"83415d06-ec4e-11e6-a41b-6c40088ab51e",
		"data": {
			"otp": otpLogin,
			"otp_token": otpToken
		},
		"grant_type":"otp",
		"scopes":"gojek:customer:transaction gojek:customer:readonly"
	};

	fetch(url, {
		method: 'POST',
		headers: {
			'X-Session-ID': uuid,
			'X-UniqueId': uniqid,
			'X-AppVersion': '3.34.1',
			Authorization: 'Bearer',
			'Content-Type': 'application/json; charset=UTF-8'
		},
		body: JSON.stringify(boday)
	})
	.then(res => res.json())
	.then(result => {
		resolve(result)
	})
	.catch(err => {
		reject(err)
	})
});

module.exports = {
	functionGojekVerify
} 