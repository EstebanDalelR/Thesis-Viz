import React, { Component } from 'react';

class Concejal extends Component {
    state = {
        "nombre": "Tony Stark",
        "imagen": "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/b/bb/Tony_Stark_Promo.jpg/revision/latest?cb=20141129202546",
        "periodos": [
            {
                periodo: "2014 - Hoy",
                "localidades": {
                    fontibon: 13254,
                    usaquen: 432,
                    santafe: 31,
                    teusaquillo: 123,
                }
            },
            {
                periodo: "2010 - 2014",
                "localidades": {
                    fontibon: 13254,
                    usaquen: 432,
                    santafe: 31,
                    teusaquillo: 123,
                }
            }
        ],

        "otrosDeBancada": [
            "Nick Fury"
        ],
    }
    render() {
        return (
            <div>
                <img src={this.state.imagen}></img>
                <h1 className="nombrePersona">{this.state.nombre}</h1>
                <div className="periodosAnteriores">
                    {this.state.periodos.map(
                        (t, i) => {
                            return <p>{t.periodo}</p>
                        })}
                </div>
                <div className="otrosDeBancada">
                    {this.state.otrosDeBancada.map(
                        (t, i) => {
                            return <p>{t}</p>
                        })}
                </div>
                <div className="mapa"></div>
                <div className="tablaPeriodos">
                    {this.state.periodos.map(
                        (t, i) => {
                            return (
                                <table>
                                    <th>{t.periodo}</th>
                                   
                                </table>)
                        })
                    }
                </div>
                <div className="hojaDeVida"></div>
                <div className="twitterFeed"></div>
            </div>
        )
    }
}

export default Concejal;