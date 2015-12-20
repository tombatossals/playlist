/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import Divider from 'material-ui/lib/divider';
import RemoveRedEye from 'material-ui/lib/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/lib/svg-icons/social/person-add';
import ContentCopy from 'material-ui/lib/svg-icons/content/content-copy';
import ContentLink from 'material-ui/lib/svg-icons/content/link';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Download from 'material-ui/lib/svg-icons/file/file-download';


let styles = {
  menu: {
    marginRight: 32,
    marginBottom: 32,
    float: 'left',
    position: 'relative',
    zIndex: 0,
  },

  hr: {
    clear: 'both',
    border: 'none',
  },
};


const LeftMemu = React.createClass({

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
      <List>
        <ListItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
        <ListItem primaryText="Share" leftIcon={<PersonAdd />} />
        <ListItem primaryText="Get links" leftIcon={<ContentLink />} />
        <Divider />
        <ListItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
        <ListItem primaryText="Download" leftIcon={<Download />} />
        <Divider />
        <ListItem primaryText="Remove" leftIcon={<Delete />} />
      </List>
    );
  },
});

export default LeftMemu;
