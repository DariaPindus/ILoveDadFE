import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Category extends Component {

  	render() {
  		return (	
  			<Link to={"/categories/" + this.props.value.route}>{this.props.value.name}</Link>
    	);
  	}
}

export default Category;