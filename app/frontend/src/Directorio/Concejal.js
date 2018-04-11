import React, { Component } from 'react';
import '../CSS/Concejal.css';
class Concejal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "concejal": this.props.info,
        }
        document.title=this.props.nombre;
    }

    render() {
        return (
            <div className="bioConcejal">
                <img
                    className="fotoPersona"
                    src={this.state.concejal.foto}
                    alt={"Foto de " + this.state.concejal.nombre} />
                <h1 className="nombrePersona">{this.state.concejal.nombre}</h1>
                <div className="periodosAnteriores">
                    <p>Comision {this.state.concejal.comision}</p>
                </div>
                <div className="otrosDeBancada">
                    <img
                        className="logoPartido"
                        src={this.state.concejal.fotoPartido}
                        alt={"logo de " + this.state.concejal.partido} />
                    <h3>Otros de {this.state.concejal.partido}</h3>

                </div>
                <div className="otrosDeComision">
                    <h3>Otros de {this.state.concejal.comision}</h3>
                </div>
                <div className="twitterFeed">
                    <p>Tweets de @{this.state.concejal.twitter}</p>
                </div>
                <div className="votaciones">
                    <h3>Votaciones</h3>
                    <hr />
                    <img alt="mapa de Bogota" src='http://cdn.radiosantafe.com//wp-content/uploads/2016/01/BOGOTA-MAPA.jpg' />
                </div>
                <div className="hojaDeVida">
                    <h3>Hoja de Vida</h3>
                    <hr />
                </div>
                <div className="proyectosAcuerdo">
                    <h3>Proyectos de Acuerdo</h3>
                    <hr />
                </div>
                <div className="mesasTrabajo">
                    <h3>Mesas de Trabajo</h3>
                    <hr />
                </div>
                <div className="asistencia">
                    <h3>Asistencia y Participación</h3>
                    <hr />
                </div>
                <div className="controlPolitico">
                    <h3>Citaciones a Control Político</h3>
                    <hr />
                </div>
            </div>
        )
    }
}

export default Concejal;