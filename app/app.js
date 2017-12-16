'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import HardwareList from './components/HardwareList';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            hwInfos: []
        }
    }

    componentDidMount() {
        ipcRenderer.on('HW_INFOS' , this.updateHWInfo.bind(this));
    }

    updateHWInfo(event, data) {
        this.setState({
            hwInfos: data
        });

        console.dir(this.state);
    }
    
    render() {
        return (
            <div className="container">
                <HardwareList infos={this.state.hwInfos}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)