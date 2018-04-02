import React, { Component } from 'react';
import "../CSS/Concejales.css"
class Concejales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            concejales: this.props.concejales,
        }
    }

    renderConcejales() {
        return this.state.concejales.map((concejal) => {
            return (
                <div className = "directorioConcejal">
                    <img 
                    src={concejal.foto} 
                    alt={"foto de "+concejal.nombre}
                    className="fotoConcejal"></img>
                    <h2> {concejal.nombre}</h2>
                    <h5>Comisión {concejal.comision}</h5>
                    <img 
                    src={concejal.fotoPartido}
                    alt={"imagen de "+concejal.partido}
                    className="fotoPartido"></img>
                    <p>{concejal.partido}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderConcejales()}
            </div>
        )
    }
}

export default Concejales;