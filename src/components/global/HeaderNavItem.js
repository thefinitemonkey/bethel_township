import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    primaryWrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center"
    },
    firstItem: {
        marginRight: 15
    },
    lastItem: {
        marginLeft: 15
    },
    middleItems: {
        marginLeft: 15,
        marginRight: 15
    },
    link: {
        color: "black",
        textDecoration: "none"
    }
};

class HeaderNavItem extends PureComponent {
    state = {}

    componentDidMount = () => {}

    onMenuClick = (e, item, level) => {
        this
            .props
            .onMenuClick(e, item, level);
    }

    render() {
        let {classes, index, length, item, navLevel} = this.props;

        // Set the appropriate classes for the menu item
        let classesObj;
        if (index === 0) {
            classesObj = classes.firstItem;
        } else if (index === length) {
            classesObj = classes.lastItem;
        } else {
            classesObj = classes.middleItems;
        }
        // Return the menu item for rendering
        let url = new URL(item.link);
        let path = url.pathname.split("/wp")[1];
        return (
            <div key={item.id} className={classesObj}>
                <Link to={path}
                    className={classes.link}
                    onClick={e => {
                    this.onMenuClick(e, item, navLevel)
                }}>{item.title.rendered}</Link>
            </div>
        );
    }
}

export default withStyles(styles)(HeaderNavItem);