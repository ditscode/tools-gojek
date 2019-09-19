const fetch = require('node-fetch');

const functionSetPin = (pin, otpPin, accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/wallet/pin';

	const boday = {
		"pin":pin
	};

	fetch (url, {
		method : 'POST',
		headers : {
			'otp': otpPin,
			'X-Session-ID': uuid,
			'X-UniqueId': uniqid,
			'X-AppVersion': '3.34.1',
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json; charset=UTF-8',
            'X-Location':'-6.9726247,110.4043687'
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
	functionSetPin
}