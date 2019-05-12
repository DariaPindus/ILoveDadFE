import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import Category from './category';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { fetchCategories } from '../services/api';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));


const NavigationItem = (props) => {
	let item = props.navItem;
	let liClasses = "menu-item menu-item-type-custom menu-item-object-custom";
	let childClasses = "menu-item menu-item-type-taxonomy menu-item-object-nova_menu";
	if (item.childElements && item.childElements.length > 0) 
		liClasses += "menu-item-has-children has_children"
	return (
		<li className={liClasses} aria-haspopup="true"><HashLink to={item.route}>{item.name}</HashLink> 
		{item.childElements && item.childElements.length > 0 && <React.Fragment>
		<span className="dropdown-toggle"></span>
		<ul className="sub-menu nav-menu" >
		{item.childElements.map(function(child, idx){
			return (
				<li key={idx} className={childClasses}><Category value={child}/></li>
				)
		})}
		</ul>
		</React.Fragment>}
		</li>
	);
}

const NavigationItems = (props) => {

	return props.items.map(navItem => {
		return (<NavigationItem key={navItem.id} navItem={navItem}></NavigationItem>);
	});
}


class Header extends Component {
	constructor(props){
		super(props);
		this.state = {
			navigationItems : [
				{
					id : "about",
					name : "О нас", 
					route : "/about"		
				}, 
				{
					id : "contacts",
					name : "Контакты", 
					route : "/#contact-info"		
				}
			] 
		}
	}

	SITE_BRANDING_NAME = "Домой"

	render () {
		return (
			<React.Fragment>
				<header id="masthead" className="site-header">
					<div className="container header-container">
						<div className="navbar-header">
							<div className="site-branding">
								<Link to="/"> 
									{this.SITE_BRANDING_NAME}
								</Link>
							</div>

							<span className="menu-toggle-content">
								<button className="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><i className="fa fa-bars" aria-hidden="true"></i></button>
							</span>
						</div>

						<nav id="site-navigation" className="main-navigation site-navigation">
							<div className="menu-primary-menu-container">
								<ul id="primary-menu" className="menu nav-menu">
									<NavigationItems items={this.state.navigationItems}/>
								</ul>
							</div> 
						</nav>
					</div>
				</header>
			</React.Fragment>
		)	
	}
}
export default Header;
