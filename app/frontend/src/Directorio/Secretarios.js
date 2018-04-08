import React, { Component } from 'react';
import "../CSS/Secretarios.css"

class Secretarios extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            secretarios: this.props.secretarios,
            selected: "nombre",
         }
    }
    losProps = this.props.secretarios;

    search(input){
        var currentSecretarios = this.state.secretarios;
        var found = currentSecretarios.filter(
            buscado=>{
                return buscado.nombre.toLowerCase().includes(input.toLowerCase());
            }
        )
        this.setState(
            {
                secretarios: found,
            }
        )
        if(input === "") this.setState({secretarios: this.losProps,})
    }

    sortBy(sorting) {
        var currentSecretarios = this.state.secretarios;
        var sortedSecretarios;
        switch (sorting) {
            case "secretaria":
            sortedSecretarios = currentSecretarios.sort(
                    (secretario1, secretario2) => {
                        if (secretario1.secretaria < secretario2.secretaria) return -1;
                        if (secretario1.secretaria > secretario2.secretaria) return 1;
                        return 0;
                    })
                break;
            case "nombre":
                sortedSecretarios = currentSecretarios.sort(
                    (secretario1, secretario2) => {
                        if (secretario1.nombre < secretario2.nombre) return -1;
                        if (secretario1.nombre > secretario2.nombre) return 1;
                        return 0;
                    })
                break;
        }
        this.setState(
            {
                secretarios: sortedSecretarios,
                selected: sorting,
            }
        )
    }

    renderSecretarios() {
        return this.state.secretarios.map((secretario, index) => {
            return (
                <div className="directorioSecretario">
                    <div className="bloqueFoto">
                        <img
                            src={secretario.foto}
                            alt={"foto de " + secretario.nombre}
                            className="fotoSecretario"></img>
                    </div>
                    <div className="bloqueNombre">
                        <h2> {secretario.nombre}</h2>
                    </div>
                    <div className="bloqueComision">
                        <h5>Secretaria de {secretario.secretaria}</h5>
                    </div>
                </div>
            )
        })
    }
    render() { 
        return ( 
            <div>
            <div className="pantallaDirectorio">
                    <div className="tituloBusqueda">
                        <h1 className="titulo">
                            Secretarios de Bogotá Mejor para Todos 2014 - 2018
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
                            onClick={e => this.sortBy("secretaria")}
                        > Secretaria </button>
                    </div>
                    <div className="listaSecretarios">
                        {this.renderSecretarios()}
                    </div>
                </div>
            </div>
         )
    }
}
 
export default Secretarios;