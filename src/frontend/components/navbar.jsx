/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import AppCanvas from 'material-ui/lib/app-canvas';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

import PlayListCard from './playlist-card';

const containerStyle = {
  textAlign: 'left',
};

const standardActions = [
  {
    text: 'Okay',
  },
];

const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({muiTheme: newMuiTheme});
  },

  _handleRequestClose() {
    this.setState({
      open: false,
    });
  },

  _handleTouchTap() {
    this.setState({
      open: true,
    });
  },

  render() {
    return (
      <AppBar
        className="mui-dark-theme"
        title="Hello World"
        onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}>
        <div className="action-icons">
          <IconButton icon="navigation-more-vert" />
          <IconButton icon="action-favorite-outline" />
          <IconButton icon="action-search" />
        </div>
      </AppBar>
    );
  },
});

export default Main;
