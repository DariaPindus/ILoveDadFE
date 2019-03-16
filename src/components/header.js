import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { fetchCategories } from '../services/api'

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));


const NavigationItem = (props) => {
	let liClasses = "menu-item menu-item-type-custom menu-item-object-custom";
	let childClasses = "menu-item menu-item-type-taxonomy menu-item-object-nova_menu";
	if (props.childElements.length > 0) 
		liClasses += "menu-item-has-children has_children"

	return (
		<li className={liClasses} ><a href="#">{props.name}</a> 
		{props.childElements.length > 0 &&
			<span class="dropdown-toggle"></span>
		<ul class="sub-menu nav-menu" > {/*style="left: 469.354px;"*/}
		{props.childElements.map(function(child, idx){
			return (
				<li key={idx} class={childClasses}><a href={child.route}>{child.name}</a></li>
				)
		})}
		</ul>
	}
	</li>
	);
}

const NavigationItems = (props) => {

	return props.map(navItem => {
		return (<NavigationItem navItem={navItem}></NavigationItem>);
	});
}


class Header extends Component {
	constructor(props){
		super(props);
		this.state = {
			navigationItems : [
				{
					id : "categs",
					name : "Категории", 
					childElements : [], 
					route : ""		
				}, 
				{
					id : "about",
					name : "О нас", 
					route : ""		
				}, 
				{
					id : "contacts",
					name : "Контакты", 
					route : ""		
				}
			] 
		}
	}

	SITE_BRANDING_NAME = "Мой сайт",

	/*todo: poprobovat' async*/
	componentWillMount : function () {
		fetchCategories().then(response => {
			let navigationItems = this.state.navigationItems;
			let categsInd = navigationItems.map(e => e.key).indexOf('categs');
			let categs = navigationItems[categsInd];
			categs.childElements = response;
			navigationItems[categsInd] = categs;
			this.setState(navigationItems);
		});
	}

	render () {
		return (
			<React.Fragment>
				<header id="masthead" class="site-header">
					<div class="container header-container">
						<div class="navbar-header">
							<div class="site-branding">
								{SITE_BRANDING_NAME}
							</div>

							<span class="menu-toggle-content">
								<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><i class="fa fa-bars" aria-hidden="true"></i></button>
							</span>
						</div>

						<nav id="site-navigation" class="main-navigation site-navigation">
							<div class="menu-primary-menu-container">
								<ul id="primary-menu" class="menu nav-menu">
									<NavigationItems />
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
