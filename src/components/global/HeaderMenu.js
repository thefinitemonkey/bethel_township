import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';

import {ROOT_MENU_URL} from '../../const';

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
    }
};

class HeaderMenu extends PureComponent {
    state = {
        primaryMenu: [],
        secondaryMenu: []
    };

    componentDidMount = () => {
        // Load the primary menu data
        fetch(ROOT_MENU_URL)
            .then(response => response.json())
            .then(json => this.setState({primaryMenu: json}))
            .catch(this.setState({primaryMenu: []}));
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.primaryWrapper}>
                {this
                    .state
                    .primaryMenu
                    .map((item, index) => {
                        // Set the appropriate classes for the menu item
                        let classesObj;
                        if (index === 0) {
                            classesObj = classes.firstItem;
                        } else if (index === this.state.primaryMenu.length) {
                            classesObj = classes.lastItem;
                        } else {
                            classesObj = classes.middleItems;
                        }
                        // Return the menu item for rendering
                        return (
                            <div key={item.id} className={classesObj}>{item.title.rendered}</div>
                        );
                    })}
            </div>
        );
    }
}

export default withStyles(styles)(HeaderMenu);