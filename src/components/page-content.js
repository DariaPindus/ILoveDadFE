import React, { Component } from 'react'
import InlineCategories from './inline-categories'
import ItemsContainer from './items-container'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PageContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCategory : 'all', 
			isLoading : false, 
			items : [], 
			categories : []
		};
	}
	
  	render() {
  		return (	
  			<React.Fragment>
	    		<InlineCategories categories={this.state.categories}/>
	    		{this.state.categories.map((category, i) => (
	    			<Route 
	    				path={category.route}
	    				render={() => <ItemsContainer filter={category.key}/>}
	    			/>
	    		))}
	    		
    		</React.Fragment>
    	);
  	}
}

export default PageContent;