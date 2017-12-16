import React, { Component } from 'react';

class HardwareListItem extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-sm">
                    <h3 className="border border-top-0 border-right-0 border-left-0">{this.props.info.name}</h3>
                </div>
            </div>
        );
    }
}

export default HardwareListItem;