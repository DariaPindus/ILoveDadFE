import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import AWS from 'aws-sdk';
import * as Strings from '../strings'

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const MULTIPART_CHARS =
             "-_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: '#787977',
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#787977',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#787977',
    },
  },
  notchedOutline: {},
  uploadInput: {
    display: 'none',
  },
});

const phoneRegex = /^[+0-9-()]{10,18}$/;
const emailRegex = /(?=.{5,254}$)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;

const contactMethods = [
{value : "viber", 
label : "Viber"},
{value : "phone", 
label : "Звонок"},
{value : "email",
label : "Email"}
]
class ContactForm extends Component {


	state = {
		contactName : "", 
		contactPhone : "", 
		contactMethod : "",
		contactEmail : "", 
		message : "", 
		file : null,
		fileUploading : false,
		errors : {
			contactName : "",
			contactPhone : "", 
			contactMethod : "", 
			message : "",
			contactEmail : "" 
		}
	};

	constructor(props) {
		super(props);
		this.checkSendAvailability = this.checkSendAvailability.bind(this);
		this.sendEmail = this.sendEmail.bind(this);
		this.canSend = this.canSend.bind(this);
		this.generateBoundary = this.generateBoundary.bind(this);
		this.getBase64 = this.getBase64.bind(this);
		this.getRawMessage = this.getRawMessage.bind(this);

		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			  IdentityPoolId: 'us-east-1:5a4ddc15-5509-4b71-a071-ad410fe6dc59'
			});
		AWS.config.update({region: 'us-east-1'});
	};	

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	validateInput (e) {
		const name = e.target.name;
		const value = e.target.value;
		let message = "";

		if (!value || value == "") {
			message = Strings.EmptyFieldError;
		}
		else if (name == "contactPhone" && !phoneRegex.test(value)) {
			message = Strings.InvalidPhoneError;
		}
		else if (name == "contactEmail" && !emailRegex.test(value)) {
			message = Strings.InvalidEmailError;
		}
		else if (name == "message" && message.length > 2000 ) {
			message = Strings.MessageTooDetailedError;
		}    
		let errors = this.state.errors;
		errors[name] = message;
		this.setState({ errors: errors });
	} 

	sendContactForm() {
		console.log(`Form : ${JSON.stringify(this.state.contactForm)}`)
	};

	/*statistics for 2 weeks*/
	async checkSendAvailability() {

		return new AWS.SES({apiVersion: '2010-12-01'}).getSendStatistics()
			.promise().then(function(data){

				if (data.SendDataPoints) {
				  	console.log(data);           // successful response
				  	return data.SendDataPoints.length < 90;
				  }
				  return false;
			});
	};

	async sendEmail() {
		//let canBeSent = this.canSend();

		//let statisticsAreOk = await this.checkSendAvailability();

		//if (!canBeSent || !statisticsAreOk) {
		//	return;
		//}

		/*let params = {
		  Destination: { 
		    ToAddresses: [
		      'dasha.custom.personal@gmail.com',		    ]
		  },
		  Message: { 
		    Body: { 
		      Html: {
		       Charset: "UTF-8",
		       Data: "Some body <i>text</i> with HTML"
		      },
		      Text: {
		       Charset: "UTF-8",
		       Data: "More text"
		      }
		     },
		     Subject: {
		      Charset: 'UTF-8',
		      Data: 'Open me NOW!'
		     }
		    },
		  Source: 'daria.pindus@gmail.com', 
		};

		// Create the promise and SES service object
		var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

		// Handle promise's fulfilled/rejected states
		sendPromise.then(
		  function(data) {
		    console.log(data.MessageId);
		  }).catch(
		    function(err) {
		    console.error(err, err.stack);
		  });*/
		  debugger;
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

	getRawMessage() {
		let contentId = "ii_jvghiu120";
		let boundary = this.generateBoundary();
		let containsImage = this.state.file != null && this.state.file.data.length > 0
		let email = `From: "Sender Name" <daria.pindus@gmail.com>
To: dasha.custom.personal@gmail.com
Subject: TEst raaaaw
Content-Type: multipart/mixed;
    boundary="${boundary}"

--${boundary}
Content-Type: multipart/alternative;
    boundary="sub_${boundary}"

--sub_${boundary}
Content-Type: text/plain; charset=iso-8859-1
Content-Transfer-Encoding: quoted-printable

some text 

--sub_${boundary}
Content-Type: text/html; charset=iso-8859-1
Content-Transfer-Encoding: quoted-printable

<html>
<head></head>
<body>
<h1>Hello!</h1>
<p>Посмотрите на этого котенка.</p>
</body>
</html>

--sub_${boundary}--

${containsImage ? '--' + boundary +'\n' +  
'Content-Type: image/jpeg\n' + 
'Content-Disposition: attachment;filename="' + this.state.file.name + '";\n' + 
'Content-Transfer-Encoding: base64\n' + 
'Content-ID: <' + contentId + '>\n\n' + 
this.state.file.data.substring(this.state.file.data.indexOf(',') + 1) + '\n': ''}

--${boundary}--`;

		return email;
	}

	fileUpload = e => {
		this.setState({ fileUploading : true});
	    const files = Array.from(e.target.files);

	    /*const formData = new FormData();

	    files.forEach((file, i) => {
	      formData.append(i, file)
	    })*/
	    this.getBase64(files[0]).then(data => { 
			this.setState({ file : { data : data, name : files[0].name}});
			this.setState({ fileUploading : false}, 
			error => console.log("error " + error));
		});

	}

	getBase64(file) {
	  return new Promise((resolve, reject) => {
	    const reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.onload = () => resolve(reader.result);
	    reader.onerror = error => reject(error);
	  });
	}

	generateBoundary() {
             let boundary = "";
             let count = Math.floor(Math.random() * (30 - 20 + 1)) + 20; 
             for (let i = 0; i < count; i++) {
             	let index = Math.floor(Math.random() * MULTIPART_CHARS.length); 
             	boundary += (MULTIPART_CHARS[index]);
             }
             return boundary;
        }

	canSend() {
		return !this.state.fileUploading && (Object.values(this.state.errors).find(val => val != "")) === undefined;
	}

	handleUserInput (e) {
	  const name = e.target.name;
	  const value = e.target.value;
	  this.setState({[name]: value});
	}

	render() {
		const { classes } = this.props;
		const canSend = this.canSend();
		
		return (	
			<Modal open={this.props.open}
			onClose={this.props.handleClose}>
				<div class="wrap-contact2">
					<Grid
					container
					direction="column"
					justify="flex-start"
					alignItems="center"
					>
						<span class="contact2-form-title">
						Contact Us
						</span>

						<TextField
						label="Имя"
						fullWidth
				        InputLabelProps={{
				          classes: {
				            root: classes.cssLabel,
				            focused: classes.cssFocused,
				          },
				        }}
				        InputProps={{
				          classes: {
				            underline: classes.cssUnderline,
				          },
				        }}
				        error={this.state.errors.contactName != ""}
				        name="contactName"
				        margin="normal"
				        helperText={this.state.errors.contactName}
						value={this.state.contactName}
						onBlur={(e) => this.validateInput(e)}
						onChange={(e) => this.handleUserInput(e)}
						/>
						
						<TextField
						select
						fullWidth
				        margin="normal"
				        name="contactMethod"
						label="Способ связи"
						value={this.state.contactMethod}
				        helperText={this.state.errors.contactMethod}
						onChange={(e) => this.handleUserInput(e)}
						onBlur={(e) => this.validateInput(e)}
				        error={this.state.errors.contactMethod != ""}
						InputLabelProps={{
				          classes: {
				            root: classes.cssLabel,
				            focused: classes.cssFocused,
				          },
				        }}
				        InputProps={{
				          classes: {
				            underline: classes.cssUnderline,
				          },
				        }}
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						>
						{contactMethods.map(option => (
							<MenuItem key={option.value} value={option.value}>
							{option.label}
							</MenuItem>
							))}
						</TextField>

						{this.state.contactMethod == "email" && 
							<TextField
					        margin="normal"
							id="standard-required"
							label="Email"
							name="contactEmail"
							fullWidth
				        	error={this.state.errors.contactEmail != ""}
							onBlur={(e) => this.validateInput(e)}
							onChange={(e) => this.handleUserInput(e)}
				        	helperText={this.state.errors.contactEmail}
							InputLabelProps={{
					          classes: {
					            root: classes.cssLabel,
					            focused: classes.cssFocused,
					          },
					        }}
					        InputProps={{
					          classes: {
					            underline: classes.cssUnderline,
					          },
					        }}
							value={this.state.contactEmail}
							/>
						}

						{this.state.contactMethod != "email" && 
							<TextField
					        margin="normal"
							label="Номер телефона"
							fullWidth
							name="contactPhone"
							onChange={(e) => this.handleUserInput(e)}
				        	helperText={this.state.errors.contactPhone}
							onBlur={(e) => this.validateInput(e)}
				        	error={this.state.errors.contactPhone != ""}
							InputLabelProps={{
					          classes: {
					            root: classes.cssLabel,
					            focused: classes.cssFocused,
					          },
					        }}
					        InputProps={{
					          classes: {
					            underline: classes.cssUnderline,
					          },
					        }}
							value={this.state.contactPhone}
							/>
						}

						<TextField
						fullWidth
				        margin="normal"
						id="standard-multiline-flexible"
						label="Сообщение"
						multiline
						rowsMax="4"
						name="message"
						value={this.state.message}
						onChange={(e) => this.handleUserInput(e)}
						onBlur={(e) => this.validateInput(e)}
				        helperText={this.state.errors.message}
				        error={this.state.errors.message != ""}
						InputLabelProps={{
				          classes: {
				            root: classes.cssLabel,
				            focused: classes.cssFocused,
				          },
				        }}
				        InputProps={{
				          classes: {
				            underline: classes.cssUnderline,
				          },
				        }}
						/>
						
						<input
				        accept="image/*"
				        className={classes.uploadInput}
				        id="contained-button-file"
				        onChange={this.fileUpload}
				        type="file"
				      />
				      <label htmlFor="contained-button-file">
				        <Button variant="contained" component="span" >
				          Upload
				        </Button>
				      </label>

						<Button variant="outlined" 
							disabled={!canSend}
							className={classes.button}
							onClick={this.sendEmail}
						>
						Отправить
						</Button>
					</Grid>
				</div>
			</Modal>
			);
	}
 }

ContactForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactForm);
