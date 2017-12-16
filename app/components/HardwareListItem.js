import React, { Component } from 'react';
import HardwareSensor from './HardwareSensor';

class HardwareListItem extends Component {
    constructor(props, context) {
        super(props, context);
        
    }
    

    render() {

        let sensorComponents = [];

        for (let i in this.props.info.sensors) {
            let item = this.props.info.sensors[i]
            sensorComponents.push(<HardwareSensor sensor={item} key={item.name}/>)
        }

        return (
            <div className="row">
                <div className="col-sm">
                    <h3 className="border border-top-0 border-right-0 border-left-0">{this.props.info.category}</h3><p>{this.props.info.name}</p>
                    {sensorComponents}
                </div>
            </div>
        );
    }
}

export default HardwareListItem;