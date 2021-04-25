import React from 'react';
import ReactDOM from 'react-dom';
import ClickTracker from './components/ClickTracker';
import App from './App';
// implement change request: click tracking
// uses render props on the overall App.
const AppWithClicks = <ClickTracker render={() => <App />}/>

ReactDOM.render(AppWithClicks, document.getElementById('app'));