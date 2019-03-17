import React, { Component } from 'react';


const PAGE_BANNER_URL = "https://mllj2j8xvfl0.i.optimole.com/w:auto/h:auto/q:90/https://s20206.pcdn.co/wp-content/uploads/sites/95/2017/01/ceramic-kettle-header-1920x615.jpg";

class PageBanner extends Component {

  render() {
  	let backgroundStyle = {
  		background: 'url(' + PAGE_BANNER_URL + ')', 
  		backgroundSize: 'cover',
  		backgroundPosition: 'center center'
  	};

    return (
    	<React.Fragment>
    	<div className="hero-content big-hero">
    		<div className="container">
				<h5 className="">Take home</h5>
				<h1 className="hero-title ">A little piece of the<br/>savor lifestyle.</h1>
				<a href="#content" className="hero-btn"><i className="fa fa-angle-down" aria-hidden="true"></i></a>					
			</div>
		</div>
		<div className="hero-image" style={backgroundStyle}></div>
		</React.Fragment>
    );
  }
}

export default PageBanner;
