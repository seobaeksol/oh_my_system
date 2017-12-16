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

        // generate info category(list)
        for (let i in this.props.infos) {
            let aItem = this.props.infos[i]
            infoComponents.push(<HardwareListItem info={aItem} key={i} />)
        }

        return (
            <div>
                {infoComponents}
            </div>
        );
    }
}

export default HardwareList;