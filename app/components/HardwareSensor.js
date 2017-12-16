import React, { Component } from 'react';

class HardwareSensor extends Component {
    render() {
        return (
            <tr>
                <th>{this.props.sensor.name}</th>
                <td>{this.props.sensor.value}</td>
            </tr>
        );
    }
}

export default HardwareSensor;