import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { POSTS_API_URL, POSTS_DATE_RANGE } from '../../const';

import PostTile from './PostTile';

const styles = {
    recentPostsList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flexStart",
    },
    h2: {
        marginTop: 0
    },
    seeAll: {
        display: "flex",
        flexFlow: "row",
        alignItems: "baseline"
    },
    seeAllLink: {
        '&:link': {color: "#00e"},
        '&:visited': {color: "#00e"},
        '&:hover': {color: "#00e"},
        '&:active': {color: "#00e"},
        textDecoration: "none"
    }
};

class PostSidebar extends PureComponent {
    state = {
        recentPosts: []
    };

    componentDidMount = () => {
        // Get the list of posts for the specified range and using any categories
        // defined in the props
        let url = POSTS_API_URL + `after=${POSTS_DATE_RANGE}`;
        if (this.props.category) url += `&categories=${this.props.category}`;
        console.log("posts url: ", url);
        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log("posts list: ", json);
                this.setState({ recentPosts: json });
            })
            .catch(error => {
                console.log("error retrieving posts for sidebar: ", error);
            })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.recentPostsList}>
                <div className={classes.seeAll}>
                    <div><h2 className={classes.h2}>Notices</h2></div>
                    <div>&nbsp;(<Link className={classes.seeAllLink} to={`/post_list/`}>See All</Link>)</div>
                </div>
                
                {this.state.recentPosts && this.state.recentPosts.map((post, id) => {
                    let link = post.link.split('wp');
                    console.log("post id: ", post.id);
                    return <PostTile key={id} link={`/posts${link[1]}`} id={post.id} title={post.title.rendered} excerpt={post.excerpt.rendered} />
                }
                )}
            </div>
        )
    }
}

export default withStyles(styles)(PostSidebar);