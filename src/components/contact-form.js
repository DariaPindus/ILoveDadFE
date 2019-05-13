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
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import * as Strings from '../strings'
import EmailService from '../services/email-service';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import amber from '@material-ui/core/colors/amber';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Icon from '@material-ui/core/Icon';

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

const spinner = css`
	margin: auto !important;
    border-color: '#77746f' !important;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
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
  success: {
    backgroundColor: 'green',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  resultMessage: {
    display: 'flex',
    alignItems: 'center',
  },
  warning: {
    backgroundColor: amber[700],
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
		loading : false,
		showResult : false,
		resultMessage : "",
		resultType : "",
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
		this.setState({ loading : true});
	    const files = Array.from(e.target.files);

	    this.getBase64(files[0]).then(data => { 
			this.setState({ file : { data : data, name : files[0].name}});
			this.setState({ loading : false})},

			error => console.log("error " + error)
		);

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
		return !this.state.loading && (Object.values(this.state.errors).find(val => val != "")) === undefined;
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

		this.setState({loading : true});
		let message = this.createMessage();
		new EmailService().sendEmail(Strings.EmailSubject, message, this.state.file).then(
		  data => {
		  	this.setState({loading : false});
			this.setState({showResult : true});
			this.setState({resultMessage : Strings.EmailSentSuccessfully}); 
		  	this.setState({resultType : 'success'});
		  	this.props.handleClose();
		  }).catch(
		    err => {
		    console.log('error');
		    this.setState({loading : false});
			this.setState({showResult : true});
			this.setState({resultMessage : Strings.EmailSentError}); 
			this.setState({resultType : 'warning'});
		  });
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
				        <Button variant="outlined"
							className={classes.button} >
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
					<ClipLoader
				          css={spinner}
				          sizeUnit={"px"}
				          size={150}
				          color={'#77746f'}
				          loading={this.state.loading}
				        />

				   
				    <Snackbar
				          anchorOrigin={'top', 'left'}
				          open={this.state.showResult}
				    >
					    <SnackbarContent
					      className={classes[this.state.resultType]}
					      aria-describedby="client-snackbar"
					      message={
					        <span id="client-snackbar" className={classes.message}>
					          <Icon className={classNames(classes.icon, classes.iconVariant)} />
					          {this.state.resultMessage}
					        </span>
					      }
					      action={[
					        <IconButton
					          key="close"
					          aria-label="Close"
					          color="inherit"
					          className={classes.close}
					          onClick={() => this.setState({showResult : false})}
					        >
					          <CloseIcon className={classes.icon} />
					        </IconButton>,
					      ]}
					    />
				    </Snackbar>
				</div>
			</Modal>
			);
	}
 }

ContactForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactForm);
