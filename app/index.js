'use strict'

import React from 'react';
import ReactDOM from 'react-dom';

import HardwareList from './components/HardwareList';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <HardwareList/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)