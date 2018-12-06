import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import HeaderNavItem from './HeaderNavItem';

import {ROOT_MENU_URL, SECONDARY_MENU_URL} from '../../const';

const styles = {
    sticky: {
        position: "fixed",
        top: 0,
        width: "100%",
        height: 50,
        backgroundColor: "white",
        padding: 10
    },
    primaryWrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        marginBottom: 8
    },
    secondaryWrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center"
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
            .then(json => this.setState({primaryMenu: json}, () => {
                // Determine which top-level page we're on
                const currentLoc = new URL(window.location);
                let path = currentLoc.pathname;
                let slugs = path.split("/");
                let slug = slugs[1];
                if (slug) {
                    // Find the menu item with the same slug and click it
                    let items = json.filter(item => item.slug === slug);
                    if (items.length) this.onMenuClick(null, items[0], 0);
                }
        
            }))
            .catch(e => {
                console.log("error getting root menu: ", e);
                this.setState({primaryMenu: []})
            });
    }

    onMenuClick = (e, item, level) => {
        // If the level of the nav item is 0 then get the related secondary nav links
        // for display
        if (level === 0) {
            const url = SECONDARY_MENU_URL + item.id;
            fetch(url)
                .then(response => response.json())
                .then(json => this.setState({secondaryMenu: json}))
                .catch(e => {
                    console.log("error getting secondary menu: ", e);
                    this.setState({secondaryMenu: []});
                });
        }
    }

    render() {
        const {classes} = this.props;
        const primaryLength = this.state.primaryMenu.length;
        const secondaryLength = this.state.secondaryMenu.length;

        return (
            <div className={classes.sticky}>
                <div className={classes.primaryWrapper}>
                    {this
                        .state
                        .primaryMenu
                        .map((item, index) => (<HeaderNavItem
                            key={index}
                            index={index}
                            length={primaryLength}
                            navLevel={0}
                            item={item}
                            onMenuClick={this.onMenuClick}/>))}
                </div>
                <div className={classes.secondaryWrapper}>
                    {this
                        .state
                        .secondaryMenu
                        .map((item, index) => (<HeaderNavItem
                            key={index}
                            index={index}
                            length={secondaryLength}
                            navLevel={1}
                            item={item}
                            onMenuClick={this.onMenuClick}/>))}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(HeaderMenu);