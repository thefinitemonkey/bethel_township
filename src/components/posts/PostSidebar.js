import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {POSTS_API_URL, POSTS_DATE_RANGE} from '../../const';

import PostTile from './PostTile';

const styles = {
    recentPostsList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flexStart"
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
                this.setState({recentPosts: json});
            })
            .catch(error => {
                console.log("error retrieving posts for sidebar: ", error);
            })
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.recentPostsList}>
                {this.state.recentPosts && this.state.recentPosts.map((post, id) => 
                    <PostTile key={id} title={post.title.rendered} excerpt={post.excerpt.rendered} />    
                )}
            </div>
        )
    }
}

export default withStyles(styles)(PostSidebar);