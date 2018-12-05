import React, {PureComponent} from 'react';
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
    buttonLink: {
        border: "none",
        cursor: "pointer"
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
        return (
            <div key={item.id} className={classesObj}>
                <button
                    className={classes.buttonLink}
                    onClick={e => {
                    this.onMenuClick(e, item, navLevel)
                }}>{item.title.rendered}</button>
            </div>
        );
    }
}

export default withStyles(styles)(HeaderNavItem);