import React, { Component } from 'react';
class ProyectosAcuerdo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proyectosAcuerdo: [

            ]
        }
    }
    
    render() {
        return (
            <div>
                <div className="tituloBusqueda">
                    <h1 className="titulo">
                        Proyectos de Acuerdo 2014 - 2018
                        </h1>
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="barraBusqueda"
                        id="search"
                        onChange={e => this.search(document.getElementById("search").value)}
                    />
                </div>
            </div>
        )
    }
}

export default ProyectosAcuerdo;