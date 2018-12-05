import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import HomePage from './components/templates/HomePage';
import ParksPage from './components/templates/ParksPage';
import BasicPage from './components/templates/BasicPage';
import 'typeface-roboto';

import HeaderMenu from './components/global/HeaderMenu';

const styles = {
  bodyLayout: {
    margin: 15
  },
  contentWrapper: {
    paddingTop: 65
  }
}

class App extends Component {
  componentDidMount = () => {}

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.bodyLayout}>
        <HeaderMenu/>
        <div className={classes.contentWrapper}>
          <Route exact path='/' render={(() => (
            <HomePage />
          ))} />
          <Route exact path='/home/' render={(() => (
            <HomePage />
          ))} />
          <Route exact path='/parks/' render={(() => (
            <ParksPage />
          ))} />
          <Route path='/' render={(() => (
            <BasicPage />
          ))} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
