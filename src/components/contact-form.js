import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';

	const styles = theme => ({
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
	});

	const contactMethods = [
		{value : "viber", 
		label : "Viber"},
		{value : "phone", 
		label : "Звонок"}
	]
class ContactForm extends Component {


	state = {
			contactPhone : "", 
			contactMethod : ""
	};

 	handleChange = name => event => {
    	this.setState({ [name]: event.target.value });
  	};

	render() {
    	const { classes } = this.props;
		
		return (	
			<form className={classes.container} noValidate autoComplete="off">
			<TextField
				required
				id="standard-required"
				label="Контактный номер"
				defaultValue=""
				value={this.state.contactPhone}
				className={classes.textField}
				margin="normal"
			/>

			<TextField
	          id="standard-select-currency"
	          select
	          label="Select"
	          className={classes.textField}
	          value={this.state.contactMethod}
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
	            value={this.state.amount}
	            onChange={this.handleChange('amount')}
	            startAdornment={<InputAdornment position="start">$</InputAdornment>}
	          />
	        </FormControl>
			</form>
			);
	}
}

export default ContactForm;