const fetch = require('node-fetch');

const functionOtp = (GpToken, accountId, phone, otp, accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
	fetch('https://api.gojekapi.com/v4/customer/verificationUpdateProfile', {
	method: 'POST',
	headers: {
		'GPToken': `${GpToken}`,
		'X-Session-ID': uuid,
		'X-UniqueId': uniqid,
		'X-AppVersion': '3.34.1',
		Authorization: `Bearer ${accessToken}`,
		'Content-Type': 'application/json; charset=UTF-8'
		},
		body: JSON.stringify({"id":accountId,"phone":`+${phone}`,"verificationCode":otp})
	})
	.then(res => res.json())
	.then(result => resolve(result))
	.catch(err => reject(err))
});

module.exports = {
	functionOtp
}