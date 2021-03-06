import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { PAGES_API_URL, WP_ROOT, FEATURED_MEDIA_API_URL } from '../../const';
import { pageContentError } from '../../errors/errors_const';
import PostSidebar from '../posts/PostSidebar';

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

class HomePage extends PureComponent {
    state = {
        pageHTML: null,
        pageTitle: null,
        featuredImage: null
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
                this.setState({ pageTitle: homeJSON.title.rendered, pageHTML: homeJSON.content.rendered });
                // Check for the featured images
                this.getFeaturedImages(homeJSON);
            })
            .catch(error => {
                console.log("error retrieving home page data: ", error);
                this.setState({ pageHTML: "There was an error getting the home page content. Please try again soon." });
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
                console.log("home featured image: ", json);
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
        console.log("featured image: ", this.state.featuredImage);
        console.log("from sizes: ", this.state.featuredImage && this.state.featuredImage.media_details.sizes.full && this.state.featuredImage.media_details.sizes.full.source_url);
        let imgA = this.state.featuredImage && this.state.featuredImage.media_details.sizes.full &&
            this.state.featuredImage.media_details.sizes.full.source_url;
        let imgB = this.state.featuredImage && this.state.featuredImage.source_url;
        console.log("imgA: ", imgA);
        console.log("imgB: ", imgB);

        return (
            <div>
            <div>
                <h1 className={classes.h1}>{this.state.pageTitle}</h1>
                <div className={classes.imageDiv}>{this.state.featuredImage && <img
                    className={classes.featuredImg}
                    src={imgA || imgB}
                    alt={this.state.featuredImage.alt_text} />}</div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: this.state.pageHTML
                    }} />
            </div>
            <div className={classes.sidebarWrapper}>
                <PostSidebar/>
            </div>
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);