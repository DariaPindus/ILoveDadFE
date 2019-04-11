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
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
	dense: {
		marginTop: 19,
	},
	menu: {
		width: 200,
	},
	button: {
		margin: theme.spacing.unit,
		borderRadius : 0,
	},
});

const contactMethods = [
{value : "viber", 
label : "Viber"},
{value : "phone", 
label : "Звонок"}
]
class ContactForm extends Component {


	state = {
		contactForm: {
			contactName : "", 
			contactPhone : "", 
			contactMethod : "", 
			message : ""
		}, 
		errors : {
			contactName : "", 
			contactPhone : "", 
			message : ""
		}
	};

	constructor(props) {
		super(props);
		/*let myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:'IDENTITY_POOL_ID'});
		let myConfig = new AWS.Config({
			credentials: myCredentials, region: 'us-west-2'
		});*/
		AWS.config.update({region: 'us-east-1'});
	};	

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	sendContactForm() {
		console.log(`Form : ${JSON.stringify(this.state.contactForm)}`)
	};

	sendEmail() {
		let params = {
		  Destination: { /* required */
		    ToAddresses: [
		      'daria.pindus@gmail.com',		    ]
		  },
		  Message: { /* required */
		    Body: { /* required */
		      Html: {
		       Charset: "UTF-8",
		       Data: "HTML_FORMAT_BODY"
		      },
		      Text: {
		       Charset: "UTF-8",
		       Data: "TEXT_FORMAT_BODY"
		      }
		     },
		     Subject: {
		      Charset: 'UTF-8',
		      Data: 'Test email'
		     }
		    },
		  Source: 'SENDER_EMAIL_ADDRESS', /* required */
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
		return !this.state.errors.contactName &&
		!this.state.errors.contactPhone &&
		!this.state.errors.message
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
						<TextField
						required
						id="standard-required"
						label="Имя"
						fullWidth
						error={this.state.errors.contactName.length > 0 }
						helperText={this.state.errors.contactName}
						value={this.state.contactForm.contactName}
						margin="normal"
						/>
						<TextField
						select
						fullWidth
						error={this.state.errors.length === 0 ? false : true }
						label="Способ связи"
						value={this.state.contactForm.contactMethod}
						onChange={this.handleChange('contactForm.contactMethod')}
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						margin="normal"
						>
						{contactMethods.map(option => (
							<MenuItem key={option.value} value={option.value}>
							{option.label}
							</MenuItem>
							))}
						</TextField>
						<TextField
						required
						id="standard-required"
						label="Номер телефона"
						fullWidth
						error={this.state.errors.contactPhone.length > 0 }
						helperText={this.state.errors.contactPhone}
						value={this.state.contactForm.contactPhone}
						margin="normal"
						/>
						<TextField
						fullWidth
						required
						id="standard-multiline-flexible"
						label="Сообщение"
						multiline
						rowsMax="4"
						value={this.state.contactForm.message}
						error={this.state.errors.message.length > 0 }
						helperText={this.state.errors.message}
						margin="normal"
						/>
						<Button variant="outlined" 
						disabled={!this.canSend}
						className={classes.button}>
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
