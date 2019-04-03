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
			contactPhone : "", 
			contactMethod : "", 
			mesage : ""
		}
	};

 	handleChange = name => event => {
    	this.setState({ [name]: event.target.value });
  	};

  	sendContactForm() {
  		console.log(`Form : ${JSON.stringify(this.state.contactForm)}`)
  	};

	render() {
    	const { classes } = this.props;
		
		return (	
			<Modal open={this.props.open}
					onClose={this.props.handleClose}>
				<div style={getModalStyle()} className={classes.paper}>
					<form className={classes.container} noValidate autoComplete="off">
						<TextField
							required
							id="standard-required"
							label="Контактный номер"
							defaultValue=""
							value={this.state.contactForm.contactPhone}
							className={classes.textField}
							margin="normal"
						/>

						<TextField
				          id="standard-select-currency"
				          select
				          label="Select"
				          className={classes.textField}
				          value={this.state.contactForm.contactMethod}
				          onChange={this.handleChange('contactMethod')}
				          SelectProps={{
				            MenuProps: {
				              className: classes.menu,
				            },
				          }}
				          helperText="Выберите способ связи"
				          margin="normal"
				        >
				          {contactMethods.map(option => (
				            <MenuItem key={option.value} value={option.value}>
				              {option.label}
				            </MenuItem>
				          ))}
				        </TextField>

				        <FormControl fullWidth className={classes.margin}>
				          <InputLabel htmlFor="adornment-amount">Сообщение</InputLabel>
				          <Input
				            id="adornment-amount"
				            value={this.state.contactForm.message}
				          />
				        </FormControl>

				        <Button variant="outlined" color="inherit" className={classes.button} onClick={this.sendContactForm}>
					        Отправить 
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
