import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import HomePage from './components/templates/HomePage';
import ParksPage from './components/templates/ParksPage';
import PostPage from './components/templates/PostPage';
import BasicPage from './components/templates/BasicPage';
import PostSidebar from './components/posts/PostSidebar';
import 'typeface-roboto';

import HeaderMenu from './components/global/HeaderMenu';

const styles = {
  bodyLayout: {
    margin: 15,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 1280
  },
  contentWrapper: {
    paddingTop: 65,
    display: "flex",
    displayDirection: "row"
  },
  sidebarWrapper: {
    minWidth: 300,
    maxWidth: 325,
    marginLeft: 20
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
          <div>
            <Switch>
              <Route exact path='/' render={(() => (<HomePage/>))}/>
              <Route exact path='/home/' render={(() => (<HomePage/>))}/>
              <Route exact path='/parks/' render={(() => (<ParksPage/>))}/>
              <Route path='/posts/' render={(() => (<PostPage/>))}/>
              <Route path='/' render={(() => (<BasicPage/>))}/>
            </Switch>
          </div>
          <div className={classes.sidebarWrapper}>
            <PostSidebar/>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
