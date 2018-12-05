import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

import RentalCalendar from './components/parks/RentalCalendar';
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
          <h1>Bethel Township, Clark County, OH</h1>
          <p>Our site is currently undergoing maintenance. In the meantime, calendar
            information for the availability of Styer and Donnelsville park facilities can
            be viewed below.</p>
          <RentalCalendar/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
