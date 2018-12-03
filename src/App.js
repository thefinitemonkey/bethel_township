import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

const styles = {
  bodyLayout: {
    margin: 15
  },
  calendarDisplay: {
    border: 0,
    width: 800,
    height: 600,
    frameborder: 0,
    scrolling: "no"
  }
}
class App extends Component {
  render() {
    const {classes} = this.props;
    console.log("classes: ", classes);
    return (
      <div className={classes.bodyLayout}>
        <h1>Bethel Township, Clark County, OH</h1>
        <p>Our site is currently undergoing maintenance. In the meantime, calendar
          information for the availability of Styer and Dennelsville park facilities can
          be viewed below.</p>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=styer.park%40gmail.com&ctz=America%2FNew_York"
          className={classes.calendarDisplay}></iframe>
      </div>
    );
  }
}

export default withStyles(styles)(App);
