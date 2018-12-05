import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PAGES_API_URL, WP_ROOT} from '../../const';
import {pageContentError} from '../../errors/errors_const';

const styles = {};

class HomePage extends PureComponent {
    state = {
        pageHTML: null
    };

    componentDidMount = () => {
        // Get the data for the home page to be displayed
        const url = PAGES_API_URL + "home";
        fetch(url)
            .then(response => response.json())
            .then(json => {
                // Filter the returned list to get only the item that matches the base site URL
                // (slugs aren't unique across navigation layers)
                let filteredJSON = json.filter(item => item.link === WP_ROOT);
                // If there aren't any matches then throw an exception
                if (!filteredJSON.length) 
                    throw new pageContentError("Home", "No page matching slug found");
                
                // Set up the content to be displayed
                const homeJSON = filteredJSON[0];
                console.log("home page json: ", homeJSON.content.rendered);
                this.setState({pageTitle: homeJSON.title.rendered, pageHTML: homeJSON.content.rendered});
            })
            .catch(error => {
                console.log("error retrieving home page data: ", error);
                this.setState({pageHTML: "There was an error getting the home page content. Please try again soon."});
            });
    }

    render() {
        return (
            <div>
                <h1>{this.state.pageTitle}</h1><div
                    dangerouslySetInnerHTML={{
                __html: this.state.pageHTML
            }}/></div>
        )
    }
}

export default withStyles(styles)(HomePage);