import React, { Component } from 'react';
import  RepCamara  from "./RepCamara.js";
class ObservaCamara extends Component {
/*     constructor(props) {
        super(props);
    } */
    renderRepCamara() {
        return this.props.info.map(
            (t, i) => {
                return <RepCamara repCamara={t} key={i} />;
            }
        );
    }
    render() {
        return (
            <table >
                <tbody>
                    {this.renderRepCamara()}
                </tbody>
            </table>
        )
    }
}

export default ObservaCamara;