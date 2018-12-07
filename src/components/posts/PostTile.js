import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    tileContainer: {
        padding: 8
    },
    postTitle: {
        fontWeight: 700
    }
};

class PostTile extends PureComponent {
    state = {};

    componentDidMount = () => {

    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.tileContainer}>
                <div className={classes.postTitle}>{this.props.title}</div>
                <div>{this.props.excerpt}</div>
            </div>
        )
    }
}

export default withStyles(styles)(PostTile);