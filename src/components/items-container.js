import React, { Component } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import Grid from '@material-ui/core/Grid';

import Item from './item'
import { fetchItems } from '../services/api'

//todo : make spinner global for app 
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

/*function ItemsList(props) {
  const items = props.items;
  const listItems = items.map((item) =>
    <Item item={number}/>
  );
  return (

    <ul>{listItems}</ul>
  );
}*/
const ItemsList = ({ items }) => {
	let rows = [[]];

	for (let i = 0; i < Math.ceil(items.length / 3); i++){
		rows[i] = items.slice(i * 3, (i + 1) * 3);
	}
	debugger;
	return rows.map(row => {
	    return (<Grid container item xs={12}> <GridRow row={row}/> </Grid>);
	});
};

const GridRow = ({row}) => {
	//debugger;
	return row.map(i => {
	    return (<Grid item xs={4}> <Item item={i} key={i.id} /> </Grid>);
	});
}

class ItemsContainter extends Component {

	state = {
		isLoading: false, 
		items : []
	};

	componentDidMount() {
		this.initItems();
	}

	initItems() {
		debugger;
		this.setState({isLoading : true});
		fetchItems().then(
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
			return (<ItemsList items={this.state.items} />);
	    }
	}
} 

export default ItemsContainter;
