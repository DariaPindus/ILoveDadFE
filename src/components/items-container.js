import React, { Component } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
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
  return items.map(i => {
    return <Item item={i} key={i.id} />;
  });
};


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
		return (
			<React.Fragment>
			 <ClipLoader
		          sizeUnit={"px"}
		          size={150}
		          color={'#123abc'}
		          loading={this.state.isLoading}
		        />
			<ItemsList items={this.state.items} />
			</React.Fragment>
			);
	}
} 

export default ItemsContainter;
