import React, { Component } from 'react';

class Category extends Component {

  	render() {
  		return (	
  			<a href={"/categories/" + this.props.value.route}>{this.props.value.name}</a>
    	);
  	}
}

export default Category;