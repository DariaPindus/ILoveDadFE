import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


class Header extends Component {

	render () {
		return (
			<React.Fragment>
			<Grid item xs={8}>
				<Typography component="h2" variant="display3" gutterBottom>
		         	My cool site
		        </Typography>
			</Grid>
			<Grid item xs={4}>
				<Grid container direction="row"
					justify="flex-end"
				  	alignItems="center">
				  	<a class="navigation-links">Contact us</a>
				  	{/*<a class="navigation-links">Login</a>*/}
				</Grid>
			</Grid>
			</React.Fragment>
		)
	}
}
export default Header;
