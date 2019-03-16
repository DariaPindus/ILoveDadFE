import React, { Component } from 'react';


class PageBanner extends Component {

	const PAGE_BANNER_URL = "https://mllj2j8xvfl0.i.optimole.com/w:auto/h:auto/q:90/https://s20206.pcdn.co/wp-content/uploads/sites/95/2017/01/ceramic-kettle-header-1920x615.jpg",

  render() {
    return (
    	<div class="hero-content big-hero">
    		<div class="container">
				<h5 class="">Take home</h5>
				<h1 class="hero-title ">A little piece of the<br>savor lifestyle.</h1>
				<a href="#content" class="hero-btn"><i class="fa fa-angle-down" aria-hidden="true"></i></a>					
			</div>
		</div>
		<div class="hero-image" style={"background: url(" + PAGE_BANNER_URL + "); background-size: cover; background-position: center center;"}></div>

    );
  }
}

export default PageBanner;
