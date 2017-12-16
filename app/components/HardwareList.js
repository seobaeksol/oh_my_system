import React, { Component } from 'react';

import HardwareListItem from './HardwareListItem';

class HardwareList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }
    
    
    render() {
        let infoComponents = [];
 
        for (let info in this.props.infos) {
            let aItem = this.props.infos[info]
            infoComponents.push(<HardwareListItem info={aItem} key={aItem.name} />)
        }

        return (
            <div>
                {infoComponents}
            </div>
        );
    }
}

export default HardwareList;