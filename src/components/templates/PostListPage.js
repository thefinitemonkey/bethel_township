import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { POSTS_API_URL } from '../../const';

import PostTile from '../posts/PostTile';

const styles = {
    recentPostsList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flexStart",
    },
    h2: {
        marginTop: 0
    },
};

class PostListPage extends PureComponent {
    state = {
        recentPosts: []
    };

    componentDidMount = () => {
        // Get the list of posts for the specified range and using any categories
        // defined in the props
        let url = POSTS_API_URL;
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
                <h2 className={classes.h2}>All Notices</h2>
                {this.state.recentPosts && this.state.recentPosts.map((post, id) => {
                    let link = post.link.split('wp');
                    console.log("post id: ", post.id);
                    return <PostTile key={id} link={`/posts${link[1]}`} id={post.id} title={post.title.rendered} excerpt={post.excerpt.rendered} />
                }
                )}
                <div className={classes.seeAll}></div>
            </div>
        )
    }
}

export default withStyles(styles)(PostListPage);