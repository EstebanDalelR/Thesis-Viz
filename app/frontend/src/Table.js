import React, { Component } from 'react';
import  TableRow  from "./TableRow.js";
class Table extends Component {
/*     constructor(props) {
        super(props);
    } */
    renderTableRow() {
        return this.props.info.map(
            (t, i) => {
                return <TableRow tableRow={t} key={i} />;
            }
        );
    }
    render() {
        return (
            <table >
                <tbody>
                    {this.renderTableRow()}
                </tbody>
            </table>
        )
    }
}

export default Table;