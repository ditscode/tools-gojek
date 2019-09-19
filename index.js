const readlineSync = require('readline-sync');
const moment = require('moment');
const generate = require('./lib/generate');
const sendOtp = require('./lib/functionGojekSendOtp');
const verifyOtp = require('./lib/functionGojekVerify');
const nama = require('./lib/functionGenName');
const daftarGojek = require('./lib/functionDaftarGojek');
const inputOtp = require('./lib/functionInputOtp');
const setPinLo = require('./lib/functionSetPin');
const gantiiNope = require('./lib/functionGantiNope');
const otpGantiNope = require('./lib/functionOtpGantiNope');
const uuidv4 = require('uuid/v4');
var uuid = uuidv4();

(async () => {
	try {
		const uniqueid = await generate.genUniqueId(16);
		const name = await nama.functionGenName();
        const mail = await generate.genUniqueId(7);
        const email = `${mail}@gmail.com`;
		const pilih = await ['Get Access Token','Regist Gojek','Set Pin','Change No US'];
		const menu = await readlineSync.keyInSelect(pilih, 'Select Menu?');
		if (pilih[menu] == 'Get Access Token') {
			const phoneNumber = readlineSync.question('Masukan No Hp: ');
			const login = await sendOtp.functionGojekSendOtp(phoneNumber, uuid, uniqueid);
			if (login.success === false) {
				const err = login.errors[0].message;
				console.log(err)
			} else if (!login.data.login_token) {
				console.log(login);
			}
			const loginToken = login.data.login_token;
			const otpLogin = await readlineSync.question('Masukan Otp: ');
			const gojekVerify = await verifyOtp.functionGojekVerify(loginToken, otpLogin, uuid, uniqueid);
			if(!gojekVerify.data.access_token) {
				console.log(gojekVerify);
			}
			const accessToken = gojekVerify.data.access_token;
			console.log(`[${moment().format('HH:mm:ss')}] Your Access Token: `+accessToken);
		} else if (pilih[menu] == 'Regist Gojek') {
			const phoneNumber = readlineSync.question('Masukan No Hp: ');
			const daftar = await daftarGojek.functionDaftarGojek(email, name, phoneNumber, uuid, uniqueid);
			if (daftar.success == false){
        		console.log(daftar)
	        } else if(!daftar.data.otp_token){
	        	console.log(daftar);
	        }
	        const otpToken = daftar.data.otp_token;
	        const otp = await readlineSync.question('Masukan Otp: ');
	        const sendOtp = await inputOtp.functionInputOtp(otp, otpToken, uuid, uniqueid);
	        console.log(`[${moment().format('HH:mm:ss')}] Daftar Akun Gojek Success`);
		} else if (pilih[menu] == 'Set Pin') {
			const phoneNumber = readlineSync.question('Masukan No Hp: ');
			const login = await sendOtp.functionGojekSendOtp(phoneNumber, uuid, uniqueid);
			if (login.success === false) {
				const err = login.errors[0].message;
				console.log(err)
			} else if(!login.data.login_token) {
				console.log(login);
			}
			const loginToken = login.data.login_token;
			const otpLogin = await readlineSync.question('Masukan Otp: ');
			const gojekVerify = await verifyOtp.functionGojekVerify(loginToken, otpLogin, uuid, uniqueid);
			if(!gojekVerify.data.access_token) {
				console.log(gojekVerify);
			}
			const accessToken = gojekVerify.data.access_token;
			const pin = await readlineSync.question('Masukan Pin: ');   
			const setOtpPin = await setPinLo.functionSetPin(pin, '', accessToken, uuid, uniqueid);
			const otpPin = await readlineSync.question('Masukan Otp: ');
			const setPin = await setPinLo.functionSetPin(pin, otpPin, accessToken, uuid, uniqueid);
	        console.log(`[${moment().format('HH:mm:ss')}] Set Pin Sukses`);
		} else if (pilih[menu == "Change No US"]) {
			const phoneNumber = readlineSync.question('No Hp Login: ');
			const login = await sendOtp.functionGojekSendOtp(phoneNumber, uuid, uniqueid);
			if (login.success === false) {
				const err = login.errors[0].message;
				console.log(err)
			} else if(!login.data.login_token) {
				console.log(login);
			}
			const loginToken = login.data.login_token;
			const otpLogin = await readlineSync.question('Masukan Otp: ');
			const gojekVerify = await verifyOtp.functionGojekVerify(loginToken, otpLogin, uuid, uniqueid);
			if(!gojekVerify.data.access_token) {
				console.log(gojekVerify);
			}
			const accessToken = gojekVerify.data.access_token;
			if(!gojekVerify.data.resource_owner_id) {
				console.log(gojekVerify);
			}
			const accountId = await gojekVerify.data.resource_owner_id;
			if(!gojekVerify.data.customer.email) {
				console.log(gojekVerify);
			}
			const email = await gojekVerify.data.customer.email;
			if(!gojekVerify.data.customer.name) {
				console.log(gojekVerify);
			}
			const name = await gojekVerify.data.customer.name;
			const phone = await readlineSync.question('Masukan No Hp Baru: ');
			const gantiNope = await gantiiNope.functionGantiNope(accountId, email, name, phone, accessToken, uuid, uniqueid);
			if(!gantiNope.gptoken[0]) {
				console.log(gantiNope);
			}
			const GpToken = await gantiNope.gptoken[0];
			const otp = await readlineSync.question('Masukan Otp: ');
			const otpGanti = await otpGantiNope.functionOtp(GpToken, accountId, phone, otp, accessToken, uuid, uniqueid);
			console.log(`[${moment().format('HH:mm:ss')}] Change Nomer Success`);
		}
	} catch (e) {
		console.log(e);
	}
})();