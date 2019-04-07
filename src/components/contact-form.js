import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

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

 	handleChange = name => event => {
    	this.setState({ [name]: event.target.value });
  	};

  	sendContactForm() {
  		console.log(`Form : ${JSON.stringify(this.state.contactForm)}`)
  	};

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
							<form class="contact2-form validate-form">
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
						          className={classes.textField}
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
								          className={classes.textField}
							          	error={this.state.errors.message.length > 0 }
							          	helperText={this.state.errors.message}
								          margin="normal"
								        />

										<Button variant="outlined" 
												disabled={!this.canSend}>
									        Default
									    </Button>
							</form>
						</div>
			</Modal>
			);
	}
}

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactForm);
