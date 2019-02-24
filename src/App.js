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
      <div> {/* className={classes.root}*/}
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Header/>
        </Grid>

        <Grid item xs={12}>
          <Home/> 
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default App;
