import React, { Component } from 'react'
import InlineCategories from './inline-categories'
import Item from './item'
import { fetchItems } from '../services/api'

class PageContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCategory : 'all', 
			isLoading : false, 
			items : []
		};
	}

	handleSelectedCategory = (newSelected) => {
		this.setState(selectedCategory : newSelected);
		this.loadItems();
	}

	componentDidMount() {
		this.loadItems();
	}

	loadItems() {
		debugger;
		let cat = this.state.selectedCategory;
		this.setState({isLoading : true});
		fetchItems(cat).then(
			response => {
				this.setState({items: response});
				this.setState({isLoading : false});
			});
	}

  	render() {
  		return (	
    		<InlineCategories onCategorySelected={this.handleSelectedCategory}/>
    		<ItemsContainer items={this.state.items}/>
    	);
  	}
}

export default PageContent;