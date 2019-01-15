import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { POST_API_URL, WP_ROOT, FEATURED_MEDIA_API_URL } from '../../const';
import { pageContentError } from '../../errors/errors_const';

const styles = {
    imageDiv: {
        maxHeight: 300,
        overflow: "hidden"
    },
    featuredImg: {
        width: "100%"
    },
    h1: {
        marginTop: 0
    }
};

class BasicPage extends PureComponent {
    state = {
        pageHTML: null,
        pageTitle: null,
        featuredImage: null
    };

    componentDidMount = () => {
        this.buildPageContent();
    }

    componentWillReceiveProps = () => {
        this.buildPageContent();
    }

    buildPageContent = () => {
        // Get the data for the page to be displayed
        const currentLoc = new URL(window.location);
        let id = currentLoc.searchParams.get("id");
        /*
        let path = currentLoc.pathname;
        let slugs = path.split("/");
        let slugPos = slugs.length - 2;
        let slug = slugs[slugPos];
        */

        const url = POST_API_URL + id;
        console.log("post url: ", url);
        console.log("post url: ", url);
        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log("post json: ", json);
                /*
                console.log("WP_ROOT + path: ", WP_ROOT + path.slice(1));
                // Filter the returned list to get only the item that matches the base site URL
                // (slugs aren't unique across navigation layers)
                let filteredJSON = json.filter(item => item.link === WP_ROOT + path.slice(1));
                // If there aren't any matches then throw an exception
                if (!filteredJSON.length) 
                    throw new pageContentError(this.props.page.title.rendered, "No page matching slug found");
                
                // Set up the content to be displayed
                const pageJSON = filteredJSON[0];
                */
                let pageJSON = json;
                console.log("pageJSON: ", json);
                this.setState({ pageTitle: pageJSON.title.rendered, pageHTML: pageJSON.content.rendered });
                // Check for the featured images
                this.getFeaturedImages(pageJSON);
            })
            .catch(error => {
                console.log("error retrieving post data: ", error);
                this.setState({ pageHTML: "There was an error getting the page content. Please try again soon." });
            });
    }

    getFeaturedImages = json => {
        // Check that there is a featured media element
        if (json.featured_media === 0) {
            this.setState({ featuredImage: null })
            return;
        }

        // Get the media data
        const url = FEATURED_MEDIA_API_URL + json.featured_media;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                // If there is no image data then clear state and return Set the featured image
                // to the first media item
                this.setState({ featuredImage: json })
            })
            .catch(error => {
                console.log("error retrieveing home page media: ", error);
                this.setState({ featuredImage: null });
            })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <h1 className={classes.h1}>{this.state.pageTitle}</h1>
                <div className={classes.imageDiv}>{this.state.featuredImage && <img
                    className={classes.featuredImg}
                    src={(this.state.featuredImage.media_details.sizes.full &&
                        this.state.featuredImage.media_details.sizes.full.source_url) ||
                        this.state.featuredImage.source_url}
                    alt={this.state.featuredImage.alt_text} />}</div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: this.state.pageHTML
                    }} /></div>
        )
    }
}

export default withStyles(styles)(BasicPage);