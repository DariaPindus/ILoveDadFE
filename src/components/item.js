import React, { Component } from 'react';
import {CurrencySign} from '../constants'

class Item extends Component {
	/*gridFactor : ItemGridFactor, */
	state = {
		open : false,  
		item : {}
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	showDetailed(id) {
		console.log('show detailed for item with id ' + id)
	}

	render() {
		return (
			<React.Fragment>
			<div className="product-image"><a href=""><img src={this.props.item.picture} className="attachment-shop_catalog size-shop_catalog wp-post-image"/></a></div>
			<div className="product-header">
					<h3 className="product-title"><a href="" className="shop-item-title-link">{this.props.item.title}</a></h3>
					<div className="price">
						<span className="woocommerce-Price-amount amount">
							<span className="woocommerce-Price-currencySymbol">{CurrencySign}</span>
							{this.props.item.price}
						</span>
					</div>
			</div>
			</React.Fragment>
			);
	}
}


export default Item;