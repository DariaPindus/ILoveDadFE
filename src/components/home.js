import React, { Component } from 'react';

import Header from './header';
import PageBanner from './page-banner';
import InlineCategories from './inline-categories';
import ItemsContainer from './items-container';

import { Router, Route } from "react-router-dom";
import { fetchCategories } from '../services/api';

const PAGE_BANNER_URL = "https://mllj2j8xvfl0.i.optimole.com/w:auto/h:auto/q:90/https://s20206.pcdn.co/wp-content/uploads/sites/95/2017/01/ceramic-kettle-header-1920x615.jpg";
const CONTACT_BANNER_URL = "/architectural-design_cut.jpg";


function MainPageBanner(){
	const backgroundStyle = {
  		background: 'url(' + PAGE_BANNER_URL + ')', 
  		backgroundSize: 'cover',
  		backgroundPosition: 'center center'
  	};

	return (
		<div id="hero">
			<div className="hero-content big-hero">
		        <div className="container">
					<h5 className="">Создайте уют</h5>
					<h1 className="hero-title ">Домашний комфорт таким <br/>каким его видите Вы.</h1>
					<a href="#content" className="hero-btn"><i className="fa fa-angle-down" aria-hidden="true"></i></a>
				</div>
			</div>
			<div className="hero-image" style={backgroundStyle}></div>
		</div>
	);
}

function ContactPageBanner(){
	const backgroundStyle = {
  		background: 'url(' + CONTACT_BANNER_URL + ')', 
  		backgroundSize: 'cover'
  	};

	return (
		<div id="belise_ribbon-widget-4">
			<div className="ribbon">
				<div className="container">
					<div className="row">
						<div class="text-center ribbon-content">
							<h5 className="ribbon-content">Свяжитесь с нами</h5>
							<h3 >Если у вас возникли вопросы, и вы хотели бы с нами связаться - воспользуйтесь формой.</h3>
							<a className="btn">Связаться</a>
						</div>
					</div>
				</div>
				<div className="ribbon-image" style={backgroundStyle}></div>
			</div>
		</div>
	);
}

function ContactInfo() {
	return(
		<footer id="colophon" class="site-footer">
			<div class="container">
				<div class="textwidget">
					<div>
						<h2>Пиндус и Ко</h2>
						<span>
							Одесса <br/>
							Телефон : +380638112358 (рандом)
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}

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
			<div id="page" className="site">
	        	<Header/>

				<MainPageBanner/>
				
				<InlineCategories categories={this.state.categories}/>
			</div>


			<Route path={`/categories/:catgKey`} component={ItemsContainer} />
			<section className="ribbon-sidebar">
				<ContactPageBanner/>
			</section>

			<ContactInfo/>
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
