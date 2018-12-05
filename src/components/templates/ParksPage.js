import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PAGES_API_URL, WP_ROOT, FEATURED_MEDIA_API_URL} from '../../const';
import {pageContentError} from '../../errors/errors_const';

import RentalCalendar from '../parks/RentalCalendar';

const styles = {
    imageDiv: {
        maxHeight: 300,
        overflow: "hidden"
    },
    featuredImg: {
        width: "100%"
    }
};

class ParksPage extends PureComponent {
    state = {
        pageHTML: null,
        pageTitle: null,
        featuredImage: null
    };

    componentDidMount = () => {
        // Get the data for the home page to be displayed
        const url = PAGES_API_URL + "parks";
        fetch(url)
            .then(response => response.json())
            .then(json => {
                // Filter the returned list to get only the item that matches the base site URL
                // (slugs aren't unique across navigation layers)
                let filteredJSON = json.filter(item => item.link === WP_ROOT + "parks/");
                // If there aren't any matches then throw an exception
                if (!filteredJSON.length) 
                    throw new pageContentError("Parks", "No page matching slug found");
                
                // Set up the content to be displayed
                const parksJSON = filteredJSON[0];
                this.setState({pageTitle: parksJSON.title.rendered, pageHTML: parksJSON.content.rendered});
                // Check for the featured images
                this.getFeaturedImages(parksJSON);
            })
            .catch(error => {
                console.log("error retrieving parks page data: ", error);
                this.setState({pageHTML: "There was an error getting the parks page content. Please try again soon."});
            });
    }

    getFeaturedImages = json => {
        // Check that there is a featured media element
        if (json.featured_media === 0) 
            return;
        
        // Get the media data
        const url = FEATURED_MEDIA_API_URL + json.featured_media;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                // If there is no image data then clear state and return
                // Set the featured image to the first media item
                this.setState({featuredImage: json})
            })
            .catch(error => {
                console.log("error retrieveing parks page media: ", error);
                this.setState({featuredImage: null});
            })
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <h1>{this.state.pageTitle}</h1>
                <div className={classes.imageDiv}>{this.state.featuredImage && <img
                        className={classes.featuredImg}
                        src={this.state.featuredImage.media_details.sizes.full.source_url}
                        alt={this.state.featuredImage.alt_text}/>}</div>
                <div
                    dangerouslySetInnerHTML={{
                    __html: this.state.pageHTML
                }}/>
                {this.state.pageHTML && <RentalCalendar/>}
            </div>
        )
    }
}

export default withStyles(styles)(ParksPage);