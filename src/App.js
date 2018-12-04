import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

import {API_KEY, CALENDAR_ID} from './const';



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
  },
  eventList: {
    listStyle: "none",
    paddingLeft: 0
  }
}

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
        keys.sort();
        console.log("keys: ", keys);
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
          <h2>Scheduled Park Rentals</h2>
          {this.state.calendarKeys && this.state.calendarKeys.map(key => (
              <div key={key}>
                <h3>{key}</h3>
                <ul className={classes.eventList}>
                  {this
                    .state
                    .calendarData[key]
                    .map(event => <li key={event.id}>{event.summary}</li>)}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
