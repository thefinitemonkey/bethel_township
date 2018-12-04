import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';

import {API_KEY, CALENDAR_ID} from '../../const';


const styles = {
    eventList: {
      listStyle: "none",
      paddingLeft: 0
    }
  }

class RentalCalendar extends PureComponent {
    state = {calendarData: null, calendarKeys: null, calendarDataError: null};
    
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
            <div>
                <h2>Scheduled Park Rentals</h2>
                {this.state.calendarKeys && this
                    .state
                    .calendarKeys
                    .map(key => (
                        <div key={key}>
                            <h3>{key}</h3>
                            <ul className={classes.eventList}>
                                {this
                                    .state
                                    .calendarData[key]
                                    .map(event => <li key={event.id}>{event.summary}</li>)}
                            </ul>
                        </div>
                    ))}
            </div>
        )
    }
}

export default withStyles(styles)(RentalCalendar);