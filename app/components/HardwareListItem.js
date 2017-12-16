import React, { Component } from 'react';
import HardwareSensor from './HardwareSensor';

class HardwareListItem extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            isVisible: false
        }
    }
    
    toggleVisible() {
        let isVisible = !this.state.isVisible

        this.setState({
            isVisible: isVisible
        })
    }


    render() {

        let sensorComponents = this.props.info.sensors.map((item) => <HardwareSensor sensor={item} key={item.name}/>)

        let table = (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th className="border-top-0">
                            Sensor
                        </th>
                        <th className="border-top-0">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { sensorComponents }
                </tbody>
            </table>
        )

        return (
            <div className="row">
                <div className="col-sm">
                    <h3 className="border border-top-0 border-right-0 border-left-0" onClick={this.toggleVisible.bind(this)}>
                        <i className={`fas ${this.state.isVisible ? ' fa-angle-down' : ' fa-angle-right'}`}></i>&nbsp;{this.props.info.category}&nbsp;
                        <small className="text-muted">{this.props.info.name}</small>
                    </h3>
                    { this.state.isVisible ? table : null }
                </div>
            </div>
        );
    }
}

export default HardwareListItem;