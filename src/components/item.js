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
		const style  = {
	  		background: 'url(' + this.props.item.picture + ')'
	  	};
		return (
			<div className="product type-product status-publish has-post-thumbnail product_cat-kitchen first instock shipping-taxable purchasable product-type-simple">
			<div className="product-image">
				<div class="product-img" style={style}></div>
			</div>
			<div className="product-header">
					<h3 className="product-title"><a href="" className="shop-item-title-link">{this.props.item.title}</a></h3>
					<div className="price">
						<span className="woocommerce-Price-amount amount">
							<span className="woocommerce-Price-currencySymbol">{CurrencySign}</span>
							{this.props.item.price}
						</span>
					</div>
			</div>
			</div>
			);
	}
}


export default Item;