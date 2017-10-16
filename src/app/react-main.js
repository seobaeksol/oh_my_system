import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            cpuSpeed: 'N/A',
            manufacturer: 'N/A',
            brand: 'N/A',
            cores: 'N/A',
            cpuTemp: 'N/A'
        };
        console.log('conc');
    }
    

    componentDidMount() {
        var appInst = this;

        si.cpu(function(data) {
            console.log(data);

            appInst.setState({
                manufacturer: data.manufacturer,
                brand: data.brand,
                cpuSpeed: data.speed,
                cores: data.cores
            })
        });

        si.cpuTemperature(function(data) {
            console.log(data);

            appInst.setState({
                cpuTemp: data.main
            })
        })
    }

    render() {
        return (
            <div className="si_block">
                <h3 className="info_title">CPU INFO</h3>
                <div className="resource_block">
                    <h5 className="resource_label">NAME</h5><p className="resource_value">{this.state.manufacturer} {this.state.brand}</p>
                </div>
                <div></div>
                <div className="resource_block">
                    <h5 className="resource_label">CPU GHz</h5><p className="resource_value">{this.state.cpuSpeed}</p>
                    <h5 className="resource_label">CPU Cores</h5><p className="resource_value">{this.state.cores}</p>
                    <h5 className="resource_label">CPU Temp</h5><p className="resource_value">{this.state.cpuTemp}</p>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
)