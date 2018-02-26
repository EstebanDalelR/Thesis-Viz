import React, { Component } from 'react';
class TableRow extends Component {
/*     constructor(props) {
        super(props);
        this.state = {}
    } */
    render() {
        return (
            <tr>
                <td>{this.props.tableRow[0]}</td>
                <td>{this.props.tableRow[1]}</td>
                <td>{this.props.tableRow[2]}</td>
                <td>{this.props.tableRow[3]}</td>
                <td>{this.props.tableRow[4]}</td>
                <td>{this.props.tableRow[5]}</td>
                <td>{this.props.tableRow[6]}</td>
                <td>{this.props.tableRow[7]}</td>
            </tr>
        )
    }
}

export default TableRow;