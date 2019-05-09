import AWS from 'aws-sdk';

const MULTIPART_CHARS =
"-_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const senderEmail = '';
const receiverEmail = '';

class EmailService {
	
	constructor(){
		if(! EmailService.instance){
			this.InitEmailService();
			EmailService.instance = this;
		}

		return EmailService.instance;
	}

	InitEmailService() {
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: 'us-east-1:5a4ddc15-5509-4b71-a071-ad410fe6dc59'
		});
		AWS.config.update({region: 'us-east-1'});
	}

	generateRandomString(min, max) {
		let str = "";
		let count = max ? Math.floor(Math.random() * (max - min + 1)) + min : min; 
		for (let i = 0; i < count; i++) {
			let index = Math.floor(Math.random() * MULTIPART_CHARS.length); 
			str += (MULTIPART_CHARS[index]);
		}
		return str;
	}

	/*statistics for 2 weeks*/
	async checkSendAvailability() {

		return new AWS.SES({apiVersion: '2010-12-01'}).getSendStatistics().promise()
			.then(function(data){
				if (data.SendDataPoints) {
				  	console.log(data);           // successful response
				  	return data.SendDataPoints.length < 90;
				  }
				  return false;
			});
	};

	/*attachment : { data : "", name : ""} 
	  body : HTML  (supported)*/
	async sendEmail(subject, body, attachment) {
		let statisticsAreOk = await this.checkSendAvailability();

		let message = this.getRawMessage();
		let encodedMessage = window.btoa(unescape(encodeURIComponent(message)));

		var params = {
			RawMessage: { /* required */
				Data: new Buffer(message) || 'default' /* Strings will be Base-64 encoded on your behalf */ /* required */
			}
		};
		new AWS.SES({apiVersion: '2010-12-01'}).sendRawEmail(params, function(err, data) {
			  if (err) console.log(err, err.stack); // an error occurred
			  else     console.log(data);           // successful response
			});
	}

	getRawMessage(subject, body, attachment) {
		let contentId = this.generateRandomString(12);
		let boundary = this.generateRandomString(20, 30);
		let containsImage = attachment != null && attachment != undefined && attachment.data.length > 0;

		let htmlbody = `<html>
<head></head>
<body>
${containsImage ? '<img src="cid:' + contentId + '" alt="' + attachment.name + '"><br>' : ''}
${body}
</body>
</html>`;
		let base64encoded = window.btoa(unescape(encodeURIComponent(htmlbody)));

		let email = `From: Sender <${senderEmail}>
To: <${receiverEmail}>
Subject: =?utf-8?B?0K/QuiDRgtC4INC/0L7QttC40LLQsNGU0Yg/?=
Content-Type: multipart/related;
	boundary="${boundary}";
	type="text/html"

--${boundary}
Content-Type: text/html;
Content-Transfer-Encoding: base64
Content-Type-Encoding: base64

${base64encoded}

${containsImage ? '--' + boundary +'\n' +  
'Content-Type: image/jpeg\n' + 
'Content-Transfer-Encoding: base64\n' + 
'Content-Disposition: attachment;filename="' + attachment.name + '";\n' + 
'Content-ID: <' + contentId + '>\n\n' + 
attachment.data.substring(attachment.data.indexOf(',') + 1) + '\n' : ''}

--${boundary}--`;
		return email;
	}

	static  GetLinkToFastReply(subject, recepient, replyLinkName) {
		let encSubject = encodeURIComponent(subject);
		return '<a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=' + recepient + '&su=' + encSubject +'">' +
				replyLinkName + '</a>';
	}
}

export default EmailService