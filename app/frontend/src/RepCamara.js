import React, { Component } from 'react';
class RepCamara extends Component {
/*     constructor(props) {
        super(props);
        this.state = {}
    } */
    render() {
        return (
            <tr>
                <td>{this.props.repCamara[0]}</td>
                <td>{this.props.repCamara[1]}</td>
                <td>{this.props.repCamara[2]}</td>
                <td>{this.props.repCamara[3]}</td>
            </tr>
        )
    }
}

export default RepCamara;