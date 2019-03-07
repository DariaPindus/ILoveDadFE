import React, { Component } from 'react';
import {ItemGridFactor} from '../constants'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

class Item extends Component {

	state = {
		gridFactor : ItemGridFactor, 
		open : false 
		item : {}
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	//props : item
	showDetailed(id) {
		console.log('show detailed for item with id ' + id)
	}

	render() {
		/*const style = {
			background-image: 'url(' + this.props.item.picture + ')',
		};*/
		var divStyle = {
			backgroundImage: 'url(' + this.props.item.picture  + ')',
		};

		return (
			<div class="item">
				<a onClick={this.handleOpen}>
				<div class="circle-wrap">
				<div class="media work-2" style={divStyle}></div>
				</div>
				<div class="client-name">
				<h2>Name</h2>
				<h3>{this.props.name}</h3>
				</div>
			<div class="project">		{/*Todo: rename classes*/}
			<h2>Price</h2>
			<h3>{this.props.item.price}</h3>
			</div>
			</a>
			<Modal
		          aria-labelledby="simple-modal-title"
		          aria-describedby="simple-modal-description"
		          open={this.state.open}
		          onClose={this.handleClose}
		    >
		    
		    </Modal>
			</div>
		)
	}
}


export default Item;