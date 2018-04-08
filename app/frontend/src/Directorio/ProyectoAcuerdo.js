import React, { Component } from 'react';
import '../CSS/ProyectoAcuerdo.css';

class ProyectoAcuerdo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: 'In JSON, array values must be of type string, number, object, array, boolean or null.',
            codigo: '#fdon20080627sg',
            concejal: this.props.concejal,
            estado: 'Plenaria',
            fecha: new Date,
            periodo: '2016 - 2019',
            tema: 'Placeholder',
            tags: [
                'algo',
                'otro',
            ],
        };
    }
    render() {
        return (
            <div className="proyectoAcuerdo">
                <h2 className="titulo">{this.state.titulo}</h2>
                <h4 className="codigo">Codigo: {this.state.codigo}</h4>
                <h4 className="comision">Comisión {this.state.concejal.comision}</h4>
                <div className="concejal">
                    <img
                        className="fotoPersona"
                        src={this.state.concejal.foto}
                        alt={"Foto de " + this.state.concejal.nombre} />
                    <h4 className="nombrePersona">{this.state.concejal.nombre}</h4>
                    <img
                        className="logoPartido"
                        src={this.state.concejal.fotoPartido}
                        alt={"logo de " + this.state.concejal.partido} />
                </div>
                <div className="estados">
                    <h3>Estado: {this.state.estado}</h3>
                    <h4>Fecha: {this.state.fecha.getDate()}/{this.state.fecha.getMonth()}/{this.state.fecha.getFullYear()}</h4>
                    <div className="barraEstado">

                    </div>
                </div>
                <div className="informacion">
                    <h3>
                        Información
                    </h3>
                    <hr />
                    <p><h4>Periodo: </h4>{this.state.periodo}</p>
                    <p><h4>Tema: </h4>{this.state.tema}</p>
                    <p>
                        <h4>Tags: </h4>
                        {this.state.tags.map(
                            tema => {
                                return (
                                    <span className="tags">#{tema} </span> 
                                    )
                            }
                        )}
                    </p>
                    <p className="textoCompleto">Ver Texto Completo</p>
                </div>
                <div className="alertas">
                    <h3>Alertas</h3>
                    <input
                        type="text"
                        placeholder="correo" />
                    <button type="submit">Alertarme</button>
                </div>
            </div>
        )
    }
}

export default ProyectoAcuerdo;