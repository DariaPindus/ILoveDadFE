import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './App.css';
import './woocommerce.css';

import Home from './components/home';
import Header from './components/header';
import PageBanner from './components/page-banner';
import InlineCategories from './components/inline-categories';
import PageContent from './components/page-content';
import { BrowserRouter as Router , Route, Switch, Redirect } from "react-router-dom";

/*className={classes.root}*/
class App extends Component {

  render() {
  	document.body.classList.add('archive', 'post-type-archive', 'post-type-archive-product','woocommerce',
  								'woocommerce-page','woocommerce-js','hfeed');	
    return (
      <Router>
        <div id="page" className="site">
        	<Header/>
      
          <Route exact path="/" render={() => (
              <Redirect to="/categories/all"/>
          )}/>
          <Route path="/categories" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
