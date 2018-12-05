import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';

import {API_KEY, CALENDAR_ID} from '../../const';

const styles = {
    eventFlex: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    eventDate: {
        width: 185,
        padding: 10,
        border: "1px gray solid",
        margin: 10
    },
    eventList: {
        listStyle: "none",
        paddingLeft: 0
    },
    h3: {
        marginTop: 8
    }
}

class RentalCalendar extends PureComponent {
    state = {
        calendarData: null,
        calendarKeys: null,
        calendarDataError: null
    };

    componentDidMount = () => {
        // Get yesterday's date and query the Google Calendar API for all events forward
        // from that date for display
        let date = new Date(Date.now() - (24 * 60 * 60 * 1000));
        let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${date.toISOString()}`;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                // Group events by date and get the keys for those groupings
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
                // Sort the keys so the events display in sorted date order
                keys.sort();
                this.setState({calendarData: events, calendarKeys: keys, calendarDataError: null})
            })
            .catch(this.setState({calendarDataError: "No reservations to display at this time", calendarData: null, calendarKeys: null}));
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <h2>Scheduled Park Rentals</h2>
                <div className={classes.eventFlex}>
                    {this.state.calendarKeys && this
                        .state
                        .calendarKeys
                        .map(key => {
                            const date = new Date(key);
                            const dateOptions = {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            };
                            const displayDate = date.toLocaleDateString('en-US', dateOptions);
                            return (
                                <div key={key} className={classes.eventDate}>
                                    <h3 className={classes.h3}>{displayDate}</h3>
                                    <ul className={classes.eventList}>
                                        {this
                                            .state
                                            .calendarData[key]
                                            .map(event => <li key={event.id}>{event.summary}</li>)}
                                    </ul>
                                </div>
                            )
                        })}</div>
            </div>
        )
    }
}

export default withStyles(styles)(RentalCalendar);