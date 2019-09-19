const fetch = require('node-fetch');

const functionGojekSendOtp = (phoneNumber, uuid, uniqid) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/v4/customers/login_with_phone'

	boday = {"phone":`+${phoneNumber}`}

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
	functionGojekSendOtp
}