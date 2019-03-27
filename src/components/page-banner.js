import React, { Component } from 'react';


class PageBanner extends Component {

  render() {
    let url = this.props.background;
  	let backgroundStyle = {
  		background: 'url(' + url + ')', 
  		backgroundSize: 'cover',
  		backgroundPosition: 'center center'
  	};

    return (
    	<React.Fragment>
    	<div className="hero-content big-hero">
        <div className="container">
          {this.props.children}
        </div>
  		</div>
  		<div className="hero-image" style={backgroundStyle}></div>
  		</React.Fragment>
    );
  }
}

export default PageBanner;
