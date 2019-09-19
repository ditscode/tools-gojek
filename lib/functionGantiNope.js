const fetch = require('node-fetch');

const functionGantiNope = (accountId, email, name, phone, accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/v4/customers'

	boday = {
		"email":email,
		"name":name,
		"phone":`+${phone}`
	};

	fetch(url, {
		method: 'PATCH',
		headers: {
			'pin': '290901',
			'X-Session-ID': uuid,
			'X-UniqueId': uniqid,
			'X-AppVersion': '3.34.1',
			'User-uuid': accountId, 
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json; charset=UTF-8'
		},
		body: JSON.stringify(boday)
	})
	.then(async res => {
        const result = {
            gptoken: res.headers.raw()['gptoken'],
            body: await res.json()
        }
        resolve(result);
	})
	.catch(err => {
		reject(err)
	})
});

module.exports = {
	functionGantiNope
}