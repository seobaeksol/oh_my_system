import React, { Component } from 'react';

class HardwareSensor extends Component {
    render() {
        return (
            <div>
                <p>{this.props.sensor.name}</p><p>{this.props.sensor.value}</p>
            </div>
        );
    }
}

export default HardwareSensor;