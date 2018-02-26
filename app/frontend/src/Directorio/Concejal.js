import React, { Component } from 'react';
import '../CSS/BioConcejal.css';
import './bogota.jpg';
class Concejal extends Component {
    state = {
        "nombre": "Tony Stark",
        "imagen": "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/b/bb/Tony_Stark_Promo.jpg/revision/latest?cb=20141129202546",
        "periodos": [
            {
                periodo: "2014 - Hoy",
                "localidades": [
                    "fontibon", 13254,
                    "usaquen", 432,
                    "santafe", 31,
                    "teusaquillo", 123,
                ]
            },
            {
                periodo: "2010 - 2014",
                "localidades": [
                    "fontibon", 13254,
                    "usaquen", 432,
                    "santafe", 31,
                    "teusaquillo", 123,
                ]
            },
        ],
        "partido":"Avengers",
        "fotoPartido":"https://image.flaticon.com/icons/png/128/87/87835.png",
        "otrosDeBancada": [
            "Nick Fury"
        ],
    }
    render() {
        return (
            <div className="bioConcejal">
                <img className="fotoPersona" src={this.state.imagen} alt={this.state.nombre}/>
                <h1 className="nombrePersona">H.C. {this.state.nombre}</h1>
                <div className="periodosAnteriores">
                    {this.state.periodos.map(
                        (t, i) => {
                            return <p>{t.periodo}</p>
                        })}
                </div>
                <div className="otrosDeBancada">
                    <img src={this.state.fotoPartido} alt={"logo de "+this.state.partido}/>
                    <h3>Otros de {this.state.partido}</h3>
                    {this.state.otrosDeBancada.map(
                        (t, i) => {
                            return <p>{t}</p>
                        })}
                </div>
                <div className="mapa">
                    <img alt="mapa de Bogota" src='http://cdn.radiosantafe.com//wp-content/uploads/2016/01/BOGOTA-MAPA.jpg'/>
                </div>
                <div className="tablaPeriodos">
                    {this.state.periodos.map(
                        (t, i) => {
                            return (
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>{t.periodo}</th>
                                    </tr>
                                        {/* {t.localidades.forEach(classic => {
                                            console.log(classic);
                                            return (
                                            <tr>
                                                <td>"classic"</td>
                                            </tr>
                                            )
                                        })} */}
                                    </tbody>
                                </table>)
                        })
                    }
                </div>
                <div className="hojaDeVida">
                    <h3>Hoja de Vida</h3>
                    <hr/>
                </div>
                <div className="twitterFeed">
                    <h3>Twitter</h3>
                </div>
            </div>
        )
    }
}

export default Concejal;