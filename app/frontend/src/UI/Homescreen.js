import React, { Component } from 'react';
import '../CSS/Homescreen.css';
import logo from '../logo.svg'
class Homescreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSection: "home",
        }
    }
    render() {
        return (
            <div className="Homescreen">
                <div className="Header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <button className="mainButton">
                        Nombre Página
                    </button>
                    <button className="homeButton">
                        Directorio Concejales
                    </button>
                    <button className="homeButton">
                        Alcaldías
                    </button>
                    <button className="homeButton">
                        Mesas de Trabajo
                    </button>
                    <button className="homeButton">
                        Proyectos
                    </button>
                    <button className="homeButton">
                        Medios
                    </button>
                </div>
                <div className="mainPage">
                    <p>cosas</p>
                </div>
            </div>
        )
    }
}

export default Homescreen;