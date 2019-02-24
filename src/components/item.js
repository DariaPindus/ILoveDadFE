import React, { Component } from 'react';
import {ItemGridFactor} from '../constants'
import Grid from '@material-ui/core/Grid';

class Item extends Component {

	state = {
		gridFactor : ItemGridFactor
	}
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
					<a onClick={() => this.showDetailed(this.props.item.id)}>
						<div class="circle-wrap">
		                  <div class="media work-2" style={divStyle}></div>
		                </div>
		                <div class="client-name">
		                  <h2>Name</h2>
		                  <h3>{this.props.title}</h3>
		                </div>
		                <div class="project">		{/*Todo: rename classes*/}
		                  <h2>Price</h2>
		                  <h3>{this.props.item.price}</h3>
		                </div>
					</a>
				</div>
		)
	}
}


export default Item;