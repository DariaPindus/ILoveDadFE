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
import * as Strings from '../strings'
import EmailService from '../services/email-service';

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

const ContactMethodType = {
	PHONE : 'phone', 
	EMAIL : 'email', 
	VIBER : 'viber'
}

const contactMethods = [
	{value : ContactMethodType.VIBER, 
	label : "Viber"},
	{value : ContactMethodType.PHONE, 
	label : "Звонок"},
	{value : ContactMethodType.EMAIL,
	label : "Email"}
];

class ContactForm extends Component {

	state = {
		contactName : "", 
		contactPhone : "", 
		contactMethod : "phone",
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
		this.sendEmail = this.sendEmail.bind(this);
		this.canSend = this.canSend.bind(this);
		this.getBase64 = this.getBase64.bind(this);
		this.createMessage = this.createMessage.bind(this);
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

	fileUpload = e => {
		this.setState({ fileUploading : true});
	    const files = Array.from(e.target.files);

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

	canSend() {
		return !this.state.fileUploading && (Object.values(this.state.errors).find(val => val != "")) === undefined;
	}

	handleUserInput (e) {
	  const name = e.target.name;
	  const value = e.target.value;
	  this.setState({[name]: value});
	}

	sendEmail() {
		let canBeSent = this.canSend();

		if (!canBeSent) {
			return;
		}

		let message = this.createMessage();
		EmailService.sendEmail(Strings.EmailSubject, message, this.state.file);
	}

	createMessage() {
		let linkToReply = undefined;
		if (this.state.contactMethod ==  ContactMethodType.EMAIL && this.state.contactEmail) {
			linkToReply = EmailService.GetLinkToFastReply(Strings.ReplyEmailSubject, this.state.contactEmail, 'Ответить отправителю');
		}

		let message = `
		<p><b>Имя : </b>${this.state.contactName}</p>
		<p><b>Выбранный способ связи : </b>${this.state.contactMethod}</p>
		<p><b>Контактный телефон : </b>${this.state.contactPhone}</p>
		<p><b>Контактный email : </b>${this.state.contactEmail}</p>
		<p><b>Сообщение : </b><br/> ${this.state.message}</p> 
		${ linkToReply ? '<br/>' + linkToReply + '<br/>' : ''}`;

		return message;
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
