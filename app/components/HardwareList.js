import React, { Component } from 'react';

import HardwareListItem from './HardwareListItem';

class HardwareList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }
    
    
    render() {
        let infoComponents = this.props.infos.map((item, i) => 
            <HardwareListItem info={item} key={i} />
        );
        
        return (
            <div>
                {infoComponents}
            </div>
        );
    }
}

export default HardwareList;