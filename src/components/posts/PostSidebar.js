import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {POSTS_API_URL, POSTS_DATE_RANGE} from '../../const';

const styles = {};

class PostSidebar extends PureComponent {
    state = {};

    componentDidMount = () => {
        // Get the list of posts for the specified range and using any categories
        // defined in the props
        let url = POSTS_API_URL + `after=${POSTS_DATE_RANGE}` + (this.props.category && `&categories=${this.props.category}`);
        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log("posts list: ", json);
            })
            .catch(error => {
                console.log("error retrieving posts for sidebar: ", error);
            })
    }

    render() {
        const {classes} = this.props;

        return (
            <div></div>
        )
    }
}

export default withStyles(styles)(PostSidebar);