import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTargetPost } from "../../actions/actions";


const styles = {
    tileContainer: {
        padding: 8
    },
    postTitle: {
        fontWeight: 700
    },
    pText: {
        marginTop: 0,
        "& p.link-more": {
            display: "none"
        }
    },
};

class PostTile extends PureComponent {
    state = {};

    componentDidMount = () => {
        console.log("tile post id: ", this.props.id);
    }

    onPostClick = id => {
        console.log("onPostClick");
        //this.props.setTargetPost(id);
    }

    render() {
        const { classes } = this.props;
        console.log("post props: ", this.props);

        return (
            <div className={classes.tileContainer}>
                <div className={classes.postTitle}>
                    <Link to={`${this.props.link}?id=${this.props.id}`}
                        onClick={e => {
                        }}>{this.props.title}</Link>
                </div>
                <div className={classes.pText}
                    dangerouslySetInnerHTML={{
                        __html: this.props.excerpt
                    }} />
            </div>
        )
    }
}

// function mapStateToProps({ }) { return {} }

function mapDispatchToProps(dispatch) {
    return {
        setTargetPost: id => dispatch(setTargetPost(id))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(PostTile)));