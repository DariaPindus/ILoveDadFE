import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  }, 
  chip : {
  	 display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  }
});

class DetailedItem extends Component {


	render() {
	    const { classes } = this.props;

	    return (
	    	<Card>
	    		<Grid container xs={12} className={classes.root}>
	    			<Grid item>
	    				<img src={this.props.item.img} />
	    			</Grid>

	    			<Grid item>
	    				<Grid container >
	    					<Grid item xs={6}>
		    					<div class="columns">
				                  <div class="spacing"></div>
				                  <h3 class="meta-title">Title</h3>
				                  <p class="meta-data">{this.props.name}</p>
				                </div>
	    					</Grid>

	    					<Grid item xs={6}>
		    					<div class="columns">
				                  <div class="spacing"></div>
				                  <h3 class="meta-title">Price</h3>
				                  <p class="meta-data">{this.props.price}</p>
				                </div>
	    					</Grid>

	    					{/*Chip key={data.key}*/}
	    					<Grid item xs={6}>
	    						<div class="columns">
				                  <div class="spacing"></div>
				                  <h3 class="meta-title">Colors</h3>
				                  <p class="meta-data">
				                  	<Paper className={classes.root}>
								        {this.props.item.Colors.map(data => {
								          return (
								          	<Chip 
								          		color="primary" 
								          		variant="outlined" 
								              	label={data}/>
								          );
								        })}
								      </Paper>
				                  </p>
				                </div>
	    					</Grid>

	    					<Grid item xs={6}>
	    						<div class="columns">
				                  <div class="spacing"></div>
				                  <h3 class="meta-title">Sizes</h3>
				                  <p class="meta-data">
				                  	<Paper className={classes.root}>
								        {this.props.item.sizes.map(data => {
								          return (
								          	<Chip 
								          		color="primary" 
								          		variant="outlined" 
								              	label={data}/>
								          );
								        })}
								      </Paper>
				                  </p>
				                </div>
	    					</Grid>
	    				</Grid>
	    			</Grid>
	    		</Grid>
	    	</Card>
	    )
	}
}

export default withStyles(styles) (Item);