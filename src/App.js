import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './App.css';

import Home from './components/home';
import Header from './components/header';

class App extends Component {
  render() {
    return (
      <div id="page" class="site"> {/* className={classes.root}*/}
        <div id="hero">
          
        </div>
      </div>
    );
  }
}

export default App;
