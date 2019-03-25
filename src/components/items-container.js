import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Item from './item';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { fetchItems } from '../services/api';

const GridRow = ({row}) => {
	//debugger;
	return row.map(i => {
		return (<Grid item xs={4}> <Item item={i} key={i.id} /> </Grid>);
	});
}

const ItemsList = ({ items }) => {
	let rows = [[]];

	for (let i = 0; i < Math.ceil(items.length / 3); i++){
		rows[i] = items.slice(i * 3, (i + 1) * 3);
	}
	debugger;
	return rows.map((row, ind) => {
		return (<Grid container item xs={12}  className="products" key={ind}> <GridRow row={row}/> </Grid>);
	});
};

class ItemsContainer extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		isLoading: false, 
		items : []
	};


	componentDidMount() {
		this.loadItems();
	}

	loadItems() {
		debugger;
		let cat = this.props.match.params.catgKey;
		this.setState({isLoading : true});
		fetchItems(cat).then(
			response => {
				this.setState({items: response});
				this.setState({isLoading : false});
			});
	}

	render() {

    const {isLoading} = this.state.isLoading;		//how it works?


			// does isLoading work 
			//css={override}

			if (this.state.isLoading) {
	      // Render loading state ...
	      return (<ClipLoader
	      	sizeUnit={"px"}
	      	size={150}
	      	color={'#123abc'}
	      	loading={this.state.isLoading}
	      	/>);
	  } else {
	      // Render real UI ...
	      return (
	      	<div id="content" className="site-content">
	      	<div id="primary" className="content-area">
	      	<main id="main" className="site-main" role="main">	
	      	<div id="primary" className="content-area">
	      	<div className="container">
	      	<ItemsList items={this.state.items} />
	      	</div>
	      	</div>
	      	</main>
	      	</div>
	      	</div>
	      	);
	  }
	}
}

export default ItemsContainer;