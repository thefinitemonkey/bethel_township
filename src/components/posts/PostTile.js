import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    tileContainer: {
        padding: 8
    },
    postTitle: {
        fontWeight: 700
    },
    pText: {
        marginTop: 0
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
                <div className={classes.pText}
                    dangerouslySetInnerHTML={{
                    __html: this.props.excerpt
                }}/>
            </div>
        )
    }
}

export default withStyles(styles)(PostTile);