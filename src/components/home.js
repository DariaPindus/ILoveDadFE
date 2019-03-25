import React, { Component } from 'react';

import PageBanner from './page-banner';
import InlineCategories from './inline-categories';
import ItemsContainer from './items-container';

import { Router, Route } from "react-router-dom";
import { fetchCategories } from '../services/api';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedCategory : 'all', 
			items : [], 
			categories : []
		};
	}

	componentWillMount() {
		fetchCategories().then(response => {
			let categories = response;
			this.setState({categories : categories});
		});
	}

	render() {
		return (
			<React.Fragment>
	          <div id="hero">
	            <PageBanner/>
	          </div>
	          <InlineCategories categories={this.state.categories}/>
	          <Route path={`/categories/:catgKey`} component={ItemsContainer} />
	          {/*<Route
		        exact
		        path={match.path}
		        render={() => <h3>Please select a topic.</h3>}
		      />*/}
			</React.Fragment>
		);
	}
} 

export default Home;
