import React, { Component } from 'react';
import '../CSS/BioConcejal.css';
import './bogota.jpg';
class Concejal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "concejal": this.props.info,
        }
    }
    render() {
        return (
            <div className="bioConcejal">
                <img
                    className="fotoPersona"
                    src={this.state.concejal.foto}
                    alt={"Foto de " + this.state.concejal.nombre} />
                <h1 className="nombrePersona">H.C. {this.state.concejal.nombre}</h1>
                <div className="periodosAnteriores">
                    <p>Comision {this.state.concejal.comision}</p>

                </div>
                <div className="mapa">
                    <img alt="mapa de Bogota" src='http://cdn.radiosantafe.com//wp-content/uploads/2016/01/BOGOTA-MAPA.jpg' />
                </div>
                <div className="otrosDeBancada">
                    <img 
                    className="logoPartido"
                    src={this.state.concejal.fotoPartido} 
                    alt={"logo de " + this.state.concejal.partido} />
                    <h3>Otros de {this.state.concejal.partido}</h3>

                </div>
                <div className="twitterFeed">
                    <p>Twitts de @{this.state.concejal.twitter}</p>
                </div>
                <div className="hojaDeVida">
                    <h3>Hoja de Vida</h3>
                    <hr />
                </div>
            </div>
        )
    }
}

export default Concejal;