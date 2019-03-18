import React, { Component } from 'react'
import InlineCategories from './inline-categories'
import ItemsContainer from './items-container'
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
		this.setState({selectedCategory : newSelected});
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
  			<React.Fragment>
	    		<InlineCategories onCategorySelected={this.handleSelectedCategory}/>
	    		<ItemsContainer items={this.state.items}/>
    		</React.Fragment>
    	);
  	}
}

export default PageContent;