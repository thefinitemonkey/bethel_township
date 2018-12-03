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

const API_KEY = "AIzaSyASEAVn4eRhFpHbbK3bAjYHLOc5r1Yb5i0";
const CALENDAR_ID = "styer.park@gmail.com";

class App extends Component {
  state = {
    calendarData: null,
    calendarDataError: null
  };

  componentDidMount = () => {
    let date = new Date(Date.now() - (24 * 60 * 60 * 1000));
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${date.toISOString()}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log("calendar json: ", json);
        // Group events by date
        let events = {};
        let keys = [];
        json
          .items
          .forEach(event => {
            const startDate = event.start.date;
            if (!events[startDate]) {
              events[startDate] = [];
              keys.push(startDate);
            }
            events[startDate].push(event);
          });
        console.log("events by date: ", events);
        this.setState({calendarData: events, calendarKeys: keys, calendarDataError: null})
      })
      .catch(this.setState({calendarDataError: "No reservations to display at this time", calendarData: null, calendarKeys: null}));
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.bodyLayout}>
        <h1>Bethel Township, Clark County, OH</h1>
        <p>Our site is currently undergoing maintenance. In the meantime, calendar
          information for the availability of Styer and Donnelsville park facilities can
          be viewed below.</p>
        <div>
          {this.state.calendarKeys && this.state.calendarKeys.map(key => {
            console.log("key: ", key);
            return (
              <div key={key}>
                <h2>{key}</h2>
                <ul>
                  {this
                    .state
                    .calendarData[key]
                    .map(event => <li key={event.id}>{event.summary}</li>)}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
