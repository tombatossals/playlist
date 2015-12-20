import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main'; // Our custom react component
import NavBar from './components/navbar'; // Our custom react component
import LeftMenu  from './components/left-menu'; // Our custom react component

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
ReactDOM.render(<Main />, document.getElementById('main'));
ReactDOM.render(<NavBar />, document.getElementById('navbar'));
ReactDOM.render(<LeftMenu />, document.getElementById('left-menu'));