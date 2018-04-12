import React, { Component } from 'react';
import { Link, Route} from 'react-router-dom';

import "../CSS/Concejales.css"
class Concejales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            concejales: this.props.concejales,
            selected: 'partido'
        }
        this.sortBy = this.sortBy.bind(this);
        this.search = this.search.bind(this);
        document.title="Concejales";
    }
    losProps = this.props.concejales;

    search(input) {
        var currentConcejales = this.state.concejales;
        var found = currentConcejales.filter(
            buscado => {
                return buscado.nombre.toLowerCase().includes(input.toLowerCase());
            }
        )
        this.setState(
            {
                concejales: found,
            }
        )
        if (input === "") this.setState({ concejales: this.losProps, })
    }

    sortBy(sorting) {
        var currentConcejales = this.state.concejales;
        var sortedConcejales;
        switch (sorting) {
            case "partido":
                sortedConcejales = currentConcejales.sort(
                    (concejal1, concejal2) => {
                        if (concejal1.partido < concejal2.partido) return -1;
                        if (concejal1.partido > concejal2.partido) return 1;
                        return 0;
                    })
                break;
            case "nombre":
                sortedConcejales = currentConcejales.sort(
                    (concejal1, concejal2) => {
                        if (concejal1.nombre < concejal2.nombre) return -1;
                        if (concejal1.nombre > concejal2.nombre) return 1;
                        return 0;
                    })
                break;
            case "comision":
                sortedConcejales = currentConcejales.sort(
                    (concejal1, concejal2) => {
                        if (concejal1.comision < concejal2.comision) return -1;
                        if (concejal1.comision > concejal2.comision) return 1;
                        return 0;
                    })
        }
        this.setState(
            {
                concejales: sortedConcejales,
                selected: sorting,
            }
        )
    }

    renderConcejales() {
        return this.state.concejales.map((concejal, index) => {
            return (
                <Link to={"/concejales/" + index}>
                    <div className="directorioConcejal">
                        <div className="bloqueFoto">
                            <img
                                src={concejal.foto}
                                alt={"foto de " + concejal.nombre}
                                className="fotoConcejal"></img>
                        </div>
                        <div className="bloqueNombre">
                            <h2> {concejal.nombre}</h2>
                        </div>
                        <div className="bloqueComision">
                            <h5>Comisión {concejal.comision}</h5>
                        </div>
                        <div className="bloquePartido">
                            <img
                                src={concejal.fotoPartido}
                                alt={"imagen de " + concejal.partido}
                                className="fotoPartido"></img>
                            <p>{concejal.partido}</p>
                        </div>
                    </div>
                </Link>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="pantallaDirectorio">
                    <div className="tituloBusqueda">
                        <h1 className="titulo">
                            Concejo de Bogotá 2014 - 2018
                        </h1>
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="barraBusqueda"
                            id="search"
                            onChange={e => this.search(document.getElementById("search").value)}
                        />
                    </div>
                    <div className="sorting">
                        <button
                            onClick={e => this.sortBy("nombre")}
                        > Nombre </button>
                        <button
                            onClick={e => this.sortBy("partido")}
                        > Partido </button>
                        <button
                            onClick={e => this.sortBy("comision")}
                        > Comisión </button>
                    </div>
                    <div className="listaConcejales">
                        {this.renderConcejales()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Concejales;