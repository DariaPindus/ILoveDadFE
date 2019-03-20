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
			<div className="product type-product status-publish has-post-thumbnail product_cat-kitchen first instock shipping-taxable purchasable product-type-simple">
			<div className="product-image">
				<a><img  width="370" height="270" alt="" scale="0" data-opt-loaded="true" data-opt-lazy-loaded="true" data-opt-otimized-width="295" data-opt-optimized-height="214" src={this.props.item.picture} className="attachment-shop_catalog size-shop_catalog wp-post-image"/></a>
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