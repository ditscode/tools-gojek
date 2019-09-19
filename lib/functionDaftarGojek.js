const fetch = require('node-fetch');

const functionDaftarGojek = (email, name, phoneNumber, uuid, uniqid) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/v5/customers';

	const boday = {
		"email":email,
		"name":name,
		"phone": `+${phoneNumber}`,
		"signed_up_country":"ID"
	};

	fetch (url, {
		method : 'POST',
		headers : {
			'X-Session-ID': uuid,
			'X-UniqueId': uniqid,
			'X-AppVersion': '3.34.1',
			Authorization: 'Bearer',
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
		resolve(err)
	})
});

module.exports = {
	functionDaftarGojek
}