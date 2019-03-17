import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './App.css';

import Home from './components/home';
import Header from './components/header';
import PageBanner from './components/page-banner';

/*className={classes.root}*/
class App extends Component {

  render() {
  	document.body.classList.add('archive', 'post-type-archive', 'post-type-archive-product','woocommerce',
  								'woocommerce-page','woocommerce-js','hfeed');	
    return (
      <div id="page" className="site">
      	<Header/>
        <div id="hero">
          <PageBanner/>
        </div>
      </div>
    );
  }
}

export default App;
