import React, { Component } from 'react';
import Spinner from '../Spinner';

import { fetchItems } from '../../services/shelf/actions';

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
		isLoading: false
	};

	componentDidMount() {
		this.handleFetchProducts();
	}

	render() {
		const {isLoading} = this.state;

			// does isLoading work 
		return (
			 <ClipLoader
		          css={override}
		          sizeUnit={"px"}
		          size={150}
		          color={'#123abc'}
		          loading={isLoading}
		        />
			<ItemsList items={items} />
			);
	}
} 

export default ItemsContainter;
