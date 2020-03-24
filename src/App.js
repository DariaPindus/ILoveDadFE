import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './App.css';
import './woocommerce.css';

import Home from './components/home';
import PageBanner from './components/page-banner';
import InlineCategories from './components/inline-categories';
import PageContent from './components/page-content';
import AboutPage from './components/about';
import { BrowserRouter as Router , Route, Switch, Redirect } from "react-router-dom";

/*className={classes.root}*/
class App extends Component {

  render() {
  	document.body.classList.add('archive', 'post-type-archive', 'post-type-archive-product','woocommerce',
  								'woocommerce-page','woocommerce-js','hfeed');	
    return (
      <Router>
      
          <Route exact path="/" render={() => (
              <Redirect to="/categories/all"/>
          )}/>
          <Route path="/categories" component={Home} />
      <Route path={`/about`} component={AboutPage} />
      </Router>
    );
  }
}

export default App;
