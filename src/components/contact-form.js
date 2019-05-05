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
import purple from '@material-ui/core/colors/purple';

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
      color: 'red',
    },
  },
  cssFocused: {
  	color: 'red',
  },
  cssUnderline: {
    '&:after': {
      borderBottomColor: 'red',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: 'red',
    },
  },
  notchedOutline: {},
});

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
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			  IdentityPoolId: 'us-east-1:5a4ddc15-5509-4b71-a071-ad410fe6dc59'
			});
		AWS.config.update({region: 'us-east-1'});
	};	

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

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
		let canBeSend = await this.checkSendAvailability();
		if (!canBeSend) {
			return;
		}

		let params = {
		  Destination: { /* required */
		    ToAddresses: [
		      'dasha.custom.personal@gmail.com',		    ]
		  },
		  Message: { /* required */
		    Body: { /* required */
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
		  Source: 'daria.pindus@gmail.com', /* required */
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
		  });
	}

	canSend() {
		return !this.state.error || this.state.error != "";
	}

	handleUserInput (e) {
	  const name = e.target.name;
	  const value = e.target.value;
	  this.setState({[name]: value});
	}

	render() {
		const { classes } = this.props;
		
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

					<br/>
					Current form values : Name {this.state.contactName}, Method {this.state.contactMethod}
					<br/>	
						<TextField
						required
						id="standard-required"
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
				            root: classes.cssOutlinedInput,
				            focused: classes.cssFocused,
				            notchedOutline: classes.notchedOutline,
				          },
				        }}
				        name="contactName"
				        margin="normal"
						error={this.state.contactName.length == 0 }
						helperText={this.state.errors.contactName}
						value={this.state.contactName}
						onChange={(e) => this.handleUserInput(e)}
						/>
						
						<TextField
						select
						fullWidth
				        margin="normal"
				        name="contactMethod"
						error={this.state.errors.contactMethod.length === 0 ? false : true }
						label="Способ связи"
						value={this.state.contactMethod}
						onChange={(e) => this.handleUserInput(e)}
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

						{this.state.contactMethod.value == "email" && 
							<TextField
							required
					        margin="normal"
							id="standard-required"
							label="Email"
							name="contactEmail"
							fullWidth
							error={this.state.errors.contactEmail.length > 0 }
							helperText={this.state.errors.contactEmail}
							value={this.state.contactEmail}
							/>
						}

						{this.state.contactMethod.value == "phone" && 
							<TextField
							required
					        margin="normal"
							id="standard-required"
							label="Номер телефона"
							fullWidth
							name="contactPhone"
							error={this.state.errors.contactPhone.length > 0 }
							helperText={this.state.errors.contactPhone}
							value={this.state.contactPhone}
							/>
						}

						<TextField
						fullWidth
						required
				        margin="normal"
						id="standard-multiline-flexible"
						label="Сообщение"
						multiline
						rowsMax="4"
						name="message"
						value={this.state.message}
						error={this.state.errors.message.length > 0 }
						helperText={this.state.errors.message}
						onChange={(e) => this.handleUserInput(e)}
						/>
						
						<Button variant="outlined" 
						disabled={!this.canSend}
						className={classes.button}
						onClick={this.sendEmail}>
						Default
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
